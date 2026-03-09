// My Components
import StoreCartPage from "@/components/StoreComponents/CartComp/StoreCartPage";

export const metadata = {
  title: "Cart",
};

const page = () => {
  return (
    <div className="p-4">
      <StoreCartPage />
    </div>
  );
};

export default page;
