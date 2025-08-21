import React from 'react';
import {
  Tabs,
  Tab,
  Chip,
  Tooltip,
} from '@heroui/react';
import { useTabStore } from '../../stores/tabStore';
import type { TabData } from '../../types';

const TabNavigation: React.FC = () => {
  const { tabs, activeTabId, setActiveTab, removeTab } = useTabStore();

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleTabClose = (e: React.MouseEvent, tabId: string) => {
    e.stopPropagation();
    removeTab(tabId);
  };

  if (tabs.length === 0) {
    return (
      <div className="flex items-center justify-center h-16 bg-default-50 border-b border-default-200">
        <p className="text-default-500">No datasets loaded. Add a dataset to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white/95 backdrop-blur-sm border-b border-default-200">
      <Tabs
        selectedKey={activeTabId || undefined}
        onSelectionChange={(key) => handleTabClick(key as string)}
        variant="underlined"
        classNames={{
          tabList: "gap-6 w-full relative rounded-none p-0 border-b border-divider",
          cursor: "w-full bg-primary",
          tab: "max-w-fit px-0 h-12",
          tabContent: "group-data-[selected=true]:text-primary",
        }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.id}
            title={
              <div className="flex items-center gap-2 group">
                <span className="text-sm font-medium">{tab.title}</span>
                <Chip
                  size="sm"
                  variant="flat"
                  color="primary"
                  className="text-xs"
                >
                  {tab.dataset.rowCount.toLocaleString()}
                </Chip>
                <Tooltip content="Close tab">
                  <div
                    className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer w-5 h-5 flex items-center justify-center rounded-full hover:bg-default-200 text-default-500 hover:text-default-700"
                    onClick={(e) => handleTabClose(e, tab.id)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        handleTabClose(e as any, tab.id);
                      }
                    }}
                    aria-label="Close tab"
                  >
                    ×
                  </div>
                </Tooltip>
              </div>
            }
          />
        ))}
      </Tabs>
    </div>
  );
};

export default TabNavigation;
