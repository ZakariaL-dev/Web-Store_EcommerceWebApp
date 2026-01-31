// My Components
import DashAnalytics from "@/components/DashBoard Components/AnalyseComp/DashAnalytics";
import { DashDate } from "@/components/DashBoard Components/DashDatePicker";

export const metadata = {
  title: "Analytics",
};

const page = () => {
  return (
    <div className="flex flex-col w-full my-3">
      <div className="flex items-center justify-between mx-3 my-6">
        <h1 className="text-xl font-bold">Analytics Dashboard</h1>
        <div className="flex items-center gap-3">
          from:
          <DashDate />
          to:
          <DashDate />
        </div>
      </div>
      <DashAnalytics />
    </div>
  );
};

export default page;
