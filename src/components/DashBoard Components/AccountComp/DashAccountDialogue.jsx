// Shadcn Comp
import { Separator } from "@/components/ui/separator";

// Next
import Link from "next/link";

// React Icons
import { BsPerson } from "react-icons/bs";
import { CiLogout } from "react-icons/ci";

// Next Auth
import { signOut } from "next-auth/react";


const DashAccountDialogue = ({ OpenToggle, user }) => {
  return (
    <div className="absolute top-16 right-6 z-10 bg-slate-50 shadow-xl rounded-xl">
      <div className="p-4">
        <h1 className="mb-1 font-bold text-xl">Welcome {user.name}</h1>
        <p>Manage Products, Orders & Wishlist</p>
        <Separator className="mt-2" />
      </div>
      <ul className="w-full -mt-2">
        <li>
          <Link
            href={"/admin/dashboard/settings"}
            className="w-full flex items-center gap-1.5 px-3 py-2 transition-all ease-in-out hover:bg-slate-100 last:rounded-b-xl last:pb-3"
            onClick={() => OpenToggle(false)}
          >
            <BsPerson className="text-xl" />
            My Account
          </Link>
        </li>
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

export default DashAccountDialogue;
