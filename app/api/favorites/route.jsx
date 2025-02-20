import { Favorites } from "../../../config/schema";
import { db } from "../../../config/db";
import { NextResponse } from "next/server";
import { eq, and } from "drizzle-orm";

export async function POST(req) {
  const { userEmail, imageId } = await req.json();

  if (!userEmail || !imageId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const favorite = await db.insert(Favorites).values({
      userEmail,
      imageId,
    });

    return NextResponse.json(favorite, { status: 200 });
  } catch (error) {
    console.error("Error saving favorite:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const userEmail = searchParams.get("userEmail");
  const imageId = searchParams.get("imageId");

  if (!userEmail || !imageId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const favorite = await db
      .select()
      .from(Favorites)
      .where(
        and(eq(Favorites.userEmail, userEmail), eq(Favorites.imageId, imageId))
      );

    return NextResponse.json(
      { isFavorite: favorite.length > 0 },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching favorite:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  const { userEmail, imageId } = await req.json();

  if (!userEmail || !imageId) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  try {
    const deletedFavorite = await db
      .delete(Favorites)
      .where(
        and(eq(Favorites.userEmail, userEmail), eq(Favorites.imageId, imageId))
      );

    if (deletedFavorite) {
      return NextResponse.json(
        { message: "Favorite deleted successfully" },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { error: "Favorite not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error deleting favorite:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
