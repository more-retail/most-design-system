import React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/utils/cn";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "flex h-140 w-[300px] min-w-0 items-center rounded-xl  bg-neutral-10",
        "px-60 py-40 transition-colors outline-none",
        "typography-para-30 text-neutral-110 placeholder:text-neutral-40",
        "hover:bg-neutral-10 hover:ring-1 hover:ring-inset hover:ring-neutral-20",
        "focus-visible:border-neutral-110 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-neutral-110",
        "disabled:pointer-events-none disabled:opacity-40",
        "aria-invalid:border-red-70 aria-invalid:ring-2 aria-invalid:ring-inset aria-invalid:ring-red-20",
        className
      )}
      {...props}
    />
  );
}

export { Input };
