import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";

import CheckIcon from "@material-symbols/svg-700/sharp/check-fill.svg?react";
import CheckIndeterminateSmallIcon from "@material-symbols/svg-700/sharp/check_indeterminate_small-fill.svg?react";

import { cn } from "@/utils/cn";

interface CheckboxProps extends CheckboxPrimitive.Root.Props {
  className?: string;
  checked?: boolean;
  indeterminate?: boolean;
}

const Checkbox = ({ className, checked, indeterminate, ...props }: CheckboxProps) => {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      checked={checked}
      indeterminate={indeterminate}
      className={cn(
        "size-80 rounded-lg flex items-center justify-center shrink-0",
        "cursor-pointer transition-all duration-150 outline-none border-2",
        "bg-neutral-10 hover:bg-neutral-20 border-transparent",
        "data-[checked]:bg-orange-60 data-[checked]:hover:bg-orange-60 data-[checked]:border-neutral-20",
        "data-[indeterminate]:bg-orange-60 data-[indeterminate]:hover:bg-orange-60 data-[indeterminate]:border-neutral-20",
        "disabled:pointer-events-none disabled:opacity-40",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center"
      >
        {indeterminate
          ? <CheckIndeterminateSmallIcon className="size-70 fill-white" />
          : <CheckIcon className="size-70 fill-white" />
        }
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
export type { CheckboxProps };
