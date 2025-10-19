import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
const EventCard = ({ event, setSelectedEvent }) => {
  const { id, title, price, image, date } = event;
   const navigate = useNavigate();

  const handleBook = () => {
  setSelectedEvent((prev) => {
    const exists = prev.find((e) => e.id === id);
    if (exists) return prev;
    return [...prev, { ...event, quantity: 1 }];
  });
  navigate("/my-tickets");
};
  return (
    <Card className="w-full max-w-[48rem] flex-col sm:flex-row hover:shadow-xl transform hover:-translate-y-2 duration-300">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 sm:w-2/5 w-full shrink-0"
      >
        <img
          src={image}
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h4" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          {date}
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          Tickets start from {price} EGP
        </Typography>
        <Typography className="flex justify-center gap-[2rem]">
          <Button color="blue" onClick={handleBook}>Book Now</Button>
          <Link to={`/event-details/${id}`}>
            <Button variant="text" className="flex items-center gap-2">
              View Details
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
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </Link>
        </Typography>
      </CardBody>
    </Card>
  );
};

export default EventCard;
