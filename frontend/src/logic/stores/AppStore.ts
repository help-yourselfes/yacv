import { create } from "zustand"

interface AppStore {
  theme: 'light' | 'dark' | 'auto';
  isSidebarOpen: boolean;
  isSettingsOpen: boolean;
  toggleSidebar: () => void
  setTheme: (theme: AppStore['theme']) => void
}

const useAppStore = create<AppStore>((set) => ({
  theme: 'auto',
  isSidebarOpen: false,
  isSettingsOpen: false,
  toggleSidebar: () => set((s) => ({ isSidebarOpen: !s.isSidebarOpen })),
  setTheme: (theme) => set({ theme }),
}))

export default useAppStore;