// React Icons
import { PiExport } from "react-icons/pi";

// My Components
import ReportsUsersNav from "./ReportsUsersNav";
import ReportsUsersTable from "./ReportsUsersTable";

// Shadcn Comp
import { Button } from "@/components/ui/button";


const UsersComplain = () => {
  return (
    <>
      <div className="flex items-center justify-between mx-3 mb-4">
        <h1 className="text-xl font-bold">User Complains</h1>
        <div className="flex gap-3">
          <Button variant="ghost">
            <PiExport />
            Export
          </Button>
          <Button className="bg-gray-600">Create user report</Button>
        </div>
      </div>
      <ReportsUsersNav />
      <ReportsUsersTable />
    </>
  );
};

export default UsersComplain;
