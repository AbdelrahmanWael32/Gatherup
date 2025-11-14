import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Checkbox,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";

function Login({ setIsLoggedIn }) {
  const { updateUserInfo, updateUserStatus } = useLogin();

  const [log, setLog] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(""); // ✅ حالة للرسالة
  const [messageType, setMessageType] = useState(""); // success أو error

  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!log.email || !log.password) {
      setMessage("Please fill all fields");
      setMessageType("error");
      setTimeout(() => setMessage(""), 3000);
      return;
    }

    const res = await fetch(
      "https://gatherup-backend.vercel.app/api/v1/auth/login",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: log.email,
          password: log.password,
        }),
      }
    );

    const data = await res.json();
    console.log("Response from backend:", data);

    if (res.ok) {
      // ✅ بدل الـ alert
      setMessage("Login successful!");
      setMessageType("success");

      localStorage.setItem("token", data.data.token);
      localStorage.setItem("userId", data.data.id);

      updateUserStatus(true);
      updateUserInfo("User");
      setIsLoggedIn(true);

      // يمشي لصفحة الرئيسية بعد ثانية صغيرة
      setTimeout(() => {
        setMessage("");
        navigate("/");
      }, 1500);
    } else {
      setMessage(data.message || "Invalid email or password");
      setMessageType("error");
      setTimeout(() => setMessage(""), 3000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-brand-secondary/10 to-brand-primary/10">
      <Card className="w-full max-w-md shadow-lg border border-brand-primary/40 rounded-2xl">
        <CardHeader
          variant="gradient"
          className="mb-4 grid h-24 place-items-center bg-brand-dark"
        >
          <Typography variant="h3" color="white" className="font-semibold">
            Login
          </Typography>
        </CardHeader>

        <CardBody className="flex flex-col gap-4">
          {/* ✅ الرسالة تظهر هنا */}
          {message && (
            <div
              className={`text-center p-2 rounded-md font-medium ${
                messageType === "success"
                  ? "bg-green-500 text-white"
                  : "bg-red-500 text-white"
              }`}
            >
              {message}
            </div>
          )}

          <Input
            label="Email"
            type="email"
            size="lg"
            color="blue"
            className="focus:border-brand-primary"
            onChange={(e) => setLog({ ...log, email: e.target.value })}
            value={log.email}
          />

          <Input
            label="Password"
            type="password"
            size="lg"
            color="blue"
            className="focus:border-brand-primary"
            onChange={(e) => setLog({ ...log, password: e.target.value })}
            value={log.password}
          />

          <div className="-ml-2.5">
            <Checkbox label="Remember Me" color="blue" />
          </div>
        </CardBody>

        <CardFooter className="pt-0">
          <Button
            onClick={handleLogin}
            fullWidth
            className="bg-brand-primary hover:bg-brand-dark transition-all duration-300"
          >
            Login
          </Button>

          <Typography variant="small" className="mt-6 flex justify-center">
            Don&apos;t have an account?
            <Typography
              as="a"
              href="/sign-up"
              variant="small"
              className="ml-1 font-bold text-brand-primary hover:text-brand-dark transition-all duration-200"
            >
              Sign up
            </Typography>
          </Typography>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Login;