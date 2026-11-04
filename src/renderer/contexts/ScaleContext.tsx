import {
  createContext,
  useContext,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { useAnimations } from "../contexts/AnimationContext";
import platform from "../platform";

type ScaleContextType = {
  scale: number;
  setScale: (scale: number) => void;
};

const ScaleContext = createContext<ScaleContextType | undefined>(undefined);

export function ScaleProvider({ children }: { children: ReactNode }) {
  const { animationsEnabled } = useAnimations();
  const [scale, setScaleState] = useState(100);
  const animationRef = useRef<number | null>(null);

  const setScale = async (newScale: number) => {
    const target = Math.min(200, Math.max(50, newScale));

    if (!animationsEnabled) { 
      await platform.window.setZoomFactor(target / 100);
      setScaleState(target);
      return;
    }

    if (animationRef.current !== null) {
      cancelAnimationFrame(animationRef.current);
    }

    const start = scale;
    const difference = target - start;
    const duration = 160;
    let startTime: number | null = null;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = start + difference * eased;
      platform.window.setZoomFactor(current / 100);

      setScaleState(current);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        animationRef.current = null;
        setScaleState(target);
      }
    };
    animationRef.current = requestAnimationFrame(animate);
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