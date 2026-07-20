import { cva } from "class-variance-authority";

import { tw } from "@/utils/cn";

const variantConfig = {
  common: tw`group/button inline-flex shrink-0 cursor-pointer items-center justify-center rounded-base-full whitespace-nowrap transition-[background-color,box-shadow,translate] duration-[500ms,100ms,100ms] outline-none select-none focus-visible:ring-3 focus-visible:ring-semantic-border-focus focus-visible:ring-offset-2 active:not-aria-[haspopup]:translate-y-base-px disabled:pointer-events-none disabled:bg-semantic-surface-disabled disabled:text-semantic-content-disabled disabled:opacity-50 disabled:shadow-none [&_svg]:pointer-events-none [&_svg]:shrink-0 disabled:[&_svg]:fill-semantic-content-disabled`,
  variants: {
    variant: {
      primary: tw`bg-semantic-surface-brand text-semantic-content-on-brand shadow-xl shadow-semantic-content-brand/50 hover:bg-semantic-surface-brand-hover active:bg-semantic-content-brand-pressed active:shadow-none not-disabled:[&_svg:not([class*='fill-'])]:fill-semantic-content-on-brand`,
      secondary: tw`bg-semantic-surface-inverse text-semantic-content-on-inverse hover:bg-semantic-surface-inverse-hover active:bg-semantic-surface-inverse-pressed not-disabled:[&_svg:not([class*='fill-'])]:fill-semantic-content-on-inverse`,
      tertiary: tw`bg-semantic-surface-secondary text-semantic-content-primary hover:bg-semantic-surface-secondary-hover active:bg-semantic-surface-secondary-pressed not-disabled:[&_svg:not([class*='fill-'])]:fill-semantic-content-on-secondary`,
      ghost: tw`text-sematitext-semantic-content-primary bg-transparent fill-semantic-content-primary hover:bg-semantic-surface-secondary-hover active:bg-semantic-surface-secondary-pressed`,
      destructive: tw`bg-semantic-surface-danger text-semantic-content-on-danger hover:bg-semantic-surface-danger-hover active:bg-semantic-surface-danger-pressed not-disabled:[&_svg:not([class*='fill-'])]:fill-semantic-content-on-danger`,
      link: tw`text-primary underline-offset-4 hover:underline`,
    },
    size: {
      regular: tw`h-base-120 gap-semantic-inline-loose px-semantic-inset-default typography-label-thick-30 has-data-[slot=leading-icon]:not-has-data-[slot=trailing-icon]:pr-semantic-inset-loose [&_svg:not([class*='size-'])]:size-base-40`,
      small: tw`h-base-90 gap-semantic-inline-default px-semantic-inset-tight typography-label-thick-30 has-data-[slot=leading-icon]:not-has-data-[slot=trailing-icon]:pr-semantic-inset-default [&_svg:not([class*='size-'])]:size-base-30`,
      "extra-small": tw`h-base-60 gap-semantic-inline-tight px-semantic-inset-tighter typography-label-thick-30 has-data-[slot=leading-icon]:not-has-data-[slot=trailing-icon]:pr-semantic-inset-tight [&_svg:not([class*='size-'])]:size-base-30`,
      large: tw`h-base-160 gap-semantic-inline-loose px-semantic-inset-loose typography-label-thick-20 has-data-[slot=leading-icon]:not-has-data-[slot=trailing-icon]:pr-semantic-inset-looser [&_svg:not([class*='size-'])]:size-base-50`,
      "icon-regular": tw`size-base-120 [&_svg:not([class*='size-'])]:size-base-40`,
      "icon-small": tw`size-base-90 [&_svg:not([class*='size-'])]:size-base-40`,
      "icon-extra-small": tw`size-base-60 [&_svg:not([class*='size-'])]:size-base-30`,
      "icon-large": tw`size-base-160 [&_svg:not([class*='size-'])]:size-base-50`,
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "regular",
  },
} as const;

const variants = cva(variantConfig.common, {
  variants: variantConfig.variants,
  defaultVariants: variantConfig.defaultVariants,
});

export { variants as buttonVariants, variantConfig as buttonVariantConfig };
