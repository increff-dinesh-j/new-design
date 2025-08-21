import { create } from 'zustand';
import type { TabData, FilterState, SortState, ViewState } from '../types';

interface TabStore {
  tabs: TabData[];
  activeTabId: string | null;
  loading: boolean;
  error: string | null;
  
  // Actions
  addTab: (tab: Omit<TabData, 'id' | 'isActive' | 'order'>) => void;
  removeTab: (tabId: string) => void;
  setActiveTab: (tabId: string) => void;
  updateTabFilters: (tabId: string, filters: FilterState) => void;
  updateTabSort: (tabId: string, sortState: SortState) => void;
  updateTabView: (tabId: string, viewState: Partial<ViewState>) => void;
  reorderTabs: (tabIds: string[]) => void;
  clearError: () => void;
}

export const useTabStore = create<TabStore>((set, get) => ({
  tabs: [],
  activeTabId: null,
  loading: false,
  error: null,

  addTab: (tabData) => {
    const newTab: TabData = {
      ...tabData,
      id: `tab-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      isActive: false,
      order: get().tabs.length,
      filters: {},
      sortState: { direction: 'none' },
      viewState: {
        density: 'cozy',
        showRowNumbers: true,
        showFilters: true,
        showSearch: true,
      },
    };

    set((state) => ({
      tabs: [...state.tabs, newTab],
      activeTabId: newTab.id,
    }));
  },

  removeTab: (tabId) => {
    set((state) => {
      const updatedTabs = state.tabs.filter(tab => tab.id !== tabId);
      const removedTab = state.tabs.find(tab => tab.id === tabId);
      
      let newActiveTabId = state.activeTabId;
      if (state.activeTabId === tabId) {
        // Find the next tab to activate
        const currentIndex = state.tabs.findIndex(tab => tab.id === tabId);
        const nextTab = updatedTabs[currentIndex] || updatedTabs[currentIndex - 1];
        newActiveTabId = nextTab?.id || null;
      }

      return {
        tabs: updatedTabs,
        activeTabId: newActiveTabId,
      };
    });
  },

  setActiveTab: (tabId) => {
    set((state) => ({
      tabs: state.tabs.map(tab => ({
        ...tab,
        isActive: tab.id === tabId,
      })),
      activeTabId: tabId,
    }));
  },

  updateTabFilters: (tabId, filters) => {
    set((state) => ({
      tabs: state.tabs.map(tab =>
        tab.id === tabId ? { ...tab, filters } : tab
      ),
    }));
  },

  updateTabSort: (tabId, sortState) => {
    set((state) => ({
      tabs: state.tabs.map(tab =>
        tab.id === tabId ? { ...tab, sortState } : tab
      ),
    }));
  },

  updateTabView: (tabId, viewState) => {
    set((state) => ({
      tabs: state.tabs.map(tab =>
        tab.id === tabId ? { ...tab, viewState: { ...tab.viewState, ...viewState } } : tab
      ),
    }));
  },

  reorderTabs: (tabIds) => {
    set((state) => {
      const tabMap = new Map(state.tabs.map(tab => [tab.id, tab]));
      const reorderedTabs = tabIds.map((id, index) => ({
        ...tabMap.get(id)!,
        order: index,
      }));
      
      return {
        tabs: reorderedTabs,
      };
    });
  },

  clearError: () => set({ error: null }),
}));
