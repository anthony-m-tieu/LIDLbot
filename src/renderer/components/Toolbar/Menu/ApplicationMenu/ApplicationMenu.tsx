import type { CSSProperties } from "react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import "../Menu.css";
import "./ApplicationMenu.css";

const tabs = [
  { id: "file", label: "File" },
  { id: "preferences", label: "Preferences" },
  { id: "help", label: "Help" },
] as const;

type TabId = (typeof tabs)[number]["id"];

type IndicatorStyle = CSSProperties & {
  "--indicator-x": string;
  "--indicator-width": string;
};

type DropdownPosition = {
  top: number;
  left: number;
};

export default function ApplicationMenu() {
  const [selectedTab, setSelectedTab] = useState<TabId | null>(null);
  const [indicator, setIndicator] = useState({
    left: 0,
    width: 0,
    ready: false,
  });
  const [dropdownPosition, setDropdownPosition] =
    useState<DropdownPosition | null>(null);

  const applicationMenuRef = useRef<HTMLElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef(new Map<TabId, HTMLButtonElement>());

  const updatePositions = useCallback(() => {
    if (!selectedTab) return;

    const nav = applicationMenuRef.current;
    const button = tabRefs.current.get(selectedTab);

    if (!nav || !button) return;

    const navRect = nav.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();

    setIndicator({
      left: buttonRect.left - navRect.left + nav.scrollLeft,
      width: buttonRect.width,
      ready: true,
    });

    setDropdownPosition({
      top: buttonRect.bottom,
      left: buttonRect.left,
    });
  }, [selectedTab]);

  useLayoutEffect(() => {
    if (!selectedTab) {
      setDropdownPosition(null);
      return;
    }

    updatePositions();

    window.addEventListener("resize", updatePositions);
    window.addEventListener("scroll", updatePositions, true);

    return () => {
      window.removeEventListener("resize", updatePositions);
      window.removeEventListener("scroll", updatePositions, true);
    };
  }, [selectedTab, updatePositions]);

  useEffect(() => {
    function handleOutsideClick(event: PointerEvent) {
      const target = event.target;

      if (!(target instanceof Node)) return;

      if (
        applicationMenuRef.current?.contains(target) ||
        dropdownRef.current?.contains(target)
      ) {
        return;
      }

      setSelectedTab(null);
    }

    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, []);

  function handleTabClick(tabId: TabId) {
    setSelectedTab((current) => (current === tabId ? null : tabId));
  }

  function handleTabHover(tabId: TabId) {
    setSelectedTab((current) => (current === null ? null : tabId));
  }

  const indicatorStyle: IndicatorStyle = {
    "--indicator-x": `${indicator.left}px`,
    "--indicator-width": `${indicator.width}px`,
    visibility: indicator.ready && selectedTab ? "visible" : "hidden",
  };

  function closeTab() {
    setSelectedTab(null);
  }

  return (
    <>
      <nav
        ref={applicationMenuRef}
        className="menu"
        aria-label="application menu"
      >
        <span
          className="menu__indicator application-menu__indicator"
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
            className="menu__tab application-menu__tab"
            aria-expanded={selectedTab === tab.id}
            aria-haspopup="menu"
            onClick={() => handleTabClick(tab.id)}
            onMouseEnter={() => handleTabHover(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </nav>

      {selectedTab &&
        dropdownPosition &&
        createPortal(
          <div
            ref={dropdownRef}
            className="application-menu__dropdown"
            role="menu"
            aria-label={`${
              tabs.find((tab) => tab.id === selectedTab)?.label
            } menu`}
            style={{
              top: dropdownPosition.top,
              left: dropdownPosition.left,
            }}
          >
            {selectedTab === "file" && (
              <>
                <button role="tabitem" type="button" onClick={closeTab}>
                  New Project
                </button>
                <button role="tabitem" type="button" onClick={closeTab}>
                  Open Project
                </button>
                <div className="application-menu__separator" />
                <button role="tabitem" type="button" onClick={closeTab}>
                  Save Project
                </button>
              </>
            )}

            {selectedTab === "preferences" && (
              <button role="menuitem" type="button" onClick={closeTab}>
                Settings
              </button>
            )}

            {selectedTab === "help" && (
              <>
                <button role="menuitem" type="button" onClick={closeTab}>
                  Documentation
                </button>
                <button role="menuitem" type="button" onClick={closeTab}>
                  About
                </button>
              </>
            )}
          </div>,
          document.body,
        )}
    </>
  );
}
