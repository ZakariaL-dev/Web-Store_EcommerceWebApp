"use client";

// Stores
import { useUserStore } from "@/utils/UserStore";

// React
import { useEffect } from "react";


const AccountUserWrapper = ({ email, children }) => {
  const { currentUser, getAUser } = useUserStore();
  useEffect(() => {
    if (email) {
      getAUser(email);
    }
  }, [email, getAUser]);

  if (!currentUser) {
    return (
      <div className="w-full flex justify-center items-center min-h-[50vh]">
        <div className="p-10 text-center animate-pulse">
          Loading User data...
        </div>
      </div>
    );;
  }

  return <>{children}</>;
};

export default AccountUserWrapper;
