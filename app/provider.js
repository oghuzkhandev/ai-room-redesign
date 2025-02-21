"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import { UserDetailContext } from "./_context/UserDetailContext";
import axios from "axios";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

function Provider({ children }) {
  const { user } = useUser();
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    user && VerifyUser();
  }, [user]);

  const VerifyUser = async () => {
    try {
      const dataResult = await axios.post("/api/verify-user", {
        user: user,
      });
      console.log("API Result:", dataResult.data.Result);
      if (dataResult.data.Result) {
        const { name, email, imageUrl, credits } = dataResult.data.Result;
        setUserDetail((prevState) => ({
          ...prevState,
          name: name || "Unknown",
          email: email || "No Email",
          imageUrl: imageUrl || "",
          credits: credits || 0,
        }));
      } else {
        console.log("No result data found");
      }
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
        <div>{children}</div>
      </PayPalScriptProvider>
    </UserDetailContext.Provider>
  );
}

export default Provider;
