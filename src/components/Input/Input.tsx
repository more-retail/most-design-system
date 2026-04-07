import React from "react";
import { Input as InputPrimitive } from "@base-ui/react/input";

import { cn } from "@/utils/cn";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        "flex h-140 w-[300px] min-w-0 items-center caret-orange-60 rounded-xl bg-neutral-10 appearance-none",
        "border-2 border-transparent px-60 py-40 transition-colors outline-none",
        "typography-para-30 text-neutral-110 placeholder:text-neutral-40",
        "hover:bg-neutral-10 hover:border-neutral-20",
        "focus-visible:border-neutral-110",
        "disabled:pointer-events-none disabled:opacity-40",
        "aria-invalid:border-red-20 aria-invalid:hover:rounded-xl aria-invalid:hover:shadow-[0_0_0_2px_var(--color-red-20)]",
        className
      )}
      {...props}
    />
  );
}

export { Input };
