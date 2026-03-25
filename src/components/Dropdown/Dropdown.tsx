import React from "react";

import AppsIcon from "@material-symbols/svg-700/sharp/apps-fill.svg?react";
import ArrowDropDownIcon from "@material-symbols/svg-700/sharp/arrow_drop_down-fill.svg?react";

import { cn } from "@/utils/cn";

/* -------------------------------------------------------------------------------------------------
 * Dropdown
 * -----------------------------------------------------------------------------------------------*/

type DropdownSize = "md" | "sm";

interface DropdownOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

/*
 * Size specs (derived from Figma):
 *   md → trigger h=48px  rounded=12px  px=16px  gap=12px  item-h=48px  item-px=16px  item-rounded=12px
 *   sm → trigger h=36px  rounded=8px   px=12px  gap=12px  item-h=36px  item-px=12px  item-rounded=8px
 */
const sizeStyles: Record<
  DropdownSize,
  {
    triggerH: string;
    px: string;
    gap: string;
    rounded: string;
    itemH: string;
    itemPx: string;
    itemRounded: string;
  }
> = {
  md: {
    triggerH: "h-140",      // 48px
    px: "px-60",            // 16px
    gap: "gap-50",          // 12px
    rounded: "rounded-30",  // 12px
    itemH: "h-140",
    itemPx: "px-60",
    itemRounded: "rounded-30",
  },
  sm: {
    triggerH: "h-110",      // 36px
    px: "px-50",            // 12px
    gap: "gap-50",          // 12px
    rounded: "rounded-20",  // 8px
    itemH: "h-110",
    itemPx: "px-50",
    itemRounded: "rounded-20",
  },
};

interface DropdownProps {
  size?: DropdownSize;
  options: DropdownOption[];
  /** Controlled selected value */
  value?: string;
  /** Called with the option's value when selected */
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  showLabel?: boolean;
  /** Optional icon shown at the left of the trigger */
  icon?: React.ReactNode;
  showIcon?: boolean;
  disabled?: boolean;
  /** Pass a string to show an error message, or `true` for error styling only */
  error?: string | boolean;
}

// ── Component ────────────────────────────────────────────────────────────────

function Dropdown({
  size = "md",
  options,
  value,
  onChange,
  placeholder = "Placeholder",
  label = "Label",
  showLabel = true,
  icon,
  showIcon = true,
  disabled = false,
  error,
}: DropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isHovered, setIsHovered] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);
  const hasValue = !!selectedOption;
  const hasError = !!error;
  const errorMessage = typeof error === "string" ? error : undefined;
  const ss = sizeStyles[size];

  // Close on outside click
  React.useEffect(() => {
    if (!isOpen) return;
    function handleMouseDown(e: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, [isOpen]);

  // Always keep border-2 to prevent layout shift; only color changes on hover/open
  const triggerBorder = hasError
    ? cn("border-2 border-red-70", isHovered && "shadow-[0px_0px_0px_2px_#fde2e0]")
    : isOpen
    ? "border-2 border-neutral-110"
    : isHovered
    ? "border-2 border-neutral-20"
    : "border-2 border-transparent";

  return (
    <div
      ref={containerRef}
      className={cn("flex flex-col gap-40 items-start w-full")}
    >
      {/* Label */}
      {showLabel && (
        <span
          className={cn(
            "typography-para-30 truncate w-full",
            disabled ? "text-neutral-60" : "text-neutral-110",
          )}
        >
          {label}
        </span>
      )}

      {/* Trigger + Menu wrapper (relative anchor for the menu) */}
      <div className="relative w-full">
        <button
          type="button"
          disabled={disabled}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          onClick={() => setIsOpen((v) => !v)}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className={cn(
            "w-full flex items-center transition-all duration-150 rounded-xl outline-none",
            ss.triggerH,
            ss.px,
            ss.gap,
            ss.rounded,
            disabled ? "bg-neutral-20 pointer-events-none" : "bg-neutral-10",
            triggerBorder,
          )}
        >
          {/* Optional trigger icon — defaults to apps grid icon */}
          {showIcon && (
            <span className="shrink-0 size-60 flex items-center justify-center text-neutral-110">
              {icon ?? <AppsIcon className="size-60 fill-white" />}
            </span>
          )}

          {/* Trigger text */}
          <span
            className={cn(
              "flex-1 min-w-0 text-left typography-para-30 truncate",
              hasValue
                ? disabled
                  ? "text-neutral-60"
                  : "text-neutral-110"
                : "text-neutral-40",
            )}
          >
            {hasValue ? selectedOption!.label : placeholder}
          </span>

          {/* Chevron */}
          <ArrowDropDownIcon
            className={cn(
              "shrink-0 size-60 transition-transform duration-150",
              disabled ? "text-neutral-40" : "text-neutral-110",
              isOpen && "rotate-180",
            )}
          />
        </button>

        {/* Menu */}
        {isOpen && (
          <div
            role="listbox"
            className={cn(
              "absolute left-0 right-0 top-full mt-[6px] z-50",
              "bg-white border border-neutral-10 rounded-60",
              "shadow-[0px_4px_20px_0px_rgba(23,33,40,0.05)]",
              "p-50 flex flex-col gap-30 overflow-hidden rounded-xl",
            )}
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <button
                  key={option.value}
                  type="button"
                  role="option"
                  aria-selected={isSelected}
                  onClick={() => {
                    onChange?.(option.value);
                    setIsOpen(false);
                  }}
                  className={cn(
                    "w-full flex items-center gap-40 shrink-0 rounded-xl",
                    ss.itemH,
                    ss.itemPx,
                    ss.itemRounded,
                    "typography-para-30 text-neutral-110 text-left",
                    "transition-colors duration-100",
                    isSelected
                      ? "border-2 border-neutral-110"
                      : " hover:border-2 hover:border-neutral-110",
                  )}
                >
                  {option.icon && (
                    <span className="shrink-0 size-60 flex items-center justify-center">
                      {option.icon}
                    </span>
                  )}
                  <span className="flex-1 truncate">{option.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* Error message */}
      {errorMessage && (
        <span className="typography-para-30 text-red-70">{errorMessage}</span>
      )}
    </div>
  );
}

Dropdown.displayName = "Dropdown";

export { Dropdown };
export type { DropdownProps, DropdownSize, DropdownOption };
