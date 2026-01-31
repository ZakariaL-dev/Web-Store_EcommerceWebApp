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



const StoreFeaturedProducts = () => {
  const { products, getAllProducts } = useProductStore();

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  const [moving, setMoving] = useState(0);
  // Function to move to the previous Product
  const nextProduct = useCallback(() => {
    setMoving((prev) => (prev + 1) % products.length);
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
    <div className="max-w-7xl mx-auto mb-8 overflow-hidden">
      <header className="bg-slate-100 px-5 flex items-center justify-between py-2 font-bold text-xl text-slate-500 rounded-md mb-2.5">
        You might also like:
        <div>
          <Button variant="ghost" className={"hover:bg-slate-200 p-2"} asChild>
            <IoMdArrowRoundBack
              onClick={() => prevProduct()}
              className="w-10 h-10"
            />
          </Button>
          <Button variant="ghost" className={"hover:bg-slate-200 p-2"} asChild>
            <IoMdArrowRoundForward
              onClick={() => nextProduct()}
              className="w-10 h-10"
            />
          </Button>
        </div>
      </header>
      <main
        className="flex gap-4 transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${moving * 176}px)` }}
      >
        {products.map((p) => {
          return <StoreProductCard key={p._id} product={p} />;
        })}
      </main>
    </div>
  );
};

export default StoreFeaturedProducts;
