import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { useMode } from '../../contexts/ModeContext';
import { useNavigation, ConfigureTabs, RunTabs } from '../../contexts/NavigationContext';
import './NavigationBar.css';

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

type NavigationBarProps = {
    onMarginChange: (margin: number) => void;
};

export default function NavigationBar({
    onMarginChange,
}: NavigationBarProps) {
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
        onMarginChange(mode === 'configure' ? 0 : -141);
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
            className={`navigation-bar navigation-bar--${mode}`}
            aria-label={`${mode} navigation`}
        >
            <span
                className="navigation-bar__indicator"
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
                    className="navigation-bar__tab"
                    aria-current={selectedTab === tab.id ? 'page' : undefined}
                    onClick={() => handleTabClick(tab.id)}
                >
                    {tab.label}
                </button>
            ))}
        </nav>
    );
}