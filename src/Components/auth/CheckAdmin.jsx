import { useLogin } from "../../hooks/useLogin";
import NotFound from "../../Pages/notFound/NotFound";

const CheckAdmin = ({ children }) => {
  const { userInfo } = useLogin();

  if (userInfo == "admin") {
    return children;
  }

  return <NotFound />;
};

export default CheckAdmin;
