"use client";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

const StoreAdminRedirect = () => {
  const router = useRouter();

  //
  return (
    <div className="w-full h-12 bg-slate-500 flex items-center justify-between px-6 text-slate-400">
      <h2 className="font-bold text-lg">Web Store Admin</h2>
      <Button
        variant={"link"}
        className="text-slate-100 text-sm"
        onClick={() => router.push("/signin?r=admin")}
      >
        Go to Admin Panel
      </Button>
    </div>
  );
};

export default StoreAdminRedirect;
