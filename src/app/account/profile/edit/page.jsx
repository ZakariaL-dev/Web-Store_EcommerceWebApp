// My Components
import AccountEditForm from "@/components/AccountComponents/AccountEditForm";

export const metadata = {
  title: "Edit Profile",
};

const page = () => {
  return (
    <div className="py-6 px-3 lg:w-2/3 w-full">
      <h1 className="text-4xl font-bold mb-5">Edit Profile</h1>
      <AccountEditForm />
    </div>
  );
};

export default page;
