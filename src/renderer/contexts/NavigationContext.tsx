import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

export type ConfigureTabs = 'project' | 'sets' | 'modules' | 'blocks' | 'trial decks';
export type RunTabs = 'project';

type NavigationState = {
  configureTab: ConfigureTabs;
  runTab: RunTabs;
  setConfigureTab: (tab: ConfigureTabs) => void;
  setRunTab: (tab: RunTabs) => void;
};

const NavigationContext = createContext<NavigationState | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [configureTab, setConfigureTab] = useState<ConfigureTabs>('project');
  const [runTab, setRunTab] = useState<RunTabs>('project');

  const value = {
    configureTab,
    runTab,
    setConfigureTab,
    setRunTab,
  };

  return (
    <NavigationContext.Provider value={value}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};