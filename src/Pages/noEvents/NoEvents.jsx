import { useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

const NoEvents = () => {
    const navigate = useNavigate();

  return (
    <div className="text-center flex flex-col justify-center items-center gap-11">
      <p className="text-2xl text-brand-primary">No events selected</p>
      <Button
        className="bg-brand-secondary text-white self-center"
        onClick={() => navigate("/events")}
      >
        Go to Events
      </Button>
    </div>
  );
}

export default NoEvents
