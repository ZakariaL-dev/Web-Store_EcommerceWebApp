"use client";

// Stores
import { useConfigureStore } from "@/utils/ConfigStore";

// My Components
import FilterConfigForm from "./FilterConfigForm";


const SearchFilters = () => {
  const { config } = useConfigureStore();
  if (!config || !config.filters)
    return (
      <div className="lg:w-3/4 w-full flex h-32 items-center justify-center text-muted-foreground">
        Loading filters...
      </div>
    );

  return (
    <div className="w-full border-2 rounded-lg p-3 bg-slate-50">
      <header className="text-lg mb-3 font-semibold">
        Search Filters Configuration
      </header>
      <FilterConfigForm f={config.filters} />
    </div>
  );
};

export default SearchFilters;
