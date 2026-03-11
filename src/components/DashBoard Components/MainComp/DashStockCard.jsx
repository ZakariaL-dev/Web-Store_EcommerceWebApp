"use client";
// Shadcn Comp
import { Button } from "@/components/ui/button";

// Next
import Image from "next/image";
import { useRouter } from "next/navigation";

// React Icons
import { FaCaretRight } from "react-icons/fa6";

const DashStockCard = ({ stock }) => {
  const router = useRouter();
  
  return (
    <div className="flex justify-between border-b-2 px-3 py-4 last:border-b-0">
      <Image
        src={stock.imgs[0]}
        alt={stock.title}
        width={100}
        height={200}
        className="rounded-lg mr-5"
      ></Image>
      <div className="w-full">
        <div className="flex justify-between w-full mb-2">
          <h1 className="font-semibold text-sm">{stock.title}</h1>
          <h1 className="font-mono text-sm">{stock.price} Dz</h1>
        </div>
        <div className="w-full">
          {stock.lowStockVariants.map((v) => (
            <div
              key={v._id}
              className="text-sm text-gray-600 flex justify-between"
            >
              <span>
                {v.color} / {v.size}
              </span>
              <span className="font-semibold text-red-500">
                Qty: {v.quantity}
              </span>
            </div>
          ))}
        </div>
      </div>
      <Button
        variant="ghost"
        className="p-2 ml-4"
        onClick={() => router.push(`/admin/dashboard/products/${stock.slug}`)}
        asChild
      >
        <FaCaretRight className="w-10 h-10" />
      </Button>
    </div>
  );
};

export default DashStockCard;
