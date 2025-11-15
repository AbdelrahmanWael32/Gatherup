import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const EventCard = ({ event: { _id, title, image, date, location, time } }) => {
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

      <CardBody className="md:w-3/5">
        <Typography variant="h4" className="mb-2 text-brand-dark">
          {title}
        </Typography>

        <Typography color="gray" className="font-normal">
          {date}
        </Typography>
        <Typography color="gray" className="font-normal">
          {time}
        </Typography>
        <Typography color="gray" className="font-normal">
          {location}
        </Typography>

        <Typography className="flex justify-end mt-5">
          <Link to={`/event-details/${_id}`}>
            <Button variant="text" className="flex  gap-2 text-blue-600">
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
