"use client";

// React Icons
import { LiaStoreAltSolid } from "react-icons/lia";
import { LiaOpencart } from "react-icons/lia";
import { GrSearchAdvanced } from "react-icons/gr";
import { MdOutlineNotificationsActive } from "react-icons/md";

// Shadcn Comp
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";

// Next
import Link from "next/link";
import { redirect } from "next/navigation";

// React
import { useState } from "react";

// My Components
import DashNotificationDialogue from "../AccountComp/DashNotificationDialogue";
import DashAccountDialogue from "../AccountComp/DashAccountDialogue";

// Store
import { useUserStore } from "@/utils/UserStore";

const DashNavBar = ({ user }) => {
  const [AccountToggle, setAccountToggle] = useState(false);
  const [NotifyToggle, setNotifyToggle] = useState(false);

  const { currentUser } = useUserStore();

  return (
    <nav className="flex items-center justify-between px-5 py-3 border-b-2 fixed top-0 left-0 right-0 bg-white z-50">
      {/* left */}
      <div className="flex items-center gap-2 ">
        <SidebarTrigger className="lg:hidden" />
        <Link
          href={"/admin/dashboard"}
          className="flex items-center gap-3 w-auto"
        >
          <LiaOpencart className="text-4xl" />
          <h1 className="font-semibold text-xl">Web Store</h1>
        </Link>
        <div className="w-60 hidden md:block">
          <InputGroup>
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <GrSearchAdvanced />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>
      {/* Right */}
      <div className="flex items-center gap-3">
        {/* <Button variant="ghost" className="p-2" asChild>
          <BsMoonStars className="w-9 h-9" />
        </Button> */}
        <Button variant="ghost" className="p-2" asChild>
          <LiaStoreAltSolid
            className="w-10 h-10"
            onClick={() => redirect("/")}
          ></LiaStoreAltSolid>
        </Button>
        <Button variant="ghost" className="p-2" asChild>
          <MdOutlineNotificationsActive
            className="w-10 h-10"
            onClick={() => setNotifyToggle(!NotifyToggle)}
          />
        </Button>
        <Avatar
          className="cursor-pointer"
          onClick={() => setAccountToggle(!AccountToggle)}
        >
          <AvatarImage src={currentUser?.profileImage} />
          <AvatarFallback>{user.name}</AvatarFallback>
        </Avatar>
      </div>
      {AccountToggle === true ? (
        <DashAccountDialogue OpenToggle={setAccountToggle} user={user} />
      ) : (
        <></>
      )}
      {NotifyToggle === true ? (
        <DashNotificationDialogue OpenToggle={setNotifyToggle} />
      ) : (
        <></>
      )}
    </nav>
  );
};

export default DashNavBar;
