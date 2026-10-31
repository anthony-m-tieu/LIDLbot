import { useState, useRef, useEffect } from "react";
import ApplicationMenu from "./Menu/ApplicationMenu/ApplicationMenu";
import ModeToggle from "./ModeToggle/ModeToggle";
import NavigationMenu from "./Menu/NavigationMenu/NavigationMenu";
import "./Toolbar.css";

export default function Toolbar() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  const [leftNarrow, setLeftNarrow] = useState(false);
  const [rightNarrow, setRightNarrow] = useState(false);

  // Observe the widths of the left and right toolbar sections
  useEffect(() => {
    const left = leftRef.current;
    const right = rightRef.current;

    if (!left || !right) return;

    const observer = new ResizeObserver(() => {
      setLeftNarrow(left.getBoundingClientRect().width <= 311);
      setRightNarrow(right.getBoundingClientRect().width <= 221);
    });

    observer.observe(left);
    observer.observe(right);

    return () => observer.disconnect();
  }, []);

  // Horizontally scroll Toolbar with mousewheel if window is too small
  function handleWheel(event: React.WheelEvent<HTMLDivElement>) {
    const element = event.currentTarget;
    if (element.scrollWidth <= element.clientWidth) return;
    if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
      element.scrollLeft += event.deltaY;
    }
  }

  // Updating margins is a means of accommodating an issue with the NavigationRibbon
  // - The number of tabs in the NavigationRibbon depends on the current mode ("configure" or "run").
  // - However, if we allow the width of the NavigationRibbon to change when transitioning between modes,
  //   the animation for the tab indicator breaks (due to changing the frame of reference for position values).
  // - As such, the NavigationRibbon is held at a constant width, regardless of the number of tabs.
  // - This fixes the indicator animation problem, but adds unwanted space in the Toolbar when on "run" mode.
  // - The current solution is to add negative margins so that other components can overlap and hide the unwanted space.
  const [margin, setMargin] = useState(0);

  const toolbarStyle = {
    "--navigation-ribbon-margin": `${margin}px`,
  } as React.CSSProperties;

  return (
    <>
      <div className="toolbar" onWheel={handleWheel} style={toolbarStyle}>
        <div
          ref={leftRef}
          className={`toolbar__left${leftNarrow ? " toolbar__left--narrow" : ""}`}
        >
          <div className="toolbar__left-content">
            <div aria-hidden="true" className="toolbar__logo">
              LIDLbot
            </div>
            <ApplicationMenu />
          </div>
          <div className="toolbar__separator toolbar__separator-left" />
        </div>
        <div className="toolbar__center">
          <NavigationMenu onMarginChange={setMargin} />
        </div>
        <div
          ref={rightRef}
          className={`toolbar__right${rightNarrow ? " toolbar__right--narrow" : ""}`}
        >
          <div className="toolbar__separator toolbar__separator-right" />
          <div className="toolbar__right-content">
            <ModeToggle />
          </div>
        </div>
      </div>
      <div className="toolbar__edge-gradient-left" />
      <div className="toolbar__edge-gradient-right" />
    </>
  );
}
