import { useEffect, useState } from "react";
import EventCard from "../../Components/eventCard/EventCard";

const Events = ({ setSelectedEvent }) => {
  const [event, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/v1/events`)
      .then((res) => res.json())
      .then((data) => {
        setEvents(data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch events:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      <section className="py-16">
        <h1 className="max-w-4xl mx-auto text-4xl font-normal text-brand-dark mb-3">
          Find your next experience
        </h1>
      </section>
      <div className="flex flex-col gap-[3rem] justify-center items-center px-4">
        {event.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            setSelectedEvent={setSelectedEvent}
          />
        ))}
      </div>
    </div>
  );
};

export default Events;
