"use client";

// Shadcn Comp
import { Button } from "@/components/ui/button";

// React Icons
import { FiMinus, FiPlus } from "react-icons/fi";


const StoreProductCounter = ({ value, onChange, min = 1, max }) => {
  const decrease = () => {
    if (value > min) {
      onChange(value - 1);
    }
  };

  const increase = () => {
    if (value < max) {
      onChange(value + 1);
    }
  };

  return (
    <div className="flex items-center border rounded-lg px-2 py-1 w-28 ">
      <Button
        variant="ghost"
        size="icon"
        onClick={decrease}
        disabled={value <= min}
      >
        <FiMinus />
      </Button>

      <span className="w-8 text-center font-semibold">{value}</span>

      <Button
        variant="ghost"
        size="icon"
        onClick={increase}
        disabled={value >= max}
      >
        <FiPlus />
      </Button>
    </div>
  );
};

export default StoreProductCounter;
