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