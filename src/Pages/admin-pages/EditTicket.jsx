import { useState } from "react";
import { Card, Input, Textarea, Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL;

function EditTicketDesign() {
  const navigate = useNavigate();

  const [eventId, setEventId] = useState("");
  const [loadedEventId, setLoadedEventId] = useState("");

  const [form, setForm] = useState({
    title: "",
    eventCategory: "",
    ticketCategories: [{ type: "", price: "" }],
    date: "",
    formattedDate: "",
    startTime: "",
    endTime: "",
    location: "",
    description: "",
    image: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleTicketChange = (index, field, value) => {
    const updated = [...form.ticketCategories];
    updated[index][field] = value;
    setForm((prev) => ({ ...prev, ticketCategories: updated }));
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return "";
    const options = { weekday: "short", year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const formatDateForInput = (dateString) => {
    if (!dateString) return "";
    const parsed = new Date(dateString);
    const yyyy = parsed.getFullYear();
    const mm = String(parsed.getMonth() + 1).padStart(2, "0");
    const dd = String(parsed.getDate()).padStart(2, "0");
    return `${yyyy}-${mm}-${dd}`;
  };

  const convertTo24Hour = (timeStr) => {
    if (!timeStr) return "";
    const [time, modifier] = timeStr.split(" ");
    let [hours, minutes] = time.split(":").map(Number);
    if (modifier === "PM" && hours < 12) hours += 12;
    if (modifier === "AM" && hours === 12) hours = 0;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  };

  const convertTo12Hour = (time24) => {
    if (!time24) return "";
    const [hour, minute] = time24.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const h12 = hour % 12 || 12;
    return `${h12}:${String(minute).padStart(2, "0")} ${ampm}`;
  };

  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    const displayDate = formatDisplayDate(dateValue);
    setForm((prev) => ({ ...prev, date: dateValue, formattedDate: displayDate }));
  };

  const fetchEvent = async () => {
    if (!eventId) return;

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${API_URL}/api/v1/events/${eventId}`, {
        headers: { Authorization: token },
      });

      const data = await res.json();
      if (!res.ok || !data.data) return;

      const ticket = data.data;

      const isoDate = ticket.date ? formatDateForInput(ticket.date) : "";

      let startTime = "";
      let endTime = "";

      // FIX: Replace unicode dash with normal dash
      if (ticket.time) {
        const normalizedTime = ticket.time.replace("–", "-");
        const parts = normalizedTime.split("-");
        startTime = convertTo24Hour(parts[0].trim());
        endTime = convertTo24Hour(parts[1].trim());
      }

      setForm({
        title: ticket.title || "",
        eventCategory: ticket.eventCategory || "",
        ticketCategories: ticket.ticketCategories?.length
          ? ticket.ticketCategories
          : [{ type: "", price: "" }],
        date: isoDate,
        formattedDate: ticket.date || "",
        startTime,
        endTime,
        location: ticket.location || "",
        description: ticket.description || "",
        image: ticket.image || "",
      });

      setLoadedEventId(eventId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loadedEventId) return;

    const ticketData = {
      title: form.title,
      eventCategory: form.eventCategory,
      ticketCategories: form.ticketCategories.map((t) => ({
        type: t.type,
        price: Number(t.price),
      })),
      date: form.formattedDate,
      time: `${convertTo12Hour(form.startTime)} - ${convertTo12Hour(form.endTime)}`,
      location: form.location,
      description: form.description,
      image: form.image,
    };

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${API_URL}/api/v1/events/${loadedEventId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(ticketData),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Event updated successfully!",
          showConfirmButton: false,
          timer: 1500,
        }).then(() => navigate(-1));
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-screen bg-gray-50">
      <Typography variant="h4" color="blue-gray" className="font-bold mb-4">
        Edit Ticket
      </Typography>

      <Card color="transparent" shadow={false} className="p-6 w-full max-w-lg">
        <div className="flex flex-col gap-4 mb-4">
          <Input
            label="Event ID"
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
          />
          <Button onClick={fetchEvent} className="bg-blue-600 text-white">
            Load Event
          </Button>
        </div>

        <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
          <Input
            label="Event Title"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />

          <select
            value={form.eventCategory}
            onChange={(e) => handleChange("eventCategory", e.target.value)}
            className="w-full border rounded-md p-2 border-gray-300"
          >
            <option value="">Select Category</option>
            <option value="Concert">Concert</option>
            <option value="Theater">Theater</option>
            <option value="Sports">Sports</option>
            <option value="Movie_night">Movie night</option>
          </select>

          {form.ticketCategories.map((ticket, index) => (
            <div key={index} className="flex gap-2 mb-2 items-center">
              <select
                value={ticket.type}
                onChange={(e) => handleTicketChange(index, "type", e.target.value)}
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
                value={ticket.price}
                onChange={(e) =>
                  handleTicketChange(index, "price", e.target.value)
                }
                className="w-24"
              />
            </div>
          ))}

          <Input
            type="date"
            label="Event Date"
            value={form.date}
            onChange={handleDateChange}
          />

          <Input
            type="time"
            label="Start Time"
            value={form.startTime}
            onChange={(e) => handleChange("startTime", e.target.value)}
          />

          <Input
            type="time"
            label="End Time"
            value={form.endTime}
            onChange={(e) => handleChange("endTime", e.target.value)}
          />

          <Input
            label="Location"
            value={form.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />

          <Textarea
            label="Description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />

          <Input
            label="Image URL"
            value={form.image}
            onChange={(e) => handleChange("image", e.target.value)}
          />

          {form.image && (
            <img
              src={form.image}
              alt="Preview"
              className="w-40 h-40 mt-2 mx-auto object-cover rounded-lg"
            />
          )}

          <Button type="submit" fullWidth className="bg-blue-700 text-white">
            Edit Ticket
          </Button>
        </form>
      </Card>
    </div>
  );
}

export default EditTicketDesign;
