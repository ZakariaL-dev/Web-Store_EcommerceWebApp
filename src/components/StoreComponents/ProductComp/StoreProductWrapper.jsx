"use client";

// Stores
import { useProductStore } from "@/utils/ProductStore";

// React
import { useEffect } from "react";

// My Components
import StoreProductPage from "./StoreProductPage";


const StoreProductPageWrapper = ({ slug }) => {
  const { currentProduct, getAProduct } = useProductStore();

  useEffect(() => {
    if (slug) {
      getAProduct(slug);
    }
  }, [slug, getAProduct]);

  if (!currentProduct) {
    return <div className="p-10 h-screen text-center">Loading product data...</div>;
  }

  return <StoreProductPage current={currentProduct} />;
};

export default StoreProductPageWrapper;
