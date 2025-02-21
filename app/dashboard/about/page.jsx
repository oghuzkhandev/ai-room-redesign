import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col items-center py-12 px-6">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-semibold text-gray-900 mb-6">About Us</h1>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          At OghuzKhan Interior Design, we specialize in transforming spaces
          with AI-powered interior redesigns. Our innovative platform allows you
          to effortlessly redesign your rooms to reflect your unique style, from
          modern to classic. Our team of experts combines cutting-edge
          technology with design expertise to bring your vision to life.
        </p>

        <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-x-12 md:space-y-0">
          <div className="bg-white shadow-lg p-6 rounded-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Our Vision
            </h3>
            <p className="text-gray-600">
              We believe in the power of design to transform lives. Our
              AI-driven approach ensures that every redesign is personalized,
              sustainable, and brings out the best in each space.
            </p>
          </div>

          <div className="bg-white shadow-lg p-6 rounded-lg max-w-sm w-full">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Why Choose Us?
            </h3>
            <p className="text-gray-600">
              Our platform simplifies the process of interior redesign, offering
              an effortless, AI-driven solution for homeowners and designers
              alike. Whether you're looking to redesign a single room or your
              entire home, we provide an intuitive experience that helps you
              create the space you've always dreamed of.
            </p>
          </div>
        </div>
      </div>

      <div className="text-center mt-12">
        <h2 className="text-3xl font-semibold text-gray-900 mb-6">
          Ready to Transform Your Space?
        </h2>
        <p className="text-lg text-gray-600 mb-6">
          Discover the power of AI in interior design. Join us today and start
          creating your dream space!
        </p>
        <Link href="/dashboard">
          <Button variant="secondary" className="w-1/2 text-lg font-bold">Get Started</Button>
        </Link>
      </div>
    </div>
  );
};

export default About;
