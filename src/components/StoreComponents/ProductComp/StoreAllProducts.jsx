"use client";

// Shadcn Comp
import { Button } from "@/components/ui/button";

// React Icons
import { IoMdArrowRoundBack, IoMdArrowRoundForward } from "react-icons/io";

// My Components
import StoreProductCard from "./StoreProductCard";

// React
import { useCallback, useEffect, useState } from "react";

// Stores
import { useProductStore } from "@/utils/ProductStore";


const StoreAllProducts = () => {
  const { products, getAllProducts } = useProductStore();

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const [moving, setMoving] = useState(0);
  // Function to move to the previous Product
  const nextProduct = useCallback(() => {
    setMoving((prev) => {
      const maxMove = products.length - 5;
      return prev < maxMove ? prev + 1 : prev;
    });
  }, [products.length]);
  // Function to move to the previous Product
  const prevProduct = useCallback(() => {
    setMoving((prev) => (prev <= 0 ? 0 : prev - 1));
  }, []);

  if (!products) {
    return (
      <div className="lg:w-3/4 w-full flex h-32 items-center justify-center text-muted-foreground">
        Loading products...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto mb-6 overflow-hidden">
      <header className="flex items-center justify-between px-5">
        <h1 className="text-3xl font-bold">All Products</h1>
        <div>
          <Button variant="ghost" disabled={moving === 0} asChild>
            <IoMdArrowRoundBack
              onClick={() => prevProduct()}
              className="w-12 h-12"
            />
          </Button>
          <Button
            variant="ghost"
            disabled={moving >= (products?.length || 0) - 5}
            asChild
          >
            <IoMdArrowRoundForward
              onClick={() => nextProduct()}
              className="w-12 h-12"
            />
          </Button>
        </div>
      </header>
      <main
        className="flex gap-4 transition-transform duration-500 ease-in-out my-4"
        style={{ transform: `translateX(-${moving * 256}px)` }}
      >
        {products.map((p) => {
          return <StoreProductCard key={p._id} product={p} />;
        })}
      </main>
      <footer className="w-full text-center mt-3">
        <Button variant={"outline"} className="py-6 px-9">
          Explore All Products
        </Button>
      </footer>
    </div>
  );
};

export default StoreAllProducts;
