import { Button, Typography } from "@material-tailwind/react";
import PopularPicksCard from "./PopularPicksCard";
import { useState } from "react";

const PopularPicks = () => {
  const [topEvents, setTopEvents] = useState([
    {
      id: 1,
      date: "Aug 13",
      time: "Sun • 10:00am",
      title: "Elements Music and Arts Festival - Sunday",
      location: "Pocono Raceway",
      img: "/sport1.png",
      rating: 4.8,
    },
    {
      id: 2,
      date: "Aug 13",
      time: "Sun • 11:00am",
      title: "Orange County Fair - Admission",
      location: "Orange County Fair and Event Center",
      img: "/event2.png",
      rating: 4.6,
    },
    {
      id: 3,
      date: "Aug 13",
      time: "Sun • 11:00am",
      title: "Audien (21+ Event)",
      location: "AYU Dayclub",
      img: "/event3.png",
      rating: 4.9,
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
      <div className="flex flex-col mt-8 gap-10">
        {topEvents.map((e) => {
          return <PopularPicksCard events={e} key={e.id} />;
        })}
      </div>
    </div>
  );
};

export default PopularPicks;
