"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/utils/cn";


const switchVariants = cva(
  [
    "peer group/switch relative inline-flex shrink-0 items-center rounded-full",
    "border border-transparent transition-all outline-none",
    "focus-visible:ring-3 focus-visible:ring-orange-60/50 focus-visible:border-orange-60",
    "data-checked:bg-orange-60 data-unchecked:bg-neutral-20",
    "data-disabled:opacity-40 data-disabled:pointer-events-none",
  ],
  {
    variants: {
      size: {
        xs: "h-70 w-100 p-30 hover:p-[2px]",
        sm: "h-80 w-120 p-30 hover:p-[2px]",
        md: "h-110 w-170 p-[6px] hover:p-[2px]",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

const switchThumbVariants = cva(
  [
    "pointer-events-none block rounded-full bg-white ring-0",
    "shadow-[0px_1px_4px_rgba(23,33,40,0.2)]",
    "transition-all duration-150",
    "data-unchecked:translate-x-0",
  ],
  {
    variants: {
      size: {
        // default size → hover size  |  translate stays the same (padding+thumb change cancel out)
        xs: "size-50 group-hover/switch:size-60 data-checked:translate-x-50",
        sm: "size-60 group-hover/switch:size-70 data-checked:translate-x-60",
        md: "size-80 group-hover/switch:size-100 data-checked:translate-x-110",
      },
    },
    defaultVariants: {
      size: "md",
    },
  }
);

type SwitchSize = NonNullable<VariantProps<typeof switchVariants>["size"]>;

interface SwitchProps
  extends SwitchPrimitive.Root.Props,
    VariantProps<typeof switchVariants> {}

function Switch({ size = "md", className, ...props }: SwitchProps) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(switchVariants({ size }), className)}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={switchThumbVariants({ size })}
      />
    </SwitchPrimitive.Root>
  );
}

Switch.displayName = "Switch";

export { Switch, switchVariants };
export type { SwitchProps, SwitchSize };
