import { useState } from "react";
import { Search, MapPin, Calendar, Menu, X, SunMoon, Moon } from "lucide-react";
import { Link } from "react-router-dom";
import useTheme from "../../hooks/useTheme";

const Header = () => {
  const [openNav, setOpenNav] = useState(false);

  const { theme, toggleTheme } = useTheme();

  const navItems = [
    { id: 0, name: "Trending", route: "/" },
    { id: 1, name: "Events", route: "/events" },

    { id: 2, name: "Tickets", route: "/book-tickets" },
    { id: 3, name: "About", route: "/about" },

    { id: 4, name: "Contact", route: "/contact" },
  ];

  return (
    <div className="bg-[#04092C] ">
      {/* Top Navigation Bar */}
      <nav className="sticky w-full top-0 z-50 bg-[#04092C] border-b border-[#04092C] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-white">
                <span className="text-blue-500">m</span>ETATIKET
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map(({ name, route, id }) => (
                <Link
                  key={id}
                  to={`${route}`}
                  className="text-white font-medium hover:text-blue-400 transition-colors"
                >
                  {name}
                </Link>
              ))}
            </div>

            {/* Auth Buttons - Desktop */}
            <div className="hidden md:flex items-center gap-4">
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

              {theme == "light" ? (
                <Moon
                  className="text-white font-bold cursor-pointer"
                  onClick={toggleTheme}
                />
              ) : (
                <SunMoon
                  className="text-white font-bold cursor-pointer"
                  onClick={toggleTheme}
                />
              )}
            </div>

            {/* Mobile Menu Button */}
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
                    to={`${route}`}
                    className="text-white font-medium hover:text-blue-400 transition-colors px-2 py-2"
                  >
                    {name}
                  </Link>
                ))}
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
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Search Bar Section */}
      <div className="px-4 py-8 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-xl lg:flex-row lg:items-center lg:gap-4">
            {/* Search by Event */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-4 top-3 h-5 w-5 -tran[#04092C]/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by Event, Artist, Venue..."
                  className="w-full rounded-full border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 text-sm text-gray-700 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>

            {/* Zip Code / State */}
            <div className="flex-1">
              <div className="relative">
                <MapPin className="absolute left-4 top-3 h-5 w-5 -tran[#04092C]/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Zip code or State"
                  className="w-full rounded-full border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 text-sm text-gray-700 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>

            {/* Date */}
            <div className="flex-1">
              <div className="relative">
                <Calendar className="absolute left-4 top-3 h-5 w-5 -tran[#04092C]/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Date"
                  className="w-full rounded-full border border-gray-300 bg-gray-50 py-3 pl-12 pr-4 text-sm text-gray-700 placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
            </div>

            {/* Search Button */}
            <button className="w-full rounded-full bg-blue-500 px-8 py-3 text-white font-medium hover:bg-blue-600 transition-colors lg:w-auto">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
