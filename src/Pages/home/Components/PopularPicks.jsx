import { Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import EventCard from "../../../Components/eventCard/EventCard";

const PopularPicks = () => {
  const [topEvents, setTopEvents] = useState([
    {
      id: 1,
      image: "./sport1.png",
      title: "Youth Basketball Championship",
      price: 100,
      date: "December 15, 2025",
      location: "Al Gezira Sports Club – Cairo",
    },
    {
      id: 2,
      image: "./event2.png",
      title: "Outdoor Movie Night",
      price: 75,
      date: "October 3, 2025",
      location: "Zed Park – Sheikh Zayed, Giza",
    },
    {
      id: 3,
      image: "./event4.png",
      title: "Summer Beats Live Concert",
      price: 250,
      date: "August 8, 2025",
      location: "Cairo Festival City Amphitheater – New Cairo",
    },
  ]);

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
      <div className="flex flex-col mt-8 gap-10 items-center">
        {topEvents.map((e) => {
          return <EventCard key={e.id} event={e} />;
        })}
      </div>
    </div>
  );
};

export default PopularPicks;
