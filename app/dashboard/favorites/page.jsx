"use client";
import React, { useState, useEffect } from "react";
import { db } from "@/config/db";
import { AiGeneratedImage, Favorites } from "@/config/schema";
import { useUser } from "@clerk/nextjs";
import { eq, and } from "drizzle-orm";
import ReactBeforeSliderComponent from "react-before-after-slider-component";
import "react-before-after-slider-component/dist/build.css";
import Image from "next/image";
import { toast } from "sonner";

function FavoritesList() {
  const { user } = useUser();
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (user) {
      getFavorites();
    }
  }, [user]);

  const getFavorites = async () => {
    try {
      const favoriteRooms = await db
        .select()
        .from(Favorites)
        .where(
          eq(Favorites.userEmail, user?.primaryEmailAddress?.emailAddress)
        );

      const favoriteRoomList = await Promise.all(
        favoriteRooms.map(async (favorite) => {
          const room = await db
            .select()
            .from(AiGeneratedImage)
            .where(eq(AiGeneratedImage.id, favorite.imageId));

          if (room.length > 0) {
            return { ...room[0], isFavorite: true };
          }
          return null;
        })
      );

      setFavorites(favoriteRoomList.filter(Boolean));
      console.log("Favorites List Updated:", favoriteRoomList.filter(Boolean));

      setFavorites(favoriteRoomList);
    } catch (error) {
      console.error("Error fetching favorites:", error);
    }
  };

  const toggleFavorite = async (roomId, isCurrentlyFavorite) => {
    try {
      if (isCurrentlyFavorite) {
        await db
          .delete(Favorites)
          .where(
            and(
              eq(Favorites.imageId, roomId),
              eq(Favorites.userEmail, user?.primaryEmailAddress?.emailAddress)
            )
          );
        toast("Removed from Favorites", {
          description: "You have removed this room from your favorites.",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo Favorite Action"),
          },
        });
      } else {
        await db.insert(Favorites).values({
          userEmail: user?.primaryEmailAddress?.emailAddress,
          imageId: roomId,
        });
        toast("Added to Favorites", {
          description: "This room has been added to your favorites.",
          action: {
            label: "Undo",
            onClick: () => console.log("Undo Add Action"),
          },
        });
      }

      getFavorites();
    } catch (error) {
      console.error("Error toggling favorite:", error);
    }
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4 text-center text-red-500">
        Here are your Favorite Rooms.
      </h1>

      {favorites.length === 0 ? (
        <p>You have no favorite rooms.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-20">
          {favorites.map((project, index) => (
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
                        height={30}
                      />
                    ) : (
                      <Image
                        src="/heart-slash.png"
                        alt="heartoff"
                        width={35}
                        height={30}
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
                    className="object-cover"
                  />
                  <h3 className="font-semibold text-lg">
                    Room: {project.roomType}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <Image
                    src={"/sketch.png"}
                    alt="design"
                    height={35}
                    width={35}
                    className="object-cover"
                  />
                  <h3 className="font-semibold text-lg">
                    Design: {project.designType}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesList;
