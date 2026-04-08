import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";

import { cn } from "@/utils/cn";

export interface SeparatorProps extends SeparatorPrimitive.Props {}

const Separator = ({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorProps) => {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      orientation={orientation}
      className={cn(
        "bg-border shrink-0 data-horizontal:h-px data-horizontal:w-full data-vertical:w-px data-vertical:self-stretch",
        className,
      )}
      {...props}
    />
  );
};

export { Separator };
