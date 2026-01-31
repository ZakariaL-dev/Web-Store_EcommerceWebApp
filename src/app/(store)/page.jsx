// My Components
import StoreHomeCarocel from "@/components/StoreComponents/NavComp/StoreHomeCarocel";
import StoreAllProducts from "@/components/StoreComponents/ProductComp/StoreAllProducts";
import StoreNewProducts from "@/components/StoreComponents/ProductComp/StoreNewProducts";
import StorePopularProducts from "@/components/StoreComponents/ProductComp/StorePopularProducts";
import StoreProductsOnSale from "@/components/StoreComponents/ProductComp/StoreProductsOnSale";

export default async function Home() {
  return (
    <div className="mt-20 w-full">
      <StoreHomeCarocel />
      <StoreNewProducts />
      <StorePopularProducts />
      <StoreProductsOnSale />
      <StoreAllProducts />
    </div>
  );
}
