"use client";

import { useProductStore } from "@/utils/ProductStore";
import { useEffect } from "react";
import DashProductImgsDisplay from "./DashProductImgsDisplay";
import { Button } from "@/components/ui/button";
import { RxDoubleArrowLeft } from "react-icons/rx";
import { useRouter } from "next/navigation";

const DashProductDetails = ({ slug }) => {
  const router = useRouter();

  const { getAProduct, currentProduct } = useProductStore();
  useEffect(() => {
    getAProduct(slug);
  }, [getAProduct, slug]);

  if (!currentProduct) {
    return (
      <div className="flex flex-col w-full my-3 h-32 items-center justify-center text-muted-foreground">
        Loading Product...
      </div>
    );
  }

  return (
    <div className="py-6 px-3 w-full space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Product Details</h1>
        <Button onClick={() => router.push(`/admin/dashboard/product/editing/${slug}`)}>
          Edit Product
        </Button>
        </header>
      <main className="grid grid-cols-[2fr_4fr] gap-x-8 gap-y-4 grid-rows-2">
        {/* pics */}
        <div className="bg-slate-50 space-y-3 p-3 rounded-xl shadow-md">
          <h3 className="font-medium">Media</h3>
          <DashProductImgsDisplay imgs={currentProduct.previewImages} />
        </div>
        {/* General infos */}
        <div className="bg-slate-50 space-y-3 p-3 rounded-xl shadow-md">
          <h3 className="font-medium">General Informations</h3>
          <main className="space-y-4">
            {/* title */}
            <div>
              <h6 className="font-light underline">Product Name:</h6>
              <p>{currentProduct.title}</p>
            </div>
            {/* descr */}
            <div>
              <h6 className="font-light underline">Product Description:</h6>
              <p>{currentProduct.description}</p>
            </div>
            {/* categ */}
            <div>
              <h6 className="font-light underline">Product Category:</h6>
              <p className="capitalize">{currentProduct.category}</p>
            </div>
            {/* status */}
            <div>
              <h6 className="font-light underline">Product Status:</h6>
              <p className="capitalize">{currentProduct.status}</p>
            </div>
            {/* price */}
            <div>
              <h6 className="font-light underline">Product Pricing:</h6>
              <p className="font-medium text-gray-500">
                Base Price:{" "}
                <span>
                  {currentProduct.status === "on sale" ? (
                    <span className="flex gap-4 my-5">
                      <h1 className="mb-3 font-bold line-through text-gray-400">
                        {currentProduct.price} Dz
                      </h1>
                      <h1 className="mb-3 font-bold text-red-700">
                        {(
                          currentProduct.price -
                          (currentProduct.price * currentProduct.discount) / 100
                        ).toFixed(2)}
                        Dz
                      </h1>
                    </span>
                  ) : (
                    <span className="mb-3 font-bold text-gray-400 py-3">
                      {currentProduct.price} Dz
                    </span>
                  )}
                </span>
              </p>
              <p className="font-medium text-gray-500">
                Discount:{" "}
                <span className="text-green-800">
                  - {currentProduct.discount} %
                </span>
              </p>
            </div>
          </main>
        </div>
        {/* variants */}
        <div className="bg-slate-50 space-y-3 p-3 rounded-xl shadow-md">
          <h3 className="font-medium">Variants & Inventory</h3>
          <main className="space-y-2">
            {currentProduct.variants.map((v) => {
              return (
                <div
                  key={v._id}
                  className="bg-slate-100 border border-gray-400 rounded-md flex items-start justify-between p-3  text-sm"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="bg-white font-bold rounded-full flex items-center justify-center w-10 h-10 border border-gray-400 text-base text-gray-600">
                      {v.size}
                    </div>
                    <div>
                      <h2 className=" font-bold ">{v.color}</h2>
                      <p className="text-xs font-semibold text-gray-400">
                        SKU: #{v._id.slice(-6)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right pr-4">
                    <h2 className="text-xs font-semibold text-gray-400">
                      Quantity
                    </h2>
                    <p
                      className={`font-bold ${v.quantity > 10 ? "text-green-600" : "text-red-600"}`}
                    >
                      {v.quantity}
                    </p>
                  </div>
                </div>
              );
            })}
          </main>
        </div>
      </main>
      <footer>
        <Button variant={"outline"} onClick={() => router.back()}>
          <RxDoubleArrowLeft />
          Back To Products
        </Button>
      </footer>
    </div>
  );
};

export default DashProductDetails;
