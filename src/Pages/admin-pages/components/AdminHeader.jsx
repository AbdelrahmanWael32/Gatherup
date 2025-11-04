import { Link } from "react-router-dom";
import { FaHome } from "react-icons/fa";

const AdminHeader = () => {
  return (
    <nav className="bg-brand-dark w-full p-6 ">
      <div className="flex justify-between">
        <Link to="/admin" className="text-2xl font-bold text-white">
          Dashboard
        </Link>
        <Link to="/" className="text-4xl font-bold text-white">
          <FaHome />
        </Link>
      </div>
    </nav>
  );
};

export default AdminHeader;
