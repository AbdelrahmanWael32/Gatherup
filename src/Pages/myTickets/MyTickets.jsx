import { Button } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import NoEvents from "./../noEvents/NoEvents";
import Swal from "sweetalert2";

const API_BASE = "https://gatherup-backend.vercel.app/api/v1/cart";

const MyTickets = ({ selectedEvent, setSelectedEvent }) => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(() => localStorage.getItem("userId"));

  useEffect(() => {
    if (!userId) {
      Swal.fire({
        title: "Login Required",
        text: "You must login first to view your tickets.",
        confirmButtonColor: "#2c9cf0 ",
      }).then(() => {
        navigate("/login");
      });

      setSelectedEvent([]);
      return;
    }

    // Clear old data of user
    setSelectedEvent([]);

    fetch(`${API_BASE}/${userId}`)
      .then((res) => {
        if (!res.ok) {
          return { data: { ticket: [] } };
        }
        return res.json();
      })
      .then((data) => {
        if (data?.data?.ticket) {
          const backendCart = data.data.ticket.map((t) => {
            const category = t.eventId?.ticketCategories?.find(
              (c) => c.type === t.ticketCategory
            );

            return {
              id: t.eventId?._id,
              title: t.eventId?.title,
              image: t.eventId?.image,
              selectedType: t.ticketCategory,
              selectedPrice: category ? Number(category.price) : 0,
              quantity: Number(t.amount) || 1,
            };
          });

          setSelectedEvent(backendCart);
        } else {
          setSelectedEvent([]);
        }
      })
      .catch(() => {
        setSelectedEvent([]);
      });
  }, [userId, navigate, setSelectedEvent]);

  const updateBackend = async (event, delta) => {
    if (!userId) return;

    if (delta > 0) {
      await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          eventId: event.id,
          ticketCategory: event.selectedType,
          amount: 1,
        }),
      });
    } else {
      await fetch(`${API_BASE}/ticket`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          eventId: event.id,
          ticketCategory: event.selectedType,
        }),
      });
    }
  };

  const updateQuantity = async (id, selectedType, delta) => {
    const event = selectedEvent.find(
      (e) => e.id === id && e.selectedType === selectedType
    );
    if (!event) return;

    await updateBackend(event, delta);

    setSelectedEvent((prev) =>
      prev
        .map((e) =>
          e.id === id && e.selectedType === selectedType
            ? { ...e, quantity: e.quantity + delta }
            : e
        )
        .filter((e) => e.quantity > 0)
    );
  };

  const emptyCart = async () => {
    if (!userId) return;

    const result = await Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to empty your cart?",
      showCancelButton: true,
      confirmButtonColor: "#04092c",
      cancelButtonColor: "#2c9cf0",
      confirmButtonText: "Yes, empty it",
    });

    if (result.isConfirmed) {
      await fetch(`${API_BASE}/empty_cart`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      setSelectedEvent([]);
    }
  };

  const total = selectedEvent.reduce(
    (sum, e) => sum + (e.selectedPrice || 0) * (e.quantity || 1),
    0
  );

  if (!selectedEvent || selectedEvent.length === 0) return <NoEvents />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-extrabold text-brand-dark">Your Tickets</h1>

      {selectedEvent.map((event) => (
        <div
          key={`${event.id}-${event.selectedType}`}
          className="border-b-4 p-5 flex flex-col sm:flex-row justify-between items-center"
        >
          <div>
            <p className="font-extrabold">{event.title}</p>
            <img src={event.image} className="w-40 object-cover m-3 rounded" />
            <p>{event.selectedPrice} EGP</p>
          </div>

          <div className="flex items-center gap-3">
            <h1>Number of tickets</h1>

            <Button
              className="bg-brand-secondary"
              onClick={() => updateQuantity(event.id, event.selectedType, -1)}
            >
              −
            </Button>

            <span>{event.quantity}</span>

            <Button
              className="bg-brand-secondary"
              onClick={() => updateQuantity(event.id, event.selectedType, 1)}
            >
              +
            </Button>
          </div>

          <div className="font-semibold">
            {(event.selectedPrice || 0) * (event.quantity || 1)} EGP
          </div>
        </div>
      ))}

      <div className="p-2 text-xl text-brand-primary font-bold text-right">
        Total: {total} EGP
      </div>

      <div className="flex justify-center gap-4 mt-8">
        <Button
          className="bg-brand-secondary text-white"
          onClick={() => navigate("/events")}
        >
          Back to Events
        </Button>

        <Button
          className="bg-brand-primary text-white"
          onClick={() => navigate("/book-tickets")}
        >
          Checkout
        </Button>

        <Button className="bg-brand-dark text-white" onClick={emptyCart}>
          Empty Cart
        </Button>
      </div>
    </div>
  );
};

export default MyTickets;
