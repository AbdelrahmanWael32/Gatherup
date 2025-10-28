import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex justify-center flex-col items-center gap-8">
      <h1 className="text-5xl">Page Not Found</h1>
      <div className="flex justify-between w-1/4">
        <Link to={-1}>
          <Button className="bg-brand-dark">Go Back</Button>
        </Link>
        <Link to="/">
          <Button className="bg-brand-dark">Go to Home</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
