import { createContext, useContext, useState, type ReactNode } from "react";
import { useEffect } from "react";

type AnimationContextType = {
  animationsEnabled: boolean;
  setAnimationsEnabled: (enabled: boolean) => void;
  toggleAnimations: () => void;
};

const AnimationContext = createContext<AnimationContextType | undefined>(
  undefined,
);

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  useEffect(() => {
    document.body.classList.toggle("animations-disabled", !animationsEnabled);
  }, [animationsEnabled]);

  const toggleAnimations = () => {
    setAnimationsEnabled((prev) => !prev);
  };

  return (
    <AnimationContext.Provider
      value={{
        animationsEnabled,
        setAnimationsEnabled,
        toggleAnimations,
      }}
    >
      {children}
    </AnimationContext.Provider>
  );
}

export function useAnimations() {
  const context = useContext(AnimationContext);

  if (!context) {
    throw new Error("useAnimations must be used within AnimationProvider");
  }

  return context;
}
