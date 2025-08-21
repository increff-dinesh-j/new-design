import React, { useState } from 'react';
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Chip,
  Tooltip,
} from '@heroui/react';
import { useTabStore } from '../../stores/tabStore';
import SettingsModal from '../ui/SettingsModal';

const Header: React.FC = () => {
  const { tabs, activeTabId } = useTabStore();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const activeTab = tabs.find(tab => tab.id === activeTabId);

  return (
    <>
      <Navbar className="glass-blur border-b border-white/20">
        <NavbarBrand>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">MT</span>
            </div>
            <div>
              <p className="font-bold text-xl">Multi-Tab Interface</p>
              <p className="text-sm text-default-500">Data Analytics Platform</p>
            </div>
          </div>
        </NavbarBrand>

        <NavbarContent className="hidden sm:flex gap-6" justify="center">
          <NavbarItem>
            <div className="flex items-center gap-2">
              <span className="text-sm text-default-500">Active Dataset:</span>
              {activeTab ? (
                <Chip color="primary" variant="flat" size="sm">
                  {activeTab.title}
                </Chip>
              ) : (
                <span className="text-sm text-default-400">No dataset selected</span>
              )}
            </div>
          </NavbarItem>
        </NavbarContent>

        <NavbarContent justify="end">
          <NavbarItem>
            <Tooltip content="Settings">
              <Button
                isIconOnly
                variant="light"
                size="sm"
                onPress={() => setIsSettingsOpen(true)}
                className="transition-standard hover:scale-105"
              >
                ⚙️
              </Button>
            </Tooltip>
          </NavbarItem>
          
          <NavbarItem>
            <Button
              color="primary"
              variant="flat"
              size="sm"
              className="transition-standard hover:scale-105"
            >
              Refresh Data
            </Button>
          </NavbarItem>
          
          <NavbarItem>
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <Avatar
                  isBordered
                  as="button"
                  className="transition-standard hover:scale-105"
                  name="Analyst"
                  size="sm"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="User menu">
                <DropdownItem key="profile">Profile</DropdownItem>
                <DropdownItem key="settings" onPress={() => setIsSettingsOpen(true)}>
                  Settings
                </DropdownItem>
                <DropdownItem key="help">Help</DropdownItem>
                <DropdownItem key="logout" color="danger">
                  Log Out
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        </NavbarContent>
      </Navbar>

      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </>
  );
};

export default Header;
