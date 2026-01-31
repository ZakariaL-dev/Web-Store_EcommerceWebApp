import { create } from "zustand";

export const useReviewStore = create((set) => {
  return {
    reviews: [],
    setReviews: (r) => set({ reviews: r }),
    addNewReview: async (newR) => {
      if (!newR.user) {
        return {
          success: false,
          message: "Please login to submit a review",
        };
      } else if (!newR.product) {
        return {
          success: false,
          message: "Product information is missing for the review",
        };
      } else if (!newR.rating || newR.rating < 0.1) {
        return {
          success: "warning",
          message: "Please provide a rating for your review",
        };
      } else if (!newR.name) {
        return {
          success: "warning",
          message: "Please Provide Your UserName",
        };
      } else if (!newR.title) {
        return {
          success: "warning",
          message: "Please Provide a Title for Your Review",
        };
      } else if (!newR.comment) {
        return {
          success: "warning",
          message: "Please give your comments for your review",
        };
      } else if (!newR.timeOfSubmit){
        return {
          success: "warning",
          message: "Please Time of submit is not available for your review",
        };
      }
        try {
          const res = await fetch("/api/reviews", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newR),
          });
          const Data = await res.json();

          if (!res.ok) {
            return {
              success: false,
              message: Data.message || "Server error occurred",
            };
          }

          set((state) => ({ reviews: [...state.reviews, Data.newReview] }));

          return { success: true, message: "Review added successfully" };
        } catch (error) {
          return {
            success: false,
            message: `An unexpected error occurred in adding the review: ${error.message}`,
          };
        }
    },
    getAllReviews: async () => {
      try {
        const res = await fetch("/api/reviews");
        const Data = await res.json();

        set({ reviews: Data.Reviews || [] });
      } catch (error) {
        set({ reviews: [] });
        return {
          success: false,
          message: `Error in getting all reviews: ${error}`,
        };
      }
    },
    deleteReview: async (rId) => {
      const res = await fetch(`/api/reviews/${rId}`, {
        method: "DELETE",
      });
      const Data = await res.json();
      if (!Data.success) return { success: false, message: Data.message };
      set((state) => ({
        reviews: state.reviews.filter((r) => r._id !== rId),
      }));
      return { success: true, message: Data.message };
    },
    updateReview: async (rId, updatedR) => {
      const res = await fetch(`/api/reviews/${rId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedR),
      });
      const Data = await res.json();
      if (!Data) return { success: false, message: Data.message };
      set((state) => ({
        reviews: state.reviews.map((r) => (r._id === rId ? Data.data : r)),
      }));
      return { success: Data.success, message: Data.message };
    },
  };
});
