"use client";
import { useUser } from "@clerk/nextjs";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import EmptyState from "./EmptyState";
import Link from "next/link";
import { AiGeneratedImage } from "@/config/schema";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";
import RoomDesignCard from "./RoomDesignCard";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";

function Listing() {
  const { user } = useUser();
  const [userRoomList, setUserRoomList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false);

  useEffect(() => {
    if (user) {
      GetUserRoomList();
    }
  }, [user]);

  const GetUserRoomList = async () => {
    setLoading(true);
    try {
      const result = await db
        .select()
        .from(AiGeneratedImage)
        .where(
          eq(
            AiGeneratedImage.userEmail,
            user?.primaryEmailAddress?.emailAddress
          )
        );
      setUserRoomList(result);
    } catch (error) {
      console.error("Error fetching user rooms:", error);
    }
    setLoading(false);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 rounded-xl text-white shadow-lg flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">
            Welcome,{" "}
            <span className="text-yellow-300">
              {user?.fullName ? user.fullName : "Guest"}
            </span>
          </h2>
          <p className="text-md opacity-80">
            Ready to design your dream space?
          </p>
        </div>
        <Link href={"/dashboard/create-new"}>
          <Button variant="secondary" className="text-black font-bold">
            ReDesign Your Room
          </Button>
        </Link>
      </div>

      <div>
        <h3 className="text-xl font-bold text-black dark:text-white text-center mt-20">
          Your Designed Rooms
        </h3>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {[...Array(4)].map((_, index) => (
              <Skeleton key={index} className="w-full h-[200px] rounded-lg" />
            ))}
          </div>
        ) : userRoomList.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
            {userRoomList.map((room) => (
              <RoomDesignCard key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <EmptyState message="No designs found. Start creating now!" />
        )}
      </div>
    </div>
  );
}

export default Listing;
