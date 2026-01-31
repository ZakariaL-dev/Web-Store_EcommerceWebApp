// Shadcn Comp
import { Button } from "@/components/ui/button";

// React Icons
import { PiExport } from "react-icons/pi";

// My Components
import DashReviewsNav from "@/components/DashBoard Components/ReviewsComp/DashReviewsNav";
import DashReviewsTable from "@/components/DashBoard Components/ReviewsComp/DashReviewsTable";


export const metadata = {
  title: "Reviews",
};

const page = () => {
  return (
    <div className="flex flex-col w-full my-3">
      <div className="flex items-center justify-between mx-3 mb-4">
        <h1 className="text-xl font-bold">Reviews</h1>
        <div className="flex gap-3">
          <Button variant="ghost">
            <PiExport />
            Export
          </Button>
        </div>
      </div>
      <DashReviewsNav />
      <DashReviewsTable />
    </div>
  );
};

export default page;
