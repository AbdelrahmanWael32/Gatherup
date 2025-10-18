import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

const CategoryCard = ({ category: { title, img } }) => {
  return (
    <Card className="mt-6 w-96">
      <CardHeader color="blue-gray" className="relative h-auto sm:h-56">
        <img src={img} alt="card-image" className="h-full w-full" />
      </CardHeader>
      <CardBody></CardBody>
      <CardFooter className="pt-0 flex justify-center">
        <Button className="bg-brand-dark">{title}</Button>
      </CardFooter>
    </Card>
  );
};

export default CategoryCard;
