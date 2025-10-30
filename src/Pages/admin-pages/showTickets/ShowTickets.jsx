import { Link, useNavigate } from "react-router-dom";

const ShowTickets = ({ event }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      <div className="max-w-6xl mx-auto mt-10 rounded-xl shadow-md border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-semibold text-brand-primary">
            Tickets Management
          </h2>
          <button
            onClick={() => navigate("/add-tickets")}
            className="bg-brand-primary text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Add Ticket
          </button>
        </div>

        <div className="overflow-x-auto">
          <div className="grid grid-cols-6 bg-blue-100 py-3 px-4 rounded-t-lg text-brand-dark font-medium">
            <div className="col-span-1">Event</div>
            <div className="col-span-1">Category</div>
            <div className="col-span-1">Price (EGP)</div>
            <div className="col-span-1">Date</div>
            <div className="col-span-1">Location</div>
            <div className="col-span-1 text-center">Actions</div>
          </div>

          {event && event.length > 0 ? (
            event.map((ticket) => (
              <div
                key={ticket.id}
                className="grid grid-cols-6 items-center border-b border-gray-200 py-3 px-4 hover:bg-gray-50 transition"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={ticket.image}
                    className="w-12 h-12 rounded-lg object-cover"
                    alt={ticket.title}
                  />
                  <span className="font-medium text-brand-secondary">
                    {ticket.title}
                  </span>
                </div>
                <div className="text-brand-secondary">
                  {ticket.category || "N/A"}
                </div>
                <div className="text-brand-secondary">{ticket.price}</div>
                <div className="text-brand-secondary">{ticket.date}</div>
                <div className="text-brand-secondary">{ticket.location}</div>
                <div className="flex justify-center gap-2">
                  <Link to={`/admin/ticket-details/${ticket.id}`}>
                    <button className="bg-brand-primary text-white px-3 py-1 rounded hover:bg-blue-600 transition">
                      View
                    </button>
                  </Link>

                  <button className="bg-brand-primary text-white px-3 py-1 rounded hover:bg-blue-600 transition">
                    Edit
                  </button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition">
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
    </div>
  );
};

export default ShowTickets;
