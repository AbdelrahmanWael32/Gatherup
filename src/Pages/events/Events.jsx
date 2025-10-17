import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
const Events = () => {
  let event = [
    {
      id: 1,
      image: "./public/event1.png",
      title: "Global Music & Culture Festival",
      price: 200,
      date: "May 8, 2025",
    },
    {
      id: 2,
      image: "./public/event4.png",
      title: "Global Music & Culture Festival",
      price: 300,
      date: "May 10, 2025",
    },
  ];
  return (
    <div className="flex flex-col gap-[3rem] justify-center items-center">
      {event.map(({ id, image, title, price, date }) => (
        <Card key={id} className="w-full max-w-[48rem] flex-row">
          <CardHeader
            shadow={false}
            floated={false}
            className="m-0 w-2/5 shrink-0 rounded-r-none"
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
            <Typography>
              <Button color="blue">book now</Button>
              <a href="#" className="inline-block">
                <Button variant="text" className="flex items-center gap-2">
                  Learn More
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
              </a>
            </Typography>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};

export default Events;
