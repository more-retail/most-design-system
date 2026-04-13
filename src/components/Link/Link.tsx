import React from "react";
import { cn } from "@/utils/cn";

interface LinkProps {
  label?: string;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const Link = ({ label = "Label", disabled = false, onClick }: LinkProps) => {
  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-30",
        "typography-label-30",
        "border-none bg-transparent p-0 outline-none",
        "cursor-pointer transition-colors duration-150",
        "text-orange-60 hover:text-orange-50 active:text-orange-70",
        "hover:gap-40 active:gap-40",
        "disabled:pointer-events-none disabled:gap-40 disabled:text-neutral-40",
      )}
    >
      <span>{label}</span>
    </button>
  );
};

export { Link };
export type { LinkProps };
