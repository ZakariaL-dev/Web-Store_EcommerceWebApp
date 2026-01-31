"use client";

// Shadcn Comp
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

// Next
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

// React Icons
import { GrSearchAdvanced } from "react-icons/gr";
import { MdCompareArrows } from "react-icons/md";
import { LuShoppingBag } from "react-icons/lu";
import { IoPersonOutline } from "react-icons/io5";
import { LiaOpencart } from "react-icons/lia";
import { RxHamburgerMenu } from "react-icons/rx";
import { AiOutlineClose } from "react-icons/ai";
import { IoIosHeartEmpty } from "react-icons/io";

// React
import { useState } from "react";

// My Components
import AccountDialogueIn from "@/components/AccountComponents/AccountDialogueIn";
import AccountDialogueOut from "@/components/AccountComponents/AccountDialogueOut";
import StoreShoppingCart from "../CartComp/StoreShoppingCart";

// Stores
import { useUserStore } from "@/utils/UserStore";
import { useCartStore } from "@/utils/CartStore";


const StoreNavBar = ({ user }) => {
  const [openDialogue, setOpenDialogue] = useState(false);
  const [openMiniNav, setOpenMiniNav] = useState(false);
  const [openShopCart, setOpenShopCart] = useState(false);
  const NavLinks = [
    {
      link: "all",
      name: "All",
    },
    {
      link: "man",
      name: "Man",
    },
    {
      link: "woman",
      name: "Woman",
    },
    {
      link: "kids",
      name: "Kids",
    },
    {
      link: "accessories",
      name: "Accessories",
    },
  ];

  const { currentUser } = useUserStore();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category");
  const { cart } = useCartStore();

  return (
    <>
      <nav className="flex items-center justify-between px-6 py-3 border-b-2 fixed top-0 left-0 right-0 bg-white z-50">
        <div className="flex items-center gap-2.5">
          <Button variant="ghost" className="p-2 lg:hidden" asChild>
            {openMiniNav === false ? (
              <RxHamburgerMenu
                className="w-10 h-10"
                onClick={() => setOpenMiniNav(true)}
              />
            ) : (
              <AiOutlineClose
                className="w-10 h-10"
                onClick={() => setOpenMiniNav(false)}
              />
            )}
          </Button>
          <Link href={"/"} className="flex items-center gap-3">
            <LiaOpencart className="text-4xl" />
            <h1 className="font-bold">Web Store</h1>
          </Link>
          <ul className="lg:flex items-center gap-1 hidden ml-6">
            {NavLinks.map((ml, i) => {
              const isActive =
                pathname === "/search" && currentCategory === ml.link;

              return (
                <Button key={i} variant={isActive ? "default" : "ghost"}>
                  <Link href={`/search?category=${ml.link}`}>{ml.name}</Link>
                </Button>
              );
            })}
          </ul>
        </div>
        <div className="flex items-center gap-5">
          <InputGroup className="md:flex hidden">
            <InputGroupInput placeholder="Search..." />
            <InputGroupAddon>
              <GrSearchAdvanced />
            </InputGroupAddon>
          </InputGroup>
          <div className="flex items-center gap-1">
            {user ? (
              <>
                <Button variant="ghost" className={"w-8 h-8"} asChild>
                  <Link href="/account/wishlist">
                    <IoIosHeartEmpty />
                  </Link>
                </Button>
                <Button variant="ghost" className={"w-8 h-8"} asChild>
                  <Link href="/account/compare">
                    <MdCompareArrows />
                  </Link>
                </Button>
                <Button
                  variant="ghost"
                  className="p-1 w-10 h-10"
                  onClick={() => {
                    setOpenShopCart(true);
                  }}
                  asChild
                >
                  <div className="relative">
                    <LuShoppingBag className="w-8 h-8" />
                    {cart.length != 0 ? (
                      <Badge
                        variant={"secondary"}
                        className={"absolute right-0 bottom-0 w-0.5 h-3 z-3"}
                      >
                        {cart.length}
                      </Badge>
                    ) : (
                      <></>
                    )}
                  </div>
                </Button>

                <Avatar
                  className="cursor-pointer ml-4"
                  onClick={() => setOpenDialogue(!openDialogue)}
                >
                  <AvatarImage src={currentUser?.profileImage || user?.image} />
                  <AvatarFallback>
                    {currentUser?.userName || user?.name}
                  </AvatarFallback>
                </Avatar>
              </>
            ) : (
              <Button variant="ghost" className="p-2" asChild>
                <IoPersonOutline
                  className="w-10 h-10"
                  onClick={() => setOpenDialogue(!openDialogue)}
                />
              </Button>
            )}
          </div>
        </div>
        <ul
          className={`w-full absolute top-16 left-0 bg-white border-b-2 shadow-xl lg:hidden transform transition-transform duration-300 ease-in-out ${
            openMiniNav ? "translate-y-0" : "-translate-y-100"
          }`}
        >
          {NavLinks.map((ml, i) => {
            return (
              <li
                key={i}
                className="w-full px-6 py-2 last:pb-4 transition-all ease-in-out hover:bg-slate-100"
              >
                <Link
                  className="w-full"
                  href={`/search?categoty=${ml.link}`}
                  onClick={() => setOpenMiniNav(false)}
                >
                  {ml.name}
                </Link>
              </li>
            );
          })}
        </ul>
        {openDialogue &&
          (user ? (
            <AccountDialogueIn OpenToggle={setOpenDialogue} user={user} />
          ) : (
            <AccountDialogueOut OpenToggle={setOpenDialogue} />
          ))}
        <StoreShoppingCart
          OpenStatus={openShopCart}
          OpenToggle={setOpenShopCart}
        />
      </nav>

      {/* <AccountDialogueIn OpenToggle={setOpenDialogue} /> */}
    </>
  );
};

export default StoreNavBar;
