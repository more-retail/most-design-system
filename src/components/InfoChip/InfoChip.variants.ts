import { cva } from "class-variance-authority";

import { tw } from "@/utils/cn";

const variantConfig = {
  common: tw`group/info-chip inline-flex w-fit shrink-0 items-center justify-center gap-semantic-inline-default bg-semantic-surface-secondary whitespace-nowrap text-semantic-content-on-secondary [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='fill-'])]:fill-semantic-content-on-secondary [&_svg:not([class*='size-'])]:size-base-40`,
  variants: {
    size: {
      regular: tw`h-base-90 rounded-base-30 px-semantic-inset-tight typography-para-thick-30`,
      small: tw`h-base-60 rounded-base-20 px-semantic-inset-tighter typography-para-thick-30 uppercase`,
      large: tw`h-base-120 rounded-base-40 px-semantic-inset-default typography-para-thick-30`,
    },
  },
  defaultVariants: {
    size: "regular",
  },
} as const;

const variants = cva(variantConfig.common, {
  variants: variantConfig.variants,
  defaultVariants: variantConfig.defaultVariants,
});

export { variants as infoChipVariants, variantConfig as infoChipVariantConfig };
