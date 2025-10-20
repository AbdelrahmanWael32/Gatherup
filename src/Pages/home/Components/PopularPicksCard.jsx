import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Rating,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";

const PopularPicksCard = ({
  events: { id, date, time, title, location, img, rating },
}) => {
  return (
    <Card className="w-full flex-row">
      <CardHeader
        shadow={false}
        floated={false}
        className="m-0 w-2/5 rounded-r-none"
      >
        <img
          src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
          alt="card-image"
          className="h-full w-full object-cover"
        />
      </CardHeader>
      <CardBody className="w-full">
        <div className="flex flex-col gap-6 justify-between flex-wrap lg:flex-row lg:items-center">
          <div className="">
            <Typography
              variant="h6"
              className="mb-4 uppercase  text-brand-secondary text-xs md:text-md lg:text-base "
            >
              {date}
            </Typography>
            <Typography
              variant="h6"
              className="mb-4 uppercase text-brand-secondary text-xs md:text-md lg:text-base "
            >
              {time}
            </Typography>
            <Typography
              variant="h6"
              color="black"
              className="mb-4 uppercase text-xs md:text-md lg:text-base "
            >
              {title}
            </Typography>
            <Typography
              variant="h6"
              color="black"
              className="mb-4 uppercase text-xs md:text-md lg:text-base "
            >
              {location}
            </Typography>
            <div className="flex gap-2">
              <Typography variant="h6" color="black" className="">
                {rating}
              </Typography>
              <Rating value={4} readonly />
            </div>
          </div>
          <div>
            <Button className="border-brand-primary border-2 rounded-full p-4 text-brand-primary bg-white">
              <Link to={`/event-details/${id}`}>View details</Link>
            </Button>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default PopularPicksCard;
