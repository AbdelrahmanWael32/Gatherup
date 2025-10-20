import { useState } from "react";
import { Select, Option, Textarea, Card, Input, Button } from "@material-tailwind/react";

const Contact = () => {
  const [form, setForm] = useState({
    reason: "",
    name: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const emailRegex =
    /^(?!.*\.\.)[a-zA-Z0-9._%+-]{1,64}@[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*\.[A-Za-z]{2,63}$/;

  const validate = () => {
    const newErrors = {};

    if (!form.reason) newErrors.reason = "Please select a reason.";
    if (!form.name || form.name.trim().length < 3)
      newErrors.name = "Invalid name";
    if (!emailRegex.test(form.email))
      newErrors.email = "Invalid email address";
    if (!form.message || form.message.trim() === "")
      newErrors.message = "Message is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
     
      
      setForm({ reason: "", name: "", email: "", message: "" });
      setErrors({});
    }
  };

  const handleChange = (field, value) => {
    setForm({ ...form, [field]: value });

    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center gap-4 p-8">
      <h1 className="font-extrabold text-3xl text-brand-primary">Contact us</h1>
      <p>Fill in this form and we will get back to you.</p>

      <Card color="transparent" shadow={false}>
        <form
          onSubmit={handleSubmit}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Select
              label={errors.reason ? "Please select a reason" : "Select"}
              value={form.reason}
              onChange={(val) => handleChange("reason", val)}
              className={errors.reason ? "border-red-500" : ""}
            >
              <Option value="support">Technical Support</Option>
              <Option value="suggestion">Suggestion</Option>
              <Option value="complaint">Complaint</Option>
            </Select>

            <Input
              label={errors.name ? errors.name : "Name"}
              error={!!errors.name}
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />

            <Input
              type="email"
              label={errors.email ? errors.email : "Email Address"}
              error={!!errors.email}
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
            />

            <Textarea
              label={errors.message ? errors.message : "Message"}
              error={!!errors.message}
              value={form.message}
              onChange={(e) => handleChange("message", e.target.value)}
            />
          </div>

          <Button type="submit" className="mt-6 bg-brand-primary" fullWidth>
            Send
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default Contact;
