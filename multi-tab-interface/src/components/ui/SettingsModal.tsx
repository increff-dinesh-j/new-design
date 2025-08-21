import React from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Switch,
  Divider,
} from '@heroui/react';
import { useSettingsStore } from '../../stores/settingsStore';
import { showToast } from './ToastProvider';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  const { preferences, updatePreferences, resetPreferences } = useSettingsStore();
  const [localPreferences, setLocalPreferences] = React.useState(preferences);

  React.useEffect(() => {
    setLocalPreferences(preferences);
  }, [preferences]);

  const handleSave = () => {
    updatePreferences(localPreferences);
    showToast.success('Settings saved successfully');
    onClose();
  };

  const handleReset = () => {
    resetPreferences();
    setLocalPreferences(preferences);
    showToast.info('Settings reset to defaults');
  };

  const handleCancel = () => {
    setLocalPreferences(preferences);
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} size="lg">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="colorful-header">
              <h2 className="text-xl font-semibold">Settings</h2>
            </ModalHeader>
            <ModalBody className="space-y-6">
              {/* Display Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Display Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Theme</label>
                    <Select
                      selectedKeys={[localPreferences.theme]}
                      onSelectionChange={(keys) => {
                        const theme = Array.from(keys)[0] as string;
                        setLocalPreferences(prev => ({ ...prev, theme: theme as any }));
                      }}
                      size="sm"
                      className="w-32"
                    >
                      <SelectItem key="light">Light</SelectItem>
                      <SelectItem key="dark">Dark</SelectItem>
                      <SelectItem key="auto">Auto</SelectItem>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Table Density</label>
                    <Select
                      selectedKeys={[localPreferences.density]}
                      onSelectionChange={(keys) => {
                        const density = Array.from(keys)[0] as string;
                        setLocalPreferences(prev => ({ ...prev, density: density as any }));
                      }}
                      size="sm"
                      className="w-32"
                    >
                      <SelectItem key="compact">Compact</SelectItem>
                      <SelectItem key="cozy">Cozy</SelectItem>
                      <SelectItem key="comfortable">Comfortable</SelectItem>
                    </Select>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Default Page Size</label>
                    <Input
                      type="number"
                      value={localPreferences.defaultPageSize}
                      onValueChange={(value) => {
                        setLocalPreferences(prev => ({ 
                          ...prev, 
                          defaultPageSize: parseInt(value) || 20 
                        }));
                      }}
                      size="sm"
                      className="w-20"
                      min={5}
                      max={100}
                    />
                  </div>
                </div>
              </div>

              <Divider />

              {/* Auto-refresh Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Auto-refresh Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Enable Auto-refresh</label>
                    <Switch
                      isSelected={localPreferences.autoRefresh}
                      onValueChange={(checked) => {
                        setLocalPreferences(prev => ({ ...prev, autoRefresh: checked }));
                      }}
                      size="sm"
                      color="primary"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Refresh Interval (seconds)</label>
                    <Input
                      type="number"
                      value={localPreferences.refreshInterval / 1000}
                      onValueChange={(value) => {
                        setLocalPreferences(prev => ({ 
                          ...prev, 
                          refreshInterval: (parseInt(value) || 30) * 1000 
                        }));
                      }}
                      size="sm"
                      className="w-20"
                      min={5}
                      max={300}
                    />
                  </div>
                </div>
              </div>

              <Divider />

              {/* Interface Settings */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Interface Settings</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Show Filters Panel</label>
                    <Switch
                      isSelected={localPreferences.showFilters}
                      onValueChange={(checked) => {
                        setLocalPreferences(prev => ({ ...prev, showFilters: checked }));
                      }}
                      size="sm"
                      color="primary"
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <label className="text-sm font-medium">Show Row Numbers</label>
                    <Switch
                      isSelected={localPreferences.showRowNumbers}
                      onValueChange={(checked) => {
                        setLocalPreferences(prev => ({ ...prev, showRowNumbers: checked }));
                      }}
                      size="sm"
                      color="primary"
                    />
                  </div>
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={handleReset}>
                Reset to Defaults
              </Button>
              <Button color="danger" variant="light" onPress={handleCancel}>
                Cancel
              </Button>
              <Button color="primary" onPress={handleSave}>
                Save Settings
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default SettingsModal;
