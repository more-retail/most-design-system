import React from "react";

import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/utils/cn";

import ArrowDropDownIcon from "@material-symbols/svg-700/sharp/arrow_drop_down-fill.svg?react";
import KeyboardArrowDownIcon from "@material-symbols/svg-700/sharp/keyboard_arrow_down-fill.svg?react";
import KeyboardArrowUpIcon from "@material-symbols/svg-700/sharp/keyboard_arrow_up-fill.svg?react";

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
    "rounded-xl",
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

type DropdownTriggerSize = NonNullable<
  VariantProps<typeof dropdownTriggerVariants>["size"]
>;
type DropdownItemSize = NonNullable<
  VariantProps<typeof dropdownItemVariants>["size"]
>;

interface DropdownProps extends MenuPrimitive.Root.Props {
  size?: DropdownSize;
}

const Dropdown: React.FC<DropdownProps> = ({ children, ...props }) => {
  return (
    <MenuPrimitive.Root data-slot="dropdown" {...props}>
      {children}
    </MenuPrimitive.Root>
  );
};

interface DropdownLabelProps extends React.ComponentProps<"label"> {
  disabled?: boolean;
}

const DropdownLabel: React.FC<DropdownLabelProps> = ({
  className,
  disabled,
  ...props
}) => {
  return (
    <label
      data-slot="dropdown-label"
      className={cn(
        "w-full truncate typography-para-30",
        disabled ? "text-neutral-60" : "text-neutral-110",
        className,
      )}
      {...props}
    />
  );
};

interface DropdownTriggerProps extends MenuPrimitive.Trigger.Props {
  size?: DropdownSize;
  error?: boolean;
  icon?: React.ReactNode;
  placeholder?: React.ReactNode;
  displayValue?: string;
}

const DropdownTrigger: React.FC<DropdownTriggerProps> = ({
  className,
  size = "md",
  error = false,
  icon,
  placeholder = "Select…",
  displayValue,
  ...props
}) => {
  return (
    <MenuPrimitive.Trigger
      data-slot="dropdown-trigger"
      className={cn(
        dropdownTriggerVariants({ size }),
        error
          ? "border-red-70 hover:shadow-[0px_0px_0px_2px_var(--color-red-20)] data-[popup-open]:border-red-70"
          : "hover:border-neutral-20",
        className,
      )}
      {...props}
    >
      {icon && (
        <span
          data-slot="dropdown-trigger-icon"
          className="flex size-60 shrink-0 items-center justify-center text-neutral-110 disabled:text-neutral-40"
        >
          {icon}
        </span>
      )}

      <span
        data-slot="dropdown-value"
        className={cn(
          "min-w-0 flex-1 truncate text-left",
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
};

type DropdownContentProps = MenuPrimitive.Popup.Props &
  Pick<
    MenuPrimitive.Positioner.Props,
    "side" | "sideOffset" | "align" | "alignOffset"
  >;

const DropdownContent: React.FC<DropdownContentProps> = ({
  className,
  children,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  ...props
}) => {
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
          {children}
        </MenuPrimitive.Popup>
      </MenuPrimitive.Positioner>
    </MenuPrimitive.Portal>
  );
};

interface DropdownItemProps extends MenuPrimitive.Item.Props {
  size?: DropdownSize;
  icon?: React.ReactNode;
  selected?: boolean;
}

const DropdownItem: React.FC<DropdownItemProps> = ({
  className,
  size = "md",
  icon,
  selected,
  children,
  ...props
}) => {
  return (
    <MenuPrimitive.Item
      data-slot="dropdown-item"
      closeOnClick
      className={cn(dropdownItemVariants({ size }), selected && "border-neutral-110", className)}
      {...props}
    >
      {icon && (
        <span
          data-slot="dropdown-item-icon"
          className="flex size-60 shrink-0 items-center justify-center"
        >
          {icon}
        </span>
      )}

      <span data-slot="dropdown-item-text" className="flex-1 truncate">
        {children}
      </span>
    </MenuPrimitive.Item>
  );
};

const DropdownGroup: React.FC<MenuPrimitive.Group.Props> = ({
  className,
  ...props
}) => {
  return (
    <MenuPrimitive.Group
      data-slot="dropdown-group"
      className={cn("flex flex-col gap-30", className)}
      {...props}
    />
  );
};

const DropdownGroupLabel: React.FC<MenuPrimitive.GroupLabel.Props> = ({
  className,
  ...props
}) => {
  return (
    <MenuPrimitive.GroupLabel
      data-slot="dropdown-group-label"
      className={cn(
        "truncate px-60 typography-label-30 text-neutral-60",
        className,
      )}
      {...props}
    />
  );
};

const DropdownSeparator: React.FC<React.ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="dropdown-separator"
      role="separator"
      aria-orientation="horizontal"
      className={cn("-mx-50 h-px shrink-0 bg-neutral-20", className)}
      {...props}
    />
  );
};

const DropdownScrollUpArrow: React.FC<React.ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="dropdown-scroll-up"
      className={cn(
        "flex cursor-default items-center justify-center py-20 text-neutral-60",
        className,
      )}
      {...props}
    >
      <KeyboardArrowUpIcon className="size-60" />
    </div>
  );
};

const DropdownScrollDownArrow: React.FC<React.ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="dropdown-scroll-down"
      className={cn(
        "flex cursor-default items-center justify-center py-20 text-neutral-60",
        className,
      )}
      {...props}
    >
      <KeyboardArrowDownIcon className="size-60" />
    </div>
  );
};

interface DropdownHintProps extends React.ComponentProps<"p"> {
  variant?: "default" | "error";
}

const DropdownHint: React.FC<DropdownHintProps> = ({
  className,
  variant = "default",
  ...props
}) => {
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
};

export {
  Dropdown,
  DropdownLabel,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
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
