import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import Swal from "sweetalert2";
const API_URL = import.meta.env.VITE_API_URL;

const EventDetails = ({ setSelectedEvent }) => {
  const [event, setEvent] = useState(null);
  const [eventError, setEventError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { _id } = useParams();

  const getEventDetails = () => {
    try {
      fetch(`${import.meta.env.VITE_API_URL}/api/v1/events/${_id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.data) {
            setEvent(data.data);
          } else if (data.message === "success" && data.data) {
            setEvent(data.data);
          } else {
            setEventError("Event not found!");
          }
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch event:", err);
          setEventError("Failed to load event details");
          setLoading(false);
        });
    } catch (e) {
      setEventError(e.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getEventDetails();
  }, [_id]);

  if (loading) {
    return <p className="text-center text-gray-500 mt-12">Loading event...</p>;
  }

  if (eventError) {
    return <h1 className="text-red-500 text-xl text-center">{eventError}</h1>;
  }

  if (!event) {
    return <p className="text-center text-gray-500 mt-12">Event not found</p>;
  }
  const handleBook = async (ticket) => {
    try {
      const userId = localStorage.getItem("userId");
      if (!userId) {
        Swal.fire({
          icon: "error",
          title: "User not logged in",
          text: "Please log in first!",
        });
        return;
      }

      const res = await fetch(`${API_URL}/api/v1/cart`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          eventId: event._id,
          ticketCategory: ticket.type,
          amount: 1,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to add to cart");

      setSelectedEvent((prev) => {
  const exists = prev.find(
    (e) => e.id === event._id && e.selectedType === ticket.type
  );
  if (exists) return prev;
  return [
    ...prev,
    {
      id: event._id,
      title: event.title,
      image: event.image,
      selectedType: ticket.type,
      selectedPrice: Number(ticket.price) || 0, 
      quantity: 1,
    },
  ];
});


      Swal.fire({
        icon: "success",
        title: "Added to Cart",
        text: "Ticket added to your cart successfully!",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/my-tickets");
    } catch (err) {
      console.error(err);
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: err.message,
      });
    }
  };

  return (
    <div className="pt-12 px-6">
      <h1 className="text-3xl font-semibold text-brand-dark mb-3">
        {event.title}
      </h1>

      <div className="flex flex-col-reverse md:flex-row md:gap-[2rem]">
        <div>
          <p className="text-base md:text-lg text-brand-secondary whitespace-pre-line">
            {event.description}
          </p>
          <p className="text-brand-secondary text-lg mb-2 mt-7">{event.date}</p>
          <p className="text-brand-secondary text-lg mb-2">{event.time}</p>
          <p className="text-brand-secondary text-lg mb-2">{event.location}</p>
          <div className="w-full max-w-lg mt-6">
            <h2 className="text-2xl font-semibold text-[#04092c] mb-3">
              Ticket Categories
            </h2>

            {event.ticketCategories &&
              event.ticketCategories.map((ticket, index) => (
                <div
                  key={index}
                  onClick={() => handleBook(ticket)}
                  className="mb-4 border rounded-xl p-4 shadow-md relative overflow-hidden group transition-all duration-300 cursor-pointer hover:bg-brand-primary hover:shadow-md flex items-center justify-center"
                >
                  <div className="transition-opacity duration-300 group-hover:opacity-0 text-center">
                    <p className="text-lg font-medium text-brand-dark">
                      {ticket.type}
                    </p>
                    <p className="text-brand-secondary mt-1">
                      {ticket.price} EGP
                    </p>
                  </div>

                  <div className="absolute flex items-center justify-center opacity-0 group-hover:opacity-100 duration-500">
                    <span className="text-white text-xl font-bold">
                      Book Now
                    </span>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <img
          src={event.image}
          alt={event.title}
          className="w-[90%] md:w-[50%] max-h-[350px] object-cover rounded-2xl mb-6 shadow-lg mx-auto"
        />
      </div>
      <div className="flex justify-end">
        <Button
          variant="text"
          onClick={() => navigate(-1)}
          className="mt-2 flex gap-2 text-blue-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            className="h-4 w-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>
          Go Back
        </Button>
      </div>
    </div>
  );
};

export default EventDetails;
