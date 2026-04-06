import React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { Select as SelectPrimitive } from "@base-ui/react/select";

import ArrowDropDownIcon from "@material-symbols/svg-700/sharp/arrow_drop_down-fill.svg?react";
import CheckIcon from "@material-symbols/svg-700/sharp/check-fill.svg?react";
import KeyboardArrowDownIcon from "@material-symbols/svg-700/sharp/keyboard_arrow_down-fill.svg?react";
import KeyboardArrowUpIcon from "@material-symbols/svg-700/sharp/keyboard_arrow_up-fill.svg?react";

import { cn } from "@/utils/cn";

type DropdownSize = "md" | "sm";

interface DropdownContextValue {
  size: DropdownSize;
}

const DropdownContext = React.createContext<DropdownContextValue>({ size: "md" });

function useDropdownContext() {
  return React.useContext(DropdownContext);
}

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
    // base-ui data-attribute states
    "data-[highlighted]:bg-neutral-10 data-[selected]:border-neutral-110",
    "data-[selected]:border-neutral-110",
    "data-[disabled]:text-neutral-40 data-[disabled]:pointer-events-none",
    // SVG auto-sizing
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


interface DropdownProps extends SelectPrimitive.Root.Props<string> {
  size?: DropdownSize;
}

function Dropdown({ size = "md", children, ...props }: DropdownProps) {
  return (
    <DropdownContext.Provider value={{ size }}>
      <SelectPrimitive.Root data-slot="dropdown" {...props}>
        {children}
      </SelectPrimitive.Root>
    </DropdownContext.Provider>
  );
}

Dropdown.displayName = "Dropdown";

interface DropdownLabelProps extends SelectPrimitive.Label.Props {
  disabled?: boolean;
}

function DropdownLabel({ className, disabled, ...props }: DropdownLabelProps) {
  return (
    <SelectPrimitive.Label
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

interface DropdownTriggerProps extends SelectPrimitive.Trigger.Props {
  error?: boolean;
  icon?: React.ReactNode;
  showIcon?: boolean;
  placeholder?: React.ReactNode;
}

function DropdownTrigger({
  className,
  error = false,
  icon,
  showIcon = false,
  placeholder = "Select…",
  ...props
}: DropdownTriggerProps) {
  const { size } = useDropdownContext();

  return (
    <SelectPrimitive.Trigger
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

      {showIcon && icon && (
        <span
          data-slot="dropdown-trigger-icon"
          className="shrink-0 size-60 flex items-center justify-center text-neutral-110 disabled:text-neutral-40"
        >
          {icon}
        </span>
      )}

      <SelectPrimitive.Value
        data-slot="dropdown-value"
        placeholder={placeholder}
        className="flex-1 min-w-0 text-left truncate text-neutral-110 data-[placeholder]:text-neutral-40"
      />

      <SelectPrimitive.Icon
        data-slot="dropdown-chevron"
        className="shrink-0 transition-transform duration-150 data-[open]:rotate-180"
      >
        <ArrowDropDownIcon />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

DropdownTrigger.displayName = "DropdownTrigger";


type DropdownContentProps = SelectPrimitive.Popup.Props &
  Pick<SelectPrimitive.Positioner.Props, "side" | "sideOffset" | "align" | "alignOffset" | "alignItemWithTrigger">;

function DropdownContent({
  className,
  children,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  alignItemWithTrigger = false,
  ...props
}: DropdownContentProps) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Positioner
        side={side}
        sideOffset={sideOffset}
        align={align}
        alignOffset={alignOffset}
        alignItemWithTrigger={alignItemWithTrigger}
        className="z-50 outline-none w-(--anchor-width)"
      >
        <SelectPrimitive.Popup
          data-slot="dropdown-content"
          className={cn(
            "bg-white border border-neutral-10 rounded-xl",
            "shadow-[0px_4px_20px_0px_rgba(23,33,40,0.05)]",
            "p-50 flex flex-col gap-30",
            "max-h-[var(--available-height)] overflow-y-auto overflow-x-hidden",
            "origin-[var(--transform-origin)]",
            "data-[open]:animate-in data-[open]:fade-in-0 data-[open]:zoom-in-95",
            "data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95",
            "duration-150",
            className,
          )}
          {...props}
        >
          {children}
        </SelectPrimitive.Popup>
      </SelectPrimitive.Positioner>
    </SelectPrimitive.Portal>
  );
}

DropdownContent.displayName = "DropdownContent";
interface DropdownItemProps extends SelectPrimitive.Item.Props {
  icon?: React.ReactNode;
}

function DropdownItem({ className, icon, children, ...props }: DropdownItemProps) {
  const { size } = useDropdownContext();

  const childArray = React.Children.toArray(children);
  const indicatorChildren = childArray.filter(
    (child) => React.isValidElement(child) && child.type === DropdownItemIndicator,
  );
  const textChildren = childArray.filter(
    (child) => !(React.isValidElement(child) && child.type === DropdownItemIndicator),
  );

  return (
    <SelectPrimitive.Item
      data-slot="dropdown-item"
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

      <SelectPrimitive.ItemText
        data-slot="dropdown-item-text"
        className="flex-1 truncate"
      >
        {textChildren}
      </SelectPrimitive.ItemText>

      {indicatorChildren}
    </SelectPrimitive.Item>
  );
}

DropdownItem.displayName = "DropdownItem";

function DropdownItemIndicator({ className, ...props }: SelectPrimitive.ItemIndicator.Props) {
  return (
    <SelectPrimitive.ItemIndicator
      data-slot="dropdown-item-indicator"
      className={cn(
        "flex items-center justify-end  text-neutral-110",
        className,
      )}
      {...props}
    >
      <CheckIcon className="size-50" />
    </SelectPrimitive.ItemIndicator>
  );
}

DropdownItemIndicator.displayName = "DropdownItemIndicator";

function DropdownGroup({ className, ...props }: SelectPrimitive.Group.Props) {
  return (
    <SelectPrimitive.Group
      data-slot="dropdown-group"
      className={cn("flex flex-col gap-30", className)}
      {...props}
    />
  );
}

DropdownGroup.displayName = "DropdownGroup";

function DropdownGroupLabel({ className, ...props }: SelectPrimitive.GroupLabel.Props) {
  return (
    <SelectPrimitive.GroupLabel
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


function DropdownScrollUpArrow({ className, ...props }: SelectPrimitive.ScrollUpArrow.Props) {
  return (
    <SelectPrimitive.ScrollUpArrow
      data-slot="dropdown-scroll-up"
      className={cn(
        "flex items-center justify-center py-20 text-neutral-60 cursor-default",
        className,
      )}
      {...props}
    >
      <KeyboardArrowUpIcon className="size-60" />
    </SelectPrimitive.ScrollUpArrow>
  );
}

DropdownScrollUpArrow.displayName = "DropdownScrollUpArrow";

function DropdownScrollDownArrow({ className, ...props }: SelectPrimitive.ScrollDownArrow.Props) {
  return (
    <SelectPrimitive.ScrollDownArrow
      data-slot="dropdown-scroll-down"
      className={cn(
        "flex items-center justify-center py-20 text-neutral-60 cursor-default",
        className,
      )}
      {...props}
    >
      <KeyboardArrowDownIcon className="size-60" />
    </SelectPrimitive.ScrollDownArrow>
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
