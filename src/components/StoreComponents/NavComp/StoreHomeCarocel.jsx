"use client";

// Shadcn Comp
import { Button } from "@/components/ui/button";

// Next
import Image from "next/image";

// React
import { useEffect, useState, useCallback } from "react";

// React Icons
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const ImageCarocel = [
  { id: 1, pic: "/Ecommerce Banners/1.svg" },
  { id: 2, pic: "/Ecommerce Banners/2.svg" },
  { id: 3, pic: "/Ecommerce Banners/3.svg" },
  { id: 4, pic: "/Ecommerce Banners/4.svg" },
];

const CAROUSEL_LENGTH = ImageCarocel.length;

const StoreHomeCarocel = () => {
  const [active, setActive] = useState(0);

  const nextSlide = useCallback(() => {
    setActive((prev) => (prev + 1) % CAROUSEL_LENGTH);
  }, []);

  const prevSlide = useCallback(() => {
    setActive((prev) => (prev - 1 + CAROUSEL_LENGTH) % CAROUSEL_LENGTH);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(nextSlide, 5000);
    return () => clearInterval(intervalId);
  }, [nextSlide]);

  return (
    /* 1. Changed height to be responsive (h-auto) and added aspect ratio */
    <div className="w-11/12 relative mx-auto mb-8 rounded-2xl overflow-hidden group aspect-2/1 md:aspect-3/1 lg:aspect-4/1 h-[400px]">
      <div className="w-full h-full relative">
        {ImageCarocel.map((image, index) => (
          <div
            key={image.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              active === index ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={image.pic}
              alt={"Slide " + image.id}
              fill
              // 2. Changed to object-cover to ensure the div is filled
              className="object-cover "
              priority={index === 0}
            />
          </div>
        ))}
      </div>

      {/* Navigation Arrows - Only show on hover for cleaner look */}
      <div className="absolute inset-0 flex items-center justify-between px-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          className="rounded-full bg-white/20 hover:bg-white/40 p-2"
          onClick={prevSlide}
        >
          <IoIosArrowBack className="w-10 h-10 text-white" />
        </Button>
        <Button
          variant="ghost"
          className="rounded-full bg-white/20 hover:bg-white/40 p-2"
          onClick={nextSlide}
        >
          <IoIosArrowForward className="w-10 h-10 text-white" />
        </Button>
      </div>

      {/* Dots Indicator */}
      <div className="absolute flex items-center gap-2 bottom-4 left-1/2 -translate-x-1/2">
        {ImageCarocel.map((_, index) => (
          <button
            key={index}
            className={`h-2 transition-all rounded-full cursor-pointer ${
              active === index ? "bg-gray-200 w-6" : "bg-white/50 w-2"
            }`}
            onClick={() => setActive(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default StoreHomeCarocel;
