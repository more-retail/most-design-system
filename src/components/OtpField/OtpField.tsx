import React from "react";

import { cn  } from "@/utils/cn";

/* -------------------------------------------------------------------------------------------------
 * OtpField
 * -----------------------------------------------------------------------------------------------*/

interface OtpFieldProps  {
  /** Number of OTP digit cells */
  length?: number;
  /** Controlled value – string of digits, e.g. "1234" */
  value?: string;
  /** Called with the full OTP string whenever a digit changes */
  onChange?: (value: string) => void;
  label?: string;
  showLabel?: boolean;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
  /**
   * Seconds remaining before the user can resend the OTP.
   * Pass `0` (or omit) to show the active "Resend" link instead.
   */
  resendCountdown?: number;
  onResend?: () => void;
  className?: string;
}

// ── Component ────────────────────────────────────────────────────────────────

function OtpField({
  length = 4,
  value = "",
  onChange,
  label = "OTP",
  showLabel = true,
  disabled = false,
  error = false,
  errorMessage,
  resendCountdown = 0,
  onResend,
  className,
}: OtpFieldProps) {
  const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>(
    Array(length).fill(null),
  );

  const digits = Array.from({ length }, (_, i) => value[i] ?? "");

  function focus(index: number) {
    inputRefs.current[index]?.focus();
  }

  function update(nextDigits: string[]) {
    onChange?.(nextDigits.join(""));
  }

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    const raw = e.target.value.replace(/\D/g, "");
    if (!raw) return;

    const next = [...digits];

    if (raw.length > 1) {
      // Handle paste via onChange (some browsers)
      let i = index;
      for (const ch of raw) {
        if (i >= length) break;
        next[i++] = ch;
      }
      update(next);
      focus(Math.min(index + raw.length, length - 1));
      return;
    }

    next[index] = raw;
    update(next);
    if (index < length - 1) focus(index + 1);
  }

  function handleKeyDown(
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    if (e.key === "Backspace") {
      e.preventDefault();
      if (digits[index]) {
        const next = [...digits];
        next[index] = "";
        update(next);
      } else if (index > 0) {
        const next = [...digits];
        next[index - 1] = "";
        update(next);
        focus(index - 1);
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      focus(index - 1);
    } else if (e.key === "ArrowRight" && index < length - 1) {
      focus(index + 1);
    }
  }

  function handlePaste(
    e: React.ClipboardEvent<HTMLInputElement>,
    index: number,
  ) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");
    if (!pasted) return;

    const next = [...digits];
    let i = index;
    for (const ch of pasted) {
      if (i >= length) break;
      next[i++] = ch;
    }
    update(next);
    focus(Math.min(index + pasted.length, length - 1));
  }

  // ── Cell styles ────────────────────────────────────────────────────────────

  function cellClass(index: number) {
    const isActive = focusedIndex === index;
    return cn(
      "flex-1 h-140 p-60 rounded-xl min-w-0",
      "typography-para-30 text-neutral-110 text-center",
      "outline-none transition-colors",
      "bg-neutral-10",
      !disabled && !error && isActive && "border-2 border-neutral-110",
      error && "border border-red-70",
      disabled && "bg-neutral-20 pointer-events-none",
    );
  }

  // ── Render ─────────────────────────────────────────────────────────────────

  return (
    <div className={cn("flex flex-col gap-40 items-start w-[300px]", className)}>

      {/* Label row */}
      {showLabel && (
        <div className="flex gap-50 items-center w-full">
          <span
            className={cn(
              "typography-para-30 flex-1 truncate",
              disabled ? "text-neutral-60" : "text-neutral-110",
            )}
          >
            {label}
          </span>

          {resendCountdown > 0 ? (
            <span className="typography-label-30 text-neutral-40 whitespace-nowrap">
              Resend in {resendCountdown}s
            </span>
          ) : (
            <button
              type="button"
              onClick={onResend}
              disabled={disabled}
              className="typography-label-30 text-orange-60 disabled:text-neutral-40 whitespace-nowrap"
            >
              Resend
            </button>
          )}
        </div>
      )}

      {/* Digit cells */}
      <div className="flex gap-30 w-full">
        {digits.map((digit, index) => (
          <input
            key={index}
            ref={(el) => {
              inputRefs.current[index] = el;
            }}
            type="text"
            inputMode="numeric"
            pattern="\d*"
            maxLength={length > 1 ? 1 : length}
            value={digit}
            disabled={disabled}
            onChange={(e) => handleChange(e, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={(e) => handlePaste(e, index)}
            onFocus={() => setFocusedIndex(index)}
            onBlur={() => setFocusedIndex(null)}
            className={cellClass(index)}
          />
        ))}
      </div>

      {/* Error message */}
      {error && errorMessage && (
        <p className="typography-para-30 text-red-70">{errorMessage}</p>
      )}
    </div>
  );
}

OtpField.displayName = "OtpField";

export { OtpField };
export type { OtpFieldProps };
