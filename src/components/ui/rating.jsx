"use client";

import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { cn } from "@/lib/utils";

export default function Rating({
  value = 0,
  max = 5,
  size = 20,
  precision = 0.1,
  onChange,
  readOnly = false,
}) {
  const [hover, setHover] = useState(null);

  const calculateFill = (index) => {
    const current = hover ?? value;
    const diff = current - index;
    return Math.max(0, Math.min(1, diff));
  };

  const handleMouseMove = (e, index) => {
    if (readOnly) return;

    const { left, width } = e.currentTarget.getBoundingClientRect();
    const percent = (e.clientX - left) / width;
    const rawValue = index + percent;
    const stepped = Math.round(rawValue / precision) * precision;

    setHover(Number(stepped.toFixed(1)));
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, index) => {
        const fill = calculateFill(index);

        return (
          <div
            key={index}
            className={cn(
              "relative",
              readOnly ? "cursor-default" : "cursor-pointer"
            )}
            style={{ width: size, height: size }}
            onMouseMove={(e) => handleMouseMove(e, index)}
            onMouseLeave={() => setHover(null)}
            onClick={() => !readOnly && onChange?.(hover ?? value)}
          >
            {/* Empty star */}
            <FaStar size={size} className="absolute inset-0 text-gray-200" />

            {/* Filled star (clipped) */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ width: `${fill * 100}%` }}
            >
              <FaStar size={size} className="text-yellow-400" />
            </div>
          </div>
        );
      })}
    </div>
  );
}
