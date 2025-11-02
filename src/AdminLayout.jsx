import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./Pages/admin-pages/AdminDashboard";
import ShowTickets from "./Pages/admin-pages/showTickets/ShowTickets";
import AdminHeader from "./Pages/admin-pages/Components/AdminHeader";
import { useState } from "react";
import AddTicket from './Pages/admin-pages/addTicket/AddTicket';

const AdminLayout = () => {
  const [event, setEvent] = useState([
    {
      id: 1,
      image: "/sport1.png",
      title: "Youth Basketball Championship",
      price: 100,
      date: "December 15, 2025",
      location: "Al Gezira Sports Club – Cairo",
    },
    {
      id: 2,
      image: "/event2.png",
      title: "Outdoor Movie Night",
      price: 75,
      date: "October 3, 2025",
      location: "Zed Park – Sheikh Zayed, Giza",
    },
    {
      id: 3,
      image: "/event4.png",
      title: "Summer Beats Live Concert",
      price: 250,
      date: "August 8, 2025",
      location: "Cairo Festival City Amphitheater – New Cairo",
    },
  ]);
  return (
    <div className="w-full">
      <AdminHeader />
      <Routes>
        <Route index element={<AdminDashboard event={event} />} />
        <Route
          path="tickets"
          element={<ShowTickets event={event} setEvent={setEvent} />}

        />
        <Route
          path="add-tickets"
          element={<AddTicket event={event} setEvent={setEvent} />}
        />
      </Routes>
    </div>
  );
};

export default AdminLayout;
