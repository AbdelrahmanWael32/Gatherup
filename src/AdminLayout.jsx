import { Route, Routes } from "react-router-dom";
import AdminDashboard from "./Pages/admin-pages/AdminDashboard";
import ShowTickets from "./Pages/admin-pages/showTickets/ShowTickets";
import AdminHeader from "./Pages/admin-pages/Components/AdminHeader";
import TicketDetails from "./Pages/admin-pages/ticketDetails/TicketDetails";
import EditTickets from "./Pages/admin-pages/EditTicket";
import AddTicket from "./Pages/admin-pages/addTicket/AddTicket";
import useFetch from "./hooks/usefetch";

const AdminLayout = () => {
  const { event, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}/api/v1/events`
  );

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  return (
    <div className="w-full">
      <AdminHeader />
      <Routes>
        <Route index element={<AdminDashboard event={event} />} />
        <Route path="tickets" element={<ShowTickets event={event} />} />
        <Route path="ticket-details/:_id" element={<TicketDetails />} />
        <Route path="edit" element={<EditTickets />} />
        <Route path="add-tickets" element={<AddTicket event={event} />} />
      </Routes>
    </div>
  );
};

export default AdminLayout;
