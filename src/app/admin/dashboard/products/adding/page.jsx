// My Components
import DashAddingProductForm from "@/components/DashBoard Components/ProductsComp/DashAddingProductForm";

export const metadata = {
  title: "Adding Product",
};

const page = () => {
  return (
    <div className="w-full my-5">
      <DashAddingProductForm />
    </div>
  );
};

export default page;
