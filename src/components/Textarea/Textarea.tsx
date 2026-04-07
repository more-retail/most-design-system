import React from "react";

import { cn } from "@/utils/cn";

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex field-sizing-content min-h-[176px] w-full overflow-auto rounded-xl bg-neutral-10",
        "resize-none transition-colors outline-none",
        "typography-para-30 text-neutral-110 placeholder:text-neutral-40",
        "hover:ring-neutral-20",
        "focus-visible:border-neutral-110 focus-visible:ring-1 focus-visible:ring-neutral-110 focus-visible:ring-inset",
        "disabled:pointer-events-none disabled:bg-neutral-20",
        "disabled:text-neutral-60",
        "disabled:placeholder:text-neutral-60",
        "aria-invalid:border-red-70 aria-invalid:ring-2 aria-invalid:ring-red-20 aria-invalid:ring-inset",
        className,
      )}
      {...props}
    />
  );
}

export { Textarea };
