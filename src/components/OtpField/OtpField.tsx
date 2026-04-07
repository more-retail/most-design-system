import * as React from "react";
import { OTPInput, OTPInputContext, type OTPInputProps } from "input-otp";
import { cn } from "@/utils/cn";

type OtpFieldProps = Omit<OTPInputProps, "render"> & {
  containerClassName?: string;
  children: React.ReactNode;
};

function OtpField({
  className,
  containerClassName,
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
  error,
  className,
  ...props
}: React.ComponentProps<"div"> & {
  index: number;
  error?: boolean;
}) {
  const { slots } = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = slots?.[index] ?? {};

  return (
    <div
      data-slot="otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex h-140 w-170 items-center justify-center",
        "rounded-xl bg-neutral-10",
        "typography-para-30 text-neutral-110 text-center",
        "outline-none transition-colors",
        isActive && !error && "border-2 border-neutral-110",
        error && "border border-red-70",
        className
      )}
      {...props}
    >
      {char}
      {hasFakeCaret && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="h-[20px] w-[1.5px] rounded-full bg-red-60" />
        </div>
      )}
    </div>
  );
}

function OtpSeparator({ ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="otp-separator"
      role="separator"
      {...props}
    />
  );
}

export { OtpField, OtpGroup, OtpSlot, OtpSeparator };
export type { OtpFieldProps };
