"use client";

// Shadcn Comp
import { Button } from "@/components/ui/button";

// React
import { useState } from "react";

// React Icons
import { FiEdit2 } from "react-icons/fi";
import { AiOutlineUserDelete } from "react-icons/ai";

// Next
import Link from "next/link";

// Stores
import { useUserStore } from "@/utils/UserStore";

// Next Auth
import { signOut } from "next-auth/react";

// My Components
import { AccountDeleteDialogue } from "./AccountDeleteDialogue";

// Utils
import { HandeResults } from "@/lib/HandeResults";


const AccountProfileInfos = () => {
  const { currentUser, deleteUser } = useUserStore();

  const handleDateOfBirth = (DoB) => {
    if (!DoB) return "";

    const firstArr = DoB.split("T");
    const secondArr = firstArr[0].split("-");
    return `${secondArr[2]}-${secondArr[1]}-${secondArr[0]}`;
  };

  const credentials = [
    {
      name: "User Name",
      value: currentUser.userName,
    },
    {
      name: "Date of Birth",
      value: handleDateOfBirth(currentUser.dateOfBirth) || "00-00-0000",
    },
    {
      name: "Gender",
      value: currentUser.gender || "",
    },
    {
      name: "Email",
      value: currentUser.email,
    },
    {
      name: "Phone Number",
      value: currentUser.phoneNumber,
    },
    {
      name: "Address",
      value: currentUser.address || "",
    },
  ];
  
  const [loading, setLoading] = useState(false);
  const [OpenDelete, setOpenDelete] = useState(false);

  const handleDeleteUser = async (id) => {
    setLoading(true);

    const { success, message } = await deleteUser(id);

    HandeResults(success, message);

    setLoading(false);
    if (success === true) {
      signOut({ callbackUrl: "/" });
    }
  };
  return (
    <div className="py-6 px-3 lg:w-2/3 w-full">
      <header className="text-4xl font-bold mb-3">Profile</header>
      <main className="w-full mb-8">
        {credentials.map((c, i) => {
          return (
            <div
              key={i}
              className="px-6 py-4 border-b-2 border-slate-300 flex items-center gap-1"
            >
              <h1 className="w-1/3 text-slate-600">{c.name}</h1>
              <h2 className="text-slate-400">{c.value}</h2>
            </div>
          );
        })}
      </main>
      <footer className="flex items-center gap-3">
        <Button variant="outline">
          <Link
            href={"/account/profile/edit"}
            className="flex items-center gap-1"
          >
            <FiEdit2 />
            Edit
          </Link>
        </Button>
        <Button
          className="flex items-center gap-1 bg-red-800 hover:bg-red-700"
          onClick={() => setOpenDelete(true)}
        >
          <AiOutlineUserDelete />
          Delete Profile
        </Button>
      </footer>
      {OpenDelete && (
        <AccountDeleteDialogue
          OpenStatus={OpenDelete}
          OpenToggle={setOpenDelete}
          Delete={() => handleDeleteUser(currentUser._id)}
          loading={loading}
        />
      )}
    </div>
  );
};

export default AccountProfileInfos;
