"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";

import { cn } from "@/utils/cn";

function Toggle({ className, ...props }: TogglePrimitive.Props) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(
        "inline-flex items-center justify-center outline-none disabled:pointer-events-none disabled:cursor-not-allowed",
        className,
      )}
      {...props}
    />
  );
}

export { Toggle };
