import { NextResponse } from "next/server";
import { Users } from "../../../config/schema";
import { eq } from "drizzle-orm";
import { db } from "../../../config/db";

export async function POST(req) {
  const { user } = await req.json();

  try {
    console.log("Received user:", user);
    const userInfo = await db
      .select()
      .from(Users)
      .where(eq(Users.email, user?.primaryEmailAddress.emailAddress));
    console.log("User Info :", userInfo);

    if (userInfo?.length == 0) {
      const SaveResult = await db
        .insert(Users)
        .values({
          name: user?.fullName,
          email: user?.primaryEmailAddress.emailAddress,
          imageUrl: user?.imageUrl,
        })
        .returning({ Users });
      return NextResponse.json({ Result: SaveResult[0] });
    }
    return NextResponse.json({ Result: userInfo });
  } catch (error) {
    return NextResponse.json({ Error: error });
  }
}
