// React Icons
import { BsPerson } from "react-icons/bs";
import { IoIosHeartEmpty } from "react-icons/io";
import { LuClipboardList } from "react-icons/lu";
import { CiLogout } from "react-icons/ci";
import { GrUserAdmin } from "react-icons/gr";

// Shadcn Comp
import { Separator } from "../ui/separator";

// Next
import Link from "next/link";

// Next Auth
import { signOut } from "next-auth/react";


const AccountDialogueIn = ({ OpenToggle, user }) => {
  const Dialoguelinks = [
    {
      link: "/account/profile",
      icon: BsPerson,
      name: "Profile",
    },
    {
      link: "/account/wishlist",
      icon: IoIosHeartEmpty,
      name: "Wishlist",
    },
    {
      link: "/account/orders",
      icon: LuClipboardList,
      name: "Orders",
    },
  ];
  return (
    <div className="absolute top-16 right-6 z-10 bg-slate-50 shadow-xl rounded-xl">
      <div className="p-4">
        <h1 className="mb-1 font-bold text-xl">Welcome {user.name}</h1>
        <p>Manage Cart, Orders & Wishlist</p>
        <Separator className="mt-2" />
      </div>
      <ul className="w-full -mt-2">
        {user.role === "admin" && (
          <Link
            href={"/admin/dashboard"}
            className="w-full flex items-center gap-1.5 px-4 py-2 transition-all ease-in-out hover:bg-slate-100 last:rounded-b-xl last:pb-3"
            onClick={() => OpenToggle(false)}
          >
            <GrUserAdmin className="text-xl" />
            Admin Dashboard
          </Link>
        )}
        {Dialoguelinks.map((dl, i) => {
          return (
            <Link
              key={i}
              href={dl.link}
              className="w-full flex items-center gap-1.5 px-3 py-2 transition-all ease-in-out hover:bg-slate-100 last:rounded-b-xl last:pb-3"
              onClick={() => OpenToggle(false)}
            >
              <dl.icon className="text-xl" />
              {dl.name}
            </Link>
          );
        })}
        <li
          className="w-full flex items-center gap-1.5 px-3 py-2 transition-all ease-in-out hover:bg-slate-100 last:rounded-b-xl last:pb-3 cursor-pointer"
          onClick={() => {
            OpenToggle(false);
            signOut({ callbackUrl: "/" });
          }}
        >
          <CiLogout className="text-xl" />
          Log Out
        </li>
      </ul>
    </div>
  );
};

export default AccountDialogueIn;
