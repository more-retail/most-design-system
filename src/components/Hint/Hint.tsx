
import React from "react";

import DoneAllIcon from "@material-symbols/svg-700/sharp/done_all-fill.svg?react";
import EmergencyHomeIcon from "@material-symbols/svg-700/sharp/emergency_home-fill.svg?react";
import InfoIcon from "@material-symbols/svg-700/sharp/info_i-fill.svg?react";
import WarningIcon from "@material-symbols/svg-700/sharp/warning-fill.svg?react";

import {cn } from "@/utils/cn";

/* -------------------------------------------------------------------------------------------------
 * Hint
 * -----------------------------------------------------------------------------------------------*/

type HintVariant = "default" | "warning" | "error" | "success";

interface HintProps  {
  variant?: HintVariant;
  text?: string;
  className?: string;
}

const variantConfig: Record<
  HintVariant,
  {
    bg: string;
    textColor: string;
    fillColor: string;
    Icon: React.FC<React.SVGProps<SVGSVGElement>>;
    defaultText: string;
  }
> = {
  default: {
    bg: "bg-orange-5",
    textColor: "text-orange-60",
    fillColor: "fill-orange-60",
    Icon: InfoIcon,
    defaultText:
      "This is a default message to provide general information to the user.",
  },
  warning: {
    bg: "bg-red-5",
    textColor: "text-red-70",
    fillColor: "fill-red-70",
    Icon: WarningIcon,
    defaultText:
      "Please review this information, there may be something to check.",
  },
  error: {
    bg: "bg-red-5",
    textColor: "text-red-70",
    fillColor: "fill-red-70",
    Icon: EmergencyHomeIcon,
    defaultText:
      "Something went wrong. Please try again or fix the highlighted issue.",
  },
  success: {
    bg: "bg-green-5",
    textColor: "text-green-70",
    fillColor: "fill-green-70",
    Icon: DoneAllIcon,
    defaultText: "Action completed successfully! Everything looks good.",
  },
};

const Hint = ({
  variant = "default",
  text,
  className,
}: HintProps) => {
  const { bg, textColor, fillColor, Icon, defaultText } =
    variantConfig[variant];

  return (
    <div
      className={cn(
        "flex flex-col gap-40 items-start p-50 rounded-xl w-[440px] ",
        bg,
        className
      )}
    >
      <Icon className={cn("size-60 shrink-0", fillColor)} />
      <p className={cn("typography-para-30", textColor)}>
        {text ?? defaultText}
      </p>
    </div>
  );
}

Hint.displayName = "Hint";

export { Hint };
export type { HintProps };
