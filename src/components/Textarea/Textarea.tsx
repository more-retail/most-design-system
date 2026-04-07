import React from "react";

import { cn } from "@/utils/cn";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-[176px] w-full rounded-xl border border-neutral-20 bg-neutral-10",
        "px-60 py-50 transition-colors outline-none resize-none",
        "typography-para-30 text-neutral-110 placeholder:text-neutral-40",
        "hover:bg-neutral-20",
        "focus-visible:border-neutral-110 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral-110",
        "disabled:pointer-events-none disabled:opacity-40",
        "aria-invalid:border-red-70 aria-invalid:ring-2 aria-invalid:ring-inset aria-invalid:ring-red-20",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
