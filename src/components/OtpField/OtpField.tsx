import * as React from "react";

import { OTPInput, OTPInputContext, type OTPInputProps } from "input-otp";

import { Label } from "@/components/Label";
import { cn } from "@/utils/cn";

type OtpFieldProps = Omit<OTPInputProps, "render"> & {
  containerClassName?: string;
  children: React.ReactNode;
  errorMessage?: string;
  onResend?: () => void;
  countdownSeconds?: number;
};

const OtpField: React.FC<OtpFieldProps> = ({
  className,
  containerClassName,
  errorMessage,
  onResend,
  countdownSeconds = 60,
  disabled,
  ...props
}) => {
  const [countdown, setCountdown] = React.useState(0);
  const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

  React.useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const handleResend = () => {
    onResend?.();
    if (timerRef.current) clearInterval(timerRef.current);
    setCountdown(countdownSeconds);
    timerRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          timerRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  return (
    <div className="flex w-[300px] flex-col items-start gap-40">
      <div className="flex w-full items-start gap-50">
        <Label
          className={cn(
            "min-w-0 flex-1 truncate typography-para-30 text-neutral-110",
            disabled && "text-neutral-40",
          )}
        >
          OTP
        </Label>
        {onResend &&
          (countdown > 0 ? (
            <span className="shrink-0 typography-label-30 whitespace-nowrap text-neutral-40">
              Resend in {String(countdown % 60)}s
            </span>
          ) : (
            <button
              type="button"
              onClick={handleResend}
              disabled={disabled}
              className={cn(
                "shrink-0 typography-label-30 whitespace-nowrap text-orange-60",
                disabled && "text-neutral-40",
              )}
            >
              Resend
            </button>
          ))}
      </div>

      <OTPInput
        data-slot="otp-input"
        containerClassName={cn(
          "flex w-full items-center has-disabled:opacity-50",
          containerClassName,
        )}
        className={cn("disabled:cursor-not-allowed", className)}
        spellCheck={false}
        disabled={disabled}
        {...props}
      />

      {errorMessage && (
        <p className="typography-para-30 text-red-70">{errorMessage}</p>
      )}
    </div>
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
