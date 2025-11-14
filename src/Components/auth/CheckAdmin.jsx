import { jwtDecode } from "jwt-decode";
import { useLogin } from "../../hooks/useLogin";
import NotFound from "../../Pages/notFound/NotFound";

const CheckAdmin = ({ children }) => {
  const { userInfo } = useLogin();
  const token = jwtDecode(localStorage.token);
  const { role } = token;

  if (userInfo == "admin" || role == "admin") {
    return children;
  }

  return <NotFound />;
};

export default CheckAdmin;
