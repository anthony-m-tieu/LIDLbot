import type { CSSProperties } from 'react';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import { useMode } from '../../../../contexts/ModeContext';
import { ConfigureTabs, RunTabs, useNavigation } from '../../../../contexts/NavigationContext';
import '../Menu.css';
import './NavigationMenu.css';

const configureTabs: { id: ConfigureTabs; label: string }[] = [
  { id: 'project', label: 'Project' },
  { id: 'sets', label: 'Sets' },
  { id: 'modules', label: 'Modules' },
  { id: 'blocks', label: 'Blocks' },
  { id: 'trial decks', label: 'Trial Decks' },
];

const runTabs: { id: RunTabs; label: string }[] = [
  { id: 'project', label: 'Project' },
];

type IndicatorStyle = CSSProperties & {
  '--indicator-x': string;
  '--indicator-width': string;
};

type NavigationMenuProps = {
  onMarginChange: (margin: number) => void;
};

export default function NavigationMenu({
  onMarginChange,
}: NavigationMenuProps) {
  const { mode } = useMode();
  const {
    configureTab,
    runTab,
    setConfigureTab,
    setRunTab,
  } = useNavigation();

  const tabs = mode === 'configure' ? configureTabs : runTabs;
  const selectedTab = mode === 'configure' ? configureTab : runTab;

  const navRef = useRef<HTMLElement>(null);
  const tabRefs = useRef(new Map<string, HTMLButtonElement>());

  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0
  });

  const updateIndicator = useCallback(() => {
    const nav = navRef.current;
    const selectedButton = tabRefs.current.get(selectedTab);

    if (!nav || !selectedButton) return;

    const navRect = nav.getBoundingClientRect();
    const buttonRect = selectedButton.getBoundingClientRect();

    setIndicator({
      left: buttonRect.left - navRect.left + nav.scrollLeft,
      width: buttonRect.width
    });
  }, [selectedTab]);

  useLayoutEffect(() => {
    onMarginChange(mode === 'configure' ? 0 : -139.96895);
    updateIndicator();

    const nav = navRef.current;
    const selectedButton = tabRefs.current.get(selectedTab);

    if (!nav || !selectedButton) return;

    const observer = new ResizeObserver(() => {
      updateIndicator();
    });

    observer.observe(nav);
    observer.observe(selectedButton);

    return () => {
      observer.disconnect();
    };
  }, [mode, selectedTab, onMarginChange, updateIndicator]);

  function handleTabClick(tabId: ConfigureTabs | RunTabs) {
    if (mode === 'configure') {
      setConfigureTab(tabId as ConfigureTabs);
    } else {
      setRunTab(tabId as RunTabs);
    }
  }

  const indicatorStyle: IndicatorStyle = {
    '--indicator-x': `${indicator.left}px`,
    '--indicator-width': `${indicator.width}px`
  };

  return (
    <nav
      ref={navRef}
      className={`menu navigation-menu navigation-menu--${mode}`}
      aria-label={`${mode} navigation menu`}
    >
      <span
        className="menu__indicator navigation-menu__indicator"
        style={indicatorStyle}
        aria-hidden="true"
      />
      {tabs.map((tab) => (
        <button
          key={tab.id}
          ref={(element) => {
            if (element) {
              tabRefs.current.set(tab.id, element);
            } else {
              tabRefs.current.delete(tab.id);
            }
          }}
          type="button"
          className="menu__tab navigation-menu__tab"
          aria-current={selectedTab === tab.id ? 'page' : undefined}
          onClick={() => handleTabClick(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </nav>
  );
}