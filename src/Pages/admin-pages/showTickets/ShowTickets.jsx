import { Link, useNavigate } from "react-router-dom";
import { adminGetTicket } from "../Hooks/adminGetTicket";
import { useEffect } from "react";

const ShowTickets = ({ event }) => {
  const navigate = useNavigate();

  const { setSelectedTicket, setAllTickets } = adminGetTicket();
  useEffect(() => {
    setAllTickets(event);
  }, [event]);

  return (
    <div className="min-h-screen">
      <div className="md:mx-5 xl:mx-20 mt-10 rounded-xl shadow-md border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="sm:text-2xl font-semibold text-brand-primary">
            Tickets Management
          </h2>
          <button
            onClick={() => navigate("/admin/add-tickets")}
            className="bg-brand-primary text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Add Ticket
          </button>
        </div>

        {event && event.length > 0 ? (
          event.map((ticket) => (
            <div
              key={ticket._id}
              className="flex flex-col md:flex-row gap-5 items-center justify-between border-b border-gray-200 py-3  hover:bg-gray-50 transition text-center"
            >
              <div className="flex gap-3 justify-center items-center">
                <div>
                  <img
                    src={ticket.image}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                </div>
                <div>
                  <div className="font-bold text-brand-secondary">
                    {ticket.title}
                  </div>
                  <div className="text-brand-secondary my-4">{ticket.date}</div>
                  <div className="text-brand-secondary my-4">
                    {ticket.location}
                  </div>
                </div>
              </div>

              <div className="flex gap-[5rem]">
                <div className="text-brand-secondary ">
                  {ticket.ticketCategories.map((Categories, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-100 last:border-none py-1"
                    >
                      {Categories.type}
                    </div>
                  ))}
                </div>
                <div className="text-brand-secondary">
                  {ticket.ticketCategories.map((Categories, index) => (
                    <div
                      key={index}
                      className="border-b border-gray-100 last:border-none py-1"
                    >
                      {Categories.price}
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap xl:flex-nowrap justify-center gap-2">
                <Link
                  to={`/admin/ticket-details/${ticket._id}`}
                  onClick={() => setSelectedTicket(ticket)}
                  className="bg-brand-primary text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  View
                </Link>
                <Link
                  to="/admin/edit"
                  className="bg-brand-primary text-white px-3 py-1 rounded hover:bg-blue-600"
                >
                  Edit
                </Link>
                <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center py-6 text-brand-secondary italic">
            No tickets found.
          </p>
        )}
      </div>
    </div>
  );
};

export default ShowTickets;
