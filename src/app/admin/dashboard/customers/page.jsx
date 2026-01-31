// Shadcn Comp
import { Button } from "@/components/ui/button";

// My Components
import DashCustomersNav from "@/components/DashBoard Components/CustomersComp/DashCustomersNav";
import DashCustomersTable from "@/components/DashBoard Components/CustomersComp/DashCustomersTable";

// React Icons
import { PiExport } from "react-icons/pi";

export const metadata = {
  title: "Customers",
};

const page = () => {
  return (
    <div className="flex flex-col w-full my-3">
      <div className="flex items-center justify-between mx-3 mb-4">
        <h1 className="text-xl font-bold">Customers</h1>
        <div className="flex gap-3">
          <Button variant="ghost">
            <PiExport />
            Export
          </Button>
          <Button className="bg-gray-600">Create Customer</Button>
        </div>
      </div>
      <DashCustomersNav />
      <DashCustomersTable />
    </div>
  );
};

export default page;
