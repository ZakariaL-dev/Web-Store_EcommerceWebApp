// My Components
import DashFormWrapper from "@/components/DashBoard Components/AccountComp/DashFormWrapper";

export const metadata = {
  title: "Account Settings",
};

const page = () => {
  return (
    <div className="w-full my-6">
      <DashFormWrapper />
    </div>
  );
};

export default page;
