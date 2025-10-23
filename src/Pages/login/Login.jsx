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

function Login({ setIsLoggedIn }) {
  const [log, setLog] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleLogin = () => {
    if (log.email === "admin" && log.password === "123") {
      setIsLoggedIn(true);
      navigate("/");
    } else {
      alert("Invalid email or password");
    }
  };

  return (
    <div>

      <div className="font-serif text-2xl h-20 text-center bg-purple-600 flex items-center justify-center text-white">
        <h1>Sign in to your Account</h1>
      </div>

      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-full max-w-3xl shadow-lg border border-brand-primary">
          <CardHeader
            variant="gradient"
            className="mb-4 grid h-28 place-items-center bg-brand-dark"
          >
            <Typography variant="h3" color="purple">
              Login
            </Typography>
          </CardHeader>

          <CardBody className="flex flex-col gap-4">
            <Input
              label="Email"
              type="email"
              size="lg"
              color="brand-primary"
              onChange={(e) =>
                setLog({ ...log, email: e.target.value })
              }
              value={log.email}
            />

            <Input
              label="Password"
              type="password"
              size="lg"
              color="brand-primary"
              onChange={(e) =>
                setLog({ ...log, password: e.target.value })
              }
              value={log.password}
            />

            <div className="-ml-2.5">
              <Checkbox label="Remember Me" color="brand-primary" />
            </div>
          </CardBody>

          <CardFooter className="pt-0">
            <Button
              onClick={handleLogin}
                  fullWidth
             color="purple"
            >
              Login
            </Button>

            <Typography variant="small" className="mt-6 flex justify-center">
              Don&apos;t have an account?
              <Typography
                as="a"
                href="/sign-up"
                variant="small"
                className="ml-1 font-bold text-cyan-500"
              >
                Sign up
              </Typography>
            </Typography>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default Login;