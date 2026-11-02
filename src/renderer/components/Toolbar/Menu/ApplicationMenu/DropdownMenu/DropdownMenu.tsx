import type { ReactNode, Ref } from "react";
import "./DropdownMenu.css";

type DropdownMenuProps = {
  children: ReactNode;
  aria_label?: string,
  top?: number;
  left?: number;
  ref?: Ref<HTMLDivElement>;
  minWidth?: number;
};

export default function DropdownMenu({
  children,
  aria_label,
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
      aria-label={aria_label}
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