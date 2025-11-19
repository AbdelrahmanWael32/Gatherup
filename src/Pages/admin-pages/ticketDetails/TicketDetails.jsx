import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/usefetch";

const TicketDetails = () => {
  const { _id } = useParams();

  const { event, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}/api/v1/events/${_id}`
  );

  if (loading) {
    return <p className="text-center text-gray-500 mt-12">Loading event...</p>;
  }
  if (!event) {
    return <p className="text-center text-gray-500 mt-12">Event not found</p>;
  }
  return (
    <div className="flex m-0 lg:px-32 p-4 flex-col bg-brand-secondary gap-2">
      <span className="text-xl text-center">{event.title}</span>
      <div className="flex text-xl flex-col">
        <span>Id: {event._id}</span>
        <span>Date: {event.date}</span>
        <span>Location: {event.location}</span>
        <div className="flex justify-center">
          <img
            src={event.image}
            className="md:w-2/5 lg:w-2/3 p-4 max-w-md"
            alt={event.title}
          />
        </div>
      </div>
    </div>
  );
};

export default TicketDetails;
