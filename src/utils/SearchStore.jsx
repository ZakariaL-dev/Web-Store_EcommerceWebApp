import { create } from "zustand";

export const useSearchStore = create((set) => {
  return {
    searchRslts: [],
    setSearchRslts: (s) => set({ searchRslts: s }),
    getAllSearchRslts: async (type, content) => {
      try {
        const res = !type
          ? await fetch("/api/search/" + "?s=" + content)
          : await fetch("/api/search/" + type + "?s=" + content);

        const Data = await res.json();

        set({ searchRslts: Data[type] || [] });
      } catch (error) {
        set({ searchRslts: [] });
        return {
          success: false,
          message: `Error in getting all results: ${error}`,
        };
      }
    },
  };
});
