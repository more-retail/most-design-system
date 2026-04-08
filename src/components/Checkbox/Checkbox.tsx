import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";

import { cn } from "@/utils/cn";

import CheckIcon from "@material-symbols/svg-700/sharp/check-fill.svg?react";
import CheckIndeterminateSmallIcon from "@material-symbols/svg-700/sharp/check_indeterminate_small-fill.svg?react";

interface CheckboxProps extends CheckboxPrimitive.Root.Props {
  className?: string;
  checked?: boolean;
  indeterminate?: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({
  className,
  checked,
  indeterminate,
  ...props
}) => {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      checked={checked}
      indeterminate={indeterminate}
      className={cn(
        "flex size-80 shrink-0 items-center justify-center rounded-lg",
        "cursor-pointer border-2 transition-all duration-150 outline-none",
        "border-transparent bg-neutral-10 hover:bg-neutral-20",
        "data-[checked]:border-neutral-20 data-[checked]:bg-orange-60 data-[checked]:hover:bg-orange-60",
        "data-[indeterminate]:border-neutral-20 data-[indeterminate]:bg-orange-60 data-[indeterminate]:hover:bg-orange-60",
        "disabled:pointer-events-none disabled:opacity-40",
        className,
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center"
      >
        {indeterminate ? (
          <CheckIndeterminateSmallIcon className="size-70 fill-white" />
        ) : (
          <CheckIcon className="size-70 fill-white" />
        )}
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
};

export { Checkbox };
export type { CheckboxProps };
