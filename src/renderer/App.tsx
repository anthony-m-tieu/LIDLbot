import Toolbar from "./components/Toolbar/Toolbar";
import { ModeProvider, useMode } from "./contexts/ModeContext";
import {
  NavigationProvider,
  useNavigation,
} from "./contexts/NavigationContext";
import { AnimationProvider } from "./contexts/AnimationContext";
import { ThemeProvider } from "./contexts/ThemeContext";

function MainContent() {
  const { mode } = useMode();
  const { configureTab, runTab } = useNavigation();

  return (
    <div className="body">
      {/* <p>
        Current mode: <strong>{mode}</strong>
      </p>
      <p>
        Current configure tab: <strong>{configureTab}</strong>
      </p>
      <p>
        Current run tab: <strong>{runTab}</strong>
      </p> */}
    </div>
  );
}

export default function App() {
  return (
    <AnimationProvider>
      <ThemeProvider>
        <ModeProvider>
          <NavigationProvider>
            <div
            className="body"
              style={{
                display: "flex",
                flexDirection: "column",
                minHeight: "100vh",
              }}
            >
              <Toolbar />
              <MainContent />
            </div>
          </NavigationProvider>
        </ModeProvider>
      </ThemeProvider>
    </AnimationProvider>
  );
}
