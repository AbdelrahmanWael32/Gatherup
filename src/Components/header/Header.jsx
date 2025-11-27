import { useState } from "react";
import { Search, Calendar, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useLogin } from "../../hooks/useLogin";
import UserProfile from "../../Pages/login/comp/userprofile";
import { FaCartShopping } from "react-icons/fa6";
import { Option, Select } from "@material-tailwind/react";
import { useSearch } from "../../hooks/useSearch";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);
  const { userStatus } = useLogin();
  const { setSearchQuery, searchQuery, setSelectedCategory, selectedCategory } =
    useSearch();

  const navItems = [
    { id: 0, name: "Events", route: "/events" },
    { id: 1, name: "Tickets", route: "/book-tickets" },
    { id: 2, name: "About", route: "/about" },
    { id: 3, name: "Contact", route: "/contact" },
  ];

  return (
    <div className="bg-[#04092C]">

      {/* NAV BAR */}
      <nav className="sticky w-full top-0 z-50 bg-[#04092C] border-b border-[#04092C] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-white">
                <span className="text-blue-500">G</span>ATHERUP
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map(({ id, name, route }) => (
                <Link
                  key={id}
                  to={route}
                  className="text-white font-medium hover:text-blue-400 transition-colors"
                >
                  {name}
                </Link>
              ))}
            </div>

            {/* Right Side — Cart + Auth Buttons */}
            <div className="flex items-center gap-4">

              {/* Cart Icon */}
              <Link to="/my-tickets">
                <FaCartShopping
                  className="text-white font-bold cursor-pointer"
                  size={24}
                />
              </Link>

              {/* Auth Buttons (Hide only when mobile menu is open) */}
              {!openNav && (
                userStatus ? (
                  <UserProfile />
                ) : (
                  <>
                    <Link to="/sign-up">
                      <button className="px-6 py-2 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition-colors">
                        Sign Up
                      </button>
                    </Link>
                    <Link to="/login">
                      <button className="px-6 py-2 border-2 border-white text-white font-medium rounded-full hover:bg-white hover:text-[#04092C] transition-colors">
                        Login
                      </button>
                    </Link>
                  </>
                )
              )}

            </div>

            {/* Mobile Menu Button — ALWAYS VISIBLE ON MOBILE */}
            <button
              onClick={() => setOpenNav(!openNav)}
              className="md:hidden text-white p-2"
            >
              {openNav ? <X size={24} /> : <Menu size={24} />}
            </button>

          </div>

          {/* Mobile Navigation */}
          {openNav && (
            <div className="md:hidden pb-4 border-t border-[#04092C]">
              <div className="flex flex-col gap-3 py-4">

                {navItems.map(({ id, name, route }) => (
                  <Link
                    key={id}
                    to={route}
                    className="text-white font-medium hover:text-blue-400 transition-colors px-2 py-2"
                  >
                    {name}
                  </Link>
                ))}

                {/* Mobile Auth Buttons */}
                {!userStatus && (
                  <div className="flex gap-2 pt-2">
                    <Link to="/login">
                      <button className="flex-1 px-4 py-2 border-2 border-white text-white font-medium rounded-full hover:bg-white hover:text-[#04092C] transition-colors text-sm">
                        Login
                      </button>
                    </Link>
                    <Link to="/sign-up">
                      <button className="flex-1 px-4 py-2 bg-blue-500 text-white font-medium rounded-full hover:bg-blue-600 transition-colors text-sm">
                        Sign Up
                      </button>
                    </Link>
                  </div>
                )}

              </div>
            </div>
          )}

        </div>
      </nav>

      {/* SEARCH BAR */}
      <div className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-xl lg:flex-row lg:items-center lg:gap-4">

            {/* Event Search Input */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by Event name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 text-sm text-gray-700 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>

            {/* Category */}
            <div className="flex-1">
              <Select
                label="Category"
                color="blue"
                value={selectedCategory}
                onChange={(val) => setSelectedCategory(val)}
                className="w-full"
              >
                <Option value="">None</Option>
                <Option value="concert">Concert</Option>
                <Option value="sports">Sports</Option>
                <Option value="theater">Theater</Option>
                <Option value="movie_night">Movie night</Option>
              </Select>
            </div>

            {/* Date */}
            <div className="flex-1">
              <div className="relative">
                <Calendar className="absolute left-4 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Date"
                  className="w-full rounded-full border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 text-sm text-gray-700 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>

            {/* Search Button */}
            <Link to="/events">
              <button className="w-full rounded-full bg-blue-500 px-8 py-3 text-white font-medium hover:bg-blue-600 transition-colors lg:w-auto">
                Search
              </button>
            </Link>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Header;
