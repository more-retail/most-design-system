import React from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { Button } from "@/components/Button/Button";
import { Input } from "@/components/Input/Input";
import { Textarea } from "@/components/Textarea/Textarea";
import { cn } from "@/utils/cn";

const InputGroup: React.FC<React.ComponentProps<"div">> = ({
  className,
  ...props
}) => {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(
        "group/input-group relative flex h-140 w-[300px] min-w-0 items-center rounded-xl bg-neutral-10 transition-colors outline-none",
        "border-2 border-transparent",
        "hover:border-neutral-20 hover:bg-neutral-10",
        "has-disabled:bg-neutral-20",
        "has-[:disabled]:[&>input]:text-neutral-60",
        "has-[:disabled]:[&>input::placeholder]:text-neutral-60",
        "has-[[data-slot=input-group-control]:focus-visible]:border-neutral-110",
        "has-[[data-slot][aria-invalid=true]]:[border-width:1px] has-[[data-slot][aria-invalid=true]]:border-red-70 has-[[data-slot][aria-invalid=true]]:hover:shadow-[0_0_0_2px_var(--color-red-20)]",
        "has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col",
        "has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col",
        "has-[>textarea]:h-auto",
        "has-[>[data-align=inline-start]]:[&>input]:pl-50",
        "has-[>[data-align=inline-end]]:[&>input]:pr-50",
        className,
      )}
      {...props}
    />
  );
};

const inputGroupAddonVariants = cva(
  "flex h-auto cursor-text items-center justify-center gap-50 py-40 typography-para-30 text-neutral-40 select-none group-data-[disabled=true]/input-group:opacity-40 [&>svg:not([class*='size-'])]:size-60",
  {
    variants: {
      align: {
        "inline-start": "order-first pl-40 has-[>button]:-ml-30",
        "inline-end": "order-last pr-60 has-[>button]:-mr-30",
        "block-start": "order-first w-full justify-start px-50 pt-40",
        "block-end": "order-last w-full justify-start px-50 pb-40",
      },
    },
    defaultVariants: {
      align: "inline-start",
    },
  },
);

const InputGroupAddon: React.FC<
  React.ComponentProps<"div"> & VariantProps<typeof inputGroupAddonVariants>
> = ({ className, align = "inline-start", ...props }) => {
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
};

const InputGroupButton: React.FC<
  Omit<React.ComponentProps<typeof Button>, "type"> & {
    type?: "button" | "submit" | "reset";
  }
> = ({
  className,
  type = "button",
  variant = "ghost",
  size = "icon-xs",
  ...props
}) => {
  return (
    <Button
      type={type}
      variant={variant}
      size={size}
      className={cn("rounded-lg shadow-none", className)}
      {...props}
    />
  );
};

const InputGroupText: React.FC<React.ComponentProps<"span">> = ({
  className,
  ...props
}) => {
  return (
    <span
      className={cn(
        "flex items-center gap-50 typography-para-30 text-neutral-40 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-60",
        className,
      )}
      {...props}
    />
  );
};

const InputGroupInput: React.FC<React.ComponentProps<"input">> = ({
  className,
  ...props
}) => {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(
        "h-full flex-1 rounded-none border-0 bg-transparent",
        "hover:border-0 hover:bg-transparent",
        "focus-visible:border-0",
        "disabled:bg-transparent",
        "aria-invalid:border-0 aria-invalid:hover:shadow-none",
        className,
      )}
      {...props}
    />
  );
};

const InputGroupTextarea: React.FC<React.ComponentProps<"textarea">> = ({
  className,
  ...props
}) => {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(
        "min-h-0 flex-1 resize-none rounded-none border-0 bg-transparent",
        "hover:border-0 hover:bg-transparent",
        "focus-visible:border-0",
        "disabled:bg-transparent",
        "aria-invalid:border-0 aria-invalid:hover:shadow-none",
        className,
      )}
      {...props}
    />
  );
};

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
};
