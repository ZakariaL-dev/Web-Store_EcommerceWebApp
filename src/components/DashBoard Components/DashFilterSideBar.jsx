"use client";

import { Button } from "../ui/button";
import { IoClose, IoRemoveCircleOutline } from "react-icons/io5";
import { Separator } from "../ui/separator";
import { useState } from "react";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Slider } from "../ui/slider";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Badge } from "../ui/badge";
import { useSearchStore } from "@/utils/SearchStore";

const Model_Filters = {
  orders: {
    status: ["pending", "delivered", "canceled"],
    payment_Status: ["paid", "unpaid"],
    payment_Method: ["Cash", "Card"],
    delivery_Place: ["Home", "Bureau"],
    amount: {
      min: 200,
      max: 20000,
      step: 100,
      unit: "Dz",
    },
    products_Quantity: {
      min: 1,
      max: 15,
      step: 1,
      unit: "",
    },
  },
  products: {
    category: ["man", "woman", "kids", "accessories"],
    price: {
      min: 10,
      max: 6500,
      step: 10,
      unit: "Dz",
    },
    status: ["new", "on sale", "normal"],
    discount: {
      min: 1,
      max: 70,
      step: 1,
      unit: "%",
    },
    variants: {
      size: ["XS", "S", "M", "L", "XL", "XXL", "24", "56"],
      color: ["Red", "Blue", "Dark Green", "Black", "White", "Pink", "Yellow"],
      quantity: ["available", "out of stock"],
    },
  },
  customers: {
    gender: ["male", "female"],
    role: ["user", "admin"],
    block_Status: ["blocked", "unblocked"],
  },
  reviews: {
    rating_Range: {
      min: 0,
      max: 5,
      step: 0.1,
      unit: "",
    },
  },
  userReports: {
    status: ["pending", "reviewed", "action_taken"],
    reason: [
      "Fraud or Scam",
      "Harassment or Inappropriate Content",
      "Review Manipulation",
      "Abusive Behavior and language",
      "Spam / Advertising",
      "Hate Speech",
      "Off-Topic",
      "Other",
    ],
  },
  productReports: {
    status: ["pending", "underReview", "resolved"],
    reason: [
      "Incorrect or Misleading Information",
      "Pricing Error",
      "Image Issue",
      "Incorrect Category",
      "Duplicate Listing",
      "Broken Links",
      "Discount Code Not Working",
      "Other",
    ],
  },
};

