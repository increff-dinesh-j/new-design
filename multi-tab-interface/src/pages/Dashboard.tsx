import React, { useEffect, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Button,
  Chip,
  Spinner,
  Alert,
  Switch,
  Tooltip,
} from '@heroui/react';
import { useTabStore } from '../stores/tabStore';
import { useDataStore } from '../stores/dataStore';
import { useSettingsStore } from '../stores/settingsStore';
import { useAutoRefresh } from '../hooks/useAutoRefresh';
import { useOfflineDetection } from '../hooks/useOfflineDetection';
import { useScrollPosition } from '../hooks/useScrollPosition';
import { showToast } from '../components/ui/ToastProvider';
import TabNavigation from '../components/tabs/TabNavigation';
import DataGrid from '../components/data/DataGrid';
import AccessibleChartComponent from '../components/data/AccessibleChartComponent';
import FilterPanel from '../components/data/FilterPanel';
import type { Dataset, FilterState } from '../types';

const Dashboard: React.FC = () => {
  const { tabs, activeTabId, addTab, updateTabFilters } = useTabStore();
  const { datasets, tableData, chartData, loading, error, fetchDatasets, fetchTableData, fetchChartData } = useDataStore();
  const { preferences, updatePreferences } = useSettingsStore();
  const { isOnline } = useOfflineDetection();
  const [showFilterPanel, setShowFilterPanel] = useState(preferences.showFilters);

  // Auto-refresh functionality
  const { isRefreshing, lastRefresh, manualRefresh } = useAutoRefresh({
    interval: preferences.refreshInterval,
    enabled: preferences.autoRefresh && isOnline,
    onRefresh: async () => {
      if (activeTabId) {
        const activeTab = tabs.find(tab => tab.id === activeTabId);
        if (activeTab) {
          await Promise.all([
            fetchTableData(activeTab.dataset.id),
            fetchChartData(activeTab.dataset.id),
          ]);
          showToast.success('Data refreshed successfully');
        }
      }
    },
    onError: (error) => {
      showToast.error(`Failed to refresh data: ${error.message}`);
    },
  });

  // Scroll position management
  const scrollRef = useScrollPosition(activeTabId || 'default');

  useEffect(() => {
    fetchDatasets();
  }, [fetchDatasets]);

  useEffect(() => {
    if (activeTabId) {
      const activeTab = tabs.find(tab => tab.id === activeTabId);
      if (activeTab) {
        fetchTableData(activeTab.dataset.id);
        fetchChartData(activeTab.dataset.id);
      }
    }
  }, [activeTabId, tabs, fetchTableData, fetchChartData]);

  useEffect(() => {
    setShowFilterPanel(preferences.showFilters);
  }, [preferences.showFilters]);

  const handleAddDataset = (dataset: Dataset) => {
    addTab({
      title: dataset.name,
      dataset,
      filters: {},
      sortState: { direction: 'none' },
      viewState: {
        density: 'cozy',
        showRowNumbers: true,
        showFilters: true,
        showSearch: true,
      },
    });
    showToast.success(`${dataset.name} dataset added successfully`);
  };

  const handleDrillDown = (data: any) => {
    console.log('Drill down data:', data);
    showToast.info(`Drilling down into ${data.category || data.name}`);
    // Implement drill-down functionality
  };

  const handleChartHover = (data: any) => {
    console.log('Chart hover data:', data);
    // Implement tooltip or hover functionality
  };

  const handleFilterChange = (filters: FilterState) => {
    if (activeTabId) {
      updateTabFilters(activeTabId, filters);
      showToast.success('Filters applied successfully');
    }
  };

  const handleClearFilters = () => {
    if (activeTabId) {
      updateTabFilters(activeTabId, {});
      showToast.info('All filters cleared');
    }
  };

  const handleManualRefresh = async () => {
    await manualRefresh();
  };

  const activeTab = tabs.find(tab => tab.id === activeTabId);
  const currentTableData = activeTab ? tableData[activeTab.dataset.id] : null;
  const currentChartData = activeTab ? chartData[activeTab.dataset.id] : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Offline Indicator */}
        {!isOnline && (
          <Alert
            color="warning"
            variant="faded"
            className="mb-4"
            title="You're offline"
            description="Some features may be limited. Data shown is from cache."
          />
        )}

        {/* Dataset Selection */}
        {tabs.length === 0 && (
          <Card className="mb-6 glass-blur">
            <CardHeader className="colorful-header">
              <h2 className="text-xl font-semibold">Welcome to Multi-Tab Interface</h2>
            </CardHeader>
            <CardBody>
              <div className="space-y-4">
                <p className="text-default-600">
                  Select a dataset to get started with your analysis:
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {datasets.map((dataset) => (
                    <Card
                      key={dataset.id}
                      className="cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                      isPressable
                      onPress={() => handleAddDataset(dataset)}
                    >
                      <CardBody className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold">{dataset.name}</h3>
                          <Chip size="sm" color="primary" variant="flat">
                            {dataset.type}
                          </Chip>
                        </div>
                        <p className="text-sm text-default-500 mb-3">
                          {dataset.description}
                        </p>
                        <div className="flex justify-between text-xs text-default-400">
                          <span>{dataset.rowCount.toLocaleString()} rows</span>
                          <span>{dataset.columnCount} columns</span>
                        </div>
                      </CardBody>
                    </Card>
                  ))}
                </div>
              </div>
            </CardBody>
          </Card>
        )}

        {/* Error Display */}
        {error && (
          <Alert
            color="danger"
            variant="faded"
            className="mb-6"
            title="Error"
            description={error}
          />
        )}

        {/* Tab Navigation */}
        {tabs.length > 0 && <TabNavigation />}

        {/* Main Content */}
        {activeTab && (
          <div className="space-y-6 mt-6" ref={scrollRef}>
            {/* Summary Header */}
            <Card className="glass-blur">
              <CardHeader className="colorful-header">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{activeTab.title}</h2>
                    <p className="text-white/80 text-sm">{activeTab.dataset.description}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Chip color="success" variant="flat" size="sm">
                      {activeTab.dataset.rowCount.toLocaleString()} records
                    </Chip>
                    
                    {/* Auto-refresh toggle */}
                    <Tooltip content="Toggle auto-refresh">
                      <Switch
                        isSelected={preferences.autoRefresh}
                        onValueChange={(checked) => {
                          updatePreferences({ autoRefresh: checked });
                          showToast.info(checked ? 'Auto-refresh enabled' : 'Auto-refresh disabled');
                        }}
                        size="sm"
                        color="primary"
                      />
                    </Tooltip>
                    
                    {/* Manual refresh button */}
                    <Button
                      color="primary"
                      variant="flat"
                      size="sm"
                      isLoading={isRefreshing}
                      onPress={handleManualRefresh}
                    >
                      Refresh
                    </Button>
                    
                    {/* Filter panel toggle */}
                    <Button
                      color="secondary"
                      variant="flat"
                      size="sm"
                      onPress={() => {
                        const newValue = !showFilterPanel;
                        setShowFilterPanel(newValue);
                        updatePreferences({ showFilters: newValue });
                      }}
                    >
                      {showFilterPanel ? 'Hide' : 'Show'} Filters
                    </Button>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Last refresh indicator */}
            {lastRefresh && (
              <div className="text-xs text-default-500 text-center">
                Last updated: {lastRefresh.toLocaleTimeString()}
              </div>
            )}

            {/* Main content area with filter panel */}
            <div className="flex gap-6">
              {/* Main content */}
              <div className="flex-1 space-y-6">
                {/* Charts Section */}
                {currentChartData && (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <AccessibleChartComponent
                      chart={currentChartData}
                      onDrillDown={handleDrillDown}
                      onHover={handleChartHover}
                    />
                  </div>
                )}

                {/* Data Grid */}
                {currentTableData && (
                  <DataGrid
                    data={currentTableData}
                    loading={loading}
                    onSort={(columnId, direction) => {
                      console.log('Sort:', columnId, direction);
                    }}
                    onFilter={(filters) => {
                      console.log('Filter:', filters);
                    }}
                    onPageChange={(page) => {
                      console.log('Page change:', page);
                    }}
                  />
                )}

                {/* Loading State */}
                {loading && !currentTableData && (
                  <Card className="glass-blur">
                    <CardBody className="flex items-center justify-center h-64">
                      <div className="text-center">
                        <Spinner size="lg" color="primary" className="mb-4" />
                        <p className="text-default-500">Loading data...</p>
                      </div>
                    </CardBody>
                  </Card>
                )}
              </div>

              {/* Filter Panel */}
              {showFilterPanel && currentTableData && (
                <FilterPanel
                  columns={currentTableData.columns}
                  filters={activeTab.filters}
                  onFilterChange={handleFilterChange}
                  onClearAll={handleClearFilters}
                  isVisible={showFilterPanel}
                  onToggleVisibility={() => {
                    const newValue = !showFilterPanel;
                    setShowFilterPanel(newValue);
                    updatePreferences({ showFilters: newValue });
                  }}
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
