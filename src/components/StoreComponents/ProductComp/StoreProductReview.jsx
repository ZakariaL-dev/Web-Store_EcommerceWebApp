"use client";

// React Icons
import { TbStarOff } from "react-icons/tb";

// Shadcn Comp
import { Button } from "@/components/ui/button";

// React
import { useEffect, useState } from "react";

// My Components
import StoreReviewDialogue from "../StoreReviewDialogue";
import StoreReviewCard from "./StoreReviewCard";

// Stores
import { useUserStore } from "@/utils/UserStore";
import { useReviewStore } from "@/utils/ReviewStore";


const StoreProductReview = ({ pId, pImage }) => {
  const [OpenToggle, setOpenToggle] = useState(false);
  const { currentUser } = useUserStore();
  const { reviews, getAllReviews } = useReviewStore();

  useEffect(() => {
    getAllReviews();
  }, [getAllReviews]);

  if (!reviews) {
    return (
      <div className="lg:w-3/4 w-full flex h-32 items-center justify-center text-muted-foreground">
        Loading Reviews...
      </div>
    );
  }

  const filteredReviews = reviews.filter((r) => r && r.product._id === pId);
  const hasUserAlreadyReviewed = filteredReviews.some(
    (r) => r.user._id === currentUser?._id,
  );

  return (
    <div className="mb-8">
      <header className="bg-slate-100 px-6 py-2 font-bold text-xl text-slate-500 rounded-md mb-2.5 flex items-center justify-between">
        <p>Reviews</p>
        {!hasUserAlreadyReviewed && (
          <Button
            size={"md"}
            className="text-sm px-4 py-1.5"
            onClick={() => setOpenToggle(true)}
          >
            Add a review
          </Button>
        )}
      </header>
      {filteredReviews.length !== 0 ? (
        <main>
          {filteredReviews.map((r) => {
            return (
              <StoreReviewCard
                key={r._id}
                r={r}
                currentUserId={currentUser?._id}
              />
            );
          })}
        </main>
      ) : (
        <div
          className={`w-full h-60 flex flex-col justify-start items-center p-6 pt-6 space-y-5`}
        >
          <TbStarOff className={"text-8xl"} />
          <p className="text-lg text-center px-20">
            No Review found, Be the first to review this product
          </p>

          <Button variant={"outline"} onClick={() => setOpenToggle(true)}>
            Leave a Review
          </Button>
        </div>
      )}
      {OpenToggle && (
        <StoreReviewDialogue
          OpenStatus={OpenToggle}
          OpenToggle={setOpenToggle}
          pId={pId}
          pImage={pImage}
        />
      )}
    </div>
  );
};

export default StoreProductReview;
