"use client";

// Shadcn Comp
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

// Utils
import { HandeResults } from "@/lib/HandeResults";

// Stores
import { useConfigureStore } from "@/utils/ConfigStore";

// React
import { useState } from "react";

// React Icons
import { IoRemoveCircleOutline } from "react-icons/io5";


const FilterConfigForm = ({ f }) => {
  const [Filters, setFilters] = useState({
    priceRange: {
      min: f?.priceRange?.min ?? 0,
      max: f?.priceRange?.max ?? 0,
    },
    colors: f?.colors ?? [],
    sizes: f?.sizes ?? [],
  });

  const [colorInput, setColorInput] = useState("");
  const [sizeInput, setSizeInput] = useState("");

  const addTag = (type, value, setInput) => {
    const trimmedValue = value.trim();

    // Check if value is not empty and not already in the list
    if (trimmedValue && !Filters[type].includes(trimmedValue)) {
      setFilters((prev) => ({
        ...prev,
        [type]: [...prev[type], trimmedValue],
      }));
      setInput(""); // Clear the specific input
    }
  };

  // Function to remove a tag
  const removeTag = (type, tagToRemove) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type].filter((tag) => tag !== tagToRemove),
    }));
  };

  const { updateConfigure } = useConfigureStore();

  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);

    const { success, message } = await updateConfigure(
      process.env.NEXT_PUBLIC_Store_Config,
      Filters,
      "filters",
    );

    HandeResults(success, message);
    setLoading(false);
  };

  return (
    <>
      <div className="my-2 bg-white p-3 rounded-lg mx-1.5 border-2">
        <h1 className="font-bold">Price Range</h1>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4 my-3">
          <div>
            <Label htmlFor="min" className="mb-2">
              Minimum Price (Dz)
            </Label>
            <Input
              id="min"
              type={"number"}
              min={0}
              value={Filters.priceRange.min}
              onChange={(e) =>
                setFilters({
                  ...Filters,
                  priceRange: { ...Filters.priceRange, min: e.target.value },
                })
              }
            />
          </div>
          <div>
            <Label htmlFor="max" className="mb-2">
              Maximum Price (Dz)
            </Label>
            <Input
              id="max"
              type={"number"}
              min={0}
              value={Filters.priceRange.max}
              onChange={(e) =>
                setFilters({
                  ...Filters,
                  priceRange: { ...Filters.priceRange, max: e.target.value },
                })
              }
            />
          </div>
        </div>
      </div>
      {/*  */}
      <div className="my-2 bg-white p-3 rounded-lg mx-1.5 border-2">
        <h1 className="font-bold">Available Colors</h1>
        <div className="flex flex-wrap gap-2 my-2">
          {Filters.colors.map((color) => (
            <Badge
              key={color}
              variant="secondary"
              className="flex items-center gap-1 px-2 py-1"
            >
              {color}
              <button
                type="button"
                onClick={() => removeTag("colors", color)}
                className="ml-1 rounded-full outline-none hover:text-destructive transition-colors cursor-pointer"
              >
                <IoRemoveCircleOutline size={16} />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-3">
          <Input
            placeholder="Add new color"
            value={colorInput}
            onChange={(e) => setColorInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && addTag("colors", colorInput, setColorInput)
            }
          />
          <Button
            className="bgcolor"
            onClick={() => addTag("colors", colorInput, setColorInput)}
          >
            Add
          </Button>
        </div>
      </div>
      {/*  */}
      <div className="my-2 bg-white p-3 rounded-lg mx-1.5 border-2">
        <h1 className="font-bold">Available Sizes</h1>
        <div className="flex flex-wrap gap-2 my-2">
          {Filters.sizes.map((size) => (
            <Badge
              key={size}
              variant="secondary"
              className="flex items-center gap-1 px-2 py-1"
            >
              {size}
              <button
                type="button"
                onClick={() => removeTag("sizes", size)}
                className="ml-1 rounded-full outline-none hover:text-destructive transition-colors cursor-pointer"
              >
                <IoRemoveCircleOutline size={16} />
              </button>
            </Badge>
          ))}
        </div>
        <div className="flex gap-3">
          <Input
            placeholder="Add new size"
            value={sizeInput}
            onChange={(e) => setSizeInput(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" && addTag("sizes", sizeInput, setSizeInput)
            }
          />
          <Button
            className="bgcolor"
            onClick={() => addTag("sizes", sizeInput, setSizeInput)}
          >
            Add
          </Button>
        </div>
      </div>
      <div className="mt-6 flex justify-end px-1.5">
        <Button
          className="bg-green-600 hover:bg-green-800 px-8"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? <Spinner /> : "Save Filter Settings"}
        </Button>
      </div>
    </>
  );
};

export default FilterConfigForm;
