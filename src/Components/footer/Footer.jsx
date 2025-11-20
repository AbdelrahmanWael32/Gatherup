import { Mail, Phone, Clock, MapPin } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const footerItems = [
    { id: 0, name: "Events", route: "/events" },

    { id: 1, name: "Tickets", route: "/book-tickets" },
    { id: 2, name: "About", route: "/about" },

    { id: 3, name: "Contact", route: "/contact" },
  ];

  return (
    <footer className="bg-[#04092C] text-white mt-6 md:mt-8 lg:mt-12">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo Section */}
          <div className="flex flex-col items-start">
            <div className="text-3xl font-bold mb-2">
              <span className="text-blue-500">G</span>
            </div>
            <p className="text-sm text-gray-300">Gatherup</p>
          </div>

          {/* Links Section */}
          <div>
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {footerItems.map(({ id, name, route }) => (
                <li key={id}>
                  <Link
                    to={`${route}`}
                    className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                  >
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info Section */}
          <div>
            <h3 className="font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail
                  size={16}
                  className="text-blue-400 mt-0.5 flex-shrink-0"
                />
                <a
                  href="mailto:sponsors@metatiket.in"
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                >
                  sponsors@metatiket.in
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone
                  size={16}
                  className="text-blue-400 mt-0.5 flex-shrink-0"
                />
                <a
                  href="tel:1234567890"
                  className="text-gray-300 hover:text-blue-400 transition-colors text-sm"
                >
                  1234567890
                </a>
              </li>
            </ul>
          </div>

          {/* Hours & Address Section */}
          <div>
            <h3 className="font-semibold text-white mb-4">Hours & Address</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Clock
                  size={16}
                  className="text-blue-400 mt-0.5 flex-shrink-0"
                />
                <div className="text-sm">
                  <p className="text-gray-300">Booking Days</p>
                  <p className="text-gray-400 text-xs">Monday - Sunday</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <Clock
                  size={16}
                  className="text-blue-400 mt-0.5 flex-shrink-0"
                />
                <div className="text-sm">
                  <p className="text-gray-300">Booking Hours</p>
                  <p className="text-gray-400 text-xs">8:00AM - 8:00PM (IST)</p>
                </div>
              </li>
              <li className="flex items-start gap-2">
                <MapPin
                  size={16}
                  className="text-blue-400 mt-0.5 flex-shrink-0"
                />
                <div className="text-sm">
                  <p className="text-gray-300">Address</p>
                  <p className="text-gray-400 text-xs">
                    1701 Harrison St, San Francisco, CA 94103, USA
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-blue-500 py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-center text-white text-sm font-medium">
            © 2025 Gatherup All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
