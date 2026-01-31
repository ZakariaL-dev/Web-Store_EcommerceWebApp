import { create } from "zustand";

export const useUserStore = create((set) => {
  return {
    Users: [],
    currentUser: null,
    setUsers: (u) => set({ Users: u }),
    addNewUser: async (newU) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!newU.userName) {
        return {
          success: "warning",
          message: "Please Provide a User Name",
        };
      } else if (!newU.email || !emailRegex.test(newU.email)) {
        return {
          success: "warning",
          message: "Please Provide a Valid Email (e.g., name@example.com)",
        };
      } else if (!newU.phoneNumber) {
        return {
          success: "warning",
          message: "Please Provide a Phone Number",
        };
      } else if (!newU.password || newU.password.length < 12) {
        return {
          success: "warning",
          message: "Minimum password length is 12 characters",
        };
      }

      try {
        const res = await fetch("/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newU),
        });
        const Data = await res.json();

        if (!res.ok) {
          return {
            success: false,
            message: Data.message || "Server error occurred",
          };
        }

        set((state) => ({ Users: [...state.Users, Data.user] }));

        return { success: true, message: "User added successfully" };
      } catch (error) {
        return {
          success: false,
          message: `An unexpected error occurred in adding the User: ${error.message}`,
        };
      }
    },
    getAllUsers: async () => {
      try {
        const res = await fetch("/api/users");
        const Data = await res.json();
        set({ Users: Data.Users || [] });
      } catch (error) {
        set({ Users: [] });
        return {
          success: false,
          message: `Error in getting all Users: ${error}`,
        };
      }
    },
    getAUser: async (Uid) => {
      try {
        const res = await fetch(`/api/users/${Uid}`);
        const Data = await res.json();

        if (res.ok) {
          set({ currentUser: Data.UserData });
          return { success: true };
        }
        return { success: false, message: Data.message };
      } catch (error) {
        set({ Users: [] });
        return {
          success: false,
          message: `Error in getting the User: ${error}`,
        };
      }
    },
    deleteUser: async (Uid) => {
      const res = await fetch(`/api/users/${Uid}`, {
        method: "DELETE",
      });
      const Data = await res.json();
      if (!Data.success) return { success: false, message: Data.message };
      set((state) => ({
        Users: state.Users.filter((u) => u._id !== Uid),
      }));
      return { success: true, message: Data.message };
    },
    updateUser: async (Uid, updatedU) => {
      if (!updatedU.userName) {
        return {
          success: "warning",
          message: "Please Provide a User Name",
        };
      } else if (!updatedU.dateOfBirth) {
        return {
          success: "warning",
          message: "Please Select Your Birth Day",
        };
      } else if (!updatedU.gender) {
        return {
          success: "warning",
          message: "Please Select your Gender (Male or Female)",
        };
      } else if (!updatedU.phoneNumber) {
        return {
          success: "warning",
          message: "Please Provide a Phone Number",
        };
      } else if (!updatedU.address) {
        return {
          success: "warning",
          message: "Please Provide a Valide address",
        };
      }

      const res = await fetch(`/api/users/${Uid}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedU),
      });

      const Data = await res.json();

      if (!res.ok) return { success: false, message: Data.message };

      set((state) => ({
        Users: state.Users.map((u) => (u._id === Uid ? Data.UserData : u)),
        currentUser: Data.UserData,
      }));
      return { success: Data.success, message: Data.message };
    },
  };
});
