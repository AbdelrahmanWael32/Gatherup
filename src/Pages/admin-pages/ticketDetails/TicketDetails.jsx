import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/usefetch";
import { Card, Typography } from "@material-tailwind/react";

const TicketDetails = () => {
  const { _id } = useParams();

  const { event, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}/api/v1/events/${_id}`
  );
  console.log(event);

  if (loading) {
    return <p className="text-center text-gray-500 mt-12">Loading event...</p>;
  }
  if (!event) {
    return <p className="text-center text-gray-500 mt-12">Event not found</p>;
  }
  return (
    <div className="flex justify-between m-0 lg:px-32 p-4 flex-row gap-8 flex-wrap">
      <Card className="flex-col p-4 gap-2 w-full">
        <Typography className="text-4xl mb-5">{event.title}</Typography>
        <Typography className="text-xl">
          Description: {event.description}
        </Typography>
        <Typography className="text-xl">
          Event Category: {event.eventCategory}
        </Typography>
        <Typography className="text-xl">
          Date: {event.date} from {event.time}
        </Typography>
        <Typography className="text-xl">Location: {event.location}</Typography>
        <Typography className="text-xl">Id: {event._id}</Typography>
      </Card>

      <div className="flex text-xl flex-col gap-4 justify-between w-full md:flex-row">
        <Card className="h-100 p-4">
          <Typography className="text-4xl mb-5">Ticket Categories:</Typography>
          {event.ticketCategories.map((category, index) => {
            return (
              <Typography className="text-xl mb-5" key={index}>
                {category.type}: ${category.price}
              </Typography>
            );
          })}
        </Card>

        <Card>
          <Typography className="text-xl p-2 text-center">
            Event Image
          </Typography>
          <img
            className="h-96 w-full rounded-lg object-cover object-center shadow-xl shadow-blue-gray-900/50"
            src={event.image}
            alt={event.title}
          />
        </Card>
      </div>
    </div>
  );
};

export default TicketDetails;
