"use client";

import * as React from "react";

import { Select as SelectPrimitive } from "@base-ui/react/select";
import { type VariantProps } from "class-variance-authority";

import { Field, FieldError, FieldLabel } from "@/components/Field";
import { cn } from "@/utils/cn";

import {
  dropdownFieldPopupVariants,
  dropdownFieldVariants,
} from "./DropdownField.variants";

import ArrowDropDownIcon from "@material-symbols/svg-700/sharp/arrow_drop_down-fill.svg?react";
import EmergencyIcon from "@material-symbols/svg-700/sharp/emergency-fill.svg?react";

type DropdownFieldContextValue = {
  triggerId: string;
  disabled?: boolean;
  error?: boolean;
};

const DropdownFieldContext =
  React.createContext<DropdownFieldContextValue | null>(null);

function useDropdownFieldContext(component: string) {
  const context = React.useContext(DropdownFieldContext);

  if (!context) {
    throw new Error(`<${component}> must be used within a <DropdownField>.`);
  }

  return context;
}

type DropdownFieldProps = Omit<React.ComponentProps<typeof Field>, "children"> &
  VariantProps<typeof dropdownFieldVariants> &
  Pick<
    SelectPrimitive.Root.Props<string>,
    "value" | "defaultValue" | "onValueChange" | "name"
  > & {
    id?: string;
    error?: React.ReactNode;
    disabled?: boolean;
    children: React.ReactNode;
  };

function DropdownField({
  id,
  className,
  disabled,
  error,
  size = "regular",
  children,
  value,
  defaultValue,
  onValueChange,
  name,
  ...props
}: DropdownFieldProps) {
  const generatedId = React.useId();
  const triggerId = id ?? generatedId;
  const invalid = Boolean(error);

  const context = React.useMemo(
    () => ({ triggerId, disabled, error: invalid }),
    [triggerId, disabled, invalid],
  );

  return (
    <DropdownFieldContext.Provider value={context}>
      <SelectPrimitive.Root
        disabled={disabled}
        value={value}
        defaultValue={defaultValue}
        onValueChange={onValueChange}
        name={name}
      >
        <Field
          data-slot="dropdown-field"
          data-disabled={disabled || undefined}
          data-error={invalid || undefined}
          className={cn(dropdownFieldVariants({ size, className }))}
          {...props}
        >
          {children}

          {invalid && <FieldError>{error}</FieldError>}
        </Field>
      </SelectPrimitive.Root>
    </DropdownFieldContext.Provider>
  );
}

function DropdownFieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof FieldLabel>) {
  const { triggerId } = useDropdownFieldContext("DropdownFieldLabel");

  return (
    <FieldLabel
      htmlFor={triggerId}
      data-slot="dropdown-field-label"
      // oxlint-disable-next-line jsx-a11y/no-static-element-interactions -- prevents the label's default click-to-focus behavior; only the dropdown-field-trigger should activate on click
      onClick={(event) => event.preventDefault()}
      className={className}
      {...props}
    />
  );
}

function DropdownFieldTrigger({
  className,
  placeholder,
  leadingIcon,
  children,
  ...props
}: Omit<React.ComponentProps<typeof SelectPrimitive.Trigger>, "id"> & {
  placeholder?: string;
  leadingIcon?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { triggerId, disabled, error } = useDropdownFieldContext(
    "DropdownFieldTrigger",
  );

  return (
    <>
      <SelectPrimitive.Trigger
        id={triggerId}
        disabled={disabled}
        aria-invalid={error || undefined}
        data-slot="dropdown-field-trigger"
        className={cn("dropdown-field-trigger", className)}
        {...props}
      >
        {leadingIcon && <span data-slot="leading-icon">{leadingIcon}</span>}

        <SelectPrimitive.Value
          placeholder={placeholder}
          data-slot="value"
          className="value"
        />

        {error ? (
          <EmergencyIcon data-slot="error-icon" className="error-icon" />
        ) : (
          <SelectPrimitive.Icon
            data-slot="trailing-icon"
            className="trailing-icon"
          >
            <ArrowDropDownIcon />
          </SelectPrimitive.Icon>
        )}
      </SelectPrimitive.Trigger>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Positioner sideOffset={6} className="z-50">
          <SelectPrimitive.Popup
            data-slot="dropdown-field-popup"
            className={dropdownFieldPopupVariants()}
          >
            {children}
          </SelectPrimitive.Popup>
        </SelectPrimitive.Positioner>
      </SelectPrimitive.Portal>
    </>
  );
}

function DropdownFieldItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      data-slot="dropdown-field-item"
      className={cn("dropdown-field-item", className)}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export {
  DropdownField,
  DropdownFieldLabel,
  DropdownFieldTrigger,
  DropdownFieldItem,
};
export type { DropdownFieldProps };
