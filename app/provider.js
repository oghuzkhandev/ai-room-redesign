"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "./_context/UserDetailContext";
import axios from "axios";

function Provider({ children }) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState([]);

  useEffect(() => {
    user && VerifyUser();
  }, [user]);

  const VerifyUser = async () => {
    try {
      const dataResult = await axios.post("/api/verify-user", {
        user: user
      });
      console.log("API Result:", dataResult.data.Result);
      setUserDetail(dataResult.data.Result[0]);
    } catch (error) {
      console.log("Error: ", error);
    }
  };
  

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <div>{children}</div>
    </UserDetailContext.Provider>
  );
}

export default Provider;
