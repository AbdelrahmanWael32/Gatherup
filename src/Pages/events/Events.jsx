import { useState } from "react";
import EventCard from "./componant/EventCard";
const Events = () => {
  const [event] = useState([
    {
      id: 1,
      image: "./sport1.png",
      title: "Youth Basketball Championship",
      price: 100,
      date: "December 15, 2025",
      location: "Al Gezira Sports Club – Cairo",
    },
    {
      id: 2,
      image: "./event2.png",
      title: "Outdoor Movie Night",
      price: 50,
      date: "October 3, 2025",
      location: "Zed Park – Sheikh Zayed, Giza",
    },
    {
      id: 3,
      image: "./event4.png",
      title: "Summer Beats Live Concert",
      price: 250,
      date: "August 8, 2025",
      location: "Cairo Festival City Amphitheater – New Cairo",
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
