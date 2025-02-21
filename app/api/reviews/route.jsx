import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { Reviews } from "@/config/schema";
import { and, eq } from "drizzle-orm";

export async function POST(req) {
  const { imageId, rating, userEmail } = await req.json();

  if (!imageId || !rating || !userEmail) {
    return NextResponse.json({ error: "Invalid data" }, { status: 400 });
  }

  try {
    const existingReview = await db
      .select()
      .from(Reviews)
      .where(eq(Reviews.imageId, imageId), eq(Reviews.userEmail, userEmail));

    if (existingReview.length > 0) {
      await db
        .update(Reviews)
        .set({ rating })
        .where(eq(Reviews.imageId, imageId), eq(Reviews.userEmail, userEmail));
    } else {
      await db.insert(Reviews).values({
        imageId,
        rating,
        userEmail,
      });
    }

    return NextResponse.json({ message: "Review updated" });
  } catch (error) {
    console.error("Error saving review:", error);
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
    const review = await db
      .select()
      .from(Reviews)
      .where(eq(Reviews.userEmail, userEmail), eq(Reviews.imageId, imageId));

    if (review.length > 0) {
      return NextResponse.json({ rating: review[0].rating });
    } else {
      return NextResponse.json({ rating: 0 });
    }
  } catch (error) {
    console.error("Error fetching review:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
