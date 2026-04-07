import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Textarea } from "@/components/Textarea/Textarea";
import { cn } from "@/utils/cn";


function InputGroup({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group relative flex h-140 w-[300px] min-w-0 items-center rounded-xl border border-neutral-20 bg-neutral-10 transition-colors outline-none",
        "hover:bg-neutral-20",
        "has-disabled:opacity-40",
        "has-[[data-slot=input-group-control]:focus-visible]:border-neutral-110",
        "has-[[data-slot=input-group-control]:focus-visible]:ring-1",
        "has-[[data-slot=input-group-control]:focus-visible]:ring-inset",
        "has-[[data-slot=input-group-control]:focus-visible]:ring-neutral-110",
        "has-[[data-slot][aria-invalid=true]]:border-red-70",
        "has-[[data-slot][aria-invalid=true]]:ring-1",
        "has-[[data-slot][aria-invalid=true]]:ring-inset",
        "has-[[data-slot][aria-invalid=true]]:ring-red-20",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col",
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col",
        "has-[>textarea]:h-auto",
        "has-[>[data-align=inline-start]]:[&>input]:pl-40",
        "has-[>[data-align=inline-end]]:[&>input]:pr-40",
        className
      )}
      {...props}
    />
  );
}

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-50 py-40 typography-para-30 text-neutral-40 select-none group-data-[disabled=true]/input-group:opacity-40 [&>svg:not([class*='size-'])]:size-60",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-40 has-[>button]:-ml-30",
        "inline-end": "order-last pr-40 has-[>button]:-mr-30",
        "block-start": "order-first w-full justify-start px-50 pt-40",
        "block-end": "order-last w-full justify-start px-50 pb-40",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  }
);

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) return;
        e.currentTarget.parentElement
          ?.querySelector<HTMLElement>("input, textarea")
          ?.focus();
      }}
      {...props}
    />
  );
}

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "icon-xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "type"> & {
  type?: "button" | "submit" | "reset";
}) {
  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      className={cn("shadow-none rounded-lg", className)}
      {...props}
    />
  );
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-50 typography-para-30 text-neutral-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-60",
        className
      )}
      {...props}
    />
  );
}


function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "flex-1 h-full rounded-none border-0 bg-transparent",
        "hover:bg-transparent",
        "focus-visible:ring-0 focus-visible:border-0",
        "disabled:bg-transparent",
        "aria-invalid:ring-0 aria-invalid:border-0",
        className
      )}
      {...props}
    />
  );
}


function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "flex-1 min-h-0 resize-none rounded-none border-0 bg-transparent",
        "hover:bg-transparent",
        "focus-visible:ring-0 focus-visible:border-0",
        "disabled:bg-transparent",
        "aria-invalid:ring-0 aria-invalid:border-0",
        className
      )}
      {...props}
    />
  );
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
};
