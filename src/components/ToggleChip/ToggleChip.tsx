"use client";

import * as React from "react";

import { Toggle } from "@/components/Toggle";
import { cn } from "@/utils/cn";

import { toggleChipVariants } from "./ToggleChip.variants";

import CloseIcon from "@material-symbols/svg-700/sharp/close-fill.svg?react";

function ToggleChipRemoveButton({
  className,
  ...props
}: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="toggle-chip-remove"
      // oxlint-disable-next-line jsx-a11y/prefer-tag-over-role -- nested inside a <button> (Toggle); a real <button> here would be invalid HTML
      role="button"
      tabIndex={-1}
      className={cn("remove-icon", className)}
      {...props}
    >
      <CloseIcon />
    </span>
  );
}

type ToggleChipProps = Omit<React.ComponentProps<typeof Toggle>, "children"> & {
  label: string;
  leadingIcon?: React.ReactNode;
  onRemove?: () => void;
};

function ToggleChip({
  className,
  label,
  leadingIcon,
  onRemove,
  disabled,
  ...props
}: ToggleChipProps) {
  return (
    <Toggle
      data-slot="toggle-chip"
      disabled={disabled}
      className={cn(toggleChipVariants({ className }))}
      {...props}
    >
      {leadingIcon && <span data-slot="leading-icon">{leadingIcon}</span>}

      <span data-slot="toggle-chip-label" className="label">
        {label}
      </span>

      {!disabled && onRemove && (
        <ToggleChipRemoveButton
          onClick={(event) => {
            event.stopPropagation();
            onRemove();
          }}
        />
      )}
    </Toggle>
  );
}

export { ToggleChip };
export type { ToggleChipProps };
