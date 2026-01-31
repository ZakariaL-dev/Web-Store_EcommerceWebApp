// Shadcn Comp
import { Button } from "@/components/ui/button";

// My Components
import DashOrderNav from "@/components/DashBoard Components/OrdersComp/DashOrderNav";
import DashOrderTable from "@/components/DashBoard Components/OrdersComp/DashOrderTable";

// React Icons
import { PiExport } from "react-icons/pi";

export const metadata = {
  title: "Orders",
};

const page = () => {
  return (
    <div className="flex flex-col w-full my-3">
      <div className="flex items-center justify-between mx-3 mb-4">
        <h1 className="text-xl font-bold">Orders</h1>
        <div className="flex gap-3">
          <Button variant="ghost">
            <PiExport />
            Export
          </Button>
          <Button className="bg-gray-600">Create Order</Button>
        </div>
      </div>
      <DashOrderNav />
      <DashOrderTable />
    </div>
  );
};

export default page;
