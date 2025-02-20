import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 px-8">
      <div className="flex items-center justify-between">
        <div className="flex flex-col items-center md:items-start">
          <div className="flex items-center space-x-2">
            <Image src="/logo.png" alt="Logo" width={200} height={150} />
            <p className="text-lg text-white">
              Innovative Interior Redesign
            </p>
          </div>
          <p className="text-gray-400 text-[15px]">
            Revolutionizing the way you design your spaces with AI-powered
            solutions.
          </p>
        </div>

        <div className="flex flex-col items-center justify-center mr-32">
          <h3 className="text-gold text-xl font-semibold text-center mb-10">Quick Links</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            <a
              href="/dashboard"
              className="text-gray-400 hover:text-yellow-400 transition duration-300 hover:underline hover:underline-offset-4"
            >
              Dashboard
            </a>
            <a
              href="/dashboard/about"
              className="text-gray-400 hover:text-yellow-400 transition duration-300 hover:underline hover:underline-offset-4"
            >
              About
            </a>
            <a
              href="/dashboard/support"
              className="text-gray-400 hover:text-yellow-400 transition duration-300 hover:underline hover:underline-offset-4"
            >
              Support
            </a>
            <a
              href="/dashboard/faq"
              className="text-gray-400 hover:text-yellow-400 transition duration-300 hover:underline hover:underline-offset-4"
            >
              FAQ
            </a>
            <a
              href="/dashboard/buy-credits"
              className="text-gray-400 hover:text-yellow-400 transition duration-300 hover:underline hover:underline-offset-4"
            >
              Pricing
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start space-y-6">
          <h3 className="text-gold text-xl font-semibold">Contact Us</h3>
          <p className="text-gray-400 text-sm">
            Email:{" "}
            <a
              href="mailto:oguzhandogandev@hotmail.com"
              className="text-yellow-400"
            >
              oguzhandogandev@hotmail.com
            </a>
          </p>
          <p className="text-gray-400 text-sm">
            Phone:{" "}
            <a href="tel:+1234567890" className="text-yellow-400">
              +90 533 430 01 71
            </a>
          </p>
          <div className="flex space-x-6 mt-4">
            <a
              href="mailto:your-email@gmail.com"
              className="transform hover:scale-110 transition duration-300"
            >
              <Image src="/gmail.png" alt="Gmail" width={40} height={40} />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition duration-300"
            >
              <Image
                src="/facebook.png"
                alt="Facebook"
                width={40}
                height={40}
              />
            </a>
            <a
              href="https://wa.me/yourwhatsappnumber"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition duration-300"
            >
              <Image
                src="/whatsapp.png"
                alt="WhatsApp"
                width={40}
                height={40}
              />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition duration-300"
            >
              <Image
                src="/instagram.png"
                alt="Instagram"
                width={45}
                height={45}
              />
            </a>
          </div>
        </div>
      </div>

      <div className="border-b-2 border-white py-3"></div>

      <div className="flex items-center justify-evenly gap-5">
        <div className="flex flex-col items-center justify-center">
          <div className="mt-12 text-center text-gray-400 text-sm space-y-1">
            <p>
              © {new Date().getFullYear()} OghuzKhan Interiors. All rights
              reserved.
            </p>
            <p>Designed by Oguzhan DOGAN.</p>
            <div className="">
              <a
                href="/terms-of-service"
                className="text-yellow-400 hover:text-yellow-500"
              >
                Terms of Service
              </a>{" "}
              &
              <a
                href="/privacy-policy"
                className="text-yellow-400 hover:text-yellow-500"
              >
                Privacy Policy
              </a>
            </div>
          </div>

          <div className="mt-4 text-center text-gold text-lg font-semibold">
            <p>AI-Powered Interior Redesign</p>
          </div>
        </div>
        <div className="mt-12 text-center">
          <h3 className="text-xl text-gold font-semibold mb-4">
            Subscribe to Our Newsletter
          </h3>
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 rounded-lg text-gray-800"
          />
          <button className="ml-4 bg-yellow-400 text-gray-900 px-6 py-2 rounded-lg hover:bg-yellow-500">
            Subscribe
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
