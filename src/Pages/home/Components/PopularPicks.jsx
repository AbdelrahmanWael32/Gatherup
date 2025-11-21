import { Button, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import EventCard from "../../../Components/eventCard/EventCard";
import { Link } from "react-router-dom";
import useFetch from "../../../hooks/usefetch";

const PopularPicks = () => {
  const [topEvents, setTopEvents] = useState([]);

  const { event, loading } = useFetch(
    `${import.meta.env.VITE_API_URL}/api/v1/events`
  );

  useEffect(() => {
    if (event && event.length > 0) {
      setTopEvents(event.slice(0, 3));
    }
  }, [event]);

  if (loading)
    return <Typography className="text-4xl text-center">Loading...</Typography>;
  return (
    <div className="mt-20">
      <div className="flex justify-between">
        <Typography
          variant="h1"
          color="black"
          className="mb-4 text-xl sm:text-2xl md:text-3xl"
        >
          Top Picks Near You
        </Typography>
      </div>
      <div className="mt-2 border-t border-brand-secondary"></div>
      <div className="relative mt-8 w-full px-4">
        <div className="flex flex-col mt-8 gap-10 items-center">
          {topEvents.map((e) => {
            return <EventCard key={e._id} event={e} />;
          })}
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 w-full h-2/5 bg-gradient-to-t from-white to-transparent" />
      </div>
      <div className="mt-10 flex justify-center">
        <Button size="sm" className="bg-brand-primary h-3/4 p-3">
          <Link to="/events">Show more</Link>
        </Button>
      </div>
    </div>
  );
};

export default PopularPicks;
