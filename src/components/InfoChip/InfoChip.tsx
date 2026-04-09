import React from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/utils/cn";

import AppsIcon from "@material-symbols/svg-700/sharp/apps-fill.svg?react";

const infoChipVariants = cva(
  "inline-flex items-center typography-para-thick-30 text-neutral-110 [&_svg]:shrink-0 [&_svg]:fill-current",
  {
    variants: {
      variant: {
        filled: "bg-neutral-10",
        outlined: "border border-neutral-10",
      },
      size: {
        md: "h-110 px-50 gap-40 rounded-xl rounded-30 [&_svg:not([class*='size-'])]:size-60",
        sm: "h-80 px-40 gap-30 rounded-lg rounded-20 [&_svg:not([class*='size-'])]:size-50",
      },
    },
    defaultVariants: {
      variant: "filled",
      size: "md",
    },
  },
);

export type InfoChipVariant = NonNullable<
  VariantProps<typeof infoChipVariants>["variant"]
>;
export type InfoChipSize = NonNullable<
  VariantProps<typeof infoChipVariants>["size"]
>;

export interface InfoChipProps extends React.ComponentProps<"div"> {
  variant?: InfoChipVariant;
  size?: InfoChipSize;
  label?: string;
  icon?: React.ReactNode;
}

const InfoChip: React.FC<InfoChipProps> = ({
  className,
  variant,
  size,
  label,
  icon = <AppsIcon />,
  ...props
}) => {
  return (
    <div
      data-slot="info-chip"
      className={cn(infoChipVariants({ variant, size }), className)}
      {...props}
    >
      {icon && (
        <span
          data-slot="info-chip-icon"
          className="flex shrink-0 items-center justify-center"
        >
          {icon}
        </span>
      )}
      {label && (
        <span data-slot="info-chip-label" className="whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
};

export { InfoChip };
