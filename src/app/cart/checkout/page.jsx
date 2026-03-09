// My Components
import StoreCheckoutPage from "@/components/StoreComponents/CartComp/StoreCheckoutPage";

export const metadata = {
  title: "Checkout",
};

const page = () => {
  return (
    <div className="p-4">
      <StoreCheckoutPage />
    </div>
  );
};

export default page;
