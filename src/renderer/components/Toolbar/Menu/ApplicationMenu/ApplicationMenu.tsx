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
import DropdownMenu from "./DropdownMenu/DropdownMenu";
import DropdownItem from "./DropdownMenu/DropdownItem/DropdownItem";
import { useMode } from "../../../../contexts/ModeContext";
import iconNewFile from "../../../../assets/icons/icon-new-file.svg";
import iconFolder from "../../../../assets/icons/icon-folder.svg";
import iconSave from "../../../../assets/icons/icon-save.svg";
import iconMonitor from "../../../../assets/icons/icon-monitor.svg";
import iconTheme from "../../../../assets/icons/icon-theme.svg";
import iconHappy from "../../../../assets/icons/icon-happy.svg";
import iconDocument from "../../../../assets/icons/icon-document.svg";
import iconGithub from "../../../../assets/icons/icon-github.svg";

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
  const { mode } = useMode();
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
          <DropdownMenu
            ref={dropdownRef}
            aria-label={`${
              tabs.find((tab) => tab.id === selectedTab)?.label
            } menu`}
            top={dropdownPosition.top}
            left={dropdownPosition.left}
          >
            {selectedTab === "file" && (
              <>
                {mode === "configure" && (
                  <DropdownItem
                    icon={
                      <span
                        className="icon"
                        style={{
                          maskImage: `url("${iconNewFile}")`,
                          WebkitMaskImage: `url("${iconNewFile}")`,
                          aspectRatio: "14 / 14",
                        }}
                        aria-hidden="true"
                      />
                    }
                    label="New Project"
                    secondaryText="Ctrl N"
                    onClick={closeTab}
                  />
                )}
                <DropdownItem
                  icon={
                    <span
                      className="icon"
                      style={{
                        maskImage: `url("${iconFolder}")`,
                        WebkitMaskImage: `url("${iconFolder}")`,
                        aspectRatio: "14 / 14",
                      }}
                      aria-hidden="true"
                    />
                  }
                  label="Open Project"
                  secondaryText="Ctrl O"
                  onClick={closeTab}
                />
                {mode === "configure" && (
                  <DropdownItem
                    icon={
                      <span
                        className="icon"
                        style={{
                          maskImage: `url("${iconSave}")`,
                          WebkitMaskImage: `url("${iconSave}")`,
                          aspectRatio: "14 / 14",
                        }}
                        aria-hidden="true"
                      />
                    }
                    label="Save Project"
                    secondaryText="Ctrl S"
                    onClick={closeTab}
                  />
                )}
                {mode === "configure" && (
                  <DropdownItem
                    icon={
                      <span
                        style={{
                          display: "inline-block",
                          width: "14px",
                          height: "14px",
                          flexShrink: 0,
                        }}
                        aria-hidden="true"
                      />
                    }
                    label="Save Project As"
                    secondaryText="Shift Ctrl S"
                    onClick={closeTab}
                  />
                )}
                <div className="application-menu__separator" />
                <DropdownItem
                  label="Current File:"
                  secondaryText="sample_experiment.xlsx"
                  disabled
                />
              </>
            )}

            {selectedTab === "preferences" && (
              <>
                <DropdownItem
                  icon={
                    <span
                      className="icon"
                      style={{
                        maskImage: `url("${iconMonitor}")`,
                        WebkitMaskImage: `url("${iconMonitor}")`,
                        aspectRatio: "14 / 14",
                      }}
                      aria-hidden="true"
                    />
                  }
                  label="App Scale"
                  onClick={closeTab}
                />
                <DropdownItem
                  icon={
                    <span
                      className="icon"
                      style={{
                        maskImage: `url("${iconTheme}")`,
                        WebkitMaskImage: `url("${iconTheme}")`,
                        aspectRatio: "14 / 14",
                      }}
                      aria-hidden="true"
                    />
                  }
                  label="App Theme"
                  onClick={closeTab}
                />
                <DropdownItem
                  icon={
                    <span
                      className="icon"
                      style={{
                        maskImage: `url("${iconHappy}")`,
                        WebkitMaskImage: `url("${iconHappy}")`,
                        aspectRatio: "14 / 14",
                      }}
                      aria-hidden="true"
                    />
                  }
                  label="App Animations"
                  secondaryText="Enabled"
                  onClick={closeTab}
                />
              </>
            )}

            {selectedTab === "help" && (
              <>
                <DropdownItem
                  icon={
                    <span
                      className="icon"
                      style={{
                        maskImage: `url("${iconDocument}")`,
                        WebkitMaskImage: `url("${iconDocument}")`,
                        aspectRatio: "14 / 14",
                      }}
                      aria-hidden="true"
                    />
                  }
                  label="Documentation"
                  onClick={closeTab}
                />
                <DropdownItem
                  icon={
                    <span
                      className="icon"
                      style={{
                        maskImage: `url("${iconGithub}")`,
                        WebkitMaskImage: `url("${iconGithub}")`,
                        aspectRatio: "14 / 14",
                      }}
                      aria-hidden="true"
                    />
                  }
                  label="GitHub"
                  onClick={() => {
                    closeTab();
                    void window.electron.openExternal(
                      "https://github.com/anthony-m-tieu/LIDLbot",
                    );
                  }}
                />
              </>
            )}
          </DropdownMenu>,
          document.body,
        )}
    </>
  );
}
