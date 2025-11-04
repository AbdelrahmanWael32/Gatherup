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
    category: "",
    price: "",
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

  const validate = () => {
    const newErrors = {};
    if (!form.title.trim()) newErrors.title = "Title is required";
    if (!form.category.trim()) newErrors.category = "Category is required";
    if (!form.price || form.price <= 0) newErrors.price = "Enter a valid price";
    if (!form.date) newErrors.date = "Enter a date";
    if (!form.location.trim()) newErrors.location = "Location is required";
    if (!imageFile) newErrors.image = "Please upload an image";
    if (!form.description.trim())
      newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

   const newTicket = {
  id: event.length + 1,
  ...form,
  image: imagePreview,
  ticketCategories: [
    {
      type: form.category,
      price: form.price,
    },
  ],
};


    const formData = new FormData();
    formData.append("image", imageFile);
    Object.keys(form).forEach((key) => formData.append(key, form[key]));

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

          <Input
            label="Category"
            value={form.category}
            onChange={(e) => handleChange("category", e.target.value)}
            error={!!errors.category}
          />

          <Input
            type="number"
            label="Price (EGP)"
            value={form.price}
            onChange={(e) => handleChange("price", e.target.value)}
            error={!!errors.price}
          />

          <Input
            type="date"
            label="Event Date"
            value={form.date}
            onChange={(e) => handleChange("date", e.target.value)}
            error={!!errors.date}
          />

          <Input
            label="Location"
            value={form.location}
            onChange={(e) => handleChange("location", e.target.value)}
            error={!!errors.location}
          />

          <Textarea
            label="Description"
            value={form.description}
            onChange={(e) => handleChange("description", e.target.value)}
            error={!!errors.description}
          />
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
