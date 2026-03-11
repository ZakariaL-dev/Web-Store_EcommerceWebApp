"use client";

import { useState } from "react";

const DashProductImgsDisplay = ({ imgs }) => {
  const [displayImg, setDisplayImg] = useState(imgs[0]);
  const handleBigImg = (i) => {
    setDisplayImg(imgs[i]);
  };
  return (
    <div className="flex flex-col gap-3.5">
      <div
        style={{ backgroundImage: `url(${displayImg})` }}
        className="bg-cover bg-center w-85 h-85 rounded-2xl border-2 border-gray-700"
      ></div>
      <div className="flex flex-row items-center gap-2">
        {imgs.map((img, i) => {
          const isSelected = displayImg === img;
          return (
            <div
              key={i}
              style={{ backgroundImage: `url(${img})` }}
              className={`bg-cover bg-center w-20 h-20 rounded-xl mb-3 cursor-pointer transition-all ease-in-out duration-300 hover:scale-110 hover:shadow-xl ${
                isSelected
                  ? "border-2 border-slate-600"
                  : "border border-slate-400"
              } `}
              onClick={() => handleBigImg(i)}
            ></div>
          );
        })}
      </div>
    </div>
  );
};

export default DashProductImgsDisplay;
