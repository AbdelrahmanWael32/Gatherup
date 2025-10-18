import React from "react";
import { useParams } from "react-router-dom";

const EventDetails = () => {
  const {id} = useParams()
  console.log(id)
  return (
    <div>
      <h1>EventDetails</h1>
    </div>
  );
};

export default EventDetails;
