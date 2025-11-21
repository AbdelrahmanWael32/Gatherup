import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import { useSearch } from "../../../hooks/useSearch";

const CategoryCard = ({ category: { title, img } }) => {
  const { setSelectedCategory } = useSearch();
  return (
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-auto sm:h-56">
        <img src={img} alt="card-image" className="h-full w-full" />
      </CardHeader>
      <CardBody></CardBody>
      <CardFooter className="pt-0 flex justify-center">
        <Link to={`/events`}>
          <Button
            onClick={() => setSelectedCategory(title.toLowerCase())}
            className="bg-brand-dark"
          >
            {title}
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;
