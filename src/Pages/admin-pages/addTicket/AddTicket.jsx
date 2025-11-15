import { useState } from "react";
import {
  Card,
  Input,
  Button,
  Textarea,
  Typography,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

const AddTicket = ({ event, setEvent }) => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    eventCategory: "",
    ticketCategories: [
      { type: "", price: "" }, 
    ],
    date: "",
    location: "",
    description: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errors, setErrors] = useState({});

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });
  };

  const handleTicketChange = (index, field, value) => {
    const updatedTickets = [...form.ticketCategories];
    updatedTickets[index][field] = value;
    setForm({ ...form, ticketCategories: updatedTickets });
  };

  const addTicketCategory = () => {
    setForm({
      ...form,
      ticketCategories: [...form.ticketCategories, { type: "", price: "" }],
    });
  };

  const removeTicketCategory = (index) => {
    const updatedTickets = [...form.ticketCategories];
    updatedTickets.splice(index, 1);
    setForm({ ...form, ticketCategories: updatedTickets });
  };

  const validate = () => {
    const newErrors = {};

    if (!form.title?.trim()) newErrors.title = "Title is required";
    if (!form.eventCategory?.trim())
      newErrors.eventCategory = "Event category is required";

    if (!form.ticketCategories.length)
      newErrors.ticketCategories = "At least one ticket type is required";

    form.ticketCategories.forEach((t, i) => {
      if (!t.type?.trim())
        newErrors[`ticketType${i}`] = "Ticket type is required";
      if (!t.price || t.price <= 0)
        newErrors[`ticketPrice${i}`] = "Valid price is required";
    });

    if (!form.date) newErrors.date = "Enter a date";
    if (!form.location?.trim()) newErrors.location = "Location is required";
    if (!imageFile) newErrors.image = "Please upload an image";
    if (!form.description?.trim())
      newErrors.description = "Description is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const selectedDate = new Date(form.date);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = selectedDate.toLocaleDateString("en-US", options);

    const newTicket = {
      id: event.length + 1,
      image: imagePreview,
      title: form.title,
      date: formattedDate,
      location: form.location,
      ticketCategories: form.ticketCategories.map((t) => ({
        type: t.type,
        price: parseFloat(t.price),
      })),
      eventCategory: form.eventCategory,
      description: form.description,
    };

    setEvent([...event, newTicket]);
    navigate("/admin/tickets");
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
            error={!!errors.title}
          />
          {errors.title && (
            <p className="text-red-500 text-sm -mt-4">{errors.title}</p>
          )}

        
          <div>
            <label className="text-sm text-gray-700 mb-1 block">
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
              <option value="Festival">Festival</option>
            </select>
            {errors.eventCategory && (
              <p className="text-red-500 text-sm mt-1">
                {errors.eventCategory}
              </p>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-700 mb-1 block">
              Ticket Categories
            </label>
            {form.ticketCategories.map((ticket, index) => (
              <div key={index} className="flex gap-2 mb-2 items-center">
                <select
                  value={ticket.type}
                  onChange={(e) =>
                    handleTicketChange(index, "type", e.target.value)
                  }
                  className={`border rounded-md p-2 ${
                    errors[`ticketType${index}`]
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
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
                  className={`border rounded-md p-2 w-24 ${
                    errors[`ticketPrice${index}`]
                      ? "border-red-500"
                      : "border-gray-300"
                  }`}
                />
                {form.ticketCategories.length > 1 && (
                  <Button
                    type="button"
                    onClick={() => removeTicketCategory(index)}
                    className="text-white bg-brand-dark font-bold"
                  >
                    remove
                  </Button>
                )}
                {errors[`ticketType${index}`] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[`ticketType${index}`]}
                  </p>
                )}
                {errors[`ticketPrice${index}`] && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors[`ticketPrice${index}`]}
                  </p>
                )}
              </div>
            ))}
            <Button
              type="button"
              onClick={addTicketCategory}
              className="mt-2 bg-brand-secondary text-black w-full"
            >
              + Add Ticket Category
            </Button>
          </div>

          <Input
            type="date"
            label="Event Date"
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
            error={!!errors.date}
          />
          {errors.date && (
            <p className="text-red-500 text-sm -mt-4">{errors.date}</p>
          )}

          <Input
            label="Location"
            value={form.location}
            onChange={(e) => handleChange("location", e.target.value)}
            error={!!errors.location}
          />
          {errors.location && (
            <p className="text-red-500 text-sm -mt-4">{errors.location}</p>
          )}

          <Textarea
            label="Description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            error={!!errors.description}
          />
          {errors.description && (
            <p className="text-red-500 text-sm -mt-4">{errors.description}</p>
          )}

          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
            <label
              htmlFor="imageUpload"
              className="cursor-pointer text-gray-600"
            >
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-40 h-40 object-cover rounded-lg mx-auto mb-2"
                />
              ) : (
                <span>Drag or click to upload image</span>
              )}
            </label>
            <input
              type="file"
              id="imageUpload"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
            {errors.image && (
              <p className="text-red-500 text-sm mt-2">{errors.image}</p>
            )}
          </div>

          <Button type="submit" className="mt-4 bg-brand-primary" fullWidth>
            Add Ticket
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default AddTicket;
