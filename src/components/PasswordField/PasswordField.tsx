import React from "react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/InputGroup/InputGroup";
import { Label } from "@/components/Label";
import { cn } from "@/utils/cn";

import KeyIcon from "@material-symbols/svg-700/sharp/key-fill.svg?react";
import VisibilityIcon from "@material-symbols/svg-700/sharp/visibility-fill.svg?react";
import VisibilityOffIcon from "@material-symbols/svg-700/sharp/visibility_off-fill.svg?react";

interface PasswordFieldProps
  extends Omit<React.ComponentProps<"input">, "type"> {
  errorMessage?: string;
  onForgotPassword?: () => void;
}

const PasswordField = ({
  errorMessage,
  disabled,
  placeholder,
  onForgotPassword,
  ...props
}: PasswordFieldProps) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className="flex w-[300px] flex-col items-start gap-40">
      <div className="flex w-full items-start gap-50">
        <Label
          className={cn(
            "min-w-0 flex-1 truncate typography-para-30 text-neutral-110",
            disabled && "text-neutral-40",
          )}
        >
          Password
        </Label>
        {onForgotPassword && (
          <button
            type="button"
            onClick={onForgotPassword}
            className={cn(
              "shrink-0 typography-label-30 whitespace-nowrap text-orange-60",
              disabled && "text-neutral-40",
            )}
          >
            Forgot Password?
          </button>
        )}
      </div>

      <InputGroup className={cn(disabled && "pointer-events-none")}>
        <InputGroupAddon align="inline-start">
          <div
            className={cn(
              "flex size-100 shrink-0 items-center justify-center rounded-lg bg-white",
              disabled && "bg-neutral-10",
            )}
          >
            <KeyIcon
              className={cn(
                "size-60 fill-orange-60",
                disabled && "fill-neutral-40",
              )}
            />
          </div>
        </InputGroupAddon>
        <InputGroupInput
          type={showPassword ? "text" : "password"}
          disabled={disabled}
          placeholder={placeholder}
          aria-invalid={!!errorMessage || undefined}
          {...props}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label={showPassword ? "Hide password" : "Show password"}
            onClick={() => setShowPassword((v) => !v)}
            disabled={disabled}
          >
            {showPassword ? (
              <VisibilityIcon className="size-60" />
            ) : (
              <VisibilityOffIcon className="size-60" />
            )}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      {errorMessage && (
        <p className={cn("typography-para-30 text-red-70")}>{errorMessage}</p>
      )}
    </div>
  );
};

PasswordField.displayName = "PasswordField";

export { PasswordField };
export type { PasswordFieldProps };
