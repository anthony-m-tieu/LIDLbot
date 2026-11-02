import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

type ScaleContextType = {
  scale: number;
  setScale: (scale: number) => Promise<void>;
};

const ScaleContext = createContext<ScaleContextType | undefined>(undefined);

export function ScaleProvider({ children }: { children: ReactNode }) {
  const [scale, setScaleState] = useState(100);

  const setScale = async (newScale: number) => {
    const clampedScale = Math.min(200, Math.max(50, newScale));

    await window.electron.setZoomFactor(clampedScale / 100);
    setScaleState(clampedScale);
  };

  return (
    <ScaleContext.Provider value={{ scale, setScale }}>
      {children}
    </ScaleContext.Provider>
  );
}

export function useScale() {
  const context = useContext(ScaleContext);

  if (!context) {
    throw new Error("useScale must be used within ScaleProvider");
  }

  return context;
}