import {
  Card,
  CardBody,
  Typography,
  Button,
  Avatar,
  CardHeader,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
  Badge,
} from "@material-tailwind/react";
import React, { useState } from "react";
import { MdNotifications } from "react-icons/md";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const BASE_URL = "https://gatherup-backend.vercel.app/api/v1/auth";


  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const [user, setUser] = useState({
    name: "Basmala Hassan",
    email: "basmala@example.com",
    avatar: "https://randomuser.me/api/portraits/women/45.jpg",
    membership: "VIP Member",
    recentBookings: [
      { id: 1, event: "Al Ahly vs Zamalek Match", date: "2025-11-02" },
      { id: 2, event: "Cairo Opera – Swan Lake", date: "2025-10-27" },
      { id: 3, event: "Dream Park Ticket", date: "2025-09-10" },
    ],
  });

  const [notifications] = useState([
    { id: 1, text: "Your ticket booking was confirmed" },
    { id: 2, text: "New event added near you" },
    { id: 3, text: "Discounts available on opera tickets" },
  ]);


  const getUserIdFromToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return null;
      const payload = JSON.parse(window.atob(token.split(".")[1]));

      return payload.id || payload._id || payload.userId || null;
    } catch (e) {
      console.warn("Failed to decode token:", e);
      return null;
    }
  };

  const handleDeleteAccount = async () => {
    const token = localStorage.getItem("token");
    const USER_ID = getUserIdFromToken();

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
      console.log("Delete response:", data);

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

  if (!user) return null;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6 relative">

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

      <Card className="w-full max-w-3xl shadow-lg">
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="flex flex-col items-center gap-3 py-6 bg-gradient-to-r from-blue-600 to-indigo-500 text-white"
        >
          <Avatar src={user.avatar} alt={user.name} size="xl" />
          <Typography variant="h4" color="white">
            {user.name}
          </Typography>
          <Typography variant="small" color="white" className="opacity-90">
            {user.email}
          </Typography>
          <Typography
            variant="small"
            className="mt-1 bg-white/20 px-3 py-1 rounded-full text-sm"
          >
            {user.membership}
          </Typography>
        </CardHeader>

        <CardBody className="p-6">
          <Typography variant="h5" color="blue-gray" className="mb-3">
            Recent Bookings
          </Typography>

          <div className="space-y-3">
            {user.recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex justify-between items-center bg-gray-50 px-4 py-2 rounded-lg border"
              >
                <Typography color="blue-gray">{booking.event}</Typography>
                <Typography variant="small" color="gray">
                  {booking.date}
                </Typography>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-end">
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