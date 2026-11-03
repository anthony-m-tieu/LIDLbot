import Toolbar from "./components/Toolbar/Toolbar";
import { AnimationProvider } from "./contexts/AnimationContext";
import { ModeProvider } from "./contexts/ModeContext";
import { NavigationProvider } from "./contexts/NavigationContext";
import { ScaleProvider } from "./contexts/ScaleContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import "./App.css";

export default function App() {
  return (
    <AnimationProvider>
      <ScaleProvider>
        <ThemeProvider>
          <ModeProvider>
            <NavigationProvider>
              <div className="app">
                <Toolbar />
                <div className="app__content"/>
              </div>
            </NavigationProvider>
          </ModeProvider>
        </ThemeProvider>
      </ScaleProvider>
    </AnimationProvider>
  );
}
