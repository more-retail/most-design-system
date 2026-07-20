"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

import { switchVariants } from "./Switch.variants";

function Switch({
  className,
  size = "regular",
  ...props
}: SwitchPrimitive.Root.Props & VariantProps<typeof switchVariants>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(switchVariants({ size, className }))}
      {...props}
    >
      <SwitchPrimitive.Thumb data-slot="switch-thumb" />
    </SwitchPrimitive.Root>
  );
}

export { Switch };
