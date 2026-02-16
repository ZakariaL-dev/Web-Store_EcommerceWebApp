"use client";

// My Contexts
import { FiltersToggleContext } from "@/contexts/FilterToggleContext";

// React
import { useEffect, useState } from "react";

// My Components
import StoreSearchFilter from "./StoreSearchFilter";
import StoreProducts from "../ProductComp/StoreProducts";
import { useConfigureStore } from "@/utils/ConfigStore";

const SearchWrapper = () => {
  const [OpenFilters, setOpenFilters] = useState(false);
  const { config, fetchConfigure } = useConfigureStore();

  useEffect(() => {
    fetchConfigure("filters");
  }, [fetchConfigure]);
  
if (!config) return;

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
