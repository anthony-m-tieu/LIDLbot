import { ModeProvider, useMode } from './contexts/ModeContext';
import { NavigationProvider, useNavigation } from './contexts/NavigationContext';
import TopBar from './components/TopBar/TopBar';

function MainContent() {
  const { mode } = useMode();
  const { configureTab, runTab } = useNavigation();

  return (
    <div style={{flex: "1", backgroundColor: "#F8F8FA"}}>
      <p>
        Current mode: <strong>{mode}</strong>
      </p>
      <p>
        Current configure tab: <strong>{configureTab}</strong>
      </p>
      <p>
        Current run tab: <strong>{runTab}</strong>
      </p>
    </div>
  );
}

export default function App() {
  return (
    <ModeProvider>
      <NavigationProvider>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <TopBar />
        <MainContent/>
        </div>
      </NavigationProvider>
    </ModeProvider>
  );
}