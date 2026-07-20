"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";

import { cn } from "@/utils/cn";

import { checkboxVariants } from "./Checkbox.variants";

import CheckIcon from "@material-symbols/svg-700/sharp/check-fill.svg?react";
import CheckIndeterminateSmallIcon from "@material-symbols/svg-700/sharp/check_indeterminate_small-fill.svg?react";

function Checkbox({
  className,
  indeterminate,
  ...props
}: CheckboxPrimitive.Root.Props) {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      indeterminate={indeterminate}
      className={cn(checkboxVariants({ className }))}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="indicator"
      >
        {indeterminate ? <CheckIndeterminateSmallIcon /> : <CheckIcon />}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
