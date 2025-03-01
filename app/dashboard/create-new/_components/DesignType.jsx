import Image from "next/image";
import React, { useState } from "react";

function DesignType({ selectedDesignType }) {
  const Designs = [
    {
      name: "Modern",
      image: "/modern.jpg",
    },
    {
      name: "Bohemian",
      image: "/bohemian.jpeg",
    },
    {
      name: "Industrial",
      image: "/industrial.avif",
    },
    {
      name: "Traditional",
      image: "/traditional.jpg",
    },
    {
      name: "Rustic",
      image: "/rustic.png",
    },
    {
      name: "Minimalist",
      image: "/minimalist.jpg",
    },
    {
      name: "Scandinavian",
      image: "/scandinavian.webp",
    },
    {
      name: "Art Deco",
      image: "/artdeco.webp",
    },
  ];
  const [selectedDesign, setSelectedDesign] = useState(null);
  return (
    <div className="mt-10">
      <label className="text-slate-400 font-semibold">
        Interior Design Type*
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5 mt-5">
        {Designs.map((design, index) => (
          <div
            key={index}
            onClick={() => {setSelectedDesign(design.name), selectedDesignType(design.name)}}
          >
            <span className="flex justify-start mb-3">{design.name}</span>
            <Image
              src={design.image}
              alt={design.name}
              width={200}
              height={200}
              className={`object-cover h-[120px] w-[180px] rounded-md hover:scale-110 transition-all cursor-pointer ${
                design.name == selectedDesign ? "border-[3px] border-purple-400 shadow-md shadow-purple-400 " : ""
              }`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default DesignType;
