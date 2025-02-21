"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/config/db";
import { AiGeneratedImage, Reviews, Favorites } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import { eq, and } from "drizzle-orm";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";

function MyProjects() {
  const { user } = useUser();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      getMyProjects();
    }
  }, [user]);

  const getMyProjects = async () => {
    setLoading(true);
    try {
      const rooms = await db
        .select({
          id: AiGeneratedImage.id,
          roomType: AiGeneratedImage.roomType,
          designType: AiGeneratedImage.designType,
          aiImage: AiGeneratedImage.aiImage,
          orgImage: AiGeneratedImage.orgImage,
        })
        .from(AiGeneratedImage)
        .where(
          eq(AiGeneratedImage.userEmail, user?.primaryEmailAddress.emailAddress)
        );

      const enrichedRooms = await Promise.all(
        rooms.map(async (room) => {
          const ratings = await db
            .select({ rating: Reviews.rating })
            .from(Reviews)
            .where(eq(Reviews.imageId, room.id));

          const favoriteResult = await db
            .select()
            .from(Favorites)
            .where(
              and(
                eq(Favorites.imageId, room.id),
                eq(Favorites.userEmail, user?.primaryEmailAddress.emailAddress)
              )
            );

          const totalRating = ratings.reduce(
            (acc, review) => acc + review.rating,
            0
          );
          const averageRating =
            ratings.length > 0 ? totalRating / ratings.length : 0;

          return {
            ...room,
            avgRating: averageRating,
            isFavorite: favoriteResult.length > 0,
          };
        })
      );

      setProjects(enrichedRooms);
    } catch (error) {
      console.error("Error fetching projects:", error);
    }
    setLoading(false);
  };

  const toggleFavorite = async (roomId, isCurrentlyFavorite) => {
    try {
      if (isCurrentlyFavorite) {
        await db
          .delete(Favorites)
          .where(
            and(
              eq(Favorites.imageId, roomId),
              eq(Favorites.userEmail, user?.primaryEmailAddress.emailAddress)
            )
          );
      } else {
        await db.insert(Favorites).values({
          userEmail: user?.primaryEmailAddress.emailAddress,
          imageId: roomId,
        });
      }
      getMyProjects();
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  const handleRating = async (roomId, rating) => {
    try {
      const existingReview = await db
        .select()
        .from(Reviews)
        .where(
          eq(Reviews.imageId, roomId),
          eq(Reviews.userEmail, user?.primaryEmailAddress.emailAddress)
        );

      if (existingReview.length > 0) {
        await db
          .update(Reviews)
          .set({ rating: rating })
          .where(
            eq(Reviews.imageId, roomId),
            eq(Reviews.userEmail, user?.primaryEmailAddress.emailAddress)
          );
      } else {
        await db.insert(Reviews).values({
          userEmail: user?.primaryEmailAddress.emailAddress,
          imageId: roomId,
          rating: rating,
        });
      }

      getMyProjects();
    } catch (error) {
      console.error("Error submitting rating:", error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4 text-center text-primary">
        Your Created Rooms
      </h1>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
          {[...Array(9)].map((_, index) => (
            <Skeleton key={index} className="w-full h-[200px] rounded-lg" />
          ))}
        </div>
      ) : projects.length === 0 ? (
        <p>You have not created any rooms yet.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-lg shadow-xl shadow-gray-500 p-3"
            >
              <div className="relative cursor-pointer">
                <ReactBeforeSliderComponent
                  firstImage={{ imageUrl: project?.aiImage }}
                  secondImage={{ imageUrl: project?.orgImage }}
                />
                <div className="absolute top-2 right-2 flex items-center">
                  <button
                    onClick={() =>
                      toggleFavorite(project.id, project.isFavorite)
                    }
                  >
                    {project.isFavorite ? (
                      <Image
                        src="/heart.png"
                        alt="hearton"
                        width={35}
                        height={35}
                      />
                    ) : (
                      <Image
                        src="/heart-slash.png"
                        alt="heartoff"
                        width={35}
                        height={35}
                      />
                    )}
                  </button>
                </div>
              </div>
              <div className="flex justify-around mt-2">
                <div className="flex items-center gap-3">
                  <Image
                    src={"/home.png"}
                    alt="home"
                    height={35}
                    width={35}
                    className="object-cover "
                  />
                  <h3 className="font-semibold text-lg">
                    Room: {project.roomType}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src={"/sketch.png"}
                    alt="home"
                    height={35}
                    width={35}
                    className="object-cover"
                  />
                  <h3 className="font-semibold text-lg">
                    Design: {project.designType}
                  </h3>
                </div>
              </div>

              <div className="flex items-center justify-around mt-2 py-2">
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      onClick={() => handleRating(project.id, star)}
                    >
                      {star <= project.avgRating ? (
                        <Image
                          src="/star.png"
                          alt="star"
                          width={25}
                          height={25}
                        />
                      ) : (
                        <Image
                          src="/staroff.png"
                          alt="staroff"
                          width={25}
                          height={25}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyProjects;
