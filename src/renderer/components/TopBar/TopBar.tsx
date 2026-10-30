import './TopBar.css';
import ModeToggle from "../ModeToggle/ModeToggle";
import NavigationBar from '../NavigationBar/NavigationBar';
import AppBar from '../AppBar/AppBar';
import { useState } from 'react';

export default function TopBar() {

    function handleWheel(event: React.WheelEvent<HTMLDivElement>) {
        const element = event.currentTarget;

        if (element.scrollWidth <= element.clientWidth) return;
        if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
            element.scrollLeft += event.deltaY;
        }
    }

    const [margin, setMargin] = useState(0);

    const topBarStyle = {
        '--left-right-margin': `${margin}px`,
    } as React.CSSProperties;

    return (
        <div className="top-bar__wrapper" >
            <div className="top-bar" onWheel={handleWheel} style={topBarStyle}>
                <div className="top-bar__content">
                    <div className="top-bar__left">
                        <div className="top-bar__logo">LIDLbot</div>
                        <AppBar />
                    </div>
                    <div className="top-bar__center">
                        <NavigationBar onMarginChange={setMargin} />
                    </div>
                    <div className="top-bar__right">
                        <ModeToggle />
                    </div>
                </div>
            </div>
            <div className="top-bar__gradient-left" />
            <div className="top-bar__gradient-right" />
        </div>
    );
}
