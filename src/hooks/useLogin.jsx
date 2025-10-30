import { createContext, useContext, useState } from "react";

const GetAuth = createContext();

const AuthContext = ({ children }) => {
  const [userStatus, setUserStatus] = useState(
    sessionStorage.hul == "true" ? true : false
  );
  const [userInfo, setUserInfo] = useState(
    sessionStorage.lui ? sessionStorage.lui : null
  );

  const updateUserInfo = (updatedInfo) => {
    sessionStorage.lui = updatedInfo;
    setUserInfo(updatedInfo);
  };

  const updateUserStatus = (updatedInfo) => {
    sessionStorage.hul = updatedInfo;
    setUserStatus(updatedInfo);
  };

  return (
    <GetAuth.Provider
      value={{ userStatus, userInfo, updateUserInfo, updateUserStatus }}
    >
      {children}
    </GetAuth.Provider>
  );
};

export default AuthContext;

export const useLogin = () => useContext(GetAuth);
