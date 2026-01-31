import { create } from "zustand";

export const useOrderStore = create((set) => {
  return {
    orders: [],
    setOrders: (o) => set({ orders: o }),
    currentOrder: null,
    addNewOrder: async (newO) => {
      if (!newO.user) {
        return {
          success: false,
          message: "Please login to submit a review",
        };
      }

      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newO),
        });
        const Data = await res.json();

        if (!res.ok) {
          return {
            success: false,
            message: Data.message || "Server error occurred",
          };
        }

        set((state) => ({ orders: [...state.orders, Data.newOrder] }));

        // if (newO.paymentMethod === "Card" && Data.checkoutUrl) {
        //   window.location.href = Data.checkoutUrl;
        //   return { success: true, message: "Redirecting to payment..." };
        // }

        return { success: true, message: "Order added successfully" };
      } catch (error) {
        return {
          success: false,
          message: `An unexpected error occurred in adding the order: ${error.message}`,
        };
      }
    },
    getAllOrders: async () => {
      try {
        const res = await fetch("/api/orders");
        const Data = await res.json();

        set({ orders: Data.Orders || [] });
      } catch (error) {
        set({ orders: [] });
        return {
          success: false,
          message: `Error in getting all orders: ${error}`,
        };
      }
    },
    updateOrder: async (OId, updatedO) => {
      const res = await fetch(`/api/orders/${OId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedO),
      });

      const Data = await res.json();

      if (!res.ok)
        return { success: false, message: Data.message || "Failed to update" };

      set((state) => ({
        orders: state.orders.map((o) => (o._id === OId ? Data.data : o)),
      }));
      return { success: Data.success, message: Data.message };
    },
    getAnOrderbyId: async (id) => {
      try {
        const res = await fetch(`/api/orders/${id}`);
        const Data = await res.json();

        if (res.ok) {
          set({ currentOrder: Data.o });
          return { success: true, order: Data.o };
        }
        return { success: false, message: Data.message };
      } catch (error) {
        set({ currentOrder: null });
        return {
          success: false,
          message: `Error in getting the order: ${error}`,
        };
      }
    },
  };
});
