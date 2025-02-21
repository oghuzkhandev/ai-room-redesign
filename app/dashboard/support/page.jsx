"use client";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const Support = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-semibold text-center text-gold mb-8">
        Need Support? We're Here to Help!
      </h1>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Contact Us</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="text-lg text-gray-600">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-4 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label htmlFor="email" className="text-lg text-gray-600">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-4 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label htmlFor="message" className="text-lg text-gray-600">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              className="w-full p-4 bg-gray-800 text-white border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <Button variant="destructive" className="w-full text-md" type="submit">
            Submit
          </Button>
        </form>
      </section>

      <section>
        <h2 className="text-3xl font-semibold text-gray-800 mb-6">Our Contact Info</h2>
        <p className="text-lg text-gray-600">
          If you have any questions or need assistance, please don't hesitate to reach out to us through the following methods:
        </p>
        <div className="mt-4 space-y-4">
          <p className="text-gray-600">
            <strong>Email:</strong> <a href="mailto:oguzhandogandev@hotmail.com" className="text-yellow-400">oguzhandogandev@hotmail.com</a>
          </p>
          <p className="text-gray-600">
            <strong>Phone:</strong> <a href="tel:+1234567890" className="text-yellow-400">+90 533 430 01 71</a>
          </p>
          <div className="flex space-x-6 mt-6">
            <a href="mailto:your-email@gmail.com" className="transform hover:scale-110 transition duration-300">
              <img src="/gmail.png" alt="Gmail" width={40} height={40} />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition duration-300">
              <img src="/facebook.png" alt="Facebook" width={40} height={40} />
            </a>
            <a href="https://wa.me/yourwhatsappnumber" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition duration-300">
              <img src="/whatsapp.png" alt="WhatsApp" width={40} height={40} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="transform hover:scale-110 transition duration-300">
              <img src="/instagram.png" alt="Instagram" width={40} height={40} />
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
