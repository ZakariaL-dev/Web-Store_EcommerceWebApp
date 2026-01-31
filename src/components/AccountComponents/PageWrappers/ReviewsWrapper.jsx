"use client";

// My Components
import StoreEmptyState from "@/components/StoreComponents/StoreEmptyState";
import AccountReviewCard from "../AccountReviewCard";
import AccountPagination from "../AccountPagination";

// React
import { useEffect } from "react";

// Stores
import { useUserStore } from "@/utils/UserStore";
import { useReviewStore } from "@/utils/ReviewStore";

// React Icons
import { TbStarOff } from "react-icons/tb";


const ReviewsWrapper = () => {
  const { reviews, getAllReviews } = useReviewStore();
  const { currentUser } = useUserStore();

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

  const filteredReviews = reviews.filter((r) => r.user._id === currentUser._id);

  return (
    <div className="py-6 px-3 lg:w-2/3 w-full">
      <header className="text-3xl font-bold mb-8">Reviews</header>
      <main>
        {filteredReviews.length != 0 ? (
          <>
            {filteredReviews.map((r) => {
              return <AccountReviewCard key={r._id} r={r} />;
            })}
          </>
        ) : (
          <StoreEmptyState
            Icon={TbStarOff}
            txt={
              "Help us grow! We are waiting for your first review of our products. If you own it, we’d love to hear what you think."
            }
            link={"/account/orders"}
            btnMessage={"Leave a Review about your purchases"}
          />
        )}
      </main>

      {/*  */}
      {filteredReviews.length != 0 && (
        <footer className="flex items-center justify-between w-full border-t-2 pt-3 my-4">
          <h1>Showing 1 of {filteredReviews.length} results</h1>
          <AccountPagination />
        </footer>
      )}
    </div>
  );
};

export default ReviewsWrapper;
