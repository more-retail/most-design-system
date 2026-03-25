import React from "react";

import CheckIcon from "@material-symbols/svg-700/sharp/check-fill.svg?react";
import CheckIndeterminateSmallIcon from "@material-symbols/svg-700/sharp/check_indeterminate_small-fill.svg?react";

import { cn } from "@/utils/cn";

/* -------------------------------------------------------------------------------------------------
 * Checkbox
 * -----------------------------------------------------------------------------------------------*/


interface CheckboxProps {
  /** false = unchecked, "indeterminate" = mixed, true = checked */
  checked?: boolean | "indeterminate";
  /** Called with the next boolean value on click (indeterminate → true) */
  onChange?: (checked: boolean) => void;
  disabled?: boolean
}

// ── Component ────────────────────────────────────────────────────────────────

function Checkbox({
  checked = false,
  onChange,
  disabled = false,
}: CheckboxProps) {
  const [isHovered, setIsHovered] = React.useState(false);

  const isChecked = checked === true;
  const isIndeterminate = checked === "indeterminate";
  const isFilled = isChecked || isIndeterminate;

  function handleClick() {
    // indeterminate → true, true → false, false → true
    onChange?.(isChecked ? false : true);
  }

  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={isIndeterminate ? "mixed" : isChecked}
      disabled={disabled}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={cn(
        // Always border-2 to prevent layout shift on state changes
        "size-80  rounded-lg flex items-center justify-center shrink-0",
        "transition-all duration-150 outline-none border-2",
        isFilled
          ? "bg-orange-60 border-neutral-20"
          : isHovered
          ? "bg-neutral-20 border-transparent"
          : "bg-neutral-10 border-transparent",
        disabled && "opacity-40 pointer-events-none",
      )}
    >
      {isIndeterminate && (
        <CheckIndeterminateSmallIcon className="size-70 fill-white" />
      )}
      {isChecked && <CheckIcon className="size-70 fill-white" />}
    </button>
  );
}

Checkbox.displayName = "Checkbox";

export { Checkbox };
export type { CheckboxProps };
