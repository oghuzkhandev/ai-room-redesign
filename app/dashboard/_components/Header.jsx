"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { UserDetailContext } from "../../_context/UserDetailContext";
import { Button } from "../../../components/ui/button";

function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  return (
    <div className="flex justify-between items-center p-4 shadow-xl">
      <div className="flex items-center gap-4">
        <Image src="/logo.png" alt="logo" width={50} height={50} />
        <h2 className="font-bold text-lg">AI Room Design</h2>
      </div>
      <div className="flex items-center gap-[70px]">
        <Button variant="destructive">Buy More Credits</Button>
        <div className="flex items-center gap-3 py-1 bg-blue-100 rounded-lg w-[180px] text-[14px] border-2 border-blue-200">
          <Image
            src="/contactless.png"
            alt="credit"
            width={30}
            height={30}
            style={{ marginLeft: "5px" }}
          />
          <div>
            {userDetail?.credits > 0 ? (
              `You Have ${userDetail.credits} Credits`
            ): (
              <span>No Credits Available</span>
            )}
          </div>
        </div>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
