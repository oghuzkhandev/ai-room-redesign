import { uploadString, getDownloadURL, ref } from "firebase/storage";
import { NextResponse } from "next/server";
import Replicate from "replicate";
import { storage } from "@/config/firebaseConfig";
import axios from "axios";
import { db } from "@/config/db";
import { eq } from "drizzle-orm";
import { AiGeneratedImage, Users } from "@/config/schema";

const replicate = new Replicate({
  auth: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});

export async function POST(req) {
  const { imageUrl, roomType, designType, additionalReq, userEmail } =
    await req.json();

  try {
    const [user] = await db
      .select()
      .from(Users)
      .where(eq(Users.email, userEmail));

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (user.credits <= 0) {
      return NextResponse.json(
        { error: "Insufficient credits. Please purchase more credits." },
        { status: 403 }
      );
    }

    const input = {
      image: imageUrl,
      prompt: `A ${roomType} with a ${designType} style interior ${additionalReq}.`,
    };
    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      { input }
    );

    const base64Image = await ConvertImageToBase64(output);
    const fileName = Date.now() + ".png";
    const storageRef = ref(storage, "/room-redesign/" + fileName);
    await uploadString(storageRef, base64Image, "data_url");
    const downloadUrl = await getDownloadURL(storageRef);

    await db.insert(AiGeneratedImage).values({
      roomType,
      designType,
      orgImage: imageUrl,
      aiImage: downloadUrl,
      userEmail,
    });
    await db
      .update(Users)
      .set({ credits: user.credits - 1 })
      .where(eq(Users.email, userEmail));

    return NextResponse.json({ result: downloadUrl });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

async function ConvertImageToBase64(imageUrl) {
  const resp = await axios.get(imageUrl, { responseType: "arraybuffer" });
  const base64ImageRaw = Buffer.from(resp.data).toString("base64");
  return "data:image/png;base64," + base64ImageRaw;
}
