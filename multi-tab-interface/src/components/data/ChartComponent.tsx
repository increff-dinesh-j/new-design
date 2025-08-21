import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Chip,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@heroui/react';
import type { ChartData } from '../../types';

interface ChartComponentProps {
  chart: ChartData;
  onDrillDown?: (data: any) => void;
  onHover?: (data: any) => void;
}

const ChartComponent: React.FC<ChartComponentProps> = ({
  chart,
  onDrillDown,
  onHover,
}) => {
  // Mock chart rendering - in a real app, you'd use Chart.js, Recharts, or similar
  const renderMockChart = () => {
    const maxValue = Math.max(...chart.data.map((item: any) => item.sales || item.value || 0));
    
    return (
      <div className="w-full h-64 flex items-end justify-between gap-2 p-4">
        {chart.data.map((item: any, index: number) => {
          const value = item.sales || item.value || 0;
          const height = (value / maxValue) * 100;
          const color = `hsl(${200 + index * 40}, 70%, 50%)`;
          
          return (
            <div
              key={index}
              className="flex flex-col items-center gap-2 flex-1"
              onMouseEnter={() => onHover?.(item)}
              onClick={() => onDrillDown?.(item)}
            >
              <div
                className="w-full rounded-t-lg transition-all duration-300 hover:opacity-80 cursor-pointer"
                style={{
                  height: `${height}%`,
                  backgroundColor: color,
                  minHeight: '20px',
                }}
              />
              <span className="text-xs text-default-500 text-center">
                {item.category || item.name}
              </span>
              <span className="text-xs font-semibold">
                ${value.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <Card className="w-full glass-blur">
      <CardHeader className="flex justify-between items-center pb-2">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold">{chart.title}</h3>
          <Chip size="sm" color="primary" variant="flat">
            {chart.type.toUpperCase()}
          </Chip>
        </div>
        <Dropdown>
          <DropdownTrigger>
            <Button variant="light" size="sm">
              Actions
            </Button>
          </DropdownTrigger>
          <DropdownMenu aria-label="Chart actions">
            <DropdownItem key="export">Export Data</DropdownItem>
            <DropdownItem key="refresh">Refresh</DropdownItem>
            <DropdownItem key="settings">Chart Settings</DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </CardHeader>
      <CardBody className="pt-0">
        {renderMockChart()}
        <div className="mt-4 text-center">
          <p className="text-sm text-default-500">
            Click on bars to drill down into detailed data
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default ChartComponent;
