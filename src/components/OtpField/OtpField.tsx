import * as React from "react";

import { OTPInput, OTPInputContext, type OTPInputProps } from "input-otp";

import { cn } from "@/utils/cn";

type OtpFieldProps = Omit<OTPInputProps, "render"> & {
  containerClassName?: string;
  children: React.ReactNode;
};

const OtpField: React.FC<OtpFieldProps> = ({
  className,
  containerClassName,
  ...props
}) => {
  return (
    <OTPInput
      data-slot="otp-input"
      containerClassName={cn(
        "flex items-center has-disabled:opacity-50",
        containerClassName,
      )}
      className={cn("disabled:cursor-not-allowed", className)}
      spellCheck={false}
      {...props}
    />
  );
};

const OtpGroup: React.FC<React.ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="otp-group"
      className={cn("flex gap-30", className)}
      {...props}
    />
  );
};

const OtpSlot: React.FC<
  React.ComponentProps<"div"> & {
    index: number;
    error?: boolean;
  }
> = ({ index, error, className, ...props }) => {
  const { slots } = React.useContext(OTPInputContext);
  const { char, hasFakeCaret, isActive } = slots?.[index] ?? {};

  return (
    <div
      data-slot="otp-slot"
      data-active={isActive}
      className={cn(
        "relative flex h-140 w-170 items-center justify-center",
        "rounded-xl bg-neutral-10",
        "text-center typography-para-30 text-neutral-110",
        "transition-colors outline-none",
        isActive && !error && "border-2 border-neutral-110",
        error && "border border-red-70",
        className,
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
};

const OtpSeparator: React.FC<React.ComponentProps<"div">> = ({ ...props }) => {
  return <div data-slot="otp-separator" role="separator" {...props} />;
};

export { OtpField, OtpGroup, OtpSlot, OtpSeparator };
export type { OtpFieldProps };
