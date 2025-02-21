"use client";
import React, { useState } from "react";

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleToggle = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="py-16 px-8 min-h-screen">
      <div className="container mx-auto text-center">
        <h1 className="text-4xl font-semibold text-gray-900 mb-8">Frequently Asked Questions</h1>
        <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
          We know you might have questions. Here are some frequently asked questions to help you get started. If you can't find what you're looking for, feel free to contact us!
        </p>


        <div className="space-y-6 max-w-3xl mx-auto">

          <div
            className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition duration-300"
            onClick={() => handleToggle(0)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">
                What is AI-Powered Interior Redesign?
              </h3>
              <span className="text-gold text-xl">{activeIndex === 0 ? "-" : "+"}</span>
            </div>
            {activeIndex === 0 && (
              <p className="mt-4 text-gray-600">
                AI-Powered Interior Redesign uses cutting-edge artificial intelligence to suggest personalized
                design improvements based on your room's layout and your style preferences.
              </p>
            )}
          </div>

          <div
            className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition duration-300"
            onClick={() => handleToggle(1)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">
                How can I get started with the redesign process?
              </h3>
              <span className="text-gold text-xl">{activeIndex === 1 ? "-" : "+"}</span>
            </div>
            {activeIndex === 1 && (
              <p className="mt-4 text-gray-600">
                To get started, simply create an account, upload a photo of your room, and select the design
                style that you prefer. Our AI will do the rest, providing you with the best design suggestions.
              </p>
            )}
          </div>

          <div
            className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition duration-300"
            onClick={() => handleToggle(2)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">
                Can I customize the AI suggestions?
              </h3>
              <span className="text-gold text-xl">{activeIndex === 2 ? "-" : "+"}</span>
            </div>
            {activeIndex === 2 && (
              <p className="mt-4 text-gray-600">
                Yes! Our platform allows you to make modifications to the AI-generated suggestions, ensuring
                your space reflects your personal style.
              </p>
            )}
          </div>


          <div
            className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition duration-300"
            onClick={() => handleToggle(3)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">
                Is this service available for both residential and commercial spaces?
              </h3>
              <span className="text-gold text-xl">{activeIndex === 3 ? "-" : "+"}</span>
            </div>
            {activeIndex === 3 && (
              <p className="mt-4 text-gray-600">
                Yes, our service is available for both residential and commercial spaces. You can upload any type
                of space and get redesign suggestions tailored to your needs.
              </p>
            )}
          </div>

          <div
            className="bg-white shadow-lg rounded-lg p-6 cursor-pointer hover:bg-gray-50 transition duration-300"
            onClick={() => handleToggle(4)}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-gray-800">
                How do I contact support if I need assistance?
              </h3>
              <span className="text-gold text-xl">{activeIndex === 4 ? "-" : "+"}</span>
            </div>
            {activeIndex === 4 && (
              <p className="mt-4 text-gray-600">
                You can contact our support team via email at support@oghuzkhaninterior.com
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
