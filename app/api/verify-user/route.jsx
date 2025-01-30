import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { Users } from "@/config/schema";
import { eq } from "drizzle-orm";

export async function POST(req) {
  const { user } = await req.json();

  try {
    const userInfo = await db
      .select()
      .from(Users)
      .where(eq(Users.email, user?.primaryEmailAdress.emailAddress));
    console.log("User Info :", userInfo);
    if (userInfo?.length === 0) {
      const newUser = await db
        .insert(Users)
        .values({
          name: user?.fullName,
          email: user?.primaryEmailAdress.emailAddress,
          imageUrl: user?.imageUrl,
        })
        .returning({ id: Users.id });
        return NextResponse.json(newUser);
    }
  } catch (error) {
    console.error(error);
  }
}
