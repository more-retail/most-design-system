import React from "react";
import { type VariantProps, cva } from "class-variance-authority";

import AttachFileIcon from "@material-symbols/svg-700/sharp/attach_file.svg?react";
import CheckIcon from "@material-symbols/svg-700/sharp/check.svg?react";
import CloseIcon from "@material-symbols/svg-700/sharp/close.svg?react";
import FormatBoldIcon from "@material-symbols/svg-700/sharp/format_bold.svg?react";
import FormatItalicIcon from "@material-symbols/svg-700/sharp/format_italic.svg?react";
import FormatListBulletedIcon from "@material-symbols/svg-700/sharp/format_list_bulleted.svg?react";
import FormatListNumberedIcon from "@material-symbols/svg-700/sharp/format_list_numbered.svg?react";
import LinkIcon from "@material-symbols/svg-700/sharp/link.svg?react";
import StrikethroughIcon from "@material-symbols/svg-700/sharp/strikethrough_s.svg?react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/InputGroup/InputGroup";
import { cn } from "@/utils/cn";
import { Label } from "@/components/Label";

const textFieldVariants = cva(["rounded-xl w-full transition-colors"], {
  variants: {
    variant: {
      default: "bg-neutral-10",
      ghost: "bg-transparent",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type TextFieldVariant = NonNullable<VariantProps<typeof textFieldVariants>["variant"]>;


const RICH_CONTROLS = [
  { Icon: FormatBoldIcon, label: "Bold" },
  { Icon: FormatItalicIcon, label: "Italic" },
  { Icon: StrikethroughIcon, label: "Strikethrough" },
  { Icon: FormatListNumberedIcon, label: "Numbered list" },
  { Icon: FormatListBulletedIcon, label: "Bulleted list" },
  { Icon: LinkIcon, label: "Link" },
  { Icon: AttachFileIcon, label: "Attach file" },
] as const;

interface TextFieldProps
  extends Omit<React.ComponentProps<"input">, "onChange" | "onFocus" | "onBlur"> {
  label?: string;
  showLabel?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  error?: boolean;
  errorMessage?: string;
  multiline?: boolean;
  variant?: TextFieldVariant;
  richControls?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
}

function TextField({
  id,
  label = "Label",
  showLabel = true,
  leadingIcon,
  trailingIcon,
  error = false,
  errorMessage,
  multiline = false,
  variant = "default",
  richControls = false,
  onConfirm,
  onCancel,
  onChange,
  onFocus,
  onBlur,
  className,
  disabled,
  type,
  ...props
}: TextFieldProps) {
  const [isFocused, setIsFocused] = React.useState(false);
  const isGhost = variant === "ghost";

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const labelClass = cn(
    "typography-para-30 text-neutral-110 truncate w-full",
    error && !isGhost && "text-red-60",
  );

  if (isGhost) {
    const showActions = isFocused && (onConfirm || onCancel);
    return (
      <div
        data-slot="text-field"
        className={cn("flex flex-col gap-40 items-start w-[300px]", className)}
      >
        {showLabel && (
          <Label htmlFor={id} className={labelClass}>
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
            type={type}
            className={cn(
              "w-full rounded-xl bg-transparent outline-none min-h-140 px-60 py-50",
              "typography-para-30 text-neutral-110 placeholder:text-neutral-40",
              "transition-colors",
              "hover:bg-neutral-10 hover:border-2 hover:border-neutral-20",
              isFocused && "bg-neutral-10 border-2 border-neutral-110",
              disabled && "opacity-40 pointer-events-none",
            )}
            {...props}
          />
          {showActions && (
            <div className="absolute -bottom-130 right-0 flex gap-30 items-center">
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={onCancel}
                className="bg-neutral-10 flex items-center justify-center h-110 px-[10px] rounded-full shadow-[0px_4px_16px_0px_rgba(23,33,40,0.1)]"
              >
                <CloseIcon className="size-60 text-neutral-110" />
              </button>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={onConfirm}
                className="bg-neutral-100 flex items-center justify-center h-110 px-[10px] rounded-full shadow-[0px_4px_16px_0px_rgba(23,33,40,0.1)]"
              >
                <CheckIcon className="size-60 text-white" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  if (multiline) {
    return (
      <div
        data-slot="text-field"
        className={cn("flex flex-col gap-40 items-start w-[300px]", className)}
      >
        {showLabel && (
          <Label htmlFor={id} className={labelClass}>
            {label}
          </Label>
        )}
        <InputGroup
          className={cn(
            "p-60",
            disabled && "pointer-events-none",
          )}
        >
          <InputGroupTextarea
            id={id}
            disabled={disabled}
            aria-invalid={error || undefined}
            onChange={onChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className="min-h-[176px]"
            {...(props as React.ComponentProps<"textarea">)}
          />
          {richControls && isFocused && (
            <InputGroupAddon align="block-end" className="gap-30 pt-50">
              {RICH_CONTROLS.map(({ Icon, label: iconLabel }) => (
                <InputGroupButton
                  key={iconLabel}
                  type="button"
                  aria-label={iconLabel}
                  onMouseDown={(e) => e.preventDefault()}
                  variant="ghost"
                  size="icon-xs"
                  className="bg-neutral-10 hover:bg-neutral-20 rounded-lg"
                >
                  <Icon className="size-60 text-neutral-110" />
                </InputGroupButton>
              ))}
            </InputGroupAddon>
          )}
        </InputGroup>
        {error && errorMessage && (
          <Label className="typography-para-30 text-red-70">{errorMessage}</Label>
        )}
      </div>
    );
  }

  return (
    <div
      data-slot="text-field"
      className={cn("flex flex-col gap-40 items-start w-[300px]", className)}
    >
      {showLabel && (
        <Label htmlFor={id} className={labelClass}>
          {label}
        </Label>
      )}
      <InputGroup className={cn(disabled && "pointer-events-none")}>
        {React.isValidElement(leadingIcon) && (
          <InputGroupAddon align="inline-start">
            <div className="bg-white flex items-center justify-center rounded-lg shrink-0 size-100">
              {leadingIcon}
            </div>
          </InputGroupAddon>
        )}
        <InputGroupInput
          id={id}
          disabled={disabled}
          aria-invalid={error || undefined}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          type={type}
          {...props}
        />
        {React.isValidElement(trailingIcon) && (
          <InputGroupAddon align="inline-end">
            <div className="text-neutral-70">{trailingIcon}</div>
          </InputGroupAddon>
        )}
      </InputGroup>
      {error && errorMessage && (
        <p  className="typography-para-30 text-red-60">{errorMessage}</p>
      )}
    </div>
  );
}

TextField.displayName = "TextField";

export { TextField, textFieldVariants };
export type { TextFieldProps, TextFieldVariant };
