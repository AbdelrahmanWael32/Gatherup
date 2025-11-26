import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Badge,
  Button,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { MdNotifications } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const BASE_URL = "https://gatherup-backend.vercel.app/api/v1/auth";

  const [user, setUser] = useState(null);
  const [notifications] = useState([]);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const getUserInfoFromToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return { id: null, email: "", username: "User", phonenumber: "" };

      const payload = JSON.parse(window.atob(token.split(".")[1]));

      return {
        id: payload.id || payload._id || payload.userId || null,
        email: payload.email || "",
        username: payload.username || "User",
        phonenumber: payload.phonenumber || payload.phone || "",
      };
    } catch (e) {
      console.warn("Failed to decode token:", e);
      return { id: null, email: "", username: "User", phonenumber: "" };
    }
  };

  const fetchUserProfile = async () => {
    const token = localStorage.getItem("token");
    const { id: USER_ID, email: tokenEmail, username: tokenUsername, phonenumber: tokenPhone } =
      getUserInfoFromToken();

    if (!USER_ID) {
      setMessage("User ID not found. Please login again.");
      setMessageType("error");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    try {
      const req = await fetch(`${BASE_URL}/user/${USER_ID}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: token || "",
        },
      });

      const data = await req.json();

      if (req.ok) {
        setUser({
          ...data.data,
          email: data.data.email || tokenEmail,
          username: data.data.username || tokenUsername,
          phonenumber: data.data.phonenumber || data.data.phone || tokenPhone || "",
        });
      } else {
        setMessage(data.message || "Failed to fetch user data.");
        setMessageType("error");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setMessage("Something went wrong. Please try again.");
      setMessageType("error");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");
    const { id: USER_ID } = getUserInfoFromToken();

    if (!USER_ID) {
      setMessage("User ID not found. Please login again.");
      setMessageType("error");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    try {
      const req = await fetch(`${BASE_URL}/delete/${USER_ID}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: token || "",
        },
      });

      const data = await req.json();

      if (req.ok) {
        setMessage("Your account has been deleted successfully!");
        setMessageType("success");

        setTimeout(() => {
          setUser(null);
          localStorage.removeItem("token");
          localStorage.removeItem("userId");
          navigate("/signup");
        }, 1400);
      } else {
        setMessage(data.message || "Failed to delete your account.");
        setMessageType("error");
        setTimeout(() => setMessage(""), 3000);
      }
    } catch (err) {
      console.error("Delete error:", err);
      setMessage("Something went wrong. Please try again.");
      setMessageType("error");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  if (!user) return null;

  return (
    <div className="flex justify-center items-start min-h-screen bg-gray-100 p-6 relative">
      {message && (
        <div
          className={`absolute top-6 left-1/2 transform -translate-x-1/2 px-6 py-2 
            rounded-lg text-white font-medium shadow-md transition-all duration-300
            ${messageType === "success" ? "bg-green-500" : "bg-red-500"}`}
        >
          {message}
        </div>
      )}

      <div className="absolute top-6 right-10">
        <Menu>
          <MenuHandler>
            <Button variant="text" className="relative">
              <Badge content={notifications.length} color="red">
                <MdNotifications className="text-3xl text-gray-700" />
              </Badge>
            </Button>
          </MenuHandler>

          <MenuList className="w-72">
            <Typography
              variant="small"
              className="font-semibold text-gray-700 px-3 py-2"
            >
              Notifications
            </Typography>
            {notifications.map((note) => (
              <MenuItem key={note.id} className="hover:bg-gray-100">
                {note.text}
              </MenuItem>
            ))}
            <hr className="my-2" />
            <MenuItem className="text-center text-blue-500 hover:bg-blue-50">
              View all notifications
            </MenuItem>
          </MenuList>
        </Menu>
      </div>

      <Card className="w-full max-w-4xl shadow-lg">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="flex flex-col items-center gap-3 py-8 bg-gradient-to-r from-blue-600 to-indigo-500 text-white"
        >
          <FaUserCircle className="text-white text-6xl mb-2" />
          <Typography variant="h4" color="white">
            {user.username}
          </Typography>
          <Typography variant="small" color="white" className="opacity-90">
            {user.email}
          </Typography>
          {user.phonenumber && (
            <Typography variant="small" color="white" className="opacity-90">
              📞 {user.phonenumber}
            </Typography>
          )}
        </CardHeader>

        <CardBody className="p-8">
          <Typography variant="h5" color="blue-gray" className="mb-5">
            Recent Bookings
          </Typography>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.recentBookings && user.recentBookings.length > 0 ? (
              user.recentBookings.map((booking) => (
                <div
                  key={booking.id}
                  className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-lg border shadow-sm"
                >
                  <Typography color="blue-gray">{booking.event}</Typography>
                  <Typography variant="small" color="gray">
                    {booking.date}
                  </Typography>
                </div>
              ))
            ) : (
              <Typography color="gray" className="col-span-full text-center py-4">
                You have no recent bookings.
              </Typography>
            )}
          </div>

          <div className="mt-8 flex justify-end">
            <Button
              onClick={handleDeleteAccount}
              color="red"
              className="hover:bg-red-600 transition-all duration-300"
            >
              Delete Profile
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Profile;
