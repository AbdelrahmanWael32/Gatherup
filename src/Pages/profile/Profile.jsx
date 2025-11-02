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

function Profile() {
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

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6 relative">
      {/* 🔔 Notifications Menu */}
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
            <Button onClick={() => setUser({ ...user, name: "edit profile" })}>
              Edit Profile
            </Button>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

export default Profile;
