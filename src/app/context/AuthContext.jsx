"use client";
import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";
import { decryptObject, encryptObject } from "@/GlobalFunctions";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState(
    {
      userName: "",
      uId: "",
      userStatus: "",
      userRole: "",
      userType: "",
    } || decryptObject(JSON.parse(Cookies.get("UserAuth")))
  );

  const setUserAuthData = (data) => {
    console.log(data);
    setUserAuth(data);
    if (data) {
      const encryptedData = encryptObject(JSON.stringify(data));
      Cookies.set("UserAuth", encryptedData, { expires: 3 });
    } else {
      Cookies.remove("UserAuth"); // Clear cookie when data is null or undefined
    }
  };

  useEffect(() => {
    console.log(userAuth);
    const encryptedUserAuth = Cookies.get("UserAuth");
    if (encryptedUserAuth) {
      const decryptedUserAuth = decryptObject(encryptedUserAuth);
      let parsedUserAuth;
      try {
        parsedUserAuth = JSON.parse(decryptedUserAuth);
      } catch (error) {
        parsedUserAuth = decryptedUserAuth;
      }
      setUserAuth(parsedUserAuth);
    }
  }, []);

  return (
    <AuthContext.Provider value={{ userAuth, setUserAuthData }}>
      {children}
    </AuthContext.Provider>
  );
};
