import { create } from "zustand";
import { persist } from "zustand/middleware";
const useAuthStore = create(
  persist(
    (set) => ({
      isLoggedIn: false,
      accessToken: "",
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
      isSignUp: false,
      accessToken: "",
      signUp: (token) =>{
        set({
          isSignUp: true,
          accessToken: token,
        })
      },
      signOut: () => {
        set({isSignUp: false, accessToken:""})
         localStorage.clear();
      }
    }),
    {
      name: "userLoginStatus",
      singup: "userSignUpStatus",
    }
  )
);
export default useAuthStore;
