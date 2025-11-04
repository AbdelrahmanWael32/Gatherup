import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./Pages/admin-pages/AdminDashboard";
import ShowTickets from "./Pages/admin-pages/showTickets/ShowTickets";
import AdminHeader from "./Pages/admin-pages/Components/AdminHeader";
import { useState } from "react";
import TicketDetails from "./Pages/admin-pages/ticketDetails/TicketDetails";
import EditTickets from "./Pages/admin-pages/EditTicket";
import AddTicket from './Pages/admin-pages/addTicket/AddTicket';
const AdminLayout = () => {
  const [event, setEvent] = useState([
    {
      id: 1,
      image: "/sport1.png",
      title: "Youth Basketball Championship",
      date: "December 15, 2025",
      location: "Al Gezira Sports Club – Cairo",
      ticketCategories: [
        {
          type: "Standard",
          price: 100,
        },
        {
          type: "Premium",
          price: 180,
        },
        {
          type: "VIP",
          price: 300,
        },
      ],
    },
    {
      id: 2,
      image: "/event2.png",
      title: "Outdoor Movie Night",
      date: "October 3, 2025",
      location: "Zed Park – Sheikh Zayed, Giza",
      ticketCategories: [
        {
          type: "Standard",
          price: 75,
        },
      ],
    },
    {
      id: 3,
      image: "/event4.png",
      title: "Summer Beats Live Concert",
      date: "August 8, 2025",
      location: "Cairo Festival City Amphitheater – New Cairo",
      ticketCategories: [
        {
          type: "Standard",
          price: 250,
        },
        {
          type: "Premium",
          price: 400,
        },
        {
          type: "VIP",
          price: 600,
        },
      ],
    },
  ]);
  return (
    <div className="w-full">
      <AdminHeader />
      <Routes>
        <Route index element={<AdminDashboard event={event} />} />
        <Route path="tickets" element={<ShowTickets event={event} />} />
        <Route path="ticket-details/:id" element={<TicketDetails />} />
        <Route path="add-tickets" element={<AddTicket event={event} setEvent={setEvent} />} />
        <Route path="edit" element={<EditTickets />} />
      </Routes>
    </div>
  );
};

export default AdminLayout;
