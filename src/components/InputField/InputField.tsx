"use client";

import * as React from "react";

import { Input as InputPrimitive } from "@base-ui/react/input";
import { type VariantProps } from "class-variance-authority";

import { Field, FieldError, FieldLabel } from "@/components/Field";
import { cn } from "@/utils/cn";

import { inputFieldVariants } from "./InputField.variants";

import EmergencyHomeIcon from "@material-symbols/svg-700/sharp/emergency_home-fill.svg?react";

type InputFieldContextValue = {
  inputId: string;
  disabled?: boolean;
  error?: boolean;
};

const InputFieldContext = React.createContext<InputFieldContextValue | null>(
  null,
);

function useInputFieldContext(component: string) {
  const context = React.useContext(InputFieldContext);

  if (!context) {
    throw new Error(`<${component}> must be used within an <InputField>.`);
  }

  return context;
}

type InputFieldProps = Omit<React.ComponentProps<typeof Field>, "children"> &
  VariantProps<typeof inputFieldVariants> & {
    id?: string;
    error?: React.ReactNode;
    disabled?: boolean;
    children: React.ReactNode;
  };

function InputField({
  id,
  className,
  disabled,
  error,
  size = "regular",
  children,
  ...props
}: InputFieldProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const invalid = Boolean(error);

  const context = React.useMemo(
    () => ({ inputId, disabled, error: invalid }),
    [inputId, disabled, invalid],
  );

  return (
    <InputFieldContext.Provider value={context}>
      <Field
        data-slot="input-field"
        data-disabled={disabled || undefined}
        data-error={invalid || undefined}
        className={cn(inputFieldVariants({ size, className }))}
        {...props}
      >
        {children}

        {invalid && <FieldError>{error}</FieldError>}
      </Field>
    </InputFieldContext.Provider>
  );
}

function InputFieldLabel({
  className,
  ...props
}: React.ComponentProps<typeof FieldLabel>) {
  const { inputId } = useInputFieldContext("InputFieldLabel");

  return (
    <FieldLabel
      htmlFor={inputId}
      data-slot="input-field-label"
      // oxlint-disable-next-line jsx-a11y/no-static-element-interactions -- prevents the label's default click-to-focus behavior; only the gray input-field-control box should activate the input
      onClick={(event) => event.preventDefault()}
      className={className}
      {...props}
    />
  );
}

function InputFieldInput({
  className,
  type,
  disabled,
  children,
  ...props
}: React.ComponentProps<typeof InputPrimitive> & {
  children?: React.ReactNode;
}) {
  const {
    inputId,
    disabled: contextDisabled,
    error,
  } = useInputFieldContext("InputFieldInput");
  const isDisabled = disabled ?? contextDisabled;
  const inputRef = React.useRef<HTMLElement>(null);

  return (
    // oxlint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events - extends the click target to the real <input> descendant, which already handles keyboard interaction
    <div
      data-slot="input-field-control"
      onClick={() => inputRef.current?.focus()}
      className="input-field-control"
    >
      {children}
      <InputPrimitive
        ref={inputRef}
        id={inputId}
        type={type}
        disabled={isDisabled}
        aria-invalid={error || undefined}
        data-slot="input"
        className={cn("input", className)}
        {...props}
      />
      {error && (
        <EmergencyHomeIcon data-slot="error-icon" className="error-icon" />
      )}
    </div>
  );
}

export { InputField, InputFieldLabel, InputFieldInput };
export type { InputFieldProps };
