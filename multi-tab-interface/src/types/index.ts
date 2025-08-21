// Core data types
export interface Dataset {
  id: string;
  name: string;
  description?: string;
  type: 'table' | 'chart' | 'mixed';
  lastUpdated: Date;
  rowCount: number;
  columnCount: number;
}

export interface TabData {
  id: string;
  title: string;
  dataset: Dataset;
  isActive: boolean;
  order: number;
  filters: FilterState;
  sortState: SortState;
  viewState: ViewState;
}

export interface FilterState {
  [columnId: string]: FilterClause[];
}

export interface FilterClause {
  id: string;
  columnId: string;
  operator: 'equals' | 'contains' | 'startsWith' | 'greaterThan' | 'lessThan' | 'between';
  value: string | number | [number, number];
  isActive: boolean;
}

export interface SortState {
  columnId?: string;
  direction: 'asc' | 'desc' | 'none';
}

export interface ViewState {
  density: 'compact' | 'cozy' | 'comfortable';
  showRowNumbers: boolean;
  showFilters: boolean;
  showSearch: boolean;
}

// Chart types
export interface ChartData {
  id: string;
  type: 'bar' | 'line' | 'pie' | 'area';
  title: string;
  data: any[];
  config: ChartConfig;
}

export interface ChartConfig {
  xAxis?: string;
  yAxis?: string;
  color?: string;
  height?: number;
  width?: number;
}

// Table types
export interface TableData {
  columns: TableColumn[];
  rows: TableRow[];
  pagination: PaginationState;
}

export interface TableColumn {
  id: string;
  name: string;
  type: 'string' | 'number' | 'date' | 'boolean';
  sortable: boolean;
  filterable: boolean;
  width?: number;
  visible: boolean;
}

export interface TableRow {
  id: string;
  data: Record<string, any>;
  isSelected?: boolean;
}

export interface PaginationState {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalItems: number;
}

// User interface types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'analyst' | 'admin' | 'viewer';
  preferences: UserPreferences;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  defaultPageSize: number;
  autoRefresh: boolean;
  refreshInterval: number;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  status: 'success' | 'error';
  message?: string;
  timestamp: Date;
}

export interface ErrorResponse {
  status: 'error';
  message: string;
  code?: string;
  details?: any;
}

// Component prop types
export interface TabProps {
  tab: TabData;
  onTabClick: (tabId: string) => void;
  onTabClose: (tabId: string) => void;
  isActive: boolean;
}

export interface DataGridProps {
  data: TableData;
  onSort: (columnId: string, direction: 'asc' | 'desc') => void;
  onFilter: (filters: FilterState) => void;
  onRowSelect: (rowId: string, selected: boolean) => void;
  loading?: boolean;
}

export interface ChartProps {
  chart: ChartData;
  onDrillDown?: (data: any) => void;
  onHover?: (data: any) => void;
}

export interface FilterPanelProps {
  columns: TableColumn[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearAll: () => void;
}
