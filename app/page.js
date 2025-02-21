"use client";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Sparkles, Paintbrush, Users, Sun, Moon } from "lucide-react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { useState } from "react";

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`flex flex-col items-center justify-center min-h-screen ${
        darkMode ? "bg-black" : "bg-gradient-to-r from-red-900 to-blue-900"
      } text-white text-center px-6`}
    >
      {/* Dark Mode Switch */}
      <div className="absolute top-5 right-5 flex items-center space-x-2">
        <Sun className="text-yellow-400" />
        <Switch checked={darkMode} onCheckedChange={setDarkMode} />
        <Moon className="text-blue-400" />
      </div>

      <motion.h1
        className="text-6xl font-extrabold mt-10 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Elevate Your Space with AI
      </motion.h1>
      <motion.p
        className="text-lg opacity-80 max-w-2xl mt-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        Upload a photo of your room and let AI generate a stunning, personalized
        interior design tailored to your style.
      </motion.p>

      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link href="/dashboard">
          <Button
            className="transition-all duration-300 mt-5 w-[200px] text-lg animate-bounce"
            variant="destructive"
          >
            Get Started
          </Button>
        </Link>
      </motion.div>

      <HoverCard>
        <HoverCardTrigger>
          <p className="mt-5 text-lg underline cursor-pointer">
            Meet the Developer
          </p>
        </HoverCardTrigger>
        <HoverCardContent className="bg-gray-800 p-4 text-lg rounded-lg shadow-lg max-w-lg">
          <p className="text-white">
            Hi! I'm a full-stack developer specializing in React, Next.js,
            Node.js, SpringBoot, MongoDB, and PostgreSQL. I built this app to
            revolutionize interior design using cutting-edge technology.
          </p>
        </HoverCardContent>
      </HoverCard>

      <motion.div
        className="mt-10"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <Image
          src="/Before-and-After.jpg"
          alt="Room Design Showcase"
          width={700}
          height={500}
          className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
        />
      </motion.div>

      <Separator className="my-10 w-3/4 border-gray-600" />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <FeatureCard
          icon={<Sparkles className="text-yellow-400 w-10 h-10" />}
          title="AI-Powered Design"
          description="Our AI creates stunning, realistic, and modern interiors based on your preferences."
        />
        <FeatureCard
          icon={<Paintbrush className="text-green-400 w-10 h-10" />}
          title="Custom Styles"
          description="Choose from different themes like modern, classic, and minimalistic to match your taste."
        />
        <FeatureCard
          icon={<Users className="text-blue-400 w-10 h-10" />}
          title="User-Friendly"
          description="Simply upload a photo and let the AI generate beautiful, personalized designs effortlessly."
        />
      </div>

      <Separator className="my-10 w-3/4 border-gray-600" />
    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <motion.div
      className="bg-gray-800 p-6 rounded-xl shadow-lg hover:scale-105 transition-transform duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <CardHeader className="flex items-center space-x-3">
        {icon}
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="opacity-80">{description}</p>
      </CardContent>
    </motion.div>
  );
}
