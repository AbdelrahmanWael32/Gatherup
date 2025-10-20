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
          src={img}
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
            <Link to={`/event-details/${id}`}>
              <Button className="border-brand-primary border-2 rounded-full p-4 text-brand-primary bg-white">
                View details
              </Button>
            </Link>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default PopularPicksCard;
