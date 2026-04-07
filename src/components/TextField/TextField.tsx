import React from "react";

import { type VariantProps, cva } from "class-variance-authority";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/InputGroup/InputGroup";
import { Label } from "@/components/Label";
import { cn } from "@/utils/cn";

import CheckIcon from "@material-symbols/svg-700/sharp/check.svg?react";
import CloseIcon from "@material-symbols/svg-700/sharp/close.svg?react";

const textFieldVariants = cva(["rounded-xl w-full transition-colors"], {
  variants: {
    variant: {
      default: "bg-neutral-10",
      ghost: "bg-transparent",
      multiline: "bg-neutral-10",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type TextFieldVariant = NonNullable<
  VariantProps<typeof textFieldVariants>["variant"]
>;

interface TextFieldProps
  extends Omit<React.ComponentProps<"input">, "onChange"> {
  label?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  errorMessage?: string;
  variant?: TextFieldVariant;
  onConfirm?: () => void;
  onCancel?: () => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

function TextField({
  id,
  label,
  leadingIcon,
  trailingIcon,
  errorMessage,
  variant = "default",
  onConfirm,
  onCancel,
  onChange,
  className,
  disabled,
  ...props
}: TextFieldProps) {
  const [isFocused, setIsFocused] = React.useState(false);

  const handleFocus = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setIsFocused(true);
  };

  const handleBlur = (
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setIsFocused(false);
  };

  if (variant === "ghost") {
    const showActions = isFocused && (onConfirm || onCancel);
    return (
      <div
        data-slot="text-field"
        className={cn("flex w-[300px] flex-col items-start gap-40", className)}
      >
        {label && (
          <Label
            htmlFor={id}
            className={cn(
              "w-full truncate overflow-hidden typography-para-30 overflow-ellipsis text-neutral-110",
              disabled && "text-neutral-60",
            )}
          >
            {label}
          </Label>
        )}
        <div className="relative w-full">
          <input
            id={id}
            disabled={disabled}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              "min-h-140 w-full rounded-xl bg-transparent px-60 py-50 outline-none",
              "typography-para-30 text-neutral-110 placeholder:text-neutral-40",
              "hover:border-2 hover:border-neutral-20 hover:bg-neutral-10",
              "focus-visible:border-neutral-110",
              isFocused && "border-2 border-neutral-110 bg-neutral-10",
              disabled && "pointer-events-none opacity-40",
            )}
            {...props}
          />
          {showActions && (
            <div className="absolute right-0 -bottom-130 flex items-center gap-30">
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={onCancel}
                className="flex h-110 items-center justify-center rounded-full bg-neutral-10 px-[10px] shadow-[0px_4px_16px_0px_rgba(23,33,40,0.1)]"
              >
                <CloseIcon className="size-60 text-neutral-110" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={onConfirm}
                className="flex h-110 items-center justify-center rounded-full bg-neutral-100 px-[10px] shadow-[0px_4px_16px_0px_rgba(23,33,40,0.1)]"
              >
                <CheckIcon className="size-60" fill="white" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (variant === "multiline") {
    return (
      <div
        data-slot="text-field"
        className={cn("flex w-[300px] flex-col items-start gap-40", className)}
      >
        {label && (
          <Label
            htmlFor={id}
            className={cn(
              "w-full truncate overflow-hidden typography-para-30 overflow-ellipsis text-neutral-110",
              disabled && "text-neutral-60",
            )}
          >
            {label}
          </Label>
        )}
        <InputGroup>
          <InputGroupTextarea
            id={id}
            disabled={disabled}
            aria-invalid={!!errorMessage || undefined}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="min-h-[176px]"
            {...(props as React.ComponentProps<"textarea">)}
          />
        </InputGroup>
        {errorMessage && (
          <Label className="typography-para-30 text-red-70">
            {errorMessage}
          </Label>
        )}
      </div>
    );
  }

  return (
    <div
      data-slot="text-field"
      className={cn("flex w-[300px] flex-col items-start gap-40", className)}
    >
      {label && (
        <Label
          htmlFor={id}
          className={cn(
            "w-full truncate overflow-hidden typography-para-30 overflow-ellipsis text-neutral-110",
            disabled && "text-neutral-60",
          )}
        >
          {label}
        </Label>
      )}
      <InputGroup
        className={cn("overflow-hidden", disabled && "pointer-events-none")}
      >
        {leadingIcon && (
          <InputGroupAddon align="inline-start">{leadingIcon}</InputGroupAddon>
        )}
        <InputGroupInput
          id={id}
          disabled={disabled}
          aria-invalid={!!errorMessage || undefined}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        {trailingIcon && (
          <InputGroupAddon align="inline-end">{trailingIcon}</InputGroupAddon>
        )}
      </InputGroup>
      {errorMessage && (
        <p className="typography-para-30 text-red-70">{errorMessage}</p>
      )}
    </div>
  );
}

TextField.displayName = "TextField";

export { TextField, textFieldVariants };
export type { TextFieldProps, TextFieldVariant };
