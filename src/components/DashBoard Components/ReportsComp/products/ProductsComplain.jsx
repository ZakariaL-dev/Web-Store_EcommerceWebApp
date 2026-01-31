// Shadcn Comp
import { Button } from "@/components/ui/button";

// React Icons
import { PiExport } from "react-icons/pi";

// My Components
import ReportsProductsNav from "./ReportsProductsNav";
import ReportsProductsTable from "./ReportsProductsTable";


const ProductsComplain = () => {
  return (
    <>
      <div className="flex items-center justify-between mx-3 mb-4">
        <h1 className="text-xl font-bold">Products Complains</h1>
        <div className="flex gap-3">
          <Button variant="ghost">
            <PiExport />
            Export
          </Button>
          <Button className="bg-gray-600">Create product report</Button>
        </div>
      </div>
      <ReportsProductsNav />
      <ReportsProductsTable />
    </>
  );
};

export default ProductsComplain;
