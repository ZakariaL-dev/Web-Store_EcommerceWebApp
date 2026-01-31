"use client";

// Stores
import { useUserStore } from "@/utils/UserStore";

// My Components
import DashAccountForm from "./DashAccountForm";


const DashFormWrapper = () => {
  const { currentUser } = useUserStore();

  if (!currentUser) {
    return <div className="p-10 text-center">Loading Profile...</div>;
  }
  return <DashAccountForm />;
};

export default DashFormWrapper;
