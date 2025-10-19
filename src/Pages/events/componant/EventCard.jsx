import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
const EventCard = ({ event: { id, title, price, image, date, location } }) => {
  return (
    <Card className="w-full md:max-h-[15rem] max-w-[48rem] flex-col md:flex-row hover:shadow-xl transform hover:-translate-y-2 duration-300">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 md:w-2/5 w-full shrink-0"
      >
        <img
          src={image}
          alt="card-image"
          className="h-full max-h-[20rem] w-full object-cover"
        />
      </CardHeader>
      <CardBody>
        <Typography variant="h4" className="mb-2 text-brand-dark">
          {title}
        </Typography>
        <Typography color="gray" className=" font-normal">
          📅{date}
        </Typography>
        <Typography color="gray" className="font-normal">
          📍{location}
        </Typography>
        <Typography color="gray" className="mb-8 font-normal">
          💰 {price} EGP
        </Typography>
        <Typography className="flex justify-center gap-[2rem]">
          <Link to={"/book-tickets"}>
            <Button color="blue">book now</Button>
          </Link>

          <Link to={`/event-details/${id}`}>
            <Button
              variant="text"
              className="flex items-center gap-2 text-blue-600"
            >
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
