import {
  Card,
  CardBody,
  Input,
  Button,
  Typography,
  Checkbox,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
function SignUpPage() {
  
  const navigate = useNavigate();

  const [reg, setReg] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    phonenumber: "",
    city: "",
  });

  const [errors, setErrors] = useState([]);

  const handleNewUser = (e) => {
    e.preventDefault();

    const newErrors = [];

    if (
      reg.username === "" ||
      reg.email === "" ||
      reg.city === "" ||
      reg.confirmPassword === "" ||
      reg.password === "" ||
      reg.phonenumber === ""
    ) {
      newErrors.push("Please fill in all required fields");
    }

    const emailExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9]+\.[a-zA-Z]{2,}$/;
    if (reg.email && !emailExp.test(reg.email)) {
      newErrors.push("Please enter a valid email address");
    }

    const phoneExp = /^(?:\+20|0)?1[0125]\d{8}$/;
    if (reg.phonenumber && !phoneExp.test(reg.phonenumber)) {
      newErrors.push("Please enter a valid Egyptian phone number");
    }

    if (reg.password !== reg.confirmPassword) {
      newErrors.push("Passwords do not match");
    }

    if (newErrors.length > 0) {
      setErrors(newErrors);
    } else {
      setErrors(["Form submitted successfully!"]);
      navigate("/")
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10">
      <Card className="w-full max-w-3xl p-1 shadow-xl border border-brand-secondary/20 bg-white">
        <CardBody>
          <Typography
            variant="h4"
            className="mb-6 text-center font-semibold text-brand-dark"
          >
            Create New Account
          </Typography>

          <form onSubmit={handleNewUser} className="flex flex-col gap-5">
            <Input
              label="Full Name"
              size="lg"
              color="blue"
              className="focus:border-brand-primary"
              onChange={(e) => setReg({ ...reg, username: e.target.value })}
              value={reg.username}
            />

            <Input
              label="Email"
              size="lg"
              color="blue"
              onChange={(e) => setReg({ ...reg, email: e.target.value })}
              value={reg.email}
            />

            <Input
              label="Phone Number"
              type="text"
              size="lg"
              color="blue"
              onChange={(e) => setReg({ ...reg, phonenumber: e.target.value })}
              value={reg.phonenumber}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Password"
                type="password"
                size="lg"
                color="blue"
                onChange={(e) => setReg({ ...reg, password: e.target.value })}
                value={reg.password}
              />

              <Input
                label="Confirm Password"
                type="password"
                size="lg"
                color="blue"
                onChange={(e) =>
                  setReg({ ...reg, confirmPassword: e.target.value })
                }
                value={reg.confirmPassword}
              />
            </div>

            <Input
              label="Your City"
              type="text"
              size="lg"
              color="blue"
              onChange={(e) => setReg({ ...reg, city: e.target.value })}
              value={reg.city}
            />

            <div className="flex items-center gap-3">
              <Checkbox
                id="agree"
                className="text-brand-primary accent-brand-primary"
              />
              <Typography variant="small" color="gray">
                I agree to the{" "}
                <a href="#" className="text-brand-primary font-medium">
                  Terms & Conditions*
                </a>
              </Typography>
            </div>

            <Button
              type="submit"
              fullWidth
              className="bg-brand-dark hover:bg-brand-primary text-white"
            >
              Submit
            </Button>

            {errors.length > 0 && (
              <div className="mt-3">
                {errors.map((err, index) => (
                  <Typography
                    key={index}
                    className={`text-center font-medium ${
                      err.includes("successfully")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {err}
                  </Typography>
                ))}
              </div>
            )}
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default SignUpPage;