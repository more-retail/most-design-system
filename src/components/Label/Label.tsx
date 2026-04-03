import React from "react";

import { cn } from "@/utils/cn";

/* -------------------------------------------------------------------------------------------------
 * Label
 * -----------------------------------------------------------------------------------------------*/

interface LabelProps {
  label?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

function Label({
  label = "Label",
  disabled = false,
  onClick,
}: LabelProps) {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-30",
        "typography-label-30",
        "bg-transparent border-none p-0 outline-none",
        "cursor-pointer transition-colors duration-150",
        "text-orange-60 hover:text-orange-50 active:text-orange-70",
        "hover:gap-40 active:gap-40",
        "disabled:text-neutral-40 disabled:gap-40 disabled:pointer-events-none",
      )}
    >
      <span>{label}</span>
    </button>
  );
}

Label.displayName = "Label";

export { Label };
export type { LabelProps };
