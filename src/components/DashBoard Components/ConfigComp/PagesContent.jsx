"use client"

// Stores
import { useConfigureStore } from "@/utils/ConfigStore";

// My Components
import PagesContents from "./ContentComp/PagesContents";

const PagesContent = () => {
const { config } = useConfigureStore();
  if (!config || !config.contents)
    return (
      <div className="lg:w-3/4 w-full flex h-32 items-center justify-center text-muted-foreground">
        Loading pages contents...
      </div>
    );

  return (
    <div className="w-full border-2 rounded-lg p-3 bg-slate-50">
      <header className="text-lg mb-3 font-semibold">
        Page Content Management
      </header>
      <PagesContents c={config.contents}/>
    </div>
  );
}

export default PagesContent