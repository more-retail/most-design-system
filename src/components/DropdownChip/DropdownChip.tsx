"use client";

import * as React from "react";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

import {
  dropdownChipPopupVariants,
  dropdownChipVariants,
} from "./DropdownChip.variants";

import ArrowDropDownIcon from "@material-symbols/svg-700/sharp/arrow_drop_down-fill.svg?react";

type DropdownChipContextValue = {
  error?: boolean;
  size: NonNullable<VariantProps<typeof dropdownChipVariants>["size"]>;
};

const DropdownChipContext =
  React.createContext<DropdownChipContextValue | null>(null);

function useDropdownChipContext(component: string) {
  const context = React.useContext(DropdownChipContext);

  if (!context) {
    throw new Error(`<${component}> must be used within a <DropdownChip>.`);
  }

  return context;
}

type DropdownChipProps = VariantProps<typeof dropdownChipVariants> &
  Pick<
    SelectPrimitive.Root.Props<string>,
    "value" | "defaultValue" | "onValueChange" | "name" | "disabled"
  > & {
    error?: boolean;
    children: React.ReactNode;
  };

function DropdownChip({
  error,
  size = "regular",
  disabled,
  value,
  defaultValue,
  onValueChange,
  name,
  children,
}: DropdownChipProps) {
  const context = React.useMemo(
    () => ({ error, size: size ?? "regular" }),
    [error, size],
  );

  return (
    <DropdownChipContext.Provider value={context}>
      <SelectPrimitive.Root
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        name={name}
      >
        {children}
      </SelectPrimitive.Root>
    </DropdownChipContext.Provider>
  );
}

function DropdownChipTrigger({
  className,
  placeholder,
  leadingIcon,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  placeholder?: string;
  leadingIcon?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { error, size } = useDropdownChipContext("DropdownChipTrigger");

  return (
    <>
      <SelectPrimitive.Trigger
        aria-invalid={error || undefined}
        data-slot="dropdown-chip-trigger"
        data-error={error || undefined}
        className={cn(dropdownChipVariants({ size, className }))}
        {...props}
      >
        <span className="container">
          {leadingIcon && <span data-slot="leading-icon">{leadingIcon}</span>}

          <SelectPrimitive.Value
            placeholder={placeholder}
            data-slot="value"
            className="value"
          />
        </span>

        <SelectPrimitive.Icon
          data-slot="trailing-icon"
          className="trailing-icon"
        >
          <ArrowDropDownIcon />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Positioner sideOffset={2} className="z-50">
          <SelectPrimitive.Popup
            data-slot="dropdown-chip-popup"
            className={dropdownChipPopupVariants()}
          >
            {children}
          </SelectPrimitive.Popup>
        </SelectPrimitive.Positioner>
      </SelectPrimitive.Portal>
    </>
  );
}

function DropdownChipItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="dropdown-chip-item"
      className={cn("dropdown-chip-item", className)}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export { DropdownChip, DropdownChipTrigger, DropdownChipItem };
export type { DropdownChipProps };
