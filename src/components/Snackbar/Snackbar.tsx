import React from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/utils/cn";

const snackbarVariants = cva(
  [
    "flex gap-50 items-end overflow-hidden",
    "p-60 rounded-[16px] w-[328px]",
    "shadow-[0px_16px_32px_0px_rgba(23,33,40,0.12)]",
  ],
  {
    variants: {
      variant: {
        warning: "bg-gold-50 text-neutral-110",
        error: "bg-red-60 text-white",
      },
    },
    defaultVariants: {
      variant: "warning",
    },
  },
);

type SnackbarVariant = NonNullable<
  VariantProps<typeof snackbarVariants>["variant"]
>;

const defaultContent: Record<
  SnackbarVariant,
  { callout: string; message: string; actionLabel: string }
> = {
  warning: {
    callout: "Attention!",
    message: "Lorem ipsum dolor sit amet",
    actionLabel: "Ok",
  },
  error: {
    callout: "Uh oh!",
    message: "Something went wrong",
    actionLabel: "Retry",
  },
};

interface SnackbarProps
  extends React.ComponentProps<"div">,
    VariantProps<typeof snackbarVariants> {
  callout?: string;
  message?: string;
  showAction?: boolean;
  actionLabel?: string;
  onAction?: () => void;
}

const Snackbar: React.FC<SnackbarProps> = ({
  variant = "warning",
  callout,
  message,
  showAction = true,
  actionLabel,
  onAction,
  className,
  ...props
}) => {
  const defaults = defaultContent[variant ?? "warning"];

  return (
    <div
      data-slot="snackbar"
      className={cn(snackbarVariants({ variant }), className)}
      {...props}
    >
      <div className="flex min-w-0 flex-1 flex-col items-start gap-40">
        <p className="w-full typography-para-pop-30 italic">
          {callout ?? defaults.callout}
        </p>
        <p className="w-full typography-para-30">
          {message ?? defaults.message}
        </p>
      </div>

      {showAction && (
        <button
          data-slot="snackbar-action"
          type="button"
          onClick={onAction}
          className="flex shrink-0 cursor-pointer items-center justify-center overflow-hidden"
        >
          <span className="typography-label-30 whitespace-nowrap">
            {actionLabel ?? defaults.actionLabel}
          </span>
        </button>
      )}
    </div>
  );
};

export { Snackbar, snackbarVariants };
export type { SnackbarProps, SnackbarVariant };
