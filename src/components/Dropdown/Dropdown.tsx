import React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";

import ArrowDropDownIcon from "@material-symbols/svg-700/sharp/arrow_drop_down-fill.svg?react";
import CheckIcon from "@material-symbols/svg-700/sharp/check-fill.svg?react";
import KeyboardArrowDownIcon from "@material-symbols/svg-700/sharp/keyboard_arrow_down-fill.svg?react";
import KeyboardArrowUpIcon from "@material-symbols/svg-700/sharp/keyboard_arrow_up-fill.svg?react";

import { cn } from "@/utils/cn";

type DropdownSize = "md" | "sm";

const dropdownTriggerVariants = cva(
  [
    "group w-full inline-flex items-center outline-none cursor-pointer select-none",
    "border-2 border-transparent",
    "transition-[border-color,background-color,box-shadow] duration-150",
    "bg-neutral-10",
    "typography-para-30",
    "[&_svg]:shrink-0 [&_svg]:fill-current [&_svg:not([class*='size-'])]:size-60",
    "disabled:bg-neutral-20 disabled:pointer-events-none disabled:cursor-not-allowed",
    "data-[popup-open]:border-neutral-110",
    "rounded-xl",
  ],
  {
    variants: {
      size: {
        md: "h-140 px-60 gap-50 rounded-30",
        sm: "h-110 px-50 gap-50 rounded-20",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);


const dropdownItemVariants = cva(
  [
    "w-full inline-flex items-center gap-40 shrink-0 cursor-default outline-none select-none",
    "border-2 border-transparent",
    "typography-para-30 text-neutral-110",
    "transition-colors duration-100",
    "data-[highlighted]:border-neutral-10 ",
    "data-[checked]:border-neutral-110",
    "data-[disabled]:text-neutral-40 data-[disabled]:pointer-events-none",
    "[&_svg]:shrink-0 [&_svg]:fill-current [&_svg:not([class*='size-'])]:size-60",
    "rounded-xl"
  ],
  {
    variants: {
      size: {
        md: "h-140 px-60 rounded-30",
        sm: "h-110 px-50 rounded-20",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);


type DropdownTriggerSize = NonNullable<VariantProps<typeof dropdownTriggerVariants>["size"]>;
type DropdownItemSize = NonNullable<VariantProps<typeof dropdownItemVariants>["size"]>;


interface DropdownProps extends MenuPrimitive.Root.Props {
  size?: DropdownSize;
}

function Dropdown({ children, ...props }: DropdownProps) {
  return (
    <MenuPrimitive.Root data-slot="dropdown" {...props}>
      {children}
    </MenuPrimitive.Root>
  );
}

Dropdown.displayName = "Dropdown";

interface DropdownLabelProps extends React.ComponentProps<"label"> {
  disabled?: boolean;
}

function DropdownLabel({ className, disabled, ...props }: DropdownLabelProps) {
  return (
    <label
      data-slot="dropdown-label"
      className={cn(
        "typography-para-30 truncate w-full",
        disabled ? "text-neutral-60" : "text-neutral-110",
        className,
      )}
      {...props}
    />
  );
}

DropdownLabel.displayName = "DropdownLabel";

interface DropdownTriggerProps extends MenuPrimitive.Trigger.Props {
  size?: DropdownSize;
  error?: boolean;
  icon?: React.ReactNode;
  placeholder?: React.ReactNode;
  displayValue?: string;
}

function DropdownTrigger({
  className,
  size = "md",
  error = false,
  icon,
  placeholder = "Select…",
  displayValue,
  ...props
}: DropdownTriggerProps) {
  return (
    <MenuPrimitive.Trigger
      data-slot="dropdown-trigger"
      className={cn(
        dropdownTriggerVariants({ size }),
        error
          ? "border-red-70 data-[popup-open]:border-red-70 hover:shadow-[0px_0px_0px_2px_var(--color-red-20)]"
          : "hover:border-neutral-20",
        className,
      )}
      {...props}
    >

      { icon && (
        <span
          data-slot="dropdown-trigger-icon"
          className="shrink-0 size-60 flex items-center justify-center text-neutral-110 disabled:text-neutral-40"
        >
          {icon}
        </span>
      )}

      <span
        data-slot="dropdown-value"
        className={cn(
          "flex-1 min-w-0 text-left truncate",
          displayValue ? "text-neutral-110" : "text-neutral-40",
        )}
      >
        {displayValue ?? placeholder}
      </span>

      <span
        data-slot="dropdown-chevron"
        className="shrink-0 transition-transform duration-150 group-data-[popup-open]:rotate-180"
      >
        <ArrowDropDownIcon />
      </span>
    </MenuPrimitive.Trigger>
  );
}

DropdownTrigger.displayName = "DropdownTrigger";


type DropdownContentProps = MenuPrimitive.Popup.Props &
  Pick<MenuPrimitive.Positioner.Props, "side" | "sideOffset" | "align" | "alignOffset"> & {
    value?: string;
    onValueChange?: (value: string) => void;
  };

function DropdownContent({
  className,
  children,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  value,
  onValueChange,
  ...props
}: DropdownContentProps) {
  return (
    <MenuPrimitive.Portal>
      <MenuPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        className="isolate z-50 outline-none"
      >
        <MenuPrimitive.Popup
          data-slot="dropdown-content"
          className={cn(
            "w-(--anchor-width)",
            "bg-white border border-neutral-10 rounded-xl",
            "shadow-[0px_4px_20px_0px_rgba(23,33,40,0.05)]",
            "p-50 flex flex-col gap-30",
            "max-h-(--available-height) overflow-y-auto overflow-x-hidden",
            "origin-(--transform-origin)",
            "data-[open]:animate-in data-[open]:fade-in-0 data-[open]:zoom-in-95",
            "data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95",
            "duration-150",
            className,
          )}
          {...props}
        >
          <MenuPrimitive.RadioGroup value={value} onValueChange={onValueChange} className="flex flex-col gap-30">
            {children}
          </MenuPrimitive.RadioGroup>
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
}

DropdownContent.displayName = "DropdownContent";

interface DropdownItemProps extends MenuPrimitive.RadioItem.Props {
  size?: DropdownSize;
  icon?: React.ReactNode;
}

function DropdownItem({ className, size = "md", icon, children, ...props }: DropdownItemProps) {
  const childArray = React.Children.toArray(children);
  const indicatorChildren = childArray.filter(
    (child) => React.isValidElement(child) && child.type === DropdownItemIndicator,
  );
  const textChildren = childArray.filter(
    (child) => !(React.isValidElement(child) && child.type === DropdownItemIndicator),
  );

  return (
    <MenuPrimitive.RadioItem
      data-slot="dropdown-item"
      closeOnClick
      className={cn(dropdownItemVariants({ size }), className)}
      {...props}
    >
      {icon && (
        <span
          data-slot="dropdown-item-icon"
          className="shrink-0 size-60 flex items-center justify-center"
        >
          {icon}
        </span>
      )}

      <span
        data-slot="dropdown-item-text"
        className="flex-1 truncate"
      >
        {textChildren}
      </span>

      {indicatorChildren}
    </MenuPrimitive.RadioItem>
  );
}

DropdownItem.displayName = "DropdownItem";

function DropdownItemIndicator({ className, ...props }: MenuPrimitive.RadioItemIndicator.Props) {
  return (
    <MenuPrimitive.RadioItemIndicator
      data-slot="dropdown-item-indicator"
      className={cn(
        "flex items-center justify-end text-neutral-110",
        className,
      )}
      {...props}
    >
      <CheckIcon className="size-50" />
    </MenuPrimitive.RadioItemIndicator>
  );
}

DropdownItemIndicator.displayName = "DropdownItemIndicator";

function DropdownGroup({ className, ...props }: MenuPrimitive.Group.Props) {
  return (
    <MenuPrimitive.Group
      data-slot="dropdown-group"
      className={cn("flex flex-col gap-30", className)}
      {...props}
    />
  );
}

DropdownGroup.displayName = "DropdownGroup";

function DropdownGroupLabel({ className, ...props }: MenuPrimitive.GroupLabel.Props) {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-group-label"
      className={cn(
        "typography-label-30 text-neutral-60 px-60 truncate",
        className,
      )}
      {...props}
    />
  );
}

DropdownGroupLabel.displayName = "DropdownGroupLabel";

function DropdownSeparator({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dropdown-separator"
      role="separator"
      aria-orientation="horizontal"
      className={cn("-mx-50 h-px bg-neutral-20 shrink-0", className)}
      {...props}
    />
  );
}

DropdownSeparator.displayName = "DropdownSeparator";


function DropdownScrollUpArrow({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dropdown-scroll-up"
      className={cn(
        "flex items-center justify-center py-20 text-neutral-60 cursor-default",
        className,
      )}
      {...props}
    >
      <KeyboardArrowUpIcon className="size-60" />
    </div>
  );
}

DropdownScrollUpArrow.displayName = "DropdownScrollUpArrow";

function DropdownScrollDownArrow({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dropdown-scroll-down"
      className={cn(
        "flex items-center justify-center py-20 text-neutral-60 cursor-default",
        className,
      )}
      {...props}
    >
      <KeyboardArrowDownIcon className="size-60" />
    </div>
  );
}

DropdownScrollDownArrow.displayName = "DropdownScrollDownArrow";


interface DropdownHintProps extends React.ComponentProps<"p"> {
  variant?: "default" | "error";
}

function DropdownHint({ className, variant = "default", ...props }: DropdownHintProps) {
  return (
    <p
      data-slot="dropdown-hint"
      className={cn(
        "typography-para-30",
        variant === "error" ? "text-red-70" : "text-neutral-60",
        className,
      )}
      {...props}
    />
  );
}

DropdownHint.displayName = "DropdownHint";


export {
  Dropdown,
  DropdownLabel,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownItemIndicator,
  DropdownGroup,
  DropdownGroupLabel,
  DropdownSeparator,
  DropdownScrollUpArrow,
  DropdownScrollDownArrow,
  DropdownHint,
  dropdownTriggerVariants,
  dropdownItemVariants,
};

export type {
  DropdownProps,
  DropdownSize,
  DropdownTriggerSize,
  DropdownItemSize,
  DropdownTriggerProps,
  DropdownContentProps,
  DropdownItemProps,
  DropdownLabelProps,
  DropdownHintProps,
};
