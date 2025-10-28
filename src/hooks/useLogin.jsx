import { createContext, useContext, useState } from "react";

const GetAuth = createContext();

const AuthContext = ({ children }) => {
  const [userStatus, setUserStatus] = useState(false);
  const [userInfo, setUserInfo] = useState(null);

  return (
    <GetAuth.Provider
      value={{ userStatus, userInfo, setUserInfo, setUserStatus }}
    >
      {children}
    </GetAuth.Provider>
  );
};

export default AuthContext;

export const useLogin = () => useContext(GetAuth);
