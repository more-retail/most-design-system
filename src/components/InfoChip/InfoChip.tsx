import * as React from "react";

import { type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

import { infoChipVariants } from "./InfoChip.variants";

type InfoChipProps = React.ComponentProps<"span"> &
  VariantProps<typeof infoChipVariants>;

function InfoChip({ className, size = "regular", ...props }: InfoChipProps) {
  return (
    <span
      data-slot="info-chip"
      className={cn(infoChipVariants({ size, className }))}
      {...props}
    />
  );
}

export { InfoChip };
export type { InfoChipProps };
