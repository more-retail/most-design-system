"use client";

import * as React from "react";
import { OTPInput, OTPInputContext, type OTPInputProps } from "input-otp";
import { cn } from "@/utils/cn";


type OtpFieldProps = Omit<OTPInputProps, "render" | "children"> & {
  containerClassName?: string;
  error?: boolean;
};

function OtpField({
  className,
  containerClassName,
  error,
  ...props
}: OtpFieldProps) {
  return (
    <OTPInput
      data-slot="otp-input"
      containerClassName={cn(
        "flex items-center has-disabled:opacity-50",
        containerClassName
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      spellCheck={false}
      render={({ slots }) => (
        <OtpGroup>
          {slots.map((_, index) => (
            <OtpSlot
              key={index}
              index={index}
              disabled={props.disabled}
              error={error}
            />
          ))}
        </OtpGroup>
      )}
      {...props}
    />
  );
}

function OtpGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="otp-group"
      className={cn("flex gap-30", className)}
      {...props}
    />
  );
}

function OtpSlot({
  index,
  disabled,
  error,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
  disabled?: boolean;
  error?: boolean;
}) {
  const { slots } = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = slots[index];

  return (
    <div
      data-slot="otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex h-140 w-140 items-center justify-center",
        "rounded-xl bg-neutral-10",
        "typography-para-30 text-neutral-110 text-center",
        "outline-none transition-colors",
        isActive && !disabled && !error && "border-2 border-neutral-110",
        error && "border border-red-70",
        disabled && "bg-neutral-20 pointer-events-none",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-4 w-px animate-caret-blink bg-neutral-110 duration-1000" />
        </div>
      )}
    </div>
  );
}

OtpField.displayName = "OtpField";
OtpGroup.displayName = "OtpGroup";
OtpSlot.displayName = "OtpSlot";

export { OtpField, OtpGroup, OtpSlot };
export type { OtpFieldProps };
