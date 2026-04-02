
import { cn  } from "@/utils/cn";

/* -------------------------------------------------------------------------------------------------
 * Snackbar
 * -----------------------------------------------------------------------------------------------*/

type SnackbarVariant = "warning" | "error";

interface SnackbarProps  {
  variant?: SnackbarVariant;
  callout?: string;
  message?: string;
  showAction?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

const variantConfig: Record<
  SnackbarVariant,
  {
    bg: string;
    textColor: string;
    defaultCallout: string;
    defaultMessage: string;
    defaultActionLabel: string;
  }
> = {
  warning: {
    bg: "bg-gold-50",
    textColor: "text-neutral-110",
    defaultCallout: "Attention!",
    defaultMessage: "Lorem ipsum dolor sit amet",
    defaultActionLabel: "Ok",
  },
  error: {
    bg: "bg-red-60",
    textColor: "text-white",
    defaultCallout: "Uh oh!",
    defaultMessage: "Something went wrong",
    defaultActionLabel: "Retry",
  },
};

const Snackbar = ({
  variant = "warning",
  callout,
  message,
  showAction = true,
  actionLabel,
  onAction,
  className,
}: SnackbarProps) => {
  const { bg, textColor, defaultCallout, defaultMessage, defaultActionLabel } =
    variantConfig[variant];

  return (
    <div
      className={cn(
        "flex gap-50 items-end overflow-hidden",
        "p-60 rounded-[16px] w-[328px]",
        "shadow-[0px_16px_32px_0px_rgba(23,33,40,0.12)]",
        bg,
        className
      )}
    >
      <div className="flex flex-1 flex-col gap-40 items-start min-w-0">
        <p className={cn("typography-para-pop-30 italic w-full", textColor)}>
          {callout ?? defaultCallout}
        </p>
        <p className={cn("typography-para-30 w-full", textColor)}>
          {message ?? defaultMessage}
        </p>
      </div>

      {showAction && (
        <button
          type="button"
          onClick={onAction}
          className="shrink-0 flex items-center justify-center overflow-hidden cursor-pointer"
        >
          <span className={cn("typography-label-30 whitespace-nowrap", textColor)}>
            {actionLabel ?? defaultActionLabel}
          </span>
        </button>
      )}
    </div>
  );
}

Snackbar.displayName = "Snackbar";

export { Snackbar };
export type { SnackbarProps, SnackbarVariant };
