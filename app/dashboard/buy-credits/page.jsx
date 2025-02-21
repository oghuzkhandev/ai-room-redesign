"use client";
import React, { useState, useContext } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { UserDetailContext } from "../../_context/UserDetailContext";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { Users } from "@/config/schema";
import { db } from "@/config/db";
import { useRouter } from "next/navigation";


function Page() {
  const creditsOption = [
    { credits: 3, amount: 0.99 },
    { credits: 10, amount: 2.99 },
    { credits: 25, amount: 6.99 },
    { credits: 50, amount: 12.5 },
    { credits: 100, amount: 22.5 },
  ];
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onPaymentSuccess = async () => {
    console.log("Payment Success...");
    const result = await db
      .update(Users)
      .set({
        credits: userDetail?.credits + selectedOption?.credits,
      })
      .returning({ id: Users.id });

    if (result) {
      router.push("/dashboard");
    }
  };

  return (
    <div>
      <h2 className="font-bold text-3xl text-center">Buy Credits</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-10 mt-20 h-[210px]">
        {creditsOption.map((item, index) => (
          <div
            key={index}
            className={`relative flex flex-col gap-1 justify-center items-center shadow-xl shadow-slate-400 rounded-lg p-5 border-2 ${
              selectedOption?.credits === item.credits
                ? "border-[#EFBF04] border-[2px] shadow-yellow-400 transition-all duration-300"
                : "border-slate-200"
            }`}
          >
            {selectedOption?.credits === item.credits && (
              <Image
                src="/check-mark.png"
                alt="Selected"
                width={50}
                height={50}
                className="absolute right-2 top-2"
              />
            )}
            <h2 className="font-bold text-3xl">{item.credits}</h2>
            <h2 className="font-medium text-xl">Credits</h2>
            <Button
              variant="outline"
              className="w-full font-semibold mt-1"
              onClick={() => setSelectedOption(item)}
            >
              Buy
            </Button>
            <h2 className="font-bold text-[#EFBF04] text-xl mt-2">
              ${item.amount}
            </h2>
          </div>
        ))}
      </div>
      <div className="mt-20 flex items-center justify-center w-full">
        {selectedOption?.amount && (
          <PayPalButtons
            style={{ layout: "horizontal" }}
            className="w-[400px] h-[400px]"
            onApprove={() => onPaymentSuccess()}
            onCancel={() => console.log("Payment Cancel")}
            createOrder={(data, actions) => {
              return actions?.order.create({
                purchase_units: [
                  {
                    amount: {
                      value: selectedOption?.amount?.toFixed(2),
                      currency_code: "USD",
                    },
                  },
                ],
              });
            }}
          />
        )}
      </div>
    </div>
  );
}

export default Page;
