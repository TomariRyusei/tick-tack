import create from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";

import { BASE_URL } from "../utils";

const useAuthStore = create(
  persist(
    (set: any) => ({
      userProfile: null,
      allUsers: [],

      // ログイン
      storeUser: (user: any) => set({ userProfile: user }),
      // ログアウト
      removeUser: () => set({ userProfile: null }),
      fetchAllUsers: async () => {
        const response = await axios.get(`${BASE_URL}/api/users`);
        set({ allUsers: response.data });
      },
    }),
    { name: "auth" }
  )
);

export default useAuthStore;
