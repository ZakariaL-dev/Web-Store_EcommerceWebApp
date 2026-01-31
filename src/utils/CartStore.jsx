import { create } from "zustand";

export const useCartStore = create((set) => ({
  cart: [],
  setCart: (cartData) => set({ cart: cartData }),

  checkout: [],
  setCheckout: (checkoutData) => set({ checkout: checkoutData }),

  appliedCoupon: null, 
  setAppliedCoupon: (coupon) => set({ appliedCoupon: coupon }),

  // 1. Add or Update Quantity
  addToCart: async (userId, product, variants) => {
    try {
      const res = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          productId: product._id,
          color: variants.color,
          size: variants.size,
          quantity: variants.quantity,
          action: "add",
        }),
      });

      const data = await res.json();
      if (data.success) {
        set({ cart: data.cart });
        return {
          success: true,
          message: "Product added seccessfully to the Cart",
        };
      }
      return { success: false, message: data.message };
    } catch (error) {
      return { success: false, message: "Server error" };
    }
  },

  // 2. Remove specific item
  removeFromCart: async (userId, itemId) => {
    try {
      const res = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, itemId, action: "remove" }),
      });
      const data = await res.json();
      if (data.success) {
        set({ cart: data.cart });
        return {
          success: true,
          message: "Product removed seccessfully to the Cart",
        };
      }
    } catch (error) {
      return {
        success: false,
        message: "Failed to remove the product from Cart",
      };
    }
  },

  // 3. Clear entire cart (usually after purchase or manual empty)
  clearCart: async (userId) => {
    try {
      const res = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, action: "clear" }),
      });
      const data = await res.json();
      if (data.success) {
        set({ cart: [] });
        return { success: true, message: "Cart cleared" };
      }
    } catch (error) {
      return { success: false, message: "Failed to clear cart" };
    }
  },

  // 4. update cart
  updateQuantity: async (userId, itemId, newQuantity) => {
    try {
      const res = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          itemId,
          quantity: newQuantity,
          action: "updateQty",
        }),
      });

      const data = await res.json();
      if (data.success) {
        set({ cart: data.cart });
        return { success: true };
      }
    } catch (error) {
      console.error("Update Qty Error:", error);
      return { success: false };
    }
  },

  updateVariant: async (userId, itemId, color, size) => {
    try {
      const res = await fetch("/api/cart", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          itemId,
          color,
          size,
          action: "updateVariant",
        }),
      });
      const data = await res.json();
      if (data.success) set({ cart: data.cart });
    } catch (error) {
      console.error("Update Variant Error:", error);
    }
  },

  // Move items to the checkout array
  syncToCheckout: async (userId, selectedItems) => {
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, selectedItems }),
      });
      const data = await res.json();
      if (data.success) {
        set({ checkout: data.checkout });
        return { success: true, message: "Checkout Cart Updated successfully" };
      }
    } catch (error) {
      return { success: false, message: "Sync error" };
    }
  },
}));
