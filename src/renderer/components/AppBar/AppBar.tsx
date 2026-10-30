import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { CSSProperties } from 'react';
import './AppBar.css';

const menus = [
    { id: 'file', label: 'File' },
    { id: 'preferences', label: 'Preferences' },
    { id: 'help', label: 'Help' },
] as const;

type MenuId = (typeof menus)[number]['id'];

type IndicatorStyle = CSSProperties & {
    '--indicator-x': string;
    '--indicator-width': string;
};

type DropdownPosition = {
    top: number;
    left: number;
};

export default function AppBar() {
    const [selectedMenu, setSelectedMenu] = useState<MenuId | null>(null);
    const [indicator, setIndicator] = useState({
        left: 0,
        width: 0,
        ready: false,
    });
    const [dropdownPosition, setDropdownPosition] =
        useState<DropdownPosition | null>(null);

    const appBarRef = useRef<HTMLElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const menuRefs = useRef(new Map<MenuId, HTMLButtonElement>());

    const updatePositions = useCallback(() => {
        if (!selectedMenu) return;

        const nav = appBarRef.current;
        const button = menuRefs.current.get(selectedMenu);

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
    }, [selectedMenu]);

    useLayoutEffect(() => {
        if (!selectedMenu) {
            setDropdownPosition(null);
            return;
        }

        updatePositions();

        window.addEventListener('resize', updatePositions);
        window.addEventListener('scroll', updatePositions, true);

        return () => {
            window.removeEventListener('resize', updatePositions);
            window.removeEventListener('scroll', updatePositions, true);
        };
    }, [selectedMenu, updatePositions]);

    useEffect(() => {
        function handleOutsideClick(event: PointerEvent) {
            const target = event.target;

            if (!(target instanceof Node)) return;

            if (
                appBarRef.current?.contains(target) ||
                dropdownRef.current?.contains(target)
            ) {
                return;
            }

            setSelectedMenu(null);
        }

        document.addEventListener('pointerdown', handleOutsideClick);

        return () => {
            document.removeEventListener('pointerdown', handleOutsideClick);
        };
    }, []);

    function handleMenuClick(menuId: MenuId) {
        setSelectedMenu((current) =>
            current === menuId ? null : menuId
        );
    }

    function handleMenuHover(menuId: MenuId) {
        setSelectedMenu((current) =>
            current === null ? null : menuId
        );
    }

    const indicatorStyle: IndicatorStyle = {
        '--indicator-x': `${indicator.left}px`,
        '--indicator-width': `${indicator.width}px`,
        visibility:
            indicator.ready && selectedMenu ? 'visible' : 'hidden',
    };

    function closeMenu() {
        setSelectedMenu(null);
    }

    return (
        <>
            <nav
                ref={appBarRef}
                className="app-bar"
                aria-label="Application menu"
            >
                <span
                    className="app-bar__indicator"
                    style={indicatorStyle}
                    aria-hidden="true"
                />

                {menus.map((menu) => (
                    <div className="app-bar__item" key={menu.id}>
                        <button
                            ref={(element) => {
                                if (element) {
                                    menuRefs.current.set(menu.id, element);
                                } else {
                                    menuRefs.current.delete(menu.id);
                                }
                            }}
                            type="button"
                            className="app-bar__button"
                            aria-expanded={selectedMenu === menu.id}
                            aria-haspopup="menu"
                            onClick={() => handleMenuClick(menu.id)}
                            onMouseEnter={() => handleMenuHover(menu.id)}
                        >
                            {menu.label}
                        </button>
                    </div>
                ))}
            </nav>

            {selectedMenu && dropdownPosition &&
                createPortal(
                    <div
                        ref={dropdownRef}
                        className="app-bar__dropdown"
                        role="menu"
                        aria-label={`${menus.find(
                            (menu) => menu.id === selectedMenu
                        )?.label} menu`}
                        style={{
                            top: dropdownPosition.top,
                            left: dropdownPosition.left,
                        }}
                    >
                        {selectedMenu === 'file' && (
                            <>
                                <button
                                    role="menuitem"
                                    type="button"
                                    onClick={closeMenu}
                                >
                                    New Project
                                </button>
                                <button
                                    role="menuitem"
                                    type="button"
                                    onClick={closeMenu}
                                >
                                    Open Project
                                </button>
                                <div className="app-bar__separator" />
                                <button
                                    role="menuitem"
                                    type="button"
                                    onClick={closeMenu}
                                >
                                    Save Project
                                </button>
                            </>
                        )}

                        {selectedMenu === 'preferences' && (
                            <button
                                role="menuitem"
                                type="button"
                                onClick={closeMenu}
                            >
                                Settings
                            </button>
                        )}

                        {selectedMenu === 'help' && (
                            <>
                                <button
                                    role="menuitem"
                                    type="button"
                                    onClick={closeMenu}
                                >
                                    Documentation
                                </button>
                                <button
                                    role="menuitem"
                                    type="button"
                                    onClick={closeMenu}
                                >
                                    About
                                </button>
                            </>
                        )}
                    </div>,
                    document.body
                )}
        </>
    );
}