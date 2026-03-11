import React from "react";

import KeyIcon from "@material-symbols/svg-700/sharp/key-fill.svg?react";
import VisibilityIcon from "@material-symbols/svg-700/sharp/visibility-fill.svg?react";
import VisibilityOffIcon from "@material-symbols/svg-700/sharp/visibility_off-fill.svg?react";

import { type OptionalCn, cn as defaultCn } from "@/utils/cn";

/* -------------------------------------------------------------------------------------------------
 * PasswordField
 * -----------------------------------------------------------------------------------------------*/

interface PasswordFieldProps
  extends OptionalCn,
    Omit<React.InputHTMLAttributes<HTMLInputElement>, "id" | "type"> {
  id?: string;
  label?: string;
  showLabel?: boolean;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
}

function PasswordField({
  cn = defaultCn,
  id,
  label = "Password",
  showLabel = true,
  error = false,
  errorMessage,
  disabled = false,
  className,
  ...inputProps
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <div className={cn("flex flex-col gap-40 items-start w-[300px]", className)}>
      {showLabel && (
        <label
          htmlFor={id}
          className={cn(
            "typography-para-30 text-neutral-110 truncate w-full",
            error && "text-red-60",
          )}
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          "flex gap-50 h-140 items-center pl-40 pr-60 py-40 rounded-xl w-full transition-colors",
          "bg-neutral-10 hover:bg-neutral-20",
          "has-[:focus]:ring-2 has-[:focus]:ring-neutral-110 has-[:focus]:ring-inset",
          error && "ring-2 ring-red-60 ring-inset",
          disabled && "opacity-40 pointer-events-none",
        )}
      >
        {/* Leading key icon */}
        <div className="bg-white flex items-center justify-center rounded-lg shrink-0 size-100">
          <KeyIcon className="size-60 text-orange-60" />
        </div>

        {/* Password input */}
        <input
          id={id}
          type={showPassword ? "text" : "password"}
          disabled={disabled}
          className="flex-1 min-w-0 w-full bg-transparent outline-none typography-para-30 text-neutral-110 placeholder:text-neutral-40"
          {...inputProps}
        />

        {/* Visibility toggle */}
        <button
          type="button"
          aria-label={showPassword ? "Hide password" : "Show password"}
          onClick={() => setShowPassword((v) => !v)}
          className="shrink-0 size-60 flex items-center justify-center text-neutral-70 hover:text-neutral-110 transition-colors"
        >
          {showPassword ? (
            <VisibilityOffIcon className="size-60" />
          ) : (
            <VisibilityIcon className="size-60" />
          )}
        </button>
      </div>

      {error && errorMessage && (
        <p className="typography-para-30 text-red-60">{errorMessage}</p>
      )}
    </div>
  );
}

PasswordField.displayName = "PasswordField";

export { PasswordField };
export type { PasswordFieldProps };
