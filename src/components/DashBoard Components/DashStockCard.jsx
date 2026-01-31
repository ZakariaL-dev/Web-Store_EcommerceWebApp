// Shadcn Comp
import { Button } from "@/components/ui/button";

// Next
import Image from "next/image";

// React Icons
import { FaCaretRight } from "react-icons/fa6";


const DashStockCard = () => {
  return (
    <div className="flex justify-between border-b-2 border-t-2 px-3 py-2">
      <div className="flex items-start gap-2">
        <Image
          src={
            "https://images.pexels.com/photos/2385477/pexels-photo-2385477.jpeg"
          }
          alt="no pic"
          width={100}
          height={300}
          className="rounded-lg"
        ></Image>
        <div>
          <h1 className="font-semibold">Product Name</h1>
          <p>Product Type</p>
        </div>
      </div>
      <div>
        <h1 className="font-semibold">Amount</h1>
        <p>Stock</p>
      </div>
      <Button variant="ghost" className="p-2" asChild>
        <FaCaretRight className="w-10 h-10" />
      </Button>
    </div>
  );
};

export default DashStockCard;
