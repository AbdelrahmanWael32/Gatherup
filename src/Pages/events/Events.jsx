import EventCard from "../../Components/eventCard/EventCard";
import { useState } from "react";
const Events = () => {
  const [event] = useState([
    {
      id: 1,
      image: "./public/event3.png",
      title: "Tech & Innovation Expo",
      price: 200,
      date: "May 8, 2025",
    },
    {
      id: 2,
      image: "./public/event2.png",
      title: "Outdoor Movie Night",
      price: 50,
      date: "October 3, 2025",
    },
    {
      id: 3,
      image: "./public/event4.png",
      title: "Global Music & Culture Festival",
      price: 300,
      date: "September 15, 2025",
    },
  ]);
  return (
    <div>
      <section className="py-16">
        <h1 className="max-w-4xl mx-auto text-4xl font-normal text-[#04092c] mb-3">
          Find your next experience
        </h1>
      </section>
      <div className="flex flex-col gap-[3rem] justify-center items-center px-4">
        {event.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
};

export default Events;
