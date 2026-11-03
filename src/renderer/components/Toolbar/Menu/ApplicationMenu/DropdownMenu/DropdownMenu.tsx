import type { ReactNode, Ref } from "react";
import "./DropdownMenu.css";

type DropdownMenuProps = {
  children: ReactNode;
  ariaLabel?: string,
  top?: number;
  left?: number;
  ref?: Ref<HTMLDivElement>;
  minWidth?: number;
};

export default function DropdownMenu({
  children,
  ariaLabel,
  top,
  left,
  ref,
  minWidth,
}: DropdownMenuProps) {
  return (
    <div 
      ref={ref}
      className="dropdown-menu" 
      role="menu"
      aria-label={ariaLabel}
      style={{
        top,
        left,
        minWidth
      }}
    >
      {children}
    </div>
  );
}