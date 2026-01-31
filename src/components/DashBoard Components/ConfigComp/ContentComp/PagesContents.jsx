"use client";

// React
import { useState } from "react";

// React Icons
import { CiEdit } from "react-icons/ci";

// My Components
import ContentPageUpdate from "./ContentPageUpdate";

const PagesContents = ({ c }) => {
  const [Open, setOpen] = useState(null);
  return (
    <>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4">
        {c.map((cp) => {
          return (
            <div key={cp._id} className="bg-white p-3 rounded-lg border-2">
              <h1 className="flex items-center justify-between mb-2 font-semibold">
                <span>{cp.title}</span>
                <CiEdit
                  className="text-[20px] cursor-pointer text-gray-500 hover:text-blue-800"
                  onClick={() => setOpen(cp)}
                />
              </h1>
              <p className="text-sm text-gray-600 font-medium">
                Last Update: {cp.updated}
              </p>
            </div>
          );
        })}
      </div>
      {Open && (
        <ContentPageUpdate
          OpenStatus={Open}
          OpenToggle={() => setOpen(null)}
          page={Open}
        />
      )}
    </>
  );
};

export default PagesContents;
