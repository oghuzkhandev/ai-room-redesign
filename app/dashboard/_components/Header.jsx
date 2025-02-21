"use client";
import React, { useContext } from "react";
import Image from "next/image";
import { UserButton } from "@clerk/nextjs";
import { UserDetailContext } from "../../_context/UserDetailContext";
import { Button } from "../../../components/ui/button";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);

  return (
    <div className="flex justify-between items-center p-5 shadow-xl max-h-[110px]">
      <div className="flex items-center gap-4">
        <a href="/dashboard">
          <Image
            src="/logo.png"
            alt="logo"
            width={140}
            height={140}
            className="object-cover"
          />
        </a>
        <h2 className="font-bold text-lg">AI Room Design Application</h2>
      </div>

      <nav className="hidden md:flex items-center gap-10 text-black font-bold dark:text-gray-300">
        <Link
          href="/dashboard"
          className="relative group text-lg font-semibold transition duration-300 ease-in-out hover:text-yellow-400"
        >
          <div className="flex justify-center items-center gap-2">
            <Image src="/home (1).png" alt="" height={25} width={22} />
            Home
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full group-hover:bottom-0"></span>
          </div>
        </Link>

        <Link
          href="/dashboard/about"
          className="relative group text-lg font-semibold transition duration-300 ease-in-out hover:text-yellow-400"
        >
          <div className="flex justify-center items-center gap-2">
            <Image src="/about.png" alt="" height={20} width={22} />
            About
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full group-hover:bottom-0"></span>
          </div>
        </Link>

        <Link
          href="/dashboard/support"
          className="relative group text-lg font-semibold transition duration-300 ease-in-out hover:text-yellow-400"
        >
          <div className="flex justify-center items-center gap-2">
            <Image src="/help-desk.png" alt="" height={25} width={25} />
            Support
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full group-hover:bottom-0"></span>
          </div>
        </Link>

        <Link
          href="/dashboard/buy-credits"
          className="relative group text-lg font-semibold transition duration-300 ease-in-out hover:text-yellow-400"
        >
          <div className="flex justify-center items-center gap-2">
            <Image src="/tag.png" alt="" height={25} width={25} />
            Pricing
            <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-400 transition-all group-hover:w-full group-hover:bottom-0"></span>
          </div>
        </Link>
      </nav>

      <div className="flex items-center gap-[30px]">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-[120px]">
              <Image src="/user.png" alt="rate" width={25} height={30} />
              <span className="text-[16px] font-semibold">Account</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <Link href="/dashboard/favorites">
                <DropdownMenuItem className="font-semibold gap-3">
                  <Image src="/lover.png" alt="rate" width={25} height={25} />
                  <span>Favorites</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard/my-projects">
                <DropdownMenuItem className="font-semibold gap-3">
                  <Image src="/folder.png" alt="rate" width={25} height={25} />
                  <span>My Projects</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/dashboard/my-ratings">
                <DropdownMenuItem className="font-semibold gap-3">
                  <Image src="/rating.png" alt="rate" width={25} height={30} />
                  <span>My Ratings</span>
                </DropdownMenuItem>
              </Link>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuGroup>
              <DropdownMenuItem className="font-semibold gap-3">
                <Image src="/bell.png" alt="rate" width={25} height={30} />
                <span>Notifications</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="font-semibold gap-3">
                <Image src="/translate.png" alt="rate" width={25} height={30} />
                <span>Language Settings</span>
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />
          </DropdownMenuContent>
        </DropdownMenu>
        <Link href={"/dashboard/buy-credits"}>
          <Button variant="destructive" className="font-semibold">
            Buy More Credits
          </Button>
        </Link>
        <div className="flex items-center gap-3 py-1 bg-blue-200 rounded-lg w-[200px] text-[15px] border-2 border-blue-400">
          <Image
            src="/dollar.png"
            alt="credit"
            width={30}
            height={30}
            style={{ marginLeft: "5px" }}
          />
          <div className="font-bold">
            {userDetail?.credits > 0 ? (
              `You Have ${userDetail.credits} Credits`
            ) : (
              <span>No Credits Available</span>
            )}
          </div>
        </div>
        <UserButton />
      </div>
    </div>
  );
}

export default Header;
