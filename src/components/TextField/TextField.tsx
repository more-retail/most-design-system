import React from "react";

import AttachFileIcon from "@material-symbols/svg-700/sharp/attach_file.svg?react";
import CheckIcon from "@material-symbols/svg-700/sharp/check.svg?react";
import CloseIcon from "@material-symbols/svg-700/sharp/close.svg?react";
import FormatBoldIcon from "@material-symbols/svg-700/sharp/format_bold.svg?react";
import FormatItalicIcon from "@material-symbols/svg-700/sharp/format_italic.svg?react";
import FormatListBulletedIcon from "@material-symbols/svg-700/sharp/format_list_bulleted.svg?react";
import FormatListNumberedIcon from "@material-symbols/svg-700/sharp/format_list_numbered.svg?react";
import LinkIcon from "@material-symbols/svg-700/sharp/link.svg?react";
import StrikethroughIcon from "@material-symbols/svg-700/sharp/strikethrough_s.svg?react";

import { cn } from "@/utils/cn";

/* -------------------------------------------------------------------------------------------------
 * TextField
 * -----------------------------------------------------------------------------------------------*/

interface TextFieldProps {
  id?: string;
  label?: string;
  showLabel?: boolean;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  error?: boolean;
  errorMessage?: string;
  /** Renders a textarea instead of an input */
  multiline?: boolean;
  /** "ghost" renders without a background/border until hovered or focused */
  variant?: "default" | "ghost";
  /** Shows formatting toolbar when the multiline textarea is focused */
  richControls?: boolean;
  /** Called when the ghost variant's confirm button is clicked */
  onConfirm?: () => void;
  /** Called when the ghost variant's cancel button is clicked */
  onCancel?: () => void;
  // input / textarea props
  value?: string;
  defaultValue?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  name?: string;
  autoComplete?: string;
  readOnly?: boolean;
  maxLength?: number;
}

const TextField = ({
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
  value,
  defaultValue,
  onChange,
  onFocus,
  onBlur,
  placeholder,
  disabled = false,
  type,
  name,
  autoComplete,
  readOnly,
  maxLength,
}: TextFieldProps) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const isGhost = variant === "ghost";

  const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  }

  // ── Shared input/textarea classes ──────────────────────────────────────────
  const inputClass = cn(
    "flex-1 min-w-0 w-full bg-transparent outline-none resize-none",
    "typography-para-30 text-neutral-110",
    "placeholder:text-neutral-40",
    disabled && "text-neutral-60",
  );

  // ── Ghost variant ─────────────────────────────────────────────────────────
  if (isGhost) {
    const showActions = isFocused && (onConfirm || onCancel);
    return (
      <div className="flex flex-col gap-40 items-start w-[300px]">
        {showLabel && (
          <label htmlFor={id} className="typography-para-30 text-neutral-110 truncate w-full">
            {label}
          </label>
        )}
        <div className="relative w-full">
          <input
            id={id}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            name={name}
            autoComplete={autoComplete}
            readOnly={readOnly}
            maxLength={maxLength}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(
              "w-full min-h-140 px-60 py-50 rounded-xl outline-none transition-colors",
              "typography-para-30 text-neutral-110 placeholder:text-neutral-40",
              "bg-transparent",
              "hover:bg-neutral-10 hover:border-2 hover:border-neutral-20",
              isFocused && "bg-neutral-10 border-2 border-neutral-110",
              disabled && "opacity-40 pointer-events-none",
            )}
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

  // ── Multiline variant ─────────────────────────────────────────────────────
  if (multiline) {
    return (
      <div className="flex flex-col gap-40 items-start w-[300px]">
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
            "flex flex-col gap-50 flex-1 min-h-[176px] p-60 rounded-xl w-full transition-colors",
            "bg-neutral-10",
            !error && !disabled && "hover:border-2 hover:border-neutral-20",
            !error && !disabled && isFocused && "border-2 border-neutral-110",
            error && "border border-red-70",
            error && isFocused && "shadow-[0px_0px_0px_2px_var(--color-red-20)]",
            disabled && "bg-neutral-20 pointer-events-none",
          )}
        >
          <textarea
            id={id}
            value={value}
            defaultValue={defaultValue}
            onChange={onChange}
            placeholder={placeholder}
            name={name}
            readOnly={readOnly}
            maxLength={maxLength}
            disabled={disabled}
            onFocus={handleFocus}
            onBlur={handleBlur}
            className={cn(inputClass, "flex-1")}
          />
          {richControls && isFocused && (
            <div className="flex gap-30 items-center shrink-0">
              {[
                { Icon: FormatBoldIcon, label: "Bold" },
                { Icon: FormatItalicIcon, label: "Italic" },
                { Icon: StrikethroughIcon, label: "Strikethrough" },
                { Icon: FormatListNumberedIcon, label: "Numbered list" },
                { Icon: FormatListBulletedIcon, label: "Bulleted list" },
                { Icon: LinkIcon, label: "Link" },
                { Icon: AttachFileIcon, label: "Attach file" },
              ].map(({ Icon, label: iconLabel }) => (
                <button
                  key={iconLabel}
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  aria-label={iconLabel}
                  className="flex items-center justify-center size-80 rounded-lg bg-neutral-10 hover:bg-neutral-20 transition-colors"
                >
                  <Icon className="size-60 text-neutral-110" />
                </button>
              ))}
            </div>
          )}
        </div>
        {error && errorMessage && (
          <p className="typography-para-30 text-red-70">{errorMessage}</p>
        )}
      </div>
    );
  }

  // ── Default single-line variant ───────────────────────────────────────────
  return (
    <div className="flex flex-col gap-40 items-start w-[300px]">
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
          "flex gap-50 h-140 items-center pr-60 py-40 rounded-xl w-full transition-colors",
          leadingIcon ? "pl-40" : "pl-60",
          "bg-neutral-10 hover:bg-neutral-20",
          "has-[:focus]:ring-2 has-[:focus]:ring-neutral-110 has-[:focus]:ring-inset",
          error && "ring-2 ring-red-60 ring-inset",
          disabled && "opacity-40 pointer-events-none",
        )}
      >
        {React.isValidElement(leadingIcon) && (
          <div className="bg-white flex items-center justify-center rounded-lg shrink-0 size-100">
            {leadingIcon}
          </div>
        )}
        <input
          id={id}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder={placeholder}
          type={type}
          name={name}
          autoComplete={autoComplete}
          readOnly={readOnly}
          maxLength={maxLength}
          disabled={disabled}
          className={inputClass}
        />
        {React.isValidElement(trailingIcon) && (
          <div className="shrink-0 size-60 text-neutral-70">{trailingIcon}</div>
        )}
      </div>
      {error && errorMessage && (
        <p className="typography-para-30 text-red-60">{errorMessage}</p>
      )}
    </div>
  );
}

TextField.displayName = "TextField";

export { TextField };
export type { TextFieldProps };
