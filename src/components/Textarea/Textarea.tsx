import React from "react";

import { cn } from "@/utils/cn";

export type TextareaProps = React.ComponentProps<"textarea">;

const Textarea: React.FC<TextareaProps> = ({ className, ...props }) => {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "flex h-[176px] w-full rounded-xl bg-neutral-10 caret-orange-60",
        "resize-none border-2 border-transparent p-60 transition-colors outline-none",
        "typography-para-30 text-neutral-110 placeholder:text-neutral-40",
        "hover:border-neutral-20",
        "focus-visible:border-neutral-110",
        "disabled:pointer-events-none disabled:bg-neutral-20",
        "disabled:text-neutral-60 disabled:placeholder:text-neutral-60",
        "aria-invalid:border-red-70 aria-invalid:hover:rounded-xl aria-invalid:hover:shadow-[0_0_0_2px_var(--color-red-20)]",
        className,
      )}
      {...props}
    />
  );
};

export { Textarea };
