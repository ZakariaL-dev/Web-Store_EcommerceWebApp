"use client";

// Shadcn Comp
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";

// Next
import Link from "next/link";
import { usePathname } from "next/navigation";

// React Icons
import { IoIosArrowForward } from "react-icons/io";
import { BsPerson } from "react-icons/bs";
import { IoIosHeartEmpty } from "react-icons/io";
import { LuClipboardList } from "react-icons/lu";
import { FaRegStar } from "react-icons/fa";
import { MdCompareArrows } from "react-icons/md";
import { BsExclamationTriangle } from "react-icons/bs";
import { RiMenuUnfold2Line } from "react-icons/ri";
import { RiMenuFold2Line } from "react-icons/ri";

// Stores
import { useUserStore } from "@/utils/UserStore";

// React
import { useState } from "react";


const AccountSideBar = ({ user }) => {
  const { currentUser } = useUserStore();

  const accountlinks = [
    {
      link: "profile",
      icon: BsPerson,
      name: "Profile",
    },
    {
      link: "wishlist",
      icon: IoIosHeartEmpty,
      name: "Wishlist",
    },
    {
      link: "orders",
      icon: LuClipboardList,
      name: "Orders",
    },
    {
      link: "compare",
      icon: MdCompareArrows,
      name: "Compare list",
    },
    {
      link: "reviews",
      icon: FaRegStar,
      name: "Reviews",
    },
    {
      link: "reports",
      icon: BsExclamationTriangle,
      name: "Reports",
    },
  ];
  const pathname = usePathname();
  const [OpenSideBar, setOpenSideBar] = useState(false);

  return (
    <>
      <div className="lg:hidden absolute left-3 top-19">
        <Button variant="ghost" className="p-2 block" asChild>
          <RiMenuFold2Line
            className="w-10 h-10"
            onClick={() => {
              setOpenSideBar(true);
            }}
          />
        </Button>
      </div>
      <div
        className={`
        fixed inset-y-0 left-0 z-50 w-full md:w-1/2 bg-white
        transition-transform duration-300 ease-in-out
        shadow-[10px_0_15px_-3px_rgba(0,0,0,0.1)]
        ${OpenSideBar ? "translate-x-0" : "-translate-x-full"}

        lg:relative lg:translate-x-0 lg:w-1/4 lg:block lg:z-0 lg:shadow-none lg:pl-0 lg:pr-2
        
        h-full overflow-y-auto px-5
      `}
      >
        <div className="w-full flex justify-end my-2 lg:hidden">
          <Button variant="ghost" className="p-2 block" asChild>
            <RiMenuUnfold2Line
              className="w-10 h-10"
              onClick={() => {
                setOpenSideBar(false);
              }}
            />
          </Button>
        </div>
        <header className="flex gap-2 items-center border-2 border-slate-100 rounded-2xl p-3 mb-6">
          <Avatar className="w-16 h-16 text-2xl">
            <AvatarImage src={currentUser?.profileImage || user?.image} />
            <AvatarFallback>{currentUser.userName}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="font-semibold text-xl">
              Hello! {currentUser.userName}
            </h1>
          </div>
        </header>
        {/*  */}
        <div>
          <h1 className="font-bold text-2xl text-slate-700 mb-3">My Account</h1>
          <div className="w-full border-2 border-slate-600 rounded-xl">
            {accountlinks.map((al, i) => {
              const fullPath = `/account/${al.link}`;
              const isActive = pathname === fullPath;
              return (
                <Link
                  key={i}
                  href={`/account/${al.link}`}
                  className={
                    isActive === true
                      ? "flex items-center justify-between p-4 border-b-2 border-slate-600 last:border-b-0 bg-slate-100 first:rounded-t-xl last:rounded-b-xl hover:bg-slate-50"
                      : "flex items-center justify-between p-4 border-b-2 border-slate-600 last:border-b-0 hover:bg-slate-50 first:rounded-t-xl last:rounded-b-xl"
                  }
                  onClick={() => {
                    setOpenSideBar(false);
                  }}
                >
                  <div className="flex gap-3 items-center ">
                    <al.icon className="font-extrabold text-2xl" />
                    <h1 className="text-lg">{al.name}</h1>
                  </div>
                  <IoIosArrowForward />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default AccountSideBar;
