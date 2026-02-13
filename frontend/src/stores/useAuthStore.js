import { create } from "zustand";

export const useAuthStore = create((set) => ({
  user: null,
  isChecking: true,
  setUser: (newUser) => set(() => ({ user: newUser })),
  setIsChecking: (newIsChecking) => set(() => ({ isChecking: newIsChecking })),
}));
