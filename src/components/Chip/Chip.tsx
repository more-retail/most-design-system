import React from "react";

import AppsIcon from "@material-symbols/svg-700/sharp/apps-fill.svg?react";
import ArrowDropDownIcon from "@material-symbols/svg-700/sharp/arrow_drop_down-fill.svg?react";

import { cn } from "@/utils/cn";

/* -------------------------------------------------------------------------------------------------
 * Chip
 * -----------------------------------------------------------------------------------------------*/

type ChipSize = "lg" | "md" | "sm";
type ChipVariant = "filled" | "outlined";

interface ChipOption {
  value: string;
  label: string;
}

interface ChipProps {
  size?: ChipSize;
  variant?: ChipVariant;
  options?: ChipOption[];
  /** Controlled selected value */
  value?: string;
  /** Called with the option value when selected */
  onChange?: (value: string) => void;
  placeholder?: string;
  /** Static display label — bypasses options/value, no dropdown opens */
  label?: string;
  /** Optional icon shown at the left; defaults to the apps grid icon */
  leadingIcon?: React.ReactNode;
  showLeadingIcon?: boolean;
  /** Optional icon shown at the right; defaults to the arrow_drop_down chevron */
  trailingIcon?: React.ReactNode;
  showTrailingIcon?: boolean;
  disabled?: boolean;
  error?: boolean;
  className?: string;
}

const sizeStyles: Record<
  ChipSize,
  {
    h: string;
    px: string;
    outerGap: string;
    innerGap: string;
    iconSize: string;
    rounded: string;
  }
> = {
  lg: {
    h: "h-140",
    px: "px-60",
    outerGap: "gap-60",
    innerGap: "gap-40",
    iconSize: "size-60",
    rounded: "rounded-xl",  // 12px
  },
  md: {
    h: "h-110",
    px: "px-50",
    outerGap: "gap-30",
    innerGap: "gap-40",
    iconSize: "size-60",
    rounded: "rounded-xl",  // 12px
  },
  sm: {
    h: "h-80",
    px: "px-40",
    outerGap: "gap-30",
    innerGap: "gap-30",
    iconSize: "size-50",
    rounded: "rounded-lg",  // 8px
  },
};

// ── Component ────────────────────────────────────────────────────────────────

const Chip = ({
  size = "md",
  variant = "filled",
  options = [],
  value,
  onChange,
  placeholder = "Placeholder",
  label,
  leadingIcon,
  showLeadingIcon = true,
  trailingIcon,
  showTrailingIcon = true,
  disabled = false,
  error = false,
  className,
}: ChipProps) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  const selectedOption = options.find((o) => o.value === value);
  const hasValue = !!selectedOption;
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

  // Always border-2 to prevent layout shift; color changes per state/variant
  const borderStyles = error
    ? "border-2 border-red-70 hover:shadow-[0px_0px_0px_2px_#fde2e0]"
    : isOpen || hasValue
    ? "border-2 border-neutral-110"
    : variant === "filled"
    ? "border-2 border-transparent hover:border-neutral-20"
    : "border-2 border-neutral-10"; // outlined default

  const bgStyles = variant === "filled" ? "bg-neutral-10" : "";

  const iconFill = disabled ? "fill-neutral-40" : "fill-neutral-110";
  const textColor = label || (!disabled && hasValue) ? "text-neutral-110" : "text-neutral-40";

  // sm uses a flat layout; lg/md group icon+label in an inner container
  const isSm = size === "sm";

  const iconEl = showLeadingIcon ? (
    <span className={cn("shrink-0 flex items-center justify-center", ss.iconSize)}>
      {leadingIcon ?? <AppsIcon className={cn(ss.iconSize, iconFill)} />}
    </span>
  ) : null;

  const labelEl = (
    <span className={cn("typography-para-thick-30 whitespace-nowrap", textColor)}>
      {label ?? (hasValue ? selectedOption!.label : placeholder)}
    </span>
  );

  const chevronEl = showTrailingIcon ? (
    trailingIcon ?? (
      <ArrowDropDownIcon
        className={cn(
          "shrink-0 transition-transform duration-150",
          ss.iconSize,
          disabled ? "fill-neutral-40" : "fill-neutral-110",
          isOpen && "rotate-180",
        )}
      />
    )
  ) : null;

  return (
    <div ref={containerRef} className={cn("relative inline-flex", className)}>
      <button
        type="button"
        disabled={disabled}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        onClick={() => !label && options.length > 0 && setIsOpen((v) => !v)}
        className={cn(
          "inline-flex items-center",
          ss.h,
          ss.px,
          ss.outerGap,
          ss.rounded,
          bgStyles,
          "transition-all duration-150 outline-none cursor-pointer",
          "disabled:pointer-events-none",
          borderStyles,
        )}
      >
         <>
            <span className={cn("inline-flex items-center shrink-0", ss.innerGap)}>
              {iconEl}
              {labelEl}
            </span>
            {chevronEl}
          </>
      </button>

      {/* Dropdown menu */}
      {isOpen && (
        <div
          role="listbox"
          className={cn(
            "absolute left-0 top-full mt-[6px] z-50 min-w-full",
            "bg-white border border-neutral-10 rounded-xl",
            "shadow-[0px_4px_20px_0px_rgba(23,33,40,0.05)]",
            "p-50 flex flex-col gap-30 overflow-hidden",
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
                  "flex items-center h-140 px-60 rounded-xl shrink-0 whitespace-nowrap",
                  "typography-para-30 text-neutral-110 text-left",
                  "transition-colors duration-100",
                  isSelected
                    ? "border-2 border-neutral-110"
                    : "border-2 border-transparent hover:border-neutral-110",
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};

Chip.displayName = "Chip";

export { Chip };
export type { ChipProps, ChipOption, ChipSize, ChipVariant };
