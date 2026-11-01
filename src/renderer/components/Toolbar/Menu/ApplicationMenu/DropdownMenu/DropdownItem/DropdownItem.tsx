import type { ReactNode } from "react";
import { useState } from "react";
import iconCheck from "../../../../../../assets/icons/icon-check.svg";
import "./DropdownItem.css";

type DropdownItemProps = {
  label: string;
  icon?: ReactNode;
  secondaryText?: string;
  onClick?: () => void;
  submenu?: ReactNode;
  disabled?: boolean;
  selectable?: boolean;
  selected?: boolean;
};

export default function DropdownItem({
  label,
  icon,
  secondaryText,
  onClick,
  submenu,
  selectable = false,
  selected = false,
  disabled = false,
}: DropdownItemProps) {
  const [isSubmenuOpen, setIsSubmenuOpen] = useState(false);
  return (
    <div
      className="dropdown-item-wrapper"
      onMouseEnter={() => {
        if (submenu && !disabled) setIsSubmenuOpen(true);
      }}
      onMouseLeave={() => setIsSubmenuOpen(false)}
    >
      <button
        className={`dropdown-item${selected ? " dropdown-item--selected" : ""}`}
        role="menuitem"
        type="button"
        onClick={onClick}
        disabled={disabled}
        aria-haspopup={submenu ? "menu" : undefined}
        aria-expanded={submenu ? isSubmenuOpen : undefined}
      >
        <div className="dropdown-item-container-left">
          {selectable && selected && (
            <span
              className="icon"
              style={{
                maskImage: `url("${iconCheck}")`,
                WebkitMaskImage: `url("${iconCheck}")`,
                aspectRatio: "14 / 14",
              }}
              aria-hidden="true"
            />
          )}
          {selectable && !selected && (
            <span
              style={{
                display: "inline-block",
                width: "14px",
                height: "14px",
                flexShrink: 0,
              }}
              aria-hidden="true"
            />
          )}
          {icon && <span className="dropdown-item__icon">{icon}</span>}
          <span className="dropdown-item__label">{label}</span>
        </div>
        {secondaryText && (
          <span className="dropdown-item__secondary-text">{secondaryText}</span>
        )}
      </button>
      {submenu && isSubmenuOpen && (
        <div className="dropdown-item__submenu">{submenu}</div>
      )}
    </div>
  );
}
