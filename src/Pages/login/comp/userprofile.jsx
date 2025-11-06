import React from "react";
import {
  Avatar,
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
  Typography,
} from "@material-tailwind/react";
import {
  Cog6ToothIcon,
  InboxArrowDownIcon,
  LifebuoyIcon,
  PowerIcon,
  UserCircleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../../../hooks/useLogin";

function UserProfile() {
  const navigate = useNavigate();
  const { userInfo, updateUserInfo, updateUserStatus } = useLogin(); 

  const logOut = () => {
    updateUserInfo(null);
    updateUserStatus(false);
    navigate("/");
  };

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const closeMenu = () => setIsMenuOpen(false);

  const handleMenuClick = (label) => {
    closeMenu();
    if (label === "My Profile") navigate("/profile");
    else if (label === "Admin") navigate("/admin");
    else if (label === "Sign Out") logOut();
  };

  const profileMenuItems = [
    { label: "My Profile", icon: UserCircleIcon },
    { label: "Edit Profile", icon: Cog6ToothIcon },
    { label: "Inbox", icon: InboxArrowDownIcon },
    { label: "Help", icon: LifebuoyIcon },
    { label: "Sign Out", icon: PowerIcon },
  ];


  if (userInfo === "admin") {
    profileMenuItems.splice(2, 0, { label: "Admin", icon: ShieldCheckIcon });
  }
  else{
    navigate("/NotFound")
  }

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button variant="text" color="blue-gray" className="flex items-center rounded-full p-0">
          <Avatar
            variant="circular"
            size="md"
            alt="User"
            withBorder={true}
            color="blue-gray"
            className="p-0.5"
            src="https://docs.material-tailwind.com/img/face-2.jpg"
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => handleMenuClick(label)}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default UserProfile;
