import AdditionalReq from "@/app/dashboard/create-new/_components/AdditionalReq";
import next from "next";
import { NextResponse } from "next/server";
import Replicate from "replicate";

const replicate = new Replicate({
  apiKey: process.env.NEXT_PUBLIC_REPLICATE_API_TOKEN,
});

export async function POST(req) {
  const { imageUrl, roomType, designType, additionalReq } = await req.json();
  try {
    const input = {
      image: imageUrl,
      prompt: `A ${roomType} with a ${designType} style interior ${additionalReq}.`,
    };

    const output = await replicate.run(
      "adirik/interior-design:76604baddc85b1b4616e1c6475eca080da339c8875bd4996705440484a6eac38",
      { input }
    );
    NextResponse.json({ result: output });
  } catch (error) {
    return NextResponse.error({ error: error.message });
  }

  return NextResponse.json({ result: "success" });
}
