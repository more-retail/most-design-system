import React from "react";

import { cva, type VariantProps } from "class-variance-authority";
import AppsIcon from "@material-symbols/svg-700/sharp/apps-fill.svg?react";
import CloseIcon from "@material-symbols/svg-700/sharp/close-fill.svg?react";

import { cn } from "@/utils/cn";

const toggleChipVariants = cva(
  [
    "inline-flex items-center cursor-pointer select-none outline-none",
    "typography-para-thick-30 text-neutral-110 whitespace-nowrap",
    "[&_svg]:shrink-0 [&_svg]:fill-current",
    "transition-[border-color,background-color] duration-150",
    "disabled:pointer-events-none disabled:text-neutral-60",
  ],
  {
    variants: {
      variant: {
        filled: [
          "bg-neutral-10",
          "border-2 border-transparent",
          "hover:border-neutral-20",
        ],
        outlined: [
          "border border-neutral-10",
          "hover:border-2 hover:border-neutral-10",
        ],
      },
      size: {
        lg: [
          "h-140 px-60 gap-50 rounded-40 rounded-2xl",
          "[&_svg:not([class*='size-'])]:size-60",
        ],
        md: [
          "h-110 px-50 gap-40 rounded-30 rounded-xl",
          "[&_svg:not([class*='size-'])]:size-60",
        ],
        sm: [
          "h-80 px-40 gap-30 rounded-20 rounded-lg",
          "[&_svg:not([class*='size-'])]:size-50",
        ],
      },
      selected: {
        true: "bg-neutral-10 border-2 border-neutral-110 hover:border-neutral-110",
        false: "",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "md",
      selected: false,
    },
  },
);

export type ToggleChipVariant = NonNullable<VariantProps<typeof toggleChipVariants>["variant"]>;
export type ToggleChipSize = NonNullable<VariantProps<typeof toggleChipVariants>["size"]>;

export interface ToggleChipProps extends Omit<React.ComponentProps<"button">, "children"> {
  variant?: ToggleChipVariant;
  size?: ToggleChipSize;
  label?: string;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  selected?: boolean;
  onRemove?: React.MouseEventHandler<HTMLButtonElement>;
}

const ToggleChip =({
  className,
  variant,
  size,
  label,
  icon = <AppsIcon />,
  trailingIcon = <CloseIcon />,
  selected = false,
  disabled,
  onRemove,
  onClick,
  ...props
}: ToggleChipProps) => {
  return (
    <button
      data-slot="toggle-chip"
      type="button"
      disabled={disabled}
      aria-pressed={selected}
      onClick={onClick}
      className={cn(toggleChipVariants({ variant, size, selected }), className)}
      {...props}
    >
      {icon && (
        <span data-slot="toggle-chip-icon" className="flex shrink-0 items-center justify-center">
          {icon}
        </span>
      )}
      {label && (
        <span data-slot="toggle-chip-label">{label}</span>
      )}
      {!disabled && (
        <span
          data-slot="toggle-chip-trailing"
          role="button"
          tabIndex={0}
          className="flex shrink-0 items-center justify-center cursor-pointer"
          onClick={(e) => {
            console.log("remove clicked");
            e.stopPropagation();
            onRemove?.(e as unknown as React.MouseEvent<HTMLButtonElement>);
          }}
        >
          {trailingIcon}
        </span>
      )}
    </button>
  );
}

export { ToggleChip };
