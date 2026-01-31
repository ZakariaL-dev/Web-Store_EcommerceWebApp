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

// My Contexts
import { FiltersToggleContext } from "@/contexts/FilterToggleContext";

// React Icons
import { MdSearch } from "react-icons/md";
import { HiXMark } from "react-icons/hi2";

// My Components
import { RangeSlider } from "./StoreRangeSlide";

// React
import { useContext, useState } from "react";


const StoreSearchFilter = () => {
  const [range, setRange] = useState([104.94, 625.32]);
  const colors = [
    "Red",
    "Olive",
    "Black",
    "White",
    "Purple",
    "Green",
    "Brown",
    "Teal",
    "Gold",
    "Grey",
  ];
  const categories = ["Man", "Woman", "Kids", "Accessories"];
  const sizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"];

  const { OpenFilters, setOpenFilters } = useContext(FiltersToggleContext);

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
        <Button variant={"link"} className="text-sm text-gray-400">
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
                min={0}
                max={1000}
                step={1}
                value={range}
                onValueChange={setRange}
              />
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="category">
            <AccordionTrigger>Category</AccordionTrigger>
            <AccordionContent>
              {categories.map((c, i) => {
                return (
                  <div
                    key={i}
                    className="hover:bg-slate-50 mb-1 px-4 py-3 rounded-lg flex gap-3"
                  >
                    <Checkbox id={`item ${i}`} />
                    <Label htmlFor={`item ${i}`} className="w-full">
                      {c}
                    </Label>
                  </div>
                );
              })}
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="color">
            <AccordionTrigger>Color</AccordionTrigger>
            <AccordionContent>
              <InputGroup noFocus className="mb-3 mt-2">
                <InputGroupInput placeholder="Search..." />
                <InputGroupAddon>
                  <MdSearch />
                </InputGroupAddon>
              </InputGroup>
              <div>
                {colors.map((c, i) => {
                  return (
                    <div
                      key={i}
                      className="hover:bg-slate-50 mb-1 px-4 py-3 rounded-lg flex gap-3"
                    >
                      <Checkbox id={`item ${i}`} />
                      <Label htmlFor={`item ${i}`} className="w-full">
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
              {sizes.map((c, i) => {
                return (
                  <div
                    key={i}
                    className="hover:bg-slate-50 mb-1 px-4 py-3 rounded-lg flex gap-3"
                  >
                    <Checkbox id={`item ${i}`} />
                    <Label htmlFor={`item ${i}`} className="w-full">
                      {c}
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
