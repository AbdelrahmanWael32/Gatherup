import { Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import CategoryCard from "./CategoryCard";
import { Link } from "react-router-dom";

const Category = () => {
  const [categories, setCategories] = useState([
    {
      title: "Concert",
      img: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
    },
    {
      title: "Sports",
      img: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1323",
    },
    {
      title: "Theater",
      img: "https://images.unsplash.com/photo-1615414047026-802692414b79?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1169",
    },
    {
      title: "Parks",
      img: "https://images.unsplash.com/photo-1620087148830-a51b68b96e15?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&q=80&w=1170",
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
          <Link to="/events">Book Now</Link>
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
