import React, { useState, useMemo } from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  Chip,
  Pagination,
  Spinner,
  Card,
  CardBody,
} from '@heroui/react';
import type { TableData, TableColumn as TableColumnType, FilterState } from '../../types';

interface DataGridProps {
  data: TableData;
  loading?: boolean;
  onSort?: (columnId: string, direction: 'asc' | 'desc') => void;
  onFilter?: (filters: FilterState) => void;
  onPageChange?: (page: number) => void;
}

const DataGrid: React.FC<DataGridProps> = ({
  data,
  loading = false,
  onSort,
  onFilter,
  onPageChange,
}) => {
  const [sortDescriptor, setSortDescriptor] = useState<any>({});
  const [filterValue, setFilterValue] = useState('');

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = useMemo(() => {
    let filteredData = [...data.rows];

    if (hasSearchFilter) {
      filteredData = filteredData.filter((row) =>
        Object.values(row.data).some((value) =>
          String(value).toLowerCase().includes(filterValue.toLowerCase())
        )
      );
    }

    return filteredData;
  }, [data.rows, filterValue, hasSearchFilter]);

  const sortedItems = useMemo(() => {
    return [...filteredItems].sort((a, b) => {
      const first = a.data[sortDescriptor.column];
      const second = b.data[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [filteredItems, sortDescriptor]);

  const onSearchChange = React.useCallback((value?: string) => {
    if (value) {
      setFilterValue(value);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
  }, []);

  const topContent = React.useMemo(() => {
    return (
      <div className="flex flex-col gap-4">
        <div className="flex justify-between gap-3 items-end">
          <Input
            isClearable
            className="w-full sm:max-w-[44%]"
            placeholder="Search by name..."
            startContent={<span className="text-default-400">🔍</span>}
            value={filterValue}
            onClear={() => onClear()}
            onValueChange={onSearchChange}
          />
          <div className="flex gap-3">
            <Button color="primary" variant="flat">
              Add New
            </Button>
          </div>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-default-400 text-small">
            Total {data.rows.length} items
          </span>
        </div>
      </div>
    );
  }, [filterValue, onSearchChange, onClear, data.rows.length]);

  const bottomContent = React.useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <span className="text-default-400 text-small">
            Showing {((data.pagination.currentPage - 1) * data.pagination.pageSize) + 1} to{" "}
            {Math.min(data.pagination.currentPage * data.pagination.pageSize, data.pagination.totalItems)} of{" "}
            {data.pagination.totalItems} entries
          </span>
        </div>
        <Pagination
          isCompact
          showControls
          showShadow
          color="primary"
          page={data.pagination.currentPage}
          total={data.pagination.totalPages}
          onChange={onPageChange}
        />
      </div>
    );
  }, [data.pagination, onPageChange]);

  const renderCell = React.useCallback((row: any, columnKey: React.Key) => {
    const cellValue = row.data[columnKey];

    switch (columnKey) {
      case "sales":
        return (
          <div className="flex items-center gap-2">
            <span className="font-semibold">${cellValue.toLocaleString()}</span>
            <Chip
              size="sm"
              variant="flat"
              color={cellValue > 5000 ? "success" : "warning"}
            >
              {cellValue > 5000 ? "High" : "Medium"}
            </Chip>
          </div>
        );
      case "category":
        return (
          <Chip
            size="sm"
            variant="flat"
            color="primary"
          >
            {cellValue}
          </Chip>
        );
      case "date":
        return (
          <span className="text-default-500">
            {new Date(cellValue).toLocaleDateString()}
          </span>
        );
      default:
        return cellValue;
    }
  }, []);

  if (loading) {
    return (
      <Card className="w-full">
        <CardBody className="flex items-center justify-center h-64">
          <Spinner size="lg" color="primary" />
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardBody className="p-0">
        <Table
          aria-label="Data table with search and pagination"
          isHeaderSticky
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: "max-h-[600px]",
          }}
          sortDescriptor={sortDescriptor}
          topContent={topContent}
          topContentPlacement="outside"
          onSortChange={setSortDescriptor}
        >
          <TableHeader columns={data.columns}>
            {(column) => (
              <TableColumn
                key={column.id}
                allowsSorting={column.sortable}
                allowsFiltering={column.filterable}
              >
                {column.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody
            emptyContent={"No items found"}
            items={sortedItems}
          >
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardBody>
    </Card>
  );
};

export default DataGrid;
