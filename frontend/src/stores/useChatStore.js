import { create } from "zustand";

export const useChatStore = create((set) => ({
  isMute: localStorage.getItem("volume") === "on" ? false : true,
  activeTab: "Chats",
  targetUser: null,

  toggleSound: () =>
    set((state) => {
      localStorage.setItem("volume", state.isMute ? "on" : "off");
      return { isMute: state.isMute ? false : true };
    }),
  setActiveTab: (tab) => set({ activeTab: tab }),
  setTargetUser: (selectedUser) => set({ targetUser: selectedUser }),
}));
