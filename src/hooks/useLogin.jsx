import { createContext, useContext, useState } from "react";

const GetAuth = createContext();

const AuthContext = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [userStatus, setUserStatus] = useState(token ? true : false);
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

  const updateToken = (token) => {
    sessionStorage.token = token;
    setToken(token);
  };

  return (
    <GetAuth.Provider
      value={{
        userStatus,
        userInfo,
        token,
        updateUserInfo,
        updateUserStatus,
        updateToken,
      }}
    >
      {children}
    </GetAuth.Provider>
  );
};

export default AuthContext;

export const useLogin = () => useContext(GetAuth);
