import { Button } from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";
import NoEvents from './../noEvents/NoEvents';

const MyTickets = ({ selectedEvent, setSelectedEvent }) => {
  const navigate = useNavigate();

  if (!selectedEvent || selectedEvent.length === 0) {
    return <NoEvents />;
  }

  const updateQuantity = (id, delta) => {
    setSelectedEvent((prev) =>
      prev
        .map((event) =>
          event.id === id
            ? { ...event, quantity: (event.quantity || 1) + delta }
            : event
        )
        .filter((event) => event.quantity > 0)
    );
  };

  const total = selectedEvent.reduce(
    (sum, e) => sum + e.price * (e.quantity || 1),
    0
  );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-extrabold text-brand-primary">Your Tickets</h1>

      {selectedEvent.map((event) => (
        <div
          key={event.id}
          className="border-b-4 p-5 flex flex-col sm:flex-row justify-between items-center"
        >
          <div>
            <p className="font-extrabold">{event.title}</p>
            <img
              src={event.image}
              alt="card-image"
              className="w-40 object-cover m-3 rounded"
            />
            <p>{event.price} EGP</p>
          </div>

          <div className="flex items-center gap-3 ">
            <h1>Number of tickets</h1>
            <Button
              className="bg-brand-secondary"
              onClick={() => updateQuantity(event.id, -1)}
            >
              −
            </Button>
            <span >{event.quantity || 1}</span>
            <Button
              className="bg-brand-secondary "
              onClick={() => updateQuantity(event.id, 1)}
            >
              +
            </Button>
          </div>

          <div className="font-semibold">
            {event.price * (event.quantity || 1)} EGP
          </div>
        </div>
      ))}

      <div className="p-2 text-xl text-brand-primary font-bold text-right">
        Total: {total} EGP
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <Button
          className="bg-brand-secondary text-white "
          onClick={() => navigate("/events")}
        >
          Back to Events
        </Button>

        <Button
          className="bg-brand-primary text-white "
          onClick={() => navigate("/book-tickets")}
        >
          Checkout{" "}
        </Button>
      </div>
    </div>
  );
};

export default MyTickets;
