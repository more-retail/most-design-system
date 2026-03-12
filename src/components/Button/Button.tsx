import React from "react";

import { type OptionalCn, cn as defaultCn } from "@/utils/cn";

/* -------------------------------------------------------------------------------------------------
 * Button
 * -----------------------------------------------------------------------------------------------*/

type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost";
type ButtonSize = "lg" | "md" | "sm" | "xs";

interface ButtonProps
  extends OptionalCn,
    React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
}

// ── Size tokens ──────────────────────────────────────────────────────────────

const sizeStyles: Record<
  ButtonSize,
  {
    height: string;
    px: string;
    /** Horizontal padding for icon-only (no label) mode */
    pxIcon: string;
    gap: string;
    iconSize: string;
  }
> = {
  lg: {
    height: "h-160",
    px: "px-80",
    pxIcon: "px-80",
    gap: "gap-50",
    iconSize: "size-60",
  },
  md: {
    height: "h-140",
    px: "px-60",
    pxIcon: "px-60",
    gap: "gap-50",
    iconSize: "size-60"
  },
  sm: {
    height: "h-110",
    px: "px-50",
    pxIcon: "px-[10px]",
    gap: "gap-40",
    iconSize: "size-60"
  },
  xs: {
    height: "h-80",
    px: "px-40",
    pxIcon: "px-[6px]",
    gap: "gap-30",
    iconSize: "size-50"
  },
};

// ── Variant tokens ───────────────────────────────────────────────────────────

const variantStyles: Record<
  ButtonVariant,
  {
    base: string;
    text: string;
    disabledBg: string;
    disabledText: string;
  }
> = {
  primary: {
    base: "bg-orange-60 shadow-[0px_4px_12px_0px_rgba(250,75,22,0.5)] hover:shadow-[0px_4px_12px_0px_rgba(250,75,22,0.75)] active:bg-orange-70",
    text: "text-white",
    disabledBg: "disabled:bg-neutral-20 disabled:shadow-none",
    disabledText: "disabled:text-neutral-40"
  },
  secondary: {
    base: "bg-neutral-100 hover:shadow-[0px_4px_12px_0px_rgba(23,33,40,0.25)] active:bg-neutral-110",
    text: "text-white",
    disabledBg: "disabled:bg-neutral-20 disabled:shadow-none",
    disabledText: "disabled:text-neutral-40"
  },
  tertiary: {
    base: "bg-neutral-10 hover:shadow-[0px_4px_12px_0px_rgba(23,33,40,0.05)] active:bg-neutral-20",
    text: "text-neutral-110",
    disabledBg: "disabled:bg-neutral-20 disabled:shadow-none",
    disabledText: "disabled:text-neutral-40"
  },
  ghost: {
    base: "hover:bg-neutral-10 active:bg-neutral-20",
    text: "text-neutral-110",
    disabledBg: "",
    disabledText: "disabled:text-neutral-40"
  },
};

// ── Component ────────────────────────────────────────────────────────────────

function Button({
  cn = defaultCn,
  variant = "primary",
  size = "md",
  leadingIcon,
  trailingIcon,
  className,
  children,
  disabled,
  ...buttonProps
}: ButtonProps) {
  const ss = sizeStyles[size];
  const vs = variantStyles[variant];
  const isIconOnly = !children && !!leadingIcon && !trailingIcon;

  return (
    <button
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center overflow-hidden rounded-full",
        "cursor-pointer transition-colors",
        "disabled:pointer-events-none",
        ss.height,
        isIconOnly ? ss.pxIcon : ss.px,
        ss.gap,
        vs.base,
        vs.text,
        vs.disabledBg,
        vs.disabledText,
        className,
      )}
      {...buttonProps}
    >
      {leadingIcon && (
        <span className={cn("shrink-0 flex items-center justify-center", ss.iconSize)}>
          {leadingIcon}
        </span>
      )}

      {children && (
        <span className="typography-label-thick-30 whitespace-nowrap">{children}</span>
      )}

      {trailingIcon && (
        <span className={cn("shrink-0 flex items-center justify-center", ss.iconSize)}>
          {trailingIcon}
        </span>
      )}
    </button>
  );
}

Button.displayName = "Button";

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
