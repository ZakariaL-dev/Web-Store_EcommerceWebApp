"use client";

// Shadcn Comp
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

// react icons
import { IoGrid } from "react-icons/io5";
import { IoGridOutline } from "react-icons/io5";
import { FaList } from "react-icons/fa6";
import { CiBoxList } from "react-icons/ci";
import { useContext, useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";

// My Contexts
import { FiltersToggleContext } from "@/contexts/FilterToggleContext";

// My Components
import StoreSearchProductCardList from "../SearchComp/StoreSearchProductCardList";
import StoreSearchProductCard from "../SearchComp/StoreSearchProductCard";

// Stores
import { useProductStore } from "@/utils/ProductStore";


const StoreProducts = () => {
  const [view, setView] = useState("grid");

  const { setOpenFilters } = useContext(FiltersToggleContext);

  const { products, getAllProducts } = useProductStore();

  useEffect(() => {
    getAllProducts();
  }, [getAllProducts]);

  if (!products) {
    return (
      <div className="lg:w-3/4 w-full flex h-32 items-center justify-center text-muted-foreground">
        Loading products...
      </div>
    );
  }

  return (
    <div className="lg:w-3/4 w-full">
      <nav className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3 pl-4">
          <Button variant="ghost" className="p-2 block lg:hidden" asChild>
            <FiFilter
              className="w-8 h-8"
              onClick={() => {
                setOpenFilters(true);
              }}
            />
          </Button>
          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="From A-Z">From A-Z</SelectItem>
                <SelectItem value="From Z-A">From Z-A</SelectItem>
                <SelectItem value="Newest First">Newest First</SelectItem>
                <SelectItem value="Oldest First">Oldest First</SelectItem>
                <SelectItem value="Cheapest First">Cheapest First</SelectItem>
                <SelectItem value="Expensive First">Expensive First</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-5">
          <NativeSelect className="w-24 md:block hidden">
            <NativeSelectOption value="10">10</NativeSelectOption>
            <NativeSelectOption value="20">20</NativeSelectOption>
            <NativeSelectOption value="30">30</NativeSelectOption>
            <NativeSelectOption value="40">40</NativeSelectOption>
            <NativeSelectOption value="50">50</NativeSelectOption>
          </NativeSelect>
          <div>
            <Button
              variant="ghost"
              className="p-2"
              onClick={() => setView("list")}
              asChild
            >
              {view === "list" ? (
                <FaList className="w-10 h-10" />
              ) : (
                <CiBoxList className="w-11 h-11" />
              )}
            </Button>
            <Button
              variant="ghost"
              className="p-2"
              onClick={() => setView("grid")}
              asChild
            >
              {view === "grid" ? (
                <IoGrid className="w-10 h-10" />
              ) : (
                <IoGridOutline className="w-10 h-10" />
              )}
            </Button>
          </div>
        </div>
      </nav>
      {view === "grid" ? (
        <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {products.map((p) => {
            return <StoreSearchProductCard key={p._id} product={p} />;
          })}
        </main>
      ) : (
        <div>
          {products.map((p) => {
            return <StoreSearchProductCardList key={p._id} product={p} />;
          })}
        </div>
      )}
    </div>
  );
};

export default StoreProducts;
