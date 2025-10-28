import { useLogin } from "../../hooks/useLogin";
import NotFound from "../../Pages/notFound/NotFound";

const CheckAdmin = ({ children }) => {
  const { userInfo } = useLogin();
  console.log(userInfo);

  if (userInfo == "admin") {
    return children;
  }

  return <NotFound />;
};

export default CheckAdmin;
