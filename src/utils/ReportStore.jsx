import { create } from "zustand";

export const useReportStore = create((set) => ({
  // State
  ProductReports: [],
  UserReports: [],
  loading: false,
  error: null,

  // Setters
  setProductReports: (Pr) => set({ ProductReports: Pr }),
  setUserReports: (Ur) => set({ UserReports: Ur }),

  fetchReports: async (type) => {
    set({ loading: true, error: null });
    try {
      // type should be "products" or "users"
      const response = await fetch(`/api/reports/${type}`);
      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Failed to fetch");

      if (type === "products") {
        set({ ProductReports: data.ProductReports, loading: false });
      } else {
        set({ UserReports: data.UserReports, loading: false });
      }
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  // Unified POST Action
  submitReport: async (type, reportBody) => {
    if (!reportBody.reason) {
      return {
        success: "warning",
        message: "Please Provide a Reason for Your Report",
      };
    } else if (reportBody.reason === "Other" && !reportBody.OtherReason) {
      return {
        success: "warning",
        message: "Please Provide the specify the other reason of Your Report",
      };
    } else if (!reportBody.comment) {
      return {
        success: "warning",
        message: "Please Provide a detailed comment about Your Report",
      };
    }

    set({ loading: true, error: null });
    try {
      const response = await fetch(`/api/reports/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(reportBody),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Failed to submit");

      // Update the specific array based on the type
      if (type === "products") {
        set((state) => ({
          ProductReports: [data.newProductReport, ...state.ProductReports],
          loading: false,
        }));
      } else {
        set((state) => ({
          UserReports: [data.newUserReport, ...state.UserReports],
          loading: false,
        }));
      }
      return { success: true, message: `Your Report is successfully submited` };
    } catch (err) {
      set({ error: err.message, loading: false });
      return { success: false, error: err.message };
    }
  },

  // Update report Status
  updateReport: async (rId, updatedStatus, type) => {
    try {
      const res = await fetch(`/api/reports/${type}/${rId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: updatedStatus }),
      });

      const result = await res.json();
      if (!result.success) return { success: false, message: result.message };

      const stateKey = type === "products" ? "ProductReports" : "UserReports";

      set((state) => ({
        [stateKey]: state[stateKey].map((item) =>
          item._id === rId ? result.data : item,
        ),
      }));

      return { success: true, message: result.message };
    } catch (error) {
      return { success: false, message: "Request failed" };
    }
  },
}));
