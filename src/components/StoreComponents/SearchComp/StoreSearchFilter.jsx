"use client";

// Shadcn Comp
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

// My Contexts
import { FiltersToggleContext } from "@/contexts/FilterToggleContext";

// React Icons
import { MdSearch } from "react-icons/md";
import { HiXMark } from "react-icons/hi2";

// My Components
import { RangeSlider } from "./StoreRangeSlide";

// React
import { useContext, useEffect, useState } from "react";
import { useConfigureStore } from "@/utils/ConfigStore";

import { useRouter, usePathname, useSearchParams } from "next/navigation";

const StoreSearchFilter = () => {
  const searchParams = useSearchParams();
  const categories = ["Man", "Woman", "Kids", "Accessories"];
  const { OpenFilters, setOpenFilters } = useContext(FiltersToggleContext);
  const { config } = useConfigureStore();

  const [range, setRange] = useState([
    config.filters.priceRange.min,
    config.filters.priceRange.max,
  ]);
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("category") || "all",
  );
  const [selectedColors, setSelectedColors] = useState([]);
  const [selectedSizes, setSelectedSizes] = useState([]);

  // --- 2. The Reset Function ---
  const handleClearAll = () => {
    setRange([config.filters.priceRange.min, config.filters.priceRange.max]);
    setSelectedCategory("all");
    setSelectedColors([]);
    setSelectedSizes([]);
  };

  // Helper to toggle items in arrays (Colors/Sizes)
  const toggleItem = (list, setList, item) => {
    setList((prev) =>
      prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item],
    );
  };

  // search link & system
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const params = new URLSearchParams();

    // Set simple values
    params.set("min", range[0].toString());
    params.set("max", range[1].toString());
    params.set("category", selectedCategory);

    // Set multi-select values (joined by space as per your example)
    if (selectedColors.length > 0) {
      params.set("color", selectedColors.join(" "));
    }
    if (selectedSizes.length > 0) {
      params.set("size", selectedSizes.join(" "));
    }

    // Update the URL without a full page reload
    // scroll: false prevents jumping to top of page on every click
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [
    range,
    selectedCategory,
    selectedColors,
    selectedSizes,
    pathname,
    router,
  ]);

  return (
    <div
      className={`
        fixed inset-y-0 left-0 z-50 w-full md:w-1/2 bg-white border-r-2 
        transition-transform duration-300 ease-in-out
        shadow-[10px_0_15px_-3px_rgba(0,0,0,0.1)]
        ${OpenFilters ? "translate-x-0" : "-translate-x-full"}

        lg:relative lg:translate-x-0 lg:w-1/4 lg:block lg:z-0 lg:shadow-none lg:pl-0 lg:pr-2
        
        h-full overflow-y-auto px-5
      `}
    >
      <div className="w-full flex justify-end my-2 lg:hidden">
        <Button variant="ghost" className="p-2 block" asChild>
          <HiXMark
            className="w-10 h-10"
            onClick={() => {
              setOpenFilters(false);
            }}
          />
        </Button>
      </div>
      <header className="flex items-start justify-between w-full">
        <h1 className="font-semibold text-xl">Filters:</h1>
        <Button
          variant={"link"}
          className="text-sm text-gray-400"
          onClick={handleClearAll}
        >
          Clear All
        </Button>
      </header>
      <Separator className="my-4 border-2 rounded-full" />
      <main className="pr-4">
        <Accordion
          type="multiple"
          collapsible
          defaultValue={["price", "category", "color", "size"]}
        >
          <AccordionItem value="price">
            <AccordionTrigger>Price</AccordionTrigger>
            <AccordionContent>
              <div className="flex gap-6 mb-4">
                <InputGroup noFocus>
                  <InputGroupInput
                    type="number"
                    value={range[0]}
                    onChange={(e) =>
                      setRange([Number(e.target.value), range[1]])
                    }
                  />
                  <InputGroupAddon>From</InputGroupAddon>
                </InputGroup>
                <InputGroup noFocus>
                  <InputGroupInput
                    type="number"
                    value={range[1]}
                    onChange={(e) =>
                      setRange([range[0], Number(e.target.value)])
                    }
                  />
                  <InputGroupAddon>To</InputGroupAddon>
                </InputGroup>
              </div>
              <RangeSlider
                min={config.filters.priceRange.min}
                max={config.filters.priceRange.max}
                step={1}
                value={range}
                onValueChange={setRange}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="category">
            <AccordionTrigger>Category</AccordionTrigger>
            <AccordionContent>
              <RadioGroup
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <div className="flex items-center gap-3 w-full my-1 ml-2">
                  <RadioGroupItem id="all" value="all" />
                  <Label htmlFor="all">ALL</Label>
                </div>
                {categories.map((c, i) => {
                  return (
                    <div
                      key={i}
                      className="flex items-center gap-3 w-full my-1 ml-2"
                    >
                      <RadioGroupItem value={c} id={c} />
                      <Label htmlFor={c}>{c}</Label>
                    </div>
                  );
                })}
              </RadioGroup>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="color">
            <AccordionTrigger>Color</AccordionTrigger>
            <AccordionContent>
              {/* <InputGroup noFocus className="mb-3 mt-2">
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon>
                  <MdSearch />
                </InputGroupAddon>
              </InputGroup> */}
              <div>
                {config.filters.colors.map((c, i) => {
                  return (
                    <div
                      key={i}
                      className="hover:bg-slate-50 mb-1 px-4 py-3 rounded-lg flex gap-3"
                    >
                      <Checkbox
                        id={`color ${i}`}
                        checked={selectedColors.includes(c)}
                        onCheckedChange={() =>
                          toggleItem(selectedColors, setSelectedColors, c)
                        }
                      />
                      <Label
                        htmlFor={`color ${i}`}
                        className="w-full capitalize"
                      >
                        {c}
                      </Label>
                    </div>
                  );
                })}
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="size">
            <AccordionTrigger>Size</AccordionTrigger>
            <AccordionContent>
              {config.filters.sizes.map((s, i) => {
                return (
                  <div
                    key={i}
                    className="hover:bg-slate-50 mb-1 px-4 py-3 rounded-lg flex gap-3"
                  >
                    <Checkbox
                      id={`size ${i}`}
                      checked={selectedSizes.includes(s)}
                      onCheckedChange={() =>
                        toggleItem(selectedSizes, setSelectedSizes, s)
                      }
                    />
                    <Label htmlFor={`size ${i}`} className="w-full">
                      {s}
                    </Label>
                  </div>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </main>
    </div>
  );
};

export default StoreSearchFilter;
