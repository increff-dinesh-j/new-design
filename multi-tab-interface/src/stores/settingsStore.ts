import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  defaultPageSize: number;
  autoRefresh: boolean;
  refreshInterval: number;
  showFilters: boolean;
  showRowNumbers: boolean;
  density: 'compact' | 'cozy' | 'comfortable';
}

interface SettingsStore {
  preferences: UserPreferences;
  updatePreferences: (updates: Partial<UserPreferences>) => void;
  resetPreferences: () => void;
}

const defaultPreferences: UserPreferences = {
  theme: 'light',
  defaultPageSize: 20,
  autoRefresh: false,
  refreshInterval: 30000, // 30 seconds
  showFilters: true,
  showRowNumbers: true,
  density: 'cozy',
};

export const useSettingsStore = create<SettingsStore>()(
  persist(
    (set) => ({
      preferences: defaultPreferences,
      
      updatePreferences: (updates) => {
        set((state) => ({
          preferences: {
            ...state.preferences,
            ...updates,
          },
        }));
      },
      
      resetPreferences: () => {
        set({ preferences: defaultPreferences });
      },
    }),
    {
      name: 'multi-tab-settings',
      partialize: (state) => ({ preferences: state.preferences }),
    }
  )
);
