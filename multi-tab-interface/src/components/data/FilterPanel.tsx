import React, { useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Input,
  Button,
  Chip,
  Divider,
} from '@heroui/react';
import type { TableColumn, FilterState, FilterClause } from '../../types';

interface FilterPanelProps {
  columns: TableColumn[];
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onClearAll: () => void;
  isVisible: boolean;
  onToggleVisibility: () => void;
}

const FilterPanel: React.FC<FilterPanelProps> = ({
  columns,
  filters,
  onFilterChange,
  onClearAll,
  isVisible,
  onToggleVisibility,
}) => {
  const [localFilters, setLocalFilters] = useState<FilterState>(filters);

  const filterableColumns = columns.filter(col => col.filterable);

  const handleFilterChange = (columnId: string, filterClause: FilterClause) => {
    const updatedFilters = {
      ...localFilters,
      [columnId]: [filterClause],
    };
    setLocalFilters(updatedFilters);
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
  };

  const handleClearFilters = () => {
    setLocalFilters({});
    onClearAll();
  };

  const getFilterComponent = (column: TableColumn) => {
    const currentFilter = localFilters[column.id]?.[0];
    const value = currentFilter?.value || '';

    switch (column.type) {
      case 'string':
        return (
          <Input
            placeholder={`Filter ${column.name}...`}
            value={value as string}
            onValueChange={(newValue) => {
              handleFilterChange(column.id, {
                id: `filter-${column.id}`,
                columnId: column.id,
                operator: 'contains',
                value: newValue,
                isActive: !!newValue,
              });
            }}
            size="sm"
            variant="bordered"
          />
        );

      case 'number':
        return (
          <div className="space-y-2">
            <Input
              placeholder="Min value"
              type="number"
              value={Array.isArray(value) ? String(value[0]) : ''}
              onValueChange={(newValue) => {
                const currentMax = Array.isArray(value) ? value[1] : 0;
                handleFilterChange(column.id, {
                  id: `filter-${column.id}`,
                  columnId: column.id,
                  operator: 'between',
                  value: [Number(newValue) || 0, Number(currentMax) || 0],
                  isActive: !!(newValue || currentMax),
                });
              }}
              size="sm"
              variant="bordered"
            />
            <Input
              placeholder="Max value"
              type="number"
              value={Array.isArray(value) ? String(value[1]) : ''}
              onValueChange={(newValue) => {
                const currentMin = Array.isArray(value) ? value[0] : 0;
                handleFilterChange(column.id, {
                  id: `filter-${column.id}`,
                  columnId: column.id,
                  operator: 'between',
                  value: [Number(currentMin), Number(newValue) || 0],
                  isActive: !!(currentMin || newValue),
                });
              }}
              size="sm"
              variant="bordered"
            />
          </div>
        );

      case 'date':
        return (
          <Input
            type="date"
            placeholder="Select date"
            value={value ? String(value) : ''}
            onValueChange={(newValue) => {
              handleFilterChange(column.id, {
                id: `filter-${column.id}`,
                columnId: column.id,
                operator: 'equals',
                value: newValue,
                isActive: !!newValue,
              });
            }}
            size="sm"
            variant="bordered"
          />
        );

      default:
        return (
          <Input
            placeholder={`Filter ${column.name}...`}
            value={value as string}
            onValueChange={(newValue) => {
              handleFilterChange(column.id, {
                id: `filter-${column.id}`,
                columnId: column.id,
                operator: 'contains',
                value: newValue,
                isActive: !!newValue,
              });
            }}
            size="sm"
            variant="bordered"
          />
        );
    }
  };

  const activeFilterCount = Object.values(localFilters).flat().filter(f => f.isActive).length;

  if (!isVisible) {
    return (
      <Button
        variant="flat"
        color="primary"
        size="sm"
        onPress={onToggleVisibility}
        className="fixed top-20 right-4 z-50"
      >
        Show Filters
      </Button>
    );
  }

  return (
    <Card className="w-80 glass-blur border border-white/20">
      <CardHeader className="flex justify-between items-center pb-2">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">Filters</h3>
          {activeFilterCount > 0 && (
            <Chip size="sm" color="primary" variant="flat">
              {activeFilterCount}
            </Chip>
          )}
        </div>
        <Button
          isIconOnly
          size="sm"
          variant="light"
          onPress={onToggleVisibility}
        >
          ×
        </Button>
      </CardHeader>
      <CardBody className="space-y-4">
        {filterableColumns.map((column) => (
          <div key={column.id} className="space-y-2">
            <label className="text-sm font-medium text-default-700">
              {column.name}
            </label>
            {getFilterComponent(column)}
          </div>
        ))}
        
        <Divider />
        
        <div className="flex gap-2">
          <Button
            color="primary"
            size="sm"
            className="flex-1"
            onPress={handleApplyFilters}
          >
            Apply Filters
          </Button>
          <Button
            color="danger"
            variant="light"
            size="sm"
            onPress={handleClearFilters}
          >
            Clear All
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

export default FilterPanel;
