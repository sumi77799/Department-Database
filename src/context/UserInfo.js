import { createContext, useReducer, useState } from "react";

export const UserInfoContext = createContext();

const UserInfoProvider = ({ children }) => {
  const [userInfo, setUserInfo] = useState({
    name: "Test User",
    email: "asfd",
  });

  const [userToken, setUserToken] = useState("");

  return (
    <UserInfoContext.Provider
      value={{ userInfo, setUserInfo, userToken, setUserToken }}
    >
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoProvider;
