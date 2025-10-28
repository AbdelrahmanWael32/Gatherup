import { useLogin } from "../../hooks/useLogin";
import NotFound from "../../Pages/notFound/NotFound";

const CheckLogin = ({ children }) => {
  const { userStatus } = useLogin();

  if (userStatus) {
    return children;
  }

  return <NotFound />;
};

export default CheckLogin;
