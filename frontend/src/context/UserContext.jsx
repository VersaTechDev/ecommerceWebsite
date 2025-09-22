import React, { useContext, useState, useEffect, createContext } from "react";
import { authDataContext } from "./AuthContext";
import axios from "axios";

export const userDataContext = createContext();

function UserContext({ children }) {
  const [userData, setUserData] = useState(null);
  const { serverUrl } = useContext(authDataContext);

  const getCurrentUser = async () => {
    try {
      const result = await axios.get(
        serverUrl + "/api/user/getcurrentuser",
        { withCredentials: true } // ✅ if using cookies
      );

      setUserData(result.data);
      console.log("User Data:", result.data);
    } catch (error) {
      setUserData(null);
      console.log("getCurrentUser error:", error.response?.data || error.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  const value = { userData, setUserData, getCurrentUser };

  return (
    <userDataContext.Provider value={value}>
      {children}
    </userDataContext.Provider>
  );
}

export default UserContext;
