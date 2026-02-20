import { create } from "zustand";

export const useSocketStore = create((set) => ({
  socket: null,
  onlineUserIds: [],

  setSocket: (s) => set({ socket: s }),
  setOnlineUserIds: (ids) => set({ onlineUserIds: ids }),
  removeSocket: () => {
    set((state) => {
      if (state.socket) {
        state.socket.off("getOnlineUsers");
        state.socket.disconnect();
      }
      return { socket: null, onlineUserIds: [] };
    });
  },
}));
