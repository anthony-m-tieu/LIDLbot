import "./App.css";
import Toolbar from "./components/Toolbar/Toolbar";
import { AnimationProvider } from "./contexts/AnimationContext";
import { ModeProvider } from "./contexts/ModeContext";
import { NavigationProvider } from "./contexts/NavigationContext";
import { ProjectProvider, useProject } from "./contexts/ProjectContext";
import { ScaleProvider } from "./contexts/ScaleContext";
import { ThemeProvider } from "./contexts/ThemeContext";

export function Main() {
  const { project, filePath, isDirty } = useProject(); 
  return(
    <div className="app__content">
      <pre>{JSON.stringify({ project, filePath, isDirty }, null, 2)}</pre>
    </div>
  );
}

export default function App() {
  return (
    <ProjectProvider>
      <AnimationProvider>
        <ScaleProvider>
          <ThemeProvider>
            <ModeProvider>
              <NavigationProvider>
                <div className="app">
                  <Toolbar />
                  <Main />
                </div>
              </NavigationProvider>
            </ModeProvider>
          </ThemeProvider>
        </ScaleProvider>
      </AnimationProvider>
    </ProjectProvider>
  );
}
