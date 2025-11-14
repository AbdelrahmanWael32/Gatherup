import { useLogin } from "../../hooks/useLogin";
import NotFound from "../../Pages/notFound/NotFound";

const CheckLogin = ({ children }) => {
  const { userStatus } = useLogin();
  const token = localStorage.token;
  if (userStatus || token) {
    return children;
  }

  return <NotFound />;
};

export default CheckLogin;
