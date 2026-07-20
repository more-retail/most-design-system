"use client";

import * as React from "react";

import { OTPField } from "@base-ui/react/otp-field";
import { type VariantProps } from "class-variance-authority";

import { Field, FieldError, FieldLabel } from "@/components/Field";
import { cn } from "@/utils/cn";

import { otpFieldVariants } from "./OtpField.variants";

type OtpFieldContextValue = {
  inputId: string;
  disabled?: boolean;
  error?: boolean;
};

const OtpFieldContext = React.createContext<OtpFieldContextValue | null>(null);

function useOtpFieldContext(component: string) {
  const context = React.useContext(OtpFieldContext);

  if (!context) {
    throw new Error(`<${component}> must be used within an <OtpField>.`);
  }

  return context;
}

type OtpFieldProps = Omit<React.ComponentProps<typeof Field>, "children"> &
  VariantProps<typeof otpFieldVariants> & {
    id?: string;
    error?: React.ReactNode;
    disabled?: boolean;
    children: React.ReactNode;
  };

function OtpField({
  id,
  className,
  disabled,
  error,
  size = "regular",
  children,
  ...props
}: OtpFieldProps) {
  const generatedId = React.useId();
  const inputId = id ?? generatedId;
  const invalid = Boolean(error);

  const context = React.useMemo(
    () => ({ inputId, disabled, error: invalid }),
    [inputId, disabled, invalid],
  );

  return (
    <OtpFieldContext.Provider value={context}>
      <Field
        data-slot="otp-field"
        data-disabled={disabled || undefined}
        data-error={invalid || undefined}
        className={cn(otpFieldVariants({ size, className }))}
        {...props}
      >
        {children}

        {invalid && <FieldError>{error}</FieldError>}
      </Field>
    </OtpFieldContext.Provider>
  );
}

function OtpFieldLabel({
  className,
  action,
  ...props
}: React.ComponentProps<typeof FieldLabel> & { action?: React.ReactNode }) {
  const { inputId } = useOtpFieldContext("OtpFieldLabel");

  return (
    <div className="flex w-full items-start gap-semantic-inline-loose">
      <FieldLabel
        htmlFor={inputId}
        data-slot="otp-field-label"
        // oxlint-disable-next-line jsx-a11y/no-static-element-interactions -- prevents the label's default click-to-focus behavior; only the otp-field-inputs boxes should activate on click
        onClick={(event) => event.preventDefault()}
        className={cn("flex-1", className)}
        {...props}
      />

      {action && <span data-slot="otp-field-action">{action}</span>}
    </div>
  );
}

function OtpFieldResendAction({
  className,
  onClick,
  cooldownSeconds = 30,
  children = "Resend",
  disabled,
  ...props
}: Omit<React.ComponentProps<"button">, "type"> & {
  /** Seconds the button stays disabled for after each click. */
  cooldownSeconds?: number;
}) {
  const [remaining, setRemaining] = React.useState(0);

  React.useEffect(() => {
    if (remaining <= 0) {
      return;
    }

    const timeout = setTimeout(() => setRemaining((value) => value - 1), 1000);

    return () => clearTimeout(timeout);
  }, [remaining]);

  const onCooldown = remaining > 0;

  return (
    <button
      type="button"
      data-slot="otp-field-resend-action"
      disabled={disabled || onCooldown}
      className={cn(
        "typography-para-30 text-semantic-content-link hover:text-semantic-content-link-hover active:text-semantic-content-link-pressed disabled:cursor-not-allowed disabled:text-semantic-content-disabled",
        className,
      )}
      onClick={(event) => {
        onClick?.(event);
        setRemaining(cooldownSeconds);
      }}
      {...props}
    >
      {onCooldown ? `${children} in ${remaining}s` : children}
    </button>
  );
}

function OtpFieldInputs({
  className,
  length = 4,
  disabled,
  ...props
}: Omit<React.ComponentProps<typeof OTPField.Root>, "id" | "length"> & {
  length?: number;
}) {
  const {
    inputId,
    disabled: contextDisabled,
    error,
  } = useOtpFieldContext("OtpFieldInputs");
  const isDisabled = disabled ?? contextDisabled;

  return (
    <OTPField.Root
      id={inputId}
      length={length}
      disabled={isDisabled}
      data-slot="otp-field-inputs"
      className={cn("otp-field-inputs", className)}
      {...props}
    >
      {Array.from({ length }, (_, index) => (
        <OTPField.Input
          key={index}
          aria-invalid={error || undefined}
          data-slot="otp-field-input"
          className="otp-field-input"
        />
      ))}
    </OTPField.Root>
  );
}

export { OtpField, OtpFieldLabel, OtpFieldInputs, OtpFieldResendAction };
export type { OtpFieldProps };
