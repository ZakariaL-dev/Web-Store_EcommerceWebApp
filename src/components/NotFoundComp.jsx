"use client"

import "@/app/globals.css";

// Next
import Link from "next/link";
import { useRouter } from 'next/navigation';

// Shadcn Comp
import { Button } from "./ui/button";

// React Icons
import { TbError404 } from "react-icons/tb";


const NotFoundComp = () => {
    const router = useRouter();
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-3 bg-[linear-gradient(172deg,rgba(59,59,71,1)_0%,rgba(107,107,117,1)_39%,rgba(194,190,190,1)_90%)]">
      <TbError404 className="text-[18rem] text-gray-800" />
      <h1 className="text-4xl font-bold">Oops! Page is not available.</h1>
      <p>
        The page you are looking for was Moved or Removed or might never
        existed.
      </p>
      <div className="space-x-2.5">
        <Button
          variant="ghost"
          className="hover:bg-gray-300"
          type="button"
          onClick={() => router.back()}
        >
          Take a step Backward
        </Button>
        <Button>
          <Link href="/">Go Back Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFoundComp;