const DashFilterSideBar = ({ toggle, setToggle, type }) => {
  const capitalized = type.charAt(0).toUpperCase() + type.slice(1);

  const [selectedFilters, setSelectedFilters] = useState({});

  const [amount, setAmount] = useState([2500, 8000]);
  const [productsCount, setProductsCount] = useState([4, 10]);
  const [ratingRange, setRatingRange] = useState([1, 3.4]);
  const [priceRange, setpriceRange] = useState([1500, 4000]);
  const [discountRange, setdiscountRange] = useState([10, 40]);

  const rangeStateMap = {
    amount: { value: amount, setter: setAmount },
    products_Quantity: {
      value: productsCount,
      setter: setProductsCount,
    },
    price: { value: priceRange, setter: setpriceRange },
    discount: { value: discountRange, setter: setdiscountRange },
    rating_Range: { value: ratingRange, setter: setRatingRange },
  };

  // date filter
  const [dateMode, setDateMode] = useState("range"); // "range", or "specific"
  const [relativeType, setRelativeType] = useState(-1); // latest -1 or earliest 1
  const [specificDate, setSpecificDate] = useState("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });

  const addTag = (filterType, value, isVariant = false) => {
    if (!value) return;
    const trimmedValue = value.trim();

    setSelectedFilters((prev) => {
      if (isVariant) {
        const currentVariantTags = prev.variants?.[filterType] || [];
        if (!currentVariantTags.includes(trimmedValue)) {
          return {
            ...prev,
            variants: {
              ...prev.variants,
              [filterType]: [...currentVariantTags, trimmedValue],
            },
          };
        }
      } else {
        const currentTags = prev[filterType] || [];
        if (!currentTags.includes(trimmedValue)) {
          return {
            ...prev,
            [filterType]: [...currentTags, trimmedValue],
          };
        }
      }
      return prev;
    });
  };

  const removeTag = (filterType, tagToRemove, isVariant = false) => {
    setSelectedFilters((prev) => {
      if (isVariant) {
        return {
          ...prev,
          variants: {
            ...prev.variants,
            [filterType]: (prev.variants?.[filterType] || []).filter(
              (tag) => tag !== tagToRemove,
            ),
          },
        };
      } else {
        return {
          ...prev,
          [filterType]: (prev[filterType] || []).filter(
            (tag) => tag !== tagToRemove,
          ),
        };
      }
    });
  };

  // filter system
  const { getFilterRslts, clearFilters } = useSearchStore();

  function ClearFilters() {
    setSelectedFilters({});
    setDateMode("range");
    setRelativeType(-1);
    setSpecificDate("");
    setDateRange({ from: "", to: "" });
    setAmount([2500, 8000]);
    setProductsCount([4, 10]);
    setRatingRange([1, 3.4]);
    setpriceRange([1500, 4000]);
    setdiscountRange([10, 40]);
    clearFilters();
  }

  return (
    <div
      className={`fixed inset-0 w-full h-screen z-50 bg-black/50 flex items-center justify-end transition-opacity duration-350
        ${toggle ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      onClick={() => setToggle(false)}
    >
      <div
        className={`lg:w-[30%] md:w-1/2 w-[65%] h-screen bg-slate-50 shadow-lg p-4 flex flex-col transform transition-transform duration-300 ease-in-out
          ${toggle ? "translate-x-0" : "translate-x-full"}`}
        onClick={(e) => e.stopPropagation()}
      >
        <header>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-2xl font-semibold">Filters</h1>
              <p className="text-muted-foreground text-sm italic">
                {capitalized} Management
              </p>
            </div>
            <Button
              variant="ghost"
              className="flex items-center gap-2"
              onClick={() => setToggle(false)}
            >
              <IoClose />
            </Button>
          </div>
          <Separator />
        </header>
        <main className="flex-1 overflow-y-auto pr-1 my-4 space-y-5">
          {/* custom filters */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <Label className="text-[16px]">Date Filter</Label>
              <Select
                value={dateMode}
                onValueChange={() => {
                  setDateMode((prevMode) =>
                    prevMode === "range" ? "specific" : "range",
                  );
                  setSelectedFilters((prevSelectedFilters) => ({
                    ...prevSelectedFilters,
                    date: "",
                  }));
                }}
              >
                <SelectTrigger className={"w-[60%]"}>
                  <SelectValue placeholder="Select Date Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="range">
                      Custom Range (From - To)
                    </SelectItem>
                    <SelectItem value="specific">Specific Day</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            {dateMode === "range" && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date-picker-range"
                    className="justify-start px-2.5 font-normal w-full"
                  >
                    <CalendarIcon />
                    {dateRange?.from ? (
                      dateRange.to ? (
                        <>
                          {format(dateRange.from, "LLL dd, y")} -{" "}
                          {format(dateRange.to, "LLL dd, y")}
                        </>
                      ) : (
                        format(dateRange.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="p-0 w-auto" align="start">
                  <Calendar
                    mode="range"
                    defaultMonth={dateRange?.from}
                    selected={dateRange}
                    onSelect={(newValue) => {
                      setDateRange(newValue);
                      setSelectedFilters((prevSelectedFilters) => ({
                        ...prevSelectedFilters,
                        date: dateRange,
                      }));
                    }}
                    numberOfMonths={2}
                    disabled={(date) =>
                      date > new Date(new Date().setHours(0, 0, 0, 0))
                    }
                  />
                </PopoverContent>
              </Popover>
            )}
            {dateMode === "specific" && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    id="date-picker-simple"
                    className="justify-start font-normal w-full"
                  >
                    {specificDate ? (
                      format(specificDate, "PPP")
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={specificDate}
                    onSelect={(newValue) => {
                      setSpecificDate(newValue);
                      setSelectedFilters((prevSelectedFilters) => ({
                        ...prevSelectedFilters,
                        date: specificDate,
                      }));
                    }}
                    defaultMonth={specificDate}
                    disabled={(date) =>
                      date > new Date(new Date().setHours(0, 0, 0, 0))
                    }
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>
          <div className="space-y-1.5">
            <Label className="text-[16px]">Sort By:</Label>
            <RadioGroup
              value={relativeType}
              onValueChange={(newValue) => {
                setRelativeType(newValue);
                setSelectedFilters((prevSelectedFilters) => ({
                  ...prevSelectedFilters,
                  sort: newValue,
                }));
              }}
              className="w-full flex items-center gap-8 mt-4"
            >
              <div className="flex items-center gap-3">
                <RadioGroupItem value={-1} id="r1" />
                <Label htmlFor="r1" className="font-normal">
                  Latest Entries First
                </Label>
              </div>
              <div className="flex items-center gap-3">
                <RadioGroupItem value={1} id="r2" />
                <Label htmlFor="r2" className="font-normal">
                  Earliest Entries First
                </Label>
              </div>
            </RadioGroup>
          </div>

          {Object.entries(Model_Filters[type]).map(([label, value]) => {
            if (Array.isArray(value)) {
              return (
                <div key={label} className="space-y-1.5">
                  <Label className="text-[16px] capitalize">
                    {label.replaceAll("_", " ")}
                  </Label>
                  <Select
                    value=""
                    onValueChange={(newValue) => addTag(label, newValue)}
                  >
                    <SelectTrigger className="w-full" id="status">
                      <SelectValue placeholder="Select Option(s)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {value.map((v, i) => {
                          return (
                            <SelectItem
                              key={i}
                              value={v}
                              className={"capitalize"}
                            >
                              {v}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>

                  <div className="flex flex-wrap gap-1.5 my-1">
                    {(selectedFilters[label] || []).map((tag) => (
                      <Badge
                        key={tag}
                        // variant="outline"
                        className="flex items-center gap-1 px-2 py-1 capitalize"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(label, tag)}
                          className="ml-1 rounded-full outline-none hover:text-destructive transition-colors cursor-pointer"
                        >
                          <IoRemoveCircleOutline size={16} />
                        </button>
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            }
            if (typeof value === "object" && value !== null && "min" in value) {
              const currentRange = rangeStateMap[label];
              const unitLabel = value.unit ? ` ${value.unit}` : "";
              if (
                label === "discount" &&
                !selectedFilters?.status?.includes("on sale")
              ) {
                return null;
              }
              return (
                <div key={label} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-[16px] capitalize">
                      {label.replaceAll("_", " ")}
                    </Label>
                    <p className="text-muted-foreground">
                      [{currentRange.value[0]} {unitLabel} -{" "}
                      {currentRange.value[1]} {unitLabel}]
                    </p>
                  </div>
                  <Slider
                    value={currentRange.value}
                    onValueChange={(newValue) => {
                      currentRange.setter(newValue);
                      setSelectedFilters((prevSelectedFilters) => ({
                        ...prevSelectedFilters,
                        [label]: newValue,
                      }));
                    }}
                    min={Model_Filters[type][label].min}
                    max={Model_Filters[type][label].max}
                    step={Model_Filters[type][label].step}
                    className="mx-auto w-full mt-3"
                  />
                </div>
              );
            }
            if (
              label === "variants" &&
              typeof value === "object" &&
              value !== null
            ) {
              return (
                <div key={label} className="space-y-3 pt-2">
                  <Label className="text-lg mb-0">Variants</Label>
                  {Object.entries(value).map(([miniL, miniV]) => {
                    return (
                      <div key={miniL} className="space-y-1">
                        <Label className="text-[16px] capitalize underline text-gray-700">
                          {miniL.replaceAll("_", " ")}
                        </Label>
                        <Select
                          value=""
                          onValueChange={(newValue) =>
                            addTag(miniL, newValue, true)
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select Option(s)" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              {Array.isArray(miniV) &&
                                miniV.map((mv, mi) => {
                                  return (
                                    <SelectItem
                                      key={mi}
                                      value={mv}
                                      className={"capitalize"}
                                    >
                                      {mv}
                                    </SelectItem>
                                  );
                                })}
                            </SelectGroup>
                          </SelectContent>
                        </Select>

                        <div className="flex flex-wrap gap-1.5 my-1">
                          {(selectedFilters.variants?.[miniL] || []).map(
                            (mtag) => (
                              <Badge
                                key={mtag}
                                // variant="outline"
                                className="flex items-center gap-1 px-2 py-1 capitalize"
                              >
                                {mtag}
                                <button
                                  type="button"
                                  onClick={() => removeTag(miniL, mtag, true)}
                                  className="ml-1 rounded-full outline-none hover:text-destructive transition-colors cursor-pointer"
                                >
                                  <IoRemoveCircleOutline size={16} />
                                </button>
                              </Badge>
                            ),
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            }
          })}
        </main>
        <footer className="grid grid-cols-2 gap-5 mt-4">
          <Button
            onClick={() => {
              getFilterRslts(type, selectedFilters);
              clearFilters();
            }}
          >
            Apply Filters
          </Button>
          <Button variant={"outline"} onClick={ClearFilters}>
            Clear Filters
          </Button>
        </footer>
      </div>
    </div>
  );
};

export default DashFilterSideBar;
