import * as React from "react";

import { cn } from "@/utils/cn";

export type LabelProps = React.ComponentProps<"label">;

const Label: React.FC<LabelProps> = ({ className, ...props }) => {
  return (
    <label
      data-slot="label"
      className={cn(
        "gap-2 flex items-center typography-para-30 select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
};

export { Label };
