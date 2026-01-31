import { create } from "zustand";

export const useConfigureStore = create((set) => {
  return {
    config: null,
    loading: false,

    addNewConfigure: async (initialConfig) => {
      set({ loading: true });
      try {
        const res = await fetch("/api/configure", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(initialConfig),
        });

        const data = await res.json();

        if (!res.ok) {
          set({ loading: false });
          return {
            success: false,
            message: data.error || "Failed to create configuration",
          };
        }

        set({ config: data.newStore, loading: false });

        return { success: true, message: "Store configuration initialized!" };
      } catch (error) {
        set({ loading: false });
        return { success: false, message: error.message };
      }
    },

    fetchConfigure: async (section) => {
      set({ loading: true });
      try {
        const url = section
          ? `/api/configure?section=${section}`
          : "/api/configure";
        const res = await fetch(url);
        const result = await res.json();

        set({ config: result.data || null });
        return { success: true, message: `Store updated with: ${result.data}` };
      } catch (error) {
        set({ loading: false });
        return { success: false, message: error.message };
      }
    },

    // Update a specific section
    updateConfigure: async (id, updateData, section, pageId) => {
      try {
        const payload = pageId
          ? { [section]: updateData, pageId }
          : { [section]: updateData };

        const res = await fetch(`/api/configure/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        const data = await res.json();

        if (data.success) {
          set({ config: data.data });
          return { success: true, message: "Settings updated successfully" };
        }
        return { success: false, message: data.message };
      } catch (error) {
        return { success: false, message: error.message };
      }
    },

    addNewEvent: async (newE) => {
      if (!newE.title) {
        return {
          success: "warning",
          message: "Please Provide a Title for Your Event",
        };
      } else if (!newE.start) {
        return {
          success: "warning",
          message: "Please Provide a stating date for Your Event",
        };
      } else if (!newE.end) {
        return {
          success: "warning",
          message: "Please Provide an ending date for Your Event",
        };
      } else if (!newE.description) {
        return {
          success: "warning",
          message: "Please Provide a Description for Your Event",
        };
      }

      set({ loading: true });
      try {
        const res = await fetch("/api/configure?section=events", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newE),
        });

        const data = await res.json();

        if (!res.ok) {
          set({ loading: false });
          return {
            success: false,
            message: data.error || "Failed to create an event",
          };
        }

        set({ config: data.newStore, loading: false });

        return { success: true, message: "the event has been added!" };
      } catch (error) {
        set({ loading: false });
        return { success: false, message: error.message };
      }
    },

    updateEvent: async (id, updateData) => {
      try {
        const res = await fetch(`/api/configure/${id}?section=events`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ updateData }),
        });

        const data = await res.json();

        if (data.success) {
          set({ config: data.data });
          return { success: true, message: "Event updated successfully" };
        }
        return { success: false, message: data.message };
      } catch (error) {
        return { success: false, message: error.message };
      }
    },

    deleteEvent: async (storeId, eventId) => {
      try {
        const res = await fetch(
          `/api/configure/${storeId}?section=events&eventId=${eventId}`,
          {
            method: "DELETE",
          },
        );

        const data = await res.json();

        if (data.success) {
          set({ config: data.data });
          return { success: true, message: "Event deleted successfully" };
        }
        return { success: false, message: data.message };
      } catch (error) {
        return { success: false, message: error.message };
      }
    },

    UpdatePageContent: async (newPC) => {
      if (!newPC.title) {
        return {
          success: "warning",
          message: "Please Provide a Title for Your Page",
        };
      } else if (!newPC.description) {
        return {
          success: "warning",
          message: "Please Provide a Description for Your Page",
        };
      }

      set({ loading: true });
      try {
        const res = await fetch("/api/configure?section=contents", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newPC),
        });

        const data = await res.json();

        if (!res.ok) {
          set({ loading: false });
          return {
            success: false,
            message: data.error || "Failed to create an event",
          };
        }

        set({ config: data.newStore, loading: false });

        return { success: true, message: "the page content has been updated!" };
      } catch (error) {
        set({ loading: false });
        return { success: false, message: error.message };
      }
    },
  };
});
