import React from "react";
import { type VariantProps, cva } from "class-variance-authority";

import DoneAllIcon from "@material-symbols/svg-700/sharp/done_all-fill.svg?react";
import EmergencyHomeIcon from "@material-symbols/svg-700/sharp/emergency_home-fill.svg?react";
import InfoIcon from "@material-symbols/svg-700/sharp/info_i-fill.svg?react";
import WarningIcon from "@material-symbols/svg-700/sharp/warning-fill.svg?react";

import { cn } from "@/utils/cn";

const hintVariants = cva(
  [
    "flex flex-col gap-40 items-start p-50 rounded-xl max-w-[440px]",
    "[&_svg]:fill-current [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-60",
  ],
  {
    variants: {
      variant: {
        default: "bg-orange-5 text-orange-60",
        warning: "bg-red-5 text-red-70",
        error: "bg-red-5 text-red-70",
        success: "bg-green-5 text-green-70",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

type HintVariant = NonNullable<VariantProps<typeof hintVariants>["variant"]>;


const ICONS: Record<HintVariant, React.FC<React.SVGProps<SVGSVGElement>>> = {
  default: InfoIcon,
  warning: WarningIcon,
  error: EmergencyHomeIcon,
  success: DoneAllIcon,
};

interface HintProps extends React.ComponentProps<"div"> {
  variant?: HintVariant;
  text?: string;
}

const Hint = ({ variant = "default", text, className, children, ...props }: HintProps) => {
  const Icon = ICONS[variant];

  return (
    <div
      data-slot="hint"
      className={cn(hintVariants({ variant }), className)}
      {...props}
    >
      {children ?? <Icon />}
      <p className="typography-para-30">{text}</p>
    </div>
  );
}


export { Hint, hintVariants };
export type { HintProps, HintVariant };
