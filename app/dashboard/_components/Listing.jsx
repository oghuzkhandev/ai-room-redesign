"use client";
import { useUser } from "@clerk/nextjs";
import React, { useState } from "react";
import { Button } from "../../../components/ui/button";
import EmptyState from "./EmptyState";
import Link from "next/link";

function Listing() {
  const { user } = useUser();
  const [userRoomList, setUserRoomList] = useState([]);
  return (
    <div>
      <div className="flex items-center justify-between p-4">
        <h2 className="font-bold text-2xl">
          Hello, <span className="text-blue-800">{user?.fullName}</span>
        </h2>
        <Link href={"/dashboard/create-new"}>
          <Button variant="destructive">ReDesign Your Room</Button>
        </Link>
      </div>

      {userRoomList.length == 0 ? (
        <EmptyState />
      ) : (
        <div> {/* Render Room List */} </div>
      )}
    </div>
  );
}

export default Listing;
