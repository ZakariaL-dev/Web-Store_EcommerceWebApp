import { create } from "zustand";

export const useUtilityStore = create((set, get) => ({
  wishlist: [],
  compareList: [],

  setWishlist: (list) => set({ wishlist: list }),
  setcompareList: (list) => set({ compareList: list }),

  toggleWishlist: async (userId, productId) => {
    try {
      // 1. Send the request to your user update API
      const res = await fetch(`/api/utilsToggles`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId, actionType: "wishList" }),
      });

      const result = await res.json();

      if (result.success) {
        set({ wishlist: result.data });
        return { success: true, message: result.message };
      }
      return { success: false, message: "Failed to update wishlist" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  removeFromList: async (userId, productId, array) => {
    try {
      const res = await fetch("/api/utilsToggles", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productId,
          actionType: array,
          action: "remove",
        }),
      });
      const result = await res.json();

      if (result.success) {
        if (array.toLowerCase() === "compare") {
          set({ compareList: result.data });
          return {
            success: true,
            message: "Removed the product from compare successfully",
          };
        }
        set({ wishlist: result.data });
        return {
          success: true,
          message: "Removed the product from WishList successfully",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Failed to remove the product from WishList",
      };
    }
  },

  toggleCompare: async (userId, productId) => {
    try {
      const res = await fetch(`/api/utilsToggles`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, productId, actionType: "compare" }),
      });

      const data = await res.json();
      if (data.success) {
        set({ compareList: data.data });
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  clearUtils: async (userId, array) => {
    try {
      const res = await fetch("/api/utilsToggles", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          actionType: array,
          action: "clear",
        }),
      });
      const data = await res.json();
      if (data.success) {
        const key =
          array.toLowerCase() === "compare" ? "compareList" : "wishlist";
        set({ [key]: [] });
        return { success: true, message: `${array} cleared successfully` };
      }
    } catch (error) {
      return { success: false, message: "Failed to clear it" };
    }
  },
}));
