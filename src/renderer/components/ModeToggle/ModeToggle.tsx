import { useLayoutEffect, useRef, useState } from 'react';
import './ModeToggle.css';
import iconRun from '../../assets/icons/icon-run.svg';
import iconConfigure from '../../assets/icons/icon-configure.svg';
import { useMode } from '../../contexts/ModeContext';

export default function ModeToggle() {
    const {mode, setMode} = useMode();
    const configureRef = useRef<HTMLButtonElement>(null);
    const runRef = useRef<HTMLButtonElement>(null);
    const [indicator, setIndicator] = useState({ left: 0, width: 0 });

    useLayoutEffect(() => {
        const updateIndicator = () => {
            const button = mode === 'configure' ? configureRef.current : runRef.current;
            const container = button?.parentElement;

            if (!button || !container) return;

            setIndicator({
                left: button.offsetLeft,
                width: button.offsetWidth,
            });
        };

        updateIndicator();

        const observer = new ResizeObserver(updateIndicator);
        if (configureRef.current) observer.observe(configureRef.current);
        if (runRef.current) observer.observe(runRef.current);

        return () => {
            observer.disconnect();
        };
    }, [mode]);

    return (
        <div className={`mode-toggle mode-toggle--${mode}`}>
            <span
                className="mode-toggle__indicator"
                style={{
                    width: `${indicator.width}px`,
                    transform: `translateX(${indicator.left}px)`,
                }}
            />
            <button
                ref={configureRef}
                type="button"
                className="mode-toggle__option"
                aria-pressed={mode === 'configure'}
                onClick={() => setMode('configure')}
            >
                <span className="mode-toggle__content">
                    <span
                        className="mode-toggle__icon"
                        style={{
                            maskImage: `url("${iconConfigure}")`,
                            WebkitMaskImage: `url("${iconConfigure}")`,
                            aspectRatio: '14 / 14',
                        }}
                        aria-hidden="true"
                    />
                    <span>Configure</span>
                </span>
            </button>

            <button
                ref={runRef}
                type="button"
                className="mode-toggle__option"
                aria-pressed={mode === 'run'}
                onClick={() => setMode('run')}
            >
                <span className="mode-toggle__content">
                    <span
                        className="mode-toggle__icon"
                        style={{
                            maskImage: `url("${iconRun}")`,
                            WebkitMaskImage: `url("${iconRun}")`,
                            aspectRatio: '14 / 17',
                        }}
                        aria-hidden="true"
                    />
                    <span>Run</span>
                </span>
            </button>
        </div>
    );
}