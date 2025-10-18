import { Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import CategoryCard from "./CategoryCard";

const Category = () => {
  const [categories, setCategories] = useState([
    {
      title: "Concert",
      img: "/concert.jpg",
    },
    {
      title: "Sports",
      img: "/sports.jpg",
    },
    {
      title: "Theater",
      img: "theater.jpg",
    },
    {
      title: "Family",
      img: "family.jpg",
    },
  ]);

  return (
    <div className="mt-5">
      <div className="flex justify-between">
        <Typography
          variant="h1"
          color="black"
          className="mb-4 text-xl sm:text-2xl md:text-3xl"
        >
          Browse by Category
        </Typography>
        <Button size="sm" className="bg-brand-primary h-3/4 p-3">
          Show More
        </Button>
      </div>
      <div className="mt-2 border-t border-brand-secondary"></div>
      <div className="flex flex-wrap gap-12 justify-around align-center mt-8">
        {categories.map((e) => {
          return <CategoryCard category={e} key={e.title}></CategoryCard>;
        })}
      </div>
    </div>
  );
};

export default Category;
