import React from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/utils/cn";

const buttonVariants = cva(
  [
    "inline-flex items-center justify-center overflow-hidden rounded-full",
    "cursor-pointer transition-colors typography-label-thick-30",
    "disabled:pointer-events-none disabled:text-neutral-40 disabled:cursor-not-allowed",
    "[&_svg]:shrink-0 [&_svg]:fill-current [&_svg:not([class*='size-'])]:size-60",
  ],
  {
    variants: {
      variant: {
        primary: [
          "bg-orange-60 text-white",
          "shadow-[0px_4px_12px_0px_rgba(250,75,22,0.5)]",
          "hover:shadow-[0px_4px_12px_0px_rgba(250,75,22,0.75)]",
          "active:bg-orange-70",
          "disabled:bg-neutral-20 disabled:shadow-none",
        ],
        secondary: [
          "bg-neutral-100 text-white",
          "hover:shadow-[0px_4px_12px_0px_rgba(23,33,40,0.25)]",
          "active:bg-neutral-110",
          "disabled:bg-neutral-20 disabled:shadow-none",
        ],
        tertiary: [
          "bg-neutral-10 text-neutral-110",
          "hover:shadow-[0px_4px_12px_0px_rgba(23,33,40,0.05)]",
          "active:bg-neutral-20",
          "disabled:bg-neutral-20 disabled:shadow-none",
        ],
        ghost: [
          "text-neutral-110",
          "hover:bg-neutral-10",
          "active:bg-neutral-20",
        ],
      },
      size: {
        lg: "h-160 px-80 gap-50",
        md: "h-140 px-60 gap-50",
        sm: "h-110 px-50 gap-40",
        xs: "h-80 px-40 gap-30 [&_svg:not([class*='size-'])]:size-50",
        icon: "size-140",
        "icon-lg": "size-160",
        "icon-sm": "size-110",
        "icon-xs": "size-80 [&_svg:not([class*='size-'])]:size-50",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonVariant = NonNullable<
  VariantProps<typeof buttonVariants>["variant"]
>;
type ButtonSize = NonNullable<VariantProps<typeof buttonVariants>["size"]>;

interface ButtonProps
  extends React.ComponentProps<"button">,
    VariantProps<typeof buttonVariants> {}

function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      data-slot="button"
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}

Button.displayName = "Button";

export { Button, buttonVariants };
export type { ButtonProps, ButtonVariant, ButtonSize };
