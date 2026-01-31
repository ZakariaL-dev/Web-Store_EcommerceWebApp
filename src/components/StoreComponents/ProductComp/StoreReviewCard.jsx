"use client";

// Shadcn Comp
import { Button } from "@/components/ui/button";
import Rating from "@/components/ui/rating";

// React
import { useState } from "react";

// React Icons
import { FaRegThumbsUp } from "react-icons/fa";
import { MdOutlineReportProblem } from "react-icons/md";

// My Components
import StoreURDialogue from "../StoreURDialogue";


const StoreReviewCard = ({ r, currentUserId }) => {
  const isOwnReview = r.user._id === currentUserId;

  const [URDialogue, setURDialogue] = useState(false);

  return (
    <div className="px-4 border-b-2 py-3 last:border-0 mb-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1>
            <Rating value={r.rating} size={18} readOnly />
          </h1>
          <p className="font-bold text-lg">{r.title}</p>
          <p className="ml-4 -mr-3 font-semibold text-gray-700">par</p>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <p className="font-bold">{r.name}</p>
            <p>-</p>
            <p className="font-semibold">{r.timeOfSubmit}</p>
          </div>
        </div>
        {!isOwnReview && (
          <div className="flex items-center gap-2 text-xs">
            <Button size={2} variant={"link"} className="text-blue-600">
              <FaRegThumbsUp />
              Helpfull
            </Button>
            <p className="font-bold text-md">|</p>
            <Button
              size={5}
              variant={"link"}
              className="text-red-500"
              onClick={() => setURDialogue(true)}
            >
              <MdOutlineReportProblem />
              Report User
            </Button>
          </div>
        )}
      </div>
      <div className="mt-3">{r.comment}</div>
      {URDialogue && (
        <StoreURDialogue
          OpenStatus={URDialogue}
          OpenToggle={setURDialogue}
          UId={currentUserId}
          reportedU={r.user}
        />
      )}
    </div>
  );
};

export default StoreReviewCard;
