// Shadcn Comp
import { Button } from "@/components/ui/button";

// My Components
import DashProductNav from "@/components/DashBoard Components/ProductsComp/DashProductNav";
import DashProductTable from "@/components/DashBoard Components/ProductsComp/DashProductTable";

// React Icons
import { PiExport } from "react-icons/pi";

// Next
import Link from "next/link";


export const metadata = {
  title: "Products",
};

const page = () => {
  return (
    <div className="flex flex-col w-full my-3">
      <div className="flex items-center justify-between mx-3 mb-4">
        <h1 className="text-xl font-bold">Products</h1>
        <div className="flex gap-3">
          <Button variant="ghost">
            <PiExport />
            Export
          </Button>
          <Button className="bg-gray-600">
            <Link href={"/admin/dashboard/products/adding"}>Add Product</Link>
          </Button>
        </div>
      </div>
      <DashProductNav />
      <DashProductTable />
    </div>
  );
};

export default page;
