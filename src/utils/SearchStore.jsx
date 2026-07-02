import { create } from "zustand";

export const useSearchStore = create((set) => {
  return {
    searchRslts: null,
    filterRslts: null,
    setSearchRslts: (s) => set({ searchRslts: s }),
    setFilterRslts: (f) => set({ filterRslts: f }),

    clearSearch: () => set({ searchRslts: null }),
    clearFilters: () => set({ filterRslts: null }),
    clearAll: () => set({ searchRslts: null, filterRslts: null }),

    getAllSearchRslts: async (type, content) => {
      try {
        if (!content || content.trim() === "") {
          set({ searchRslts: null });
          return;
        }

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
    // date
    getFilterRslts: async (type, content) => {
      try {
        if (!content || Object.keys(content).length === 0) {
          set({ searchRslts: [] });
          return;
        }

        let searchParamsParts = [];

        Object.keys(content).forEach((key) => {
          if (key === "variants") {
            for (const variantKey in content[key]) {
              searchParamsParts.push(
                "v_" +
                  variantKey +
                  "=" +
                  JSON.stringify(content[key][variantKey]),
              );
            }
          } else {
            searchParamsParts.push(key + "=" + JSON.stringify(content[key]));
          }
        });

        let searchParams = searchParamsParts.join("&");

        console.log("seachParams: ", searchParams);

        const res = await fetch("/api/filters/" + type + "?" + searchParams);

        const Data = await res.json();

        set({ filterRslts: Data[type] || [] });
      } catch (error) {
        set({ filterRslts: [] });
        return {
          success: false,
          message: `Error in getting all results: ${error}`,
        };
      }
    },
  };
});
