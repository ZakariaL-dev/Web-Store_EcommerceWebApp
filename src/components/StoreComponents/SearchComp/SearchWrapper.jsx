"use client";

// My Contexts
import { FiltersToggleContext } from "@/contexts/FilterToggleContext";

// React
import { useState } from "react";

// My Components
import StoreSearchFilter from "./StoreSearchFilter";
import StoreProducts from "../ProductComp/StoreProducts";


const SearchWrapper = () => {
  const [OpenFilters, setOpenFilters] = useState(false);
  return (
    <FiltersToggleContext.Provider value={{ OpenFilters, setOpenFilters }}>
      <main className="flex gap-3 w-full relative">
        <StoreSearchFilter />
        <StoreProducts />
      </main>
    </FiltersToggleContext.Provider>
  );
};

export default SearchWrapper;
