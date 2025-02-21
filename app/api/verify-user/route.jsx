import { NextResponse } from "next/server";
import { Users } from "../../../config/schema";
import { eq } from "drizzle-orm";
import { db } from "../../../config/db";

export async function POST(req) {
  const { user } = await req.json();

  try {
    console.log("Received user:", user);

    const email = user?.primaryEmailAddress?.emailAddress || user?.email;
    if (!email) {
      return NextResponse.json({ Error: "Email is required." });
    }

    const userInfo = await db
      .select()
      .from(Users)
      .where(eq(Users.email, email));

    console.log("User Info:", userInfo);

    if (userInfo?.length === 0) {
      const SaveResult = await db
        .insert(Users)
        .values({
          name: user?.fullName || "Unknown",
          email: email,
          imageUrl: user?.imageUrl || "",
        })
        .returning({ Users });

      return NextResponse.json({ Result: SaveResult[0] });
    }
    return NextResponse.json({ Result: userInfo[0] });
  } catch (error) {
    console.error("Error in API:", error);
    return NextResponse.json({ Error: error.message || "An error occurred." });
  }
}
