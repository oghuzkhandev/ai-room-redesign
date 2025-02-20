"use client"; 

import { SignUp } from "@clerk/nextjs";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";

export default function Page() {
  const [loading, setLoading] = useState(false);

  const handleSignUpSuccess = () => {
    toast.success("Your account has been successfully created! Welcome.", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark", 
    });
  };

  const handleSignUpError = (error) => {
    toast.error(`Error: ${error.message}`, {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark", 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      setTimeout(() => {
        handleSignUpSuccess();
        setLoading(false);
      }, 2000);
    } catch (error) {
      setLoading(false);
      handleSignUpError(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-950">
      <SignUp
        appearance={{
          elements: {
            formButtonPrimary:
              "text-[15px] bg-purple-600 hover:bg-purple-500/70 active:bg-green-600 focus:outline-none focus:ring-2 focus:ring-purple-500 shadow-lg rounded-lg transform transition-all duration-300 ease-in-out active:scale-95",
            input:
              "text-[14px] p-3 border border-gray-300 rounded-lg shadow-md focus:ring-2 focus:ring-purple-600",
          },
        }}
        onSubmit={handleSubmit} 
      />
      <ToastContainer />
    </div>
  );
}
