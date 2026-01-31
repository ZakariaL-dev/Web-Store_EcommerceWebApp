"use client";

// Stores
import { useProductStore } from "@/utils/ProductStore";

// React
import { useEffect } from "react";

// My Components
import DashEditProductForm from "./DashEditProductForm";


const DashEditProductFormWrapper = ({ slug }) => {
  const { currentProduct, getAProduct } = useProductStore();

  useEffect(() => {
    if (slug) {
      getAProduct(slug);
    }
  }, [slug, getAProduct]);

  if (!currentProduct) {
    return <div className="p-10 text-center">Loading product data...</div>;
  }

  return <DashEditProductForm current={currentProduct} />;
};

export default DashEditProductFormWrapper;
