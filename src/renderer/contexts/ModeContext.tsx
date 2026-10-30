import type { ReactNode } from 'react';
import { createContext, useContext, useState } from 'react';

export type AppMode = 'configure' | 'run';

type ModeContextType = {
  mode: AppMode;
  setMode: (mode: AppMode) => void;
};

const ModeContext = createContext<ModeContextType | undefined>(undefined);

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<AppMode>('configure');

  return (
    <ModeContext.Provider value={{ mode, setMode }}>
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  const context = useContext(ModeContext);
  if (!context) {
    throw new Error('useMode must be used within a ModeProvider');
  }
  return context;
}
