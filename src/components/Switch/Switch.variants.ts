import { cva } from "class-variance-authority";

import { tw } from "@/utils/cn";

const variantConfig = {
  common: tw`group/switch relative inline-flex shrink-0 cursor-pointer items-center rounded-base-full align-middle transition-all duration-150 outline-none select-none focus-visible:ring-2 focus-visible:ring-semantic-border-focus focus-visible:ring-offset-2 data-checked:justify-end not-data-disabled:data-checked:bg-semantic-surface-brand not-data-disabled:data-checked:hover:bg-semantic-surface-brand-hover data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:bg-semantic-surface-disabled not-data-disabled:data-unchecked:bg-semantic-surface-raised not-data-disabled:data-unchecked:hover:bg-semantic-surface-raised-hover **:data-[slot=switch-thumb]:pointer-events-none **:data-[slot=switch-thumb]:block **:data-[slot=switch-thumb]:aspect-square **:data-[slot=switch-thumb]:h-full **:data-[slot=switch-thumb]:shrink-0 **:data-[slot=switch-thumb]:rounded-base-full **:data-[slot=switch-thumb]:bg-semantic-surface-primary **:data-[slot=switch-thumb]:transition-[width,height] **:data-[slot=switch-thumb]:duration-150 data-disabled:**:data-[slot=switch-thumb]:bg-semantic-surface-raised-disabled`,
  variants: {
    size: {
      regular: tw`h-base-90 w-base-150 p-1.5 hover:p-0.5`,
      small: tw`h-base-60 w-base-100 p-semantic-inset-tightest hover:p-0.5`,
      "extra-small": tw`h-base-50 w-base-80 p-semantic-inset-tightest hover:p-0.5`,
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

export { variants as switchVariants, variantConfig as switchVariantConfig };
