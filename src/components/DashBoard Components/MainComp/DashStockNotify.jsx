"use client";
import { useProductStore } from "@/utils/ProductStore";
import DashStockCard from "./DashStockCard";
import { useEffect } from "react";

const DashStockNotify = () => {
  const { products, getAllProducts } = useProductStore();
  useEffect(() => {
    getAllProducts("all", null, "all");
  }, [getAllProducts]);

  if (!products["all"]) return;

  const AlmostOutOfStock = products["all"]
    .map((product) => {
      const lowStockVariants = product.variants.filter((v) => v.quantity < 10);

      if (lowStockVariants.length > 0) {
        return {
          id: product._id,
          title: product.title,
          slug: product.slug,
          price: product.price,
          imgs: product.previewImages,
          lowStockVariants: lowStockVariants,
        };
      }
      return null;
    })
    .filter((p) => p !== null);

  return (
    <div className="border-2 rounded-lg pt-2 overflow-hidden">
      <h2 className="font-bold mb-2.5 px-5 border-b-2 pb-3">Stock Threshold</h2>
      {AlmostOutOfStock.length != 0 ? (
        AlmostOutOfStock.map((p) => {
          return <DashStockCard key={p.id + p.title} stock={p} />;
        })
      ) : (
        <h1 className="w-full h-full text-center font-semibold pt-30 text-gray-400">
          Inventory is healthy! No items are currently low on stock.
        </h1>
      )}
    </div>
  );
};

export default DashStockNotify;
