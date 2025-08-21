import React, { useState } from 'react';
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
  Tooltip,
} from '@heroui/react';
import type { ChartData } from '../../types';

interface AccessibleChartComponentProps {
  chart: ChartData;
  onDrillDown?: (data: any) => void;
  onHover?: (data: any) => void;
}

const AccessibleChartComponent: React.FC<AccessibleChartComponentProps> = ({
  chart,
  onDrillDown,
  onHover,
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);
  const [tooltipData, setTooltipData] = useState<any>(null);

  const maxValue = Math.max(...chart.data.map((item: any) => item.sales || item.value || 0));
  const totalValue = chart.data.reduce((sum: number, item: any) => sum + (item.sales || item.value || 0), 0);

  const handleKeyDown = (event: React.KeyboardEvent, index: number) => {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        onDrillDown?.(chart.data[index]);
        break;
      case 'ArrowRight':
        event.preventDefault();
        setFocusedIndex(Math.min(index + 1, chart.data.length - 1));
        break;
      case 'ArrowLeft':
        event.preventDefault();
        setFocusedIndex(Math.max(index - 1, 0));
        break;
    }
  };

  const handleMouseEnter = (item: any, index: number) => {
    setTooltipData(item);
    setFocusedIndex(index);
    onHover?.(item);
  };

  const handleMouseLeave = () => {
    setTooltipData(null);
    setFocusedIndex(null);
  };

  const renderAccessibleChart = () => {
    return (
      <div 
        className="w-full h-64 flex items-end justify-between gap-2 p-4"
        role="img"
        aria-label={`${chart.title} chart showing ${chart.data.length} data points`}
      >
        {chart.data.map((item: any, index: number) => {
          const value = item.sales || item.value || 0;
          const height = (value / maxValue) * 100;
          const percentage = ((value / totalValue) * 100).toFixed(1);
          const color = `hsl(${200 + index * 40}, 70%, 50%)`;
          const isFocused = focusedIndex === index;
          
          return (
            <Tooltip
              key={index}
              content={
                <div className="p-2">
                  <p className="font-semibold">{item.category || item.name}</p>
                  <p>Value: ${value.toLocaleString()}</p>
                  <p>Percentage: {percentage}%</p>
                </div>
              }
              isOpen={tooltipData === item}
            >
              <div
                className={`flex flex-col items-center gap-2 flex-1 relative focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg p-1 ${
                  isFocused ? 'ring-2 ring-primary/50' : ''
                }`}
                onMouseEnter={() => handleMouseEnter(item, index)}
                onMouseLeave={handleMouseLeave}
                onKeyDown={(e) => handleKeyDown(e, index)}
                tabIndex={0}
                role="button"
                aria-label={`${item.category || item.name}: $${value.toLocaleString()} (${percentage}% of total)`}
                aria-describedby={`chart-tooltip-${index}`}
                onClick={() => onDrillDown?.(item)}
              >
                <div
                  className="w-full rounded-t-lg transition-all duration-300 hover:opacity-80 cursor-pointer"
                  style={{
                    height: `${height}%`,
                    backgroundColor: color,
                    minHeight: '20px',
                  }}
                  aria-hidden="true"
                />
                <span className="text-xs text-default-500 text-center">
                  {item.category || item.name}
                </span>
                <span className="text-xs font-semibold">
                  ${value.toLocaleString()}
                </span>
                <div
                  id={`chart-tooltip-${index}`}
                  className="sr-only"
                  aria-live="polite"
                >
                  {item.category || item.name}: ${value.toLocaleString()} ({percentage}% of total)
                </div>
              </div>
            </Tooltip>
          );
        })}
      </div>
    );
  };

  return (
    <Card className="w-full glass-blur">
      <CardHeader className="flex justify-between items-center pb-2">
        <div className="flex items-center gap-3">
          <h3 className="text-lg font-semibold" id={`chart-title-${chart.id}`}>
            {chart.title}
          </h3>
          <Chip size="sm" color="primary" variant="flat">
            {chart.type.toUpperCase()}
          </Chip>
        </div>
        <Dropdown>
          <DropdownTrigger>
            <Button 
              variant="light" 
              size="sm"
              aria-label="Chart actions menu"
            >
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
        <div
          role="region"
          aria-labelledby={`chart-title-${chart.id}`}
          aria-describedby={`chart-description-${chart.id}`}
        >
          {renderAccessibleChart()}
        </div>
        <div className="mt-4 text-center">
          <p className="text-sm text-default-500" id={`chart-description-${chart.id}`}>
            Use arrow keys to navigate between chart segments. Press Enter or Space to drill down into detailed data.
          </p>
        </div>
      </CardBody>
    </Card>
  );
};

export default AccessibleChartComponent;
