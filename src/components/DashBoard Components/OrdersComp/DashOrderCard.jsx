// Shadcn Comp
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Next
import Image from "next/image";

// React Icons
import { FaCaretRight } from "react-icons/fa6";


const DashOrderCard = () => {
  return (
    <div className="border-b-2 border-r-2 w-[50%]">
      <div className="flex p-3 items-start ">
        <div className="w-1/3 mr-5">
          <h1 className="font-bold">#order n°</h1>
          <h4>12 Dec 2025, 11:03:26</h4>
          <Badge variant="default">Processing</Badge>
        </div>
        <div className="w-1/3">
          <h1 className="font-bold">Amount</h1>
          <p>type of payment</p>
          {/* <p>Processing</p> */}
        </div>
        <div className="w-1/3">
          <h1 className="font-bold">Customer&apos;s name</h1>
          <h4>contact</h4>
          <p>location</p>
        </div>
      </div>
      {/*  */}
      <div className="flex items-center justify-between p-3">
        <div className="flex gap-3">
          <div className="relative">
            <Image
              src={
                "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg"
              }
              alt="no pic"
              width={100}
              height={300}
              className="rounded-lg"
            ></Image>
            <p className="absolute bottom-0.5 left-0.5 bg-red-700 text-slate-100 px-1 rounded-full text-xs font-semibold">
              1
            </p>
          </div>
          <div className="relative">
            <Image
              src={
                "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg"
              }
              alt="no pic"
              width={100}
              height={300}
              className="rounded-lg"
            ></Image>
            <p className="absolute bottom-0.5 left-0.5 bg-red-700 text-slate-100 px-1 rounded-full text-xs font-semibold">
              2
            </p>
          </div>
          <div className="relative">
            <Image
              src={
                "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg"
              }
              alt="no pic"
              width={100}
              height={300}
              className="rounded-lg"
            ></Image>
            <p className="absolute bottom-0.5 left-0.5 bg-red-700 text-slate-100 px-1 rounded-full text-xs font-semibold">
              3
            </p>
          </div>
        </div>
        <Button variant="ghost" className="p-2" asChild>
          <FaCaretRight className="w-10 h-10" />
        </Button>
      </div>
    </div>
  );
};

export default DashOrderCard;
