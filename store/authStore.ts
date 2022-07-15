import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

const useAuthStore = create(
  persist(
    (set: any) => ({
      userProfile: null,
      // ログイン
      storeUser: (user: any) => set({ userProfile: user }),
      // ログアウト
      removeUser: () => set({ userProfile: null }),
    }),
    { name: "auth" }
  )
);

export default useAuthStore;
