"use client";
import React, { useState, useEffect } from "react";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import { Heart, HeartOff, Star, StarOff } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { useUser } from "@clerk/nextjs";

function RoomDesignCard({ room }) {
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress;
  const [isFavorite, setIsFavorite] = useState(false);
  const [rating, setRating] = useState(0);

  useEffect(() => {
    if (userEmail && room.id) {
      checkIfFavorite(userEmail, room.id);
      fetchRating(userEmail, room.id);
    }
  }, [userEmail, room.id]);

  const checkIfFavorite = async (userEmail, imageId) => {
    try {
      const response = await axios.get("/api/favorites", {
        params: { userEmail, imageId },
      });

      setIsFavorite(response.data.isFavorite);
    } catch (error) {
      console.error("Error checking favorite:", error);
    }
  };

  const toggleFavorite = async () => {
    try {
      if (isFavorite) {
        await axios.delete("/api/favorites", {
          data: { userEmail, imageId: room.id },
        });
      } else {
        await axios.post("/api/favorites", { userEmail, imageId: room.id });
      }
      setIsFavorite(!isFavorite);
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const fetchRating = async (userEmail, imageId) => {
    try {
      const response = await axios.get("/api/reviews", {
        params: { userEmail, imageId },
      });
      setRating(response.data.rating);
    } catch (error) {
      console.error("Error checking rating:", error);
    }
  };

  const handleRating = async (value) => {
    setRating(value);
    try {
      await axios.post("/api/reviews", {
        userEmail,
        imageId: room.id,
        rating: value,
      });
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div className="shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 p-4">
      <div className="relative cursor-pointer">
        <ReactBeforeSliderComponent
          firstImage={{ imageUrl: room?.aiImage }}
          secondImage={{ imageUrl: room?.orgImage }}
        />
        <div className="absolute top-2 right-2 flex items-center gap-2">
          <button onClick={toggleFavorite}>
            {isFavorite ? (
              <Heart className="text-red-600" size={28} />
            ) : (
              <HeartOff className="text-gray-800" size={28} />
            )}
          </button>
        </div>
      </div>

      <div className="flex flex-col mt-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Image
              src={"/home.png"}
              alt="home"
              height={35}
              width={35}
              className="object-cover "
            />
            <h2 className="font-semibold">
              Room Type:{" "}
              {room.roomType.charAt(0).toUpperCase() + room.roomType.slice(1)}
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <Image
              src={"/design.png"}
              alt="home"
              height={35}
              width={35}
              className="object-cover"
            />
            <h2 className="font-semibold">Design Type: {room.designType} </h2>
          </div>
        </div>

        <div className="flex items-center gap-2 mt-3 justify-start">
          {[1, 2, 3, 4, 5].map((star) => (
            <button key={star} onClick={() => handleRating(star)}>
              {star <= rating ? (
                <Star className="text-yellow-500" size={24} />
              ) : (
                <StarOff className="text-gray-300" size={24} />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RoomDesignCard;
