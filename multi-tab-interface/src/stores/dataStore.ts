import { create } from 'zustand';
import type { Dataset, TableData, ChartData, ApiResponse } from '../types';

interface DataStore {
  datasets: Dataset[];
  tableData: Record<string, TableData>;
  chartData: Record<string, ChartData>;
  loading: boolean;
  error: string | null;
  lastUpdated: Date | null;
  
  // Actions
  fetchDatasets: () => Promise<void>;
  fetchTableData: (datasetId: string) => Promise<void>;
  fetchChartData: (datasetId: string) => Promise<void>;
  refreshData: (datasetId: string) => Promise<void>;
  clearError: () => void;
}

export const useDataStore = create<DataStore>((set, get) => ({
  datasets: [],
  tableData: {},
  chartData: {},
  loading: false,
  error: null,
  lastUpdated: null,

  fetchDatasets: async () => {
    set({ loading: true, error: null });
    try {
      // Mock data for now - will be replaced with actual API calls
      const mockDatasets: Dataset[] = [
        {
          id: 'sales-data',
          name: 'Sales Analytics',
          description: 'Comprehensive sales data with regional breakdown',
          type: 'mixed',
          lastUpdated: new Date(),
          rowCount: 1250,
          columnCount: 8,
        },
        {
          id: 'customer-data',
          name: 'Customer Insights',
          description: 'Customer behavior and demographics data',
          type: 'table',
          lastUpdated: new Date(),
          rowCount: 850,
          columnCount: 12,
        },
        {
          id: 'inventory-data',
          name: 'Inventory Management',
          description: 'Product inventory levels and movement',
          type: 'mixed',
          lastUpdated: new Date(),
          rowCount: 2100,
          columnCount: 6,
        },
      ];
      
      set({ datasets: mockDatasets, loading: false, lastUpdated: new Date() });
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch datasets', loading: false });
    }
  },

  fetchTableData: async (datasetId: string) => {
    set({ loading: true, error: null });
    try {
      // Mock table data
      const mockTableData: TableData = {
        columns: [
          { id: 'id', name: 'ID', type: 'string', sortable: true, filterable: true, visible: true },
          { id: 'name', name: 'Name', type: 'string', sortable: true, filterable: true, visible: true },
          { id: 'category', name: 'Category', type: 'string', sortable: true, filterable: true, visible: true },
          { id: 'sales', name: 'Sales', type: 'number', sortable: true, filterable: true, visible: true },
          { id: 'region', name: 'Region', type: 'string', sortable: true, filterable: true, visible: true },
          { id: 'date', name: 'Date', type: 'date', sortable: true, filterable: true, visible: true },
        ],
        rows: Array.from({ length: 50 }, (_, i) => ({
          id: `row-${i + 1}`,
          data: {
            id: `ID-${String(i + 1).padStart(3, '0')}`,
            name: `Product ${i + 1}`,
            category: ['Electronics', 'Clothing', 'Books', 'Home'][i % 4],
            sales: Math.floor(Math.random() * 10000) + 1000,
            region: ['North', 'South', 'East', 'West'][i % 4],
            date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
          },
        })),
        pagination: {
          currentPage: 1,
          pageSize: 20,
          totalPages: 3,
          totalItems: 50,
        },
      };
      
      set((state) => ({
        tableData: { ...state.tableData, [datasetId]: mockTableData },
        loading: false,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch table data', loading: false });
    }
  },

  fetchChartData: async (datasetId: string) => {
    set({ loading: true, error: null });
    try {
      // Mock chart data
      const mockChartData: ChartData = {
        id: `${datasetId}-chart`,
        type: 'bar',
        title: 'Sales by Category',
        data: [
          { category: 'Electronics', sales: 45000 },
          { category: 'Clothing', sales: 32000 },
          { category: 'Books', sales: 28000 },
          { category: 'Home', sales: 38000 },
        ],
        config: {
          xAxis: 'category',
          yAxis: 'sales',
          height: 300,
          width: 600,
        },
      };
      
      set((state) => ({
        chartData: { ...state.chartData, [datasetId]: mockChartData },
        loading: false,
      }));
    } catch (error) {
      set({ error: error instanceof Error ? error.message : 'Failed to fetch chart data', loading: false });
    }
  },

  refreshData: async (datasetId: string) => {
    await Promise.all([
      get().fetchTableData(datasetId),
      get().fetchChartData(datasetId),
    ]);
  },

  clearError: () => set({ error: null }),
}));
