import { create } from "zustand";

export const useProductStore = create((set) => {
  return {
    products: {
      new: [],
      normal: [],
      "on sale": [],
      all: [],
    },
    currentProduct: null,
    setProducts: (p) => set({ products: p }),
    addNewProduct: async (newP) => {
      if (!newP.title) {
        return {
          success: "warning",
          message: "Please Provide a Title for Your Product",
        };
      } else if (!newP.description) {
        return {
          success: "warning",
          message: "Please Provide a Description for Your Product",
        };
      } else if (newP.price === 0) {
        return {
          success: "warning",
          message: "Please Provide a Price for Your Product",
        };
      } else if (!newP.category) {
        return {
          success: "warning",
          message: "Please Choose a Category for Your Product",
        };
      } else if (!newP.status) {
        return {
          success: "warning",
          message: "Please Define Your Product's status",
        };
      } else if (!newP.previewImages) {
        return {
          success: "warning",
          message: "Please Provide at least an Image for Your Product",
        };
      }
      const isInvalid = newP.variants.some(
        (v) => !v.size || !v.color || v.quantity === undefined,
      );

      if (isInvalid) {
        return {
          success: "warning",
          message:
            "Missing Variant Details: Make sure all sizes, colors, and quantities are filled.",
        };
      }

      try {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newP),
        });
        const Data = await res.json();

        if (!res.ok) {
          return {
            success: false,
            message: Data.message || "Server error occurred",
          };
        }

        set((state) => ({
          products: {
            ...state.products,
            all: [Data.newProduct, ...state.products.all],
            [newP.status]: [
              Data.newProduct,
              ...(state.products[newP.status] || []),
            ],
          },
        }));

        return { success: true, message: "Product added successfully" };
      } catch (error) {
        return {
          success: false,
          message: `An unexpected error occurred in adding the product: ${error.message}`,
        };
      }
    },
    getAllProducts: async (opt) => {
      try {
        const categoryKey = opt || "all";
        const url = opt ? `/api/products?opt=${opt}` : `/api/products`;
        const res = await fetch(url);

        const Data = await res.json();
        if (res.ok) {
          set((state) => ({
            products: {
              ...state.products,
              [categoryKey]: Data.Products || [],
            },
          }));
          return { success: true };
        }
      } catch (error) {
        set({ products: [] });
        return {
          success: false,
          message: `Error in getting all products: ${error}`,
        };
      }
    },
    getAProduct: async (slg) => {
      try {
        const res = await fetch(`/api/product/${slg}`);
        const Data = await res.json();
        if (res.ok) {
          set({ currentProduct: Data.p });
          return { success: true };
        }
        return { success: false, message: Data.message };
      } catch (error) {
        set({ products: [] });
        return {
          success: false,
          message: `Error in getting the product: ${error}`,
        };
      }
    },
    getAProductbyId: async (id) => {
      try {
        const res = await fetch(`/api/products/${id}`);
        const Data = await res.json();
        if (res.ok) {
          console.log("Fetched Product by ID:", Data.p);
          set({ product: Data.p });
          return { success: true, product: Data.p };
        }
        return { success: false, message: Data.message };
      } catch (error) {
        set({ products: [] });
        return {
          success: false,
          message: `Error in getting the product: ${error}`,
        };
      }
    },
    deleteProduct: async (pId) => {
      const res = await fetch(`/api/products/${pId}`, {
        method: "DELETE",
      });
      const Data = await res.json();
      if (!Data.success) return { success: false, message: Data.message };
      set((state) => {
        const newProducts = { ...state.products };
        Object.keys(newProducts).forEach((key) => {
          newProducts[key] = newProducts[key].filter((p) => p._id !== pId);
        });
        return { products: newProducts };
      });
      return { success: true, message: Data.message };
    },
    updateProduct: async (pId, updatedP) => {
      const res = await fetch(`/api/products/${pId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedP),
      });
      const Data = await res.json();
      if (!Data) return { success: false, message: Data.message };
      set((state) => ({
        products: state.products.map((p) =>
          p._id === pId ? Data.Products : p,
        ),
      }));
      return { success: Data.success, message: Data.message };
    },
  };
});
