"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CiLogout } from "react-icons/ci";
import { FaRegCommentDots } from "react-icons/fa6";
import { GoShieldX } from "react-icons/go";

import Link from "next/link";

// Next Auth
import { signOut } from "next-auth/react";

const BlockedComp = () => {
  return (
    <div className="px-6 h-screen flex flex-col items-center justify-center gap-4 bg-[#11192C] text-white">
      <GoShieldX className="text-9xl text-red-800" />
      <h1 className="text-4xl font-bold">Account Blocked</h1>
      <Badge
        variant="outline"
        className="bg-red-900/50 px-6 py-2 text-red-600 border border-red-800"
      >
        Restricted Access
      </Badge>
      <p className="opacity-75">
        You are blocked from accessing this website. Please contact support for
        more information.
      </p>
      <Button
        asChild
        className="mt-8 border-2 border-white/50 py-6 w-70 hover:bg-white/30 hover:shadow-xl shadow-white/20"
      >
        <Link
          href="https://api.whatsapp.com/send/?phone=213791931017&text&type=phone_number&app_absent=0"
          target="_blank"
        >
          <FaRegCommentDots />
          Contact Support
        </Link>
      </Button>
      <Button
        className={
          "text-red-600 hover:bg-red-600/20 hover:shadow-xl shadow-red-600/20 py-6 w-30 mt-2 hover:text-red-800"
        }
        variant="ghost"
        onClick={() => {
          signOut({ callbackUrl: "/" });
        }}
      >
        <CiLogout className="text-xl" />
        Log Out
      </Button>
    </div>
  );
};

export default BlockedComp;
