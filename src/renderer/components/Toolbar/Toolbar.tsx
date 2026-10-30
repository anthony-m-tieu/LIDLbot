import { useState } from 'react';
import ApplicationMenu from './Menu/ApplicationMenu/ApplicationMenu';
import ModeToggle from "./ModeToggle/ModeToggle";
import NavigationMenu from './Menu/NavigationMenu/NavigationMenu';
import './Toolbar.css';

export default function Toolbar() {
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
    '--navigation-ribbon-margin': `${margin}px`,
  } as React.CSSProperties;

  return (
    <>
      <div className="toolbar" onWheel={handleWheel} style={toolbarStyle}>
          <div className="toolbar__left">
            <div aria-hidden="true" className="toolbar__logo">LIDLbot</div>
            <ApplicationMenu />
          </div>
          <div className="toolbar__center">
            <NavigationMenu onMarginChange={setMargin} />
          </div>
          <div className="toolbar__right">
            <ModeToggle />
          </div>
        </div>
      <div className="toolbar__edge-gradient-left" />
      <div className="toolbar__edge-gradient-right" />
    </>
  );
}
