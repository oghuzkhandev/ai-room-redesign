"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

function page() {
  const creditsOption = [
    {
      credits: 3,
      amount: 0.99,
    },
    {
      credits: 10,
      amount: 2.99,
    },
    {
      credits: 25,
      amount: 6.99,
    },
    {
      credits: 50,
      amount: 12.5,
    },
    {
      credits: 100,
      amount: 22.5,
    },
  ];

  const [selectedOption, setSelectedOption] = useState(null);
  return (
    <div>
      <h2 className="font-bold text-3xl text-center">Buy Credits</h2>
      <p className="flex items-center justify-center text-slate-400 mt-5 gap-2 text-lg">
        Unlock endless possibilities. Buy more credits and transform your room
        with<span className="text-yellow-400 font-semibold">AI Magic</span>
        <Image src="/magic.png" alt="magic" width={25} height={25} />
        <span className="font-semibold">Have Enjoy </span>
        <Image src="/gestures.png" alt="magic" width={25} height={25} />
      </p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 mt-[70px]">
        {creditsOption.map((item, index) => (
          <div
            key={index}
            className={`flex flex-col gap-2 justify-center items-center shadow-xl shadow-slate-400 bg-slate-100 rounded-lg p-5 border-2 border-slate-200 ${
              selectedOption?.credits == item.credits && "border-primary"
            } `}
          >
            <h2 className="font-bold text-3xl">{item.credits} </h2>
            <h2 className="font-medium text-xl">Credits</h2>
            <Button variant="outline" className="w-full font-semibold" onClick={() => setSelectedOption(item)}>
              BUY
            </Button>
            <h2 className="font-bold text-[#EFBF04] text-lg"> {item.amount}$ </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default page;
