import React from "react";
import { Button } from "../../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../../components/ui/card";
import Image from "next/image";
import Link from "next/link";

function EmptyState() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="relative w-[1500px] h-[750px] flex items-center justify-center bg-[url('/Room.jpg')] bg-center bg-no-repeat bg-cover">
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>

        <div className="relative flex items-center justify-center flex-col text-white text-center">
          <h2 className="font-bold text-xl">
            Create New AI Interior Design for Your Room
          </h2>
          <Link href="/dashboard/create-new">
            <Button className="mt-5">Redesign your Room</Button>
          </Link>
        </div>
      </div>
      <div className="absolute bottom-[-20%] flex items-center justify-center">
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-10 px-6 w-1/2">
          <Card className="bg-orange-100 bg-opacity-90 rounded-lg p-2 shadow-md">
            <CardHeader className="flex items-center">
              <Image
                src="/high-quality.png"
                alt="quality"
                width={50}
                height={50}
                className=""
              />
              <CardTitle className="text-xl font-semibold text-gray-900">
                Maximum Quality
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                AI-powered design ensures top-notch quality with realistic
                details and seamless aesthetics.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-green-100 bg-opacity-90 rounded-lg p-2 shadow-md">
            <CardHeader className="flex items-center text-center">
              <Image
                src="/feedback.png"
                alt="Upload Room"
                width={50}
                height={50}
                className=""
              />
              <CardTitle className="text-xl font-semibold text-gray-900">
                Transform Your Space Instantly
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Upload a photo of your room and let AI generate a stunning new
                design in seconds.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-blue-200 bg-opacity-90 rounded-lg p-2 shadow-md">
            <CardHeader className="flex items-center gap-2">
              <Image
                src="/personalized.png"
                alt="quality"
                width={50}
                height={50}
                className=""
              />
              <CardTitle className="text-xl font-semibold text-gray-900">
                Personalized for You
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Customize your space with AI-generated designs that reflect your
                personality and style.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default EmptyState;
