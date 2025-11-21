import { useState } from "react";
import {
  Card,
  Input,
  Button,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const API_URL = import.meta.env.VITE_API_URL;

const AddTicket = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    eventCategory: "",
    ticketCategories: [{ type: "", price: "" }],
    date: "",
    formattedDate: "",
    startTime: "",
    endTime: "",
    time: "",
    location: "",
    description: "",
    image: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleTicketChange = (index, field, value) => {
    const updated = [...form.ticketCategories];
    updated[index][field] = value;
    setForm({ ...form, ticketCategories: updated });
  };

  const addTicketCategory = () => {
    setForm({
      ...form,
      ticketCategories: [...form.ticketCategories, { type: "", price: "" }],
    });
  };

  const removeTicketCategory = (index) => {
    const updated = [...form.ticketCategories];
    updated.splice(index, 1);
    setForm({ ...form, ticketCategories: updated });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.eventCategory.trim())
      newErrors.eventCategory = "Event category is required";
    if (!form.ticketCategories.length)
      newErrors.ticketCategories = "At least one ticket type is required";
    form.ticketCategories.forEach((t, i) => {
      if (!t.type.trim())
        newErrors[`ticketType${i}`] = "Ticket type is required";
      if (!t.price || t.price <= 0)
        newErrors[`ticketPrice${i}`] = "Valid price is required";
    });
    if (!form.date) newErrors.date = "Enter a date";
    if (!form.startTime || !form.endTime)
      newErrors.time = "Enter start and end times";
    if (!form.location.trim()) newErrors.location = "Location is required";
    if (!form.image.trim()) newErrors.image = "Image URL is required";
    if (!form.description.trim())
      newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", options);
  };

  const formatTime = (timeStr) => {
    if (!timeStr) return "";
    const [hour, minute] = timeStr.split(":").map(Number);
    const ampm = hour >= 12 ? "PM" : "AM";
    const hr12 = hour % 12 || 12;
    return `${hr12.toString().padStart(2, "0")}:${minute
      .toString()
      .padStart(2, "0")} ${ampm}`;
  };

  const handleDateChange = (e) => {
    const dateValue = e.target.value;
    const displayDate = formatDate(dateValue);
    setForm({ ...form, date: dateValue, formattedDate: displayDate });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const formattedTime = `${formatTime(form.startTime)} - ${formatTime(
      form.endTime
    )}`;

    try {
      const token = localStorage.getItem("token");

      const response = await fetch(`${API_URL}/api/v1/events/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({
          title: form.title,
          description: form.description,
          date: form.formattedDate,
          time: formattedTime,
          location: form.location,
          image: form.image,
          eventCategory: form.eventCategory,
          ticketCategories: form.ticketCategories.map((t) => ({
            type: t.type,
            price: Number(t.price),
          })),
        }),
      });

      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Add new ticket successfully",
          confirmButtonColor: "#2c9cf0",
        }).then(() => {
          navigate("/admin/tickets");
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: result?.message || "Failed to add ticket",
          confirmButtonColor: "#d33",
        });
      }
    } catch (err) {
      console.log("Network error:", err.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 min-h-screen bg-gray-50">
      <Typography variant="h4" color="blue-gray" className="font-bold mb-4">
        Add New Ticket
      </Typography>

      <Card color="transparent" shadow={false} className="p-6 w-full max-w-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <Input
            label="Event Title"
            value={form.title}
            onChange={(e) => handleChange("title", e.target.value)}
          />
          {errors.title && (
            <p className="text-red-500 text-sm -mt-4">{errors.title}</p>
          )}

          <div>
            <label className="text-sm text-brand-secondary mb-1 block">
              Event Category
            </label>
            <select
              value={form.eventCategory}
              onChange={(e) => handleChange("eventCategory", e.target.value)}
              className={`w-full border rounded-md p-2 ${
                errors.eventCategory ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value="">Select event category</option>
              <option value="Concert">Concert</option>
              <option value="Theater">Theater</option>
              <option value="Sports">Sports</option>
              <option value="Movie_night">Movie_night</option>
            </select>
            {errors.eventCategory && (
              <p className="text-red-500 text-sm mt-1">
                {errors.eventCategory}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-brand-secondary mb-1 block">
              Ticket Categories
            </label>
            {form.ticketCategories.map((ticket, index) => (
              <div key={index} className="flex gap-2 mb-2 items-center">
                <select
                  value={ticket.type}
                  onChange={(e) =>
                    handleTicketChange(index, "type", e.target.value)
                  }
                  className="border p-2 rounded-md"
                >
                  <option value="">Select type</option>
                  <option value="Standard">Standard</option>
                  <option value="Premium">Premium</option>
                  <option value="VIP">VIP</option>
                </select>

                <input
                  type="number"
                  placeholder="Price"
                  value={ticket.price}
                  onChange={(e) =>
                    handleTicketChange(index, "price", e.target.value)
                  }
                  className="border p-2 rounded-md w-24"
                />

                {form.ticketCategories.length > 1 && (
                  <Button
                    onClick={() => removeTicketCategory(index)}
                    className="bg-brand-dark"
                  >
                    remove
                  </Button>
                )}
              </div>
            ))}
            <Button
              onClick={addTicketCategory}
              className="bg-brand-secondary w-full mt-2"
            >
              Add Ticket Category
            </Button>
          </div>

          <Input
            label="Event Date"
            placeholder="Sat, Nov 22, 2025"
            value={form.formattedDate}
            onChange={() => {}}
            onFocus={(e) => (e.target.type = "date")}
            onBlur={(e) => (e.target.type = "text")}
            onInput={handleDateChange}
          />
          {errors.date && (
            <p className="text-red-500 text-sm -mt-4">{errors.date}</p>
          )}

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

          {errors.time && (
            <p className="text-red-500 text-sm -mt-4">{errors.time}</p>
          )}

          <Input
            label="Location"
            value={form.location}
            onChange={(e) => handleChange("location", e.target.value)}
          />
          {errors.location && (
            <p className="text-red-500 text-sm -mt-4">{errors.location}</p>
          )}

          <Textarea
            label="Description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
          {errors.description && (
            <p className="text-red-500 text-sm -mt-4">{errors.description}</p>
          )}

          <Input
            label="Image URL"
            value={form.image}
            onChange={(e) => handleChange("image", e.target.value)}
          />
          {form.image && (
            <img
              src={form.image}
              alt="Preview"
              className="w-40 h-40 rounded-lg object-cover mx-auto mt-2"
            />
          )}
          {errors.image && (
            <p className="text-red-500 text-sm mt-1">{errors.image}</p>
          )}

          <Button type="submit" className="bg-brand-primary mt-4" fullWidth>
            Add Ticket
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddTicket;
