// My Components
import StoreHomeCarocel from "@/components/StoreComponents/NavComp/StoreHomeCarocel";
import StorePage from "@/components/StoreComponents/ProductComp/StorePage";

export default async function Home() {
  return (
    <div className="mt-20 w-full">
      <StoreHomeCarocel />
      <StorePage />
    </div>
  );
}
