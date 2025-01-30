"use client";
import React from "react";

function Provider({ children }) {
    const {user} = useUser();
    useEffect(() => {
      first
    
      return () => {
        second
      }
    }, [user])
    

  return <div>{children}</div>;
}

export default Provider;
