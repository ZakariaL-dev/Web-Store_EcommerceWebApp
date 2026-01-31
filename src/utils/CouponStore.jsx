import { create } from "zustand";

export const useCouponStore = create((set) => {
  return {
    Coupons: [],
    currentCoupon: null,
    setCoupons: (c) => set({ Coupons: c }),

    addNewCoupon: async (newC) => {
      if (!newC.code) {
        return {
          success: "warning",
          message: "Please Provide a Code for Your Coupon",
        };
      } else if (!newC.discount) {
        return {
          success: "warning",
          message: "Please Provide a Discount for Your Coupon",
        };
      } else if (!newC.expireDate) {
        return {
          success: "warning",
          message: "Please Choose an expire Date for Your Coupon",
        };
      }

      try {
        const res = await fetch("/api/coupons", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newC),
        });
        const Data = await res.json();

        if (!res.ok) {
          return {
            success: false,
            message: Data.message || "Server error occurred",
          };
        }

        set((state) => ({ Coupons: [...state.Coupons, Data.Coupon] }));

        return { success: true, message: "Coupon added successfully" };
      } catch (error) {
        return {
          success: false,
          message: `An unexpected error occurred in adding the Coupon: ${error.message}`,
        };
      }
    },

    getAllCoupons: async () => {
      try {
        const res = await fetch("/api/coupons");
        const Data = await res.json();
        
        set({ Coupons: Data.Coupons || [] });
      } catch (error) {
        set({ Coupons: [] });
        return {
          success: false,
          message: `Error in getting all Coupons: ${error}`,
        };
      }
    },

    getACoupon: async (id) => {
      try {
        const res = await fetch(`/api/Coupon/${id}`);
        const Data = await res.json();
        if (res.ok) {
          set({ currentCoupon: Data.p });
          return { success: true };
        }
        return { success: false, message: Data.message };
      } catch (error) {
        set({ Coupons: [] });
        return {
          success: false,
          message: `Error in getting the Coupon: ${error}`,
        };
      }
    },

    deleteCoupon: async (pId) => {
      const res = await fetch(`/api/coupons/${pId}`, {
        method: "DELETE",
      });
      const Data = await res.json();
      if (!Data.success) return { success: false, message: Data.message };
      set((state) => ({
        Coupons: state.Coupons.filter((p) => p._id !== pId),
      }));
      return { success: true, message: Data.message };
    },

    updateCoupon: async (pId, updatedP) => {
      const res = await fetch(`/api/coupons/${pId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedP),
      });
      const Data = await res.json();

      if (!Data) return { success: false, message: Data.message };
      if (Data.success) {
        set((state) => ({
          Coupons: state.Coupons.map((p) =>
            p._id === pId ? Data.coupon || Data.Coupons || Data : p,
          ),
        }));
      }
      return { success: Data.success, message: Data.message };
    },

    validateCoupon: async (code) => {
      if (!code) {
        return {
          success: "warning",
          message: "Please Enter Your Coupon's code",
        };
      }

      try {
        const res = await fetch("/api/coupons/validate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ code }),
        });

        const data = await res.json();

        if (!res.ok) {
          return { success: false, message: data.message || "Invalid coupon" };
        }

        return {
          success: true,
          discount: data.discount,
          message: data.message,
        };
      } catch (error) {
        return { success: false, message: "Network error. Try again." };
      }
    },
  };
});
