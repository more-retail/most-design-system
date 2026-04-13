import React from "react";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/utils/cn";

import ArrowDropDownIcon from "@material-symbols/svg-700/sharp/arrow_drop_down-fill.svg?react";

const dropdownChipTriggerVariants = cva(
  [
    "group inline-flex items-center rounded-xl cursor-pointer select-none outline-none",
    "transition-[border-color,border-width,box-shadow] duration-150",
    "[&_svg]:shrink-0 [&_svg]:fill-current",
    "disabled:pointer-events-none",
  ],
  {
    variants: {
      variant: {
        filled: [
          "bg-neutral-10",
          "justify-center",
          "border-2 border-transparent",
          "hover:border-neutral-20",
          "data-[popup-open]:border-neutral-110",
          "disabled:text-neutral-40",
        ],
        outlined: [
          "border border-neutral-10",
          "hover:border-2",
          "data-[popup-open]:border-2 data-[popup-open]:border-neutral-110",
          "disabled:text-neutral-40",
        ],
      },
      size: {
        lg: [
          "h-140 px-60 gap-60",
          "rounded-30",
          "[&_svg:not([class*='size-'])]:size-60",
        ],
        md: [
          "h-110 px-50 gap-30",
          "rounded-30",
          "[&_svg:not([class*='size-'])]:size-60",
        ],
        sm: [
          "h-80 px-40 gap-30",
          "rounded-20",
          "[&_svg:not([class*='size-'])]:size-50",
        ],
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "lg",
    },
  },
);

type DropdownChipVariant = NonNullable<
  VariantProps<typeof dropdownChipTriggerVariants>["variant"]
>;

type DropdownChipSize = NonNullable<
  VariantProps<typeof dropdownChipTriggerVariants>["size"]
>;

type DropdownChipProps = SelectPrimitive.Root.Props<string>;

const DropdownChip: React.FC<DropdownChipProps> = ({ ...props }) => {
  return <SelectPrimitive.Root data-slot="dropdown-chip" {...props} />;
};

interface DropdownChipTriggerProps extends SelectPrimitive.Trigger.Props {
  variant?: DropdownChipVariant;
  size?: DropdownChipSize;
  error?: boolean;
  icon?: React.ReactNode;
  placeholder?: string;
}

const DropdownChipTrigger: React.FC<DropdownChipTriggerProps> = ({
  className,
  variant = "filled",
  size = "lg",
  error = false,
  icon,
  placeholder = "Select…",
  ...props
}) => {
  return (
    <SelectPrimitive.Trigger
      data-slot="dropdown-chip-trigger"
      className={cn(
        dropdownChipTriggerVariants({ variant, size }),
        error &&
          "border-2 border-red-70 hover:border-red-70 hover:shadow-[0px_0px_0px_2px_var(--color-red-20)] data-[popup-open]:border-red-70",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "flex shrink-0 items-center",
          size === "sm" ? "gap-30" : "gap-40",
        )}
      >
        {icon && (
          <span
            data-slot="dropdown-chip-icon"
            className="flex shrink-0 items-center justify-center"
          >
            {icon}
          </span>
        )}

        <SelectPrimitive.Value
          data-slot="dropdown-chip-value"
          placeholder={placeholder}
          className={cn(
            "shrink-0 typography-label-30 whitespace-nowrap",
            "text-neutral-110 data-[placeholder]:text-neutral-40",
          )}
        />
      </span>

      <SelectPrimitive.Icon
        data-slot="dropdown-chip-chevron"
        className="shrink-0 transition-transform duration-150 group-data-[popup-open]:rotate-180"
      >
        <ArrowDropDownIcon />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
};

type DropdownChipContentProps = SelectPrimitive.Popup.Props &
  Pick<
    SelectPrimitive.Positioner.Props,
    "side" | "sideOffset" | "align" | "alignOffset" | "alignItemWithTrigger"
  >;

const DropdownChipContent: React.FC<DropdownChipContentProps> = ({
  className,
  children,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  alignItemWithTrigger = false,
  ...props
}) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="isolate z-50 outline-none"
      >
        <SelectPrimitive.Popup
          data-slot="dropdown-chip-content"
          className={cn(
            "w-(--anchor-width)",
            "rounded-xl border border-neutral-10 bg-white",
            "shadow-[0px_4px_20px_0px_rgba(23,33,40,0.05)]",
            "flex flex-col gap-30 p-50",
            "max-h-(--available-height) overflow-x-hidden overflow-y-auto",
            "origin-(--transform-origin)",
            "data-[open]:animate-in data-[open]:fade-in-0 data-[open]:zoom-in-95",
            "data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95",
            "duration-150",
            className,
          )}
          {...props}
        >
          <SelectPrimitive.List className="flex flex-col gap-10">
            {children}
          </SelectPrimitive.List>
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
};

type DropdownChipItemProps = SelectPrimitive.Item.Props;

const DropdownChipItem: React.FC<DropdownChipItemProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <SelectPrimitive.Item
      data-slot="dropdown-chip-item"
      className={cn(
        "inline-flex w-full shrink-0 cursor-default items-center gap-40 rounded-xl outline-none select-none",
        "rounded-30 h-140 px-60",
        "border-2 border-transparent",
        "typography-para-30 text-neutral-110",
        "transition-colors duration-100",
        "data-[highlighted]:border-neutral-110",
        "data-[selected]:border-neutral-110",
        "data-[disabled]:pointer-events-none data-[disabled]:text-neutral-40",
        "[&_svg]:shrink-0 [&_svg]:fill-current [&_svg:not([class*='size-'])]:size-60",
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText className="flex-1 truncate">
        {children}
      </SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
};

export {
  DropdownChip,
  DropdownChipTrigger,
  DropdownChipContent,
  DropdownChipItem,
};

export type {
  DropdownChipProps,
  DropdownChipVariant,
  DropdownChipSize,
  DropdownChipTriggerProps,
  DropdownChipContentProps,
  DropdownChipItemProps,
};
