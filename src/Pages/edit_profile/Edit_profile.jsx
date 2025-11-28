import React, { useState, useEffect } from "react";
import {
  Card,
  CardBody,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function Edit_profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    username: "",
    email: "",
    phonenumber: "",
    city: "",
    password: "",
    confirmPassword: "",
  });
  const [originalUser, setOriginalUser] = useState({});
  const [errors, setErrors] = useState({});
  const [isChanged, setIsChanged] = useState(false);
  const [loading, setLoading] = useState(false);

  const getUserFromToken = () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return {};
      const payload = JSON.parse(window.atob(token.split(".")[1]));
      return {
        id: payload.id || payload._id,
        username: payload.username || "",
        email: payload.email || "",
        phonenumber: payload.phonenumber || payload.phone || "",
        city: payload.city || "",
      };
    } catch {
      return {};
    }
  };

  const fetchUserProfile = async () => {
    const tokenUser = getUserFromToken();
    {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/user/${tokenUser.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") || "",
          },
        }
      );
      const data = await res.json();
      if (res.ok) {
        const userData = {
          ...tokenUser,
          ...data.data,
          password: "",
          confirmPassword: "",
        };
        setUser(userData);
        setOriginalUser(userData);
      }
    }
  };

  useEffect(() => {
    fetchUserProfile();
  }, []);

  useEffect(() => {
    const changed =
      Object.keys(user).some(
        (key) =>
          key !== "password" &&
          key !== "confirmPassword" &&
          user[key] !== originalUser[key]
      ) ||
      user.password ||
      user.confirmPassword;
    setIsChanged(changed);
  }, [user, originalUser]);

  const validateForm = () => {
    const newErrors = {};
    if (!user.username.trim()) newErrors.username = "Username is required";
    if (!user.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(user.email))
      newErrors.email = "Email is invalid";
    if (!user.phonenumber) newErrors.phonenumber = "Phone number is required";
    if (!user.city.trim()) newErrors.city = "City is required";
    if (
      user.password &&
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/.test(
        user.password
      )
    )
      newErrors.password =
        "Password must have uppercase, lowercase, number, symbol and min 6 chars";
    if (user.password !== user.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (field, value) =>
    setUser((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    const { id: USER_ID } = getUserFromToken();
    const body = {
      username: user.username,
      email: user.email,
      phonenumber: user.phonenumber,
      city: user.city,
    };
    if (user.password) body.password = user.password;

    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/auth/user/${USER_ID}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("token") || "",
          },
          body: JSON.stringify(body),
        }
      );
      const data = await res.json();
      if (res.ok) {
        if (data.data?.token) localStorage.setItem("token", data.data.token);
        setOriginalUser({ ...user, password: "", confirmPassword: "" });
        setUser((prev) => ({ ...prev, password: "", confirmPassword: "" }));
        setIsChanged(false);
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: "Profile updated!",
          timer: 2000,
          showConfirmButton: false,
        });
        navigate("/profile");
      }
    } catch (err) {
      Swal.fire("Error", err.message || "Something went wrong.", "error");
    }
    setLoading(false);
  };

  const handleCancel = () => navigate("/profile");

  return (
    <div className="flex justify-center items-start">
      <Card className="w-full max-w-2xl shadow-lg mt-10 pt-5">
        <Typography variant="h4" className="text-center text-brand-dark pt-5">
          Update your personal information
        </Typography>

        <CardBody className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Username
              </Typography>
              <Input
                type="text"
                size="lg"
                value={user.username}
                onChange={(e) => handleInputChange("username", e.target.value)}
                error={!!errors.username}
              />
              {errors.username && (
                <Typography variant="small" color="red" className="mt-1">
                  {errors.username}
                </Typography>
              )}
            </div>

            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Email Address
              </Typography>
              <Input
                type="email"
                size="lg"
                value={user.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                error={!!errors.email}
              />
              {errors.email && (
                <Typography variant="small" color="red" className="mt-1">
                  {errors.email}
                </Typography>
              )}
            </div>

            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Phone Number
              </Typography>
              <Input
                type="tel"
                size="lg"
                value={user.phonenumber}
                onChange={(e) =>
                  handleInputChange("phonenumber", e.target.value)
                }
                error={!!errors.phonenumber}
              />
              {errors.phonenumber && (
                <Typography variant="small" color="red" className="mt-1">
                  {errors.phonenumber}
                </Typography>
              )}
            </div>

            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                City
              </Typography>
              <Input
                type="text"
                size="lg"
                value={user.city}
                onChange={(e) => handleInputChange("city", e.target.value)}
                error={!!errors.city}
              />
              {errors.city && (
                <Typography variant="small" color="red" className="mt-1">
                  {errors.city}
                </Typography>
              )}
            </div>

            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                New Password
              </Typography>
              <Input
                type="password"
                size="lg"
                value={user.password}
                onChange={(e) => handleInputChange("password", e.target.value)}
                error={!!errors.password}
              />
              {errors.password && (
                <Typography variant="small" color="red" className="mt-1">
                  {errors.password}
                </Typography>
              )}
            </div>

            <div>
              <Typography
                variant="small"
                color="blue-gray"
                className="mb-2 font-medium"
              >
                Confirm Password
              </Typography>
              <Input
                type="password"
                size="lg"
                value={user.confirmPassword}
                onChange={(e) =>
                  handleInputChange("confirmPassword", e.target.value)
                }
                error={!!errors.confirmPassword}
              />
              {errors.confirmPassword && (
                <Typography variant="small" color="red" className="mt-1">
                  {errors.confirmPassword}
                </Typography>
              )}
            </div>

            <div className="flex justify-between pt-4">
              <Button
                variant="outlined"
                onClick={handleCancel}
                disabled={loading}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                className="flex items-center gap-2 bg-blue-600"
                disabled={loading || !isChanged}
              >
                {loading ? "Saving..." : "Save Changes"}
              </Button>
            </div>
          </form>
        </CardBody>
      </Card>
    </div>
  );
}

export default Edit_profile;
