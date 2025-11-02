import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

import { Link } from "react-router-dom";

const AdminDashboard = ({ event }) => {
  console.log(event);

  return (
    <div className="flex justify-center">
      <Card className="mt-6 w-96">
        <CardBody>
          <Typography variant="h5" color="blue-gray" className="mb-2">
            Tickets
          </Typography>
          <Typography>View, Change, Add or Remove tickets</Typography>
          <Typography>Total Tickets: {event.length}</Typography>
        </CardBody>
        <CardFooter className="pt-0">
          <Link to="/admin/tickets">
            <Button>Check Tickets</Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminDashboard;
