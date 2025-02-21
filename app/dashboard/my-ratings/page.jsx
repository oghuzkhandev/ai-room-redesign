"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/config/db";
import { AiGeneratedImage, Reviews } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";

function MyRatingsList() {
  const { user } = useUser();
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    if (user) {
      getRatings();
    }
  }, [user]);

  const getRatings = async () => {
    try {
      const userReviews = await db
        .select()
        .from(Reviews)
        .where(eq(Reviews.userEmail, user?.primaryEmailAddress?.emailAddress));

      const ratingList = await Promise.all(
        userReviews.map(async (review) => {
          const room = await db
            .select()
            .from(AiGeneratedImage)
            .where(eq(AiGeneratedImage.id, review.imageId));

          return {
            ...review,
            roomType: room[0]?.roomType,
            designType: room[0]?.designType,
            aiImage: room[0]?.aiImage,
          };
        })
      );

      setRatings(ratingList);
    } catch (error) {
      console.error("Error fetching ratings:", error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4 text-center text-primary">
        Here are your Rated Rooms.
      </h1>

      {ratings.length === 0 ? (
        <p>You have not rated any rooms yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
          {ratings.map((rating, index) => (
            <div key={index} className="bg-white rounded-md shadow-lg">
              <ReactBeforeSliderComponent
                firstImage={{ imageUrl: rating.aiImage }}
                secondImage={{ imageUrl: rating.orgImage }}
              />
              <div className="flex items-center justify-around">
                <h3 className="font-semibold text-xl mt-3">
                  Room Type:{rating.roomType}
                </h3>
                <h3 className="font-semibold text-xl mt-3">
                  Design Type:{rating.designType}
                </h3>
              </div>
              <div className="flex items-center gap-2 mt-2 text-lg justify-center">
                <span className="text-yellow-400">{`⭐ ${rating.rating} / 5`}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyRatingsList;
