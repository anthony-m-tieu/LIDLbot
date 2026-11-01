import type { ReactNode } from "react";
import { useState } from "react";
import "./DropdownItem.css";

type DropdownItemProps = {
  label: string;
  icon?: ReactNode;
  secondaryText?: string;
  onClick?: () => void;
  submenu?: ReactNode;
  disabled?: boolean;
};

export default function DropdownItem({
  label,
  icon,
  secondaryText,
  onClick,
  submenu,
  disabled,
}: DropdownItemProps) {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  return (
    <>
      <button
        className="dropdown-item"
        role="menuitem"
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-haspopup={submenu ? "menu" : undefined}
        aria-expanded={submenu ? isSubmenuOpen : undefined}
      >
        <div className="dropdown-item-container-left">
          {icon && <span className="dropdown-item__icon">{icon}</span>}
          <span className="dropdown-item__label">{label}</span>
        </div>
        {secondaryText && (
          <span className="dropdown-item__secondary-text">{secondaryText}</span>
        )}
      </button>
      {submenu && isSubmenuOpen && { submenu }}
    </>
  );
}
