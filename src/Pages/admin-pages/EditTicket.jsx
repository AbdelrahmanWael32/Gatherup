import { useState } from "react";
import { Card, Input, Textarea, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

function EditTicketDesign() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [ticketType, setTicketType] = useState("");
  const [ticketPrice, setTicketPrice] = useState("");
  const [date, setDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
if (!title && !category && !ticketType && !ticketPrice && !date && !startTime && !endTime && !location && !description && !imageUrl) {
    alert("Please fill at least one field before submitting.");
    return;
}
    const ticketData = {
      title,
      category,
      ticketType,
      ticketPrice,
      date,
      startTime,
      endTime,
      location,
      description,
      imageUrl,
    };

    try {
    const response = await fetch(`${API_URL}/api/v1/events/`,  {
        method: "PUT", 
        headers: {
          "Content-Type": "application/json",
         
        },
        body: JSON.stringify(ticketData),
      });

      const data = await response.json();
      console.log("Ticket updated:", data);
      alert("Ticket updated successfully!");

       setTimeout(() => {
        navigate("/ShowTickets");
      }, 1500);
    } catch (err) {
      console.error("Error updating ticket:", err);
      alert("Failed to update ticket.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-screen bg-gray-50">
      <Typography variant="h4" color="blue-gray" className="font-bold mb-4">
        Edit Ticket
      </Typography>

      <Card color="transparent" shadow={false} className="p-6 w-full max-w-lg">
        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <Input
            label="Event Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-md p-2 border-gray-300"
          >
            <option value="">Select event category</option>
            <option value="Concert">Concert</option>
            <option value="Theater">Theater</option>
            <option value="Sports">Sports</option>
            <option value="Movie_night">Movie night</option>
          </select>

          <div className="flex gap-2 mb-2 items-center">
            <select
              value={ticketType}
              onChange={(e) => setTicketType(e.target.value)}
              className="border p-2 rounded-md"
            >
              <option value="">Select type</option>
              <option value="Standard">Standard</option>
              <option value="Premium">Premium</option>
              <option value="VIP">VIP</option>
            </select>
            <Input
              type="number"
              placeholder="Price"
              className="w-24"
              value={ticketPrice}
              onChange={(e) => setTicketPrice(e.target.value)}
            />
          </div>

          <Input
            type="date"
            label="Event Date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <div className="flex gap-4">
            <Input
              type="time"
              label="Start Time"
              className="flex-1"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
            />
            <Input
              type="time"
              label="End Time"
              className="flex-1"
              value={endTime}
              onChange={(e) => setEndTime(e.target.value)}
            />
          </div>

          <Input
            label="Location"
            placeholder="Enter location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
          <Textarea
            label="Description"
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Input
            label="Image URL"
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />

          <Button type="submit" className="bg-brand-primary mt-4" fullWidth>
            Edit Ticket
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default EditTicketDesign;


