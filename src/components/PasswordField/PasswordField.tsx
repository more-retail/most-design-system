"use client";

import * as React from "react";

import { Input as InputPrimitive } from "@base-ui/react/input";
import { type VariantProps } from "class-variance-authority";

import { Field, FieldError, FieldLabel } from "@/components/Field";
import { cn } from "@/utils/cn";

import { passwordFieldVariants } from "./PasswordField.variants";

import EmergencyIcon from "@material-symbols/svg-700/sharp/emergency-fill.svg?react";
import KeyIcon from "@material-symbols/svg-700/sharp/key-fill.svg?react";
import VisibilityIcon from "@material-symbols/svg-700/sharp/visibility-fill.svg?react";
import VisibilityOffIcon from "@material-symbols/svg-700/sharp/visibility_off-fill.svg?react";

type PasswordFieldContextValue = {
  inputId: string;
  disabled?: boolean;
  error?: boolean;
  revealed: boolean;
  toggleRevealed: () => void;
};

const PasswordFieldContext =
  React.createContext<PasswordFieldContextValue | null>(null);

function usePasswordFieldContext(component: string) {
  const context = React.useContext(PasswordFieldContext);

  if (!context) {
    throw new Error(`<${component}> must be used within a <PasswordField>.`);
  }

  return context;
}

type PasswordFieldProps = Omit<React.ComponentProps<typeof Field>, "children"> &
  VariantProps<typeof passwordFieldVariants> & {
    id?: string;
    error?: React.ReactNode;
    disabled?: boolean;
    children: React.ReactNode;
  };

function PasswordField({
  id,
  className,
  disabled,
  error,
  size = "regular",
  children,
  ...props
}: PasswordFieldProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const invalid = Boolean(error);
  const [revealed, setRevealed] = React.useState(false);

  const context = React.useMemo(
    () => ({
      inputId,
      disabled,
      error: invalid,
      revealed,
      toggleRevealed: () => setRevealed((value) => !value),
    }),
    [inputId, disabled, invalid, revealed],
  );

  return (
    <PasswordFieldContext.Provider value={context}>
      <Field
        data-slot="password-field"
        data-disabled={disabled || undefined}
        data-error={invalid || undefined}
        className={cn(passwordFieldVariants({ size, className }))}
        {...props}
      >
        {children}

        {invalid && <FieldError>{error}</FieldError>}
      </Field>
    </PasswordFieldContext.Provider>
  );
}

function PasswordFieldLabel({
  className,
  action,
  ...props
}: React.ComponentProps<typeof FieldLabel> & { action?: React.ReactNode }) {
  const { inputId } = usePasswordFieldContext("PasswordFieldLabel");

  return (
    <div className="flex w-full items-start gap-semantic-inline-loose">
      <FieldLabel
        htmlFor={inputId}
        data-slot="password-field-label"
        // oxlint-disable-next-line jsx-a11y/no-static-element-interactions -- prevents the label's default click-to-focus behavior; only the gray password-field-control box should activate the input
        onClick={(event) => event.preventDefault()}
        className={cn("flex-1", className)}
        {...props}
      />

      {action && <span data-slot="password-field-action">{action}</span>}
    </div>
  );
}

function PasswordFieldForgotAction({
  className,
  children = "Forgot Password?",
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="password-field-forgot-action"
      className={cn(
        "typography-para-30 text-semantic-content-link hover:text-semantic-content-link-hover active:text-semantic-content-link-pressed disabled:cursor-not-allowed disabled:text-semantic-content-disabled",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function PasswordFieldInput({
  className,
  disabled,
  ...props
}: React.ComponentProps<typeof InputPrimitive>) {
  const {
    inputId,
    disabled: contextDisabled,
    error,
    revealed,
    toggleRevealed,
  } = usePasswordFieldContext("PasswordFieldInput");
  const isDisabled = disabled ?? contextDisabled;
  const inputRef = React.useRef<HTMLElement>(null);

  return (
    // oxlint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events -- extends the click target to the real <input> descendant, which already handles keyboard interaction
    <div
      data-slot="password-field-control"
      onClick={() => inputRef.current?.focus()}
      className="password-field-control"
    >
      <KeyIcon data-slot="leading-icon" />

      <InputPrimitive
        ref={inputRef}
        id={inputId}
        type={revealed ? "text" : "password"}
        disabled={isDisabled}
        aria-invalid={error || undefined}
        data-slot="input"
        className={cn("input", className)}
        {...props}
      />

      {error && <EmergencyIcon data-slot="error-icon" className="error-icon" />}

      {!error && !isDisabled && (
        <button
          type="button"
          data-slot="reveal-toggle"
          className="reveal-toggle"
          onClick={(event) => {
            event.stopPropagation();
            toggleRevealed();
          }}
          aria-label={revealed ? "Hide password" : "Show password"}
        >
          {revealed ? <VisibilityOffIcon /> : <VisibilityIcon />}
        </button>
      )}
    </div>
  );
}

export {
  PasswordField,
  PasswordFieldLabel,
  PasswordFieldInput,
  PasswordFieldForgotAction,
};
export type { PasswordFieldProps };
