import { create } from "zustand";
import { persist } from "zustand/middleware";
const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: "",
      riya: "riya",
      logInUser: (token) => {
        set({
          isLoggedIn: true,
          accessToken: token,

        });
      },
      logout: () => {
        set({ isLoggedIn: false, accessToken: "" });
        localStorage.clear();
      },

    }),
    {
      name: "userLoginStatus",
    }
  )
);
export default useAuthStore;
