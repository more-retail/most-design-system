import { cva } from "class-variance-authority";

import { tw } from "@/utils/cn";

const variantConfig = {
  common: tw`group/input-field caret-semantic-content-brand selection:bg-semantic-surface-brand selection:text-semantic-content-on-brand **:data-[slot=custom-content]:order-3 **:data-[slot=custom-content]:shrink-0 **:data-[slot=leading-icon]:order-1 **:data-[slot=leading-icon]:flex **:data-[slot=leading-icon]:items-center **:data-[slot=leading-icon]:justify-center **:data-[slot=leading-icon]:rounded-base-20 **:data-[slot=leading-icon]:bg-semantic-surface-primary **:data-[slot=leading-icon]:fill-semantic-content-brand **:data-[slot=trailing-icon]:order-3 **:data-[slot=trailing-icon]:fill-semantic-content-primary data-error:**:data-[slot=trailing-icon]:hidden [&_.error-icon]:order-3 [&_.error-icon]:shrink-0 [&_.error-icon]:fill-semantic-content-danger [&_.input]:order-2 [&_.input]:min-w-0 [&_.input]:flex-1 [&_.input]:border-0 [&_.input]:bg-transparent [&_.input]:p-0 [&_.input]:text-semantic-content-on-tertiary [&_.input]:outline-none [&_.input]:placeholder:text-semantic-content-tertiary [&_.input]:disabled:cursor-not-allowed [&_.input]:disabled:text-semantic-content-disabled [&_.input-field-control]:flex [&_.input-field-control]:cursor-text [&_.input-field-control]:items-center [&_.input-field-control]:rounded-(--spacing-base-30) [&_.input-field-control]:bg-semantic-surface-secondary [&_.input-field-control]:ring-1 [&_.input-field-control]:ring-transparent [&_.input-field-control]:transition-all [&_.input-field-control]:focus-within:ring-2 [&_.input-field-control]:focus-within:ring-semantic-border-focus [&_.input-field-control]:focus-within:ring-inset not-data-error:[&_.input-field-control]:hover:not-focus-within:ring-2 not-data-error:[&_.input-field-control]:hover:not-focus-within:ring-semantic-border-primary not-data-error:[&_.input-field-control]:hover:not-focus-within:ring-inset data-disabled:[&_.input-field-control]:cursor-not-allowed data-disabled:[&_.input-field-control]:bg-semantic-surface-disabled data-error:[&_.input-field-control]:ring-semantic-border-danger data-error:[&_.input-field-control]:hover:not-focus-within:shadow-[0_0_0_3px_var(--color-semantic-border-danger-secondary)] [&_.input-field-control_svg]:pointer-events-none [&_.input-field-control_svg]:shrink-0`,
  variants: {
    size: {
      regular: tw`gap-semantic-stack-default typography-para-30 **:data-[slot=leading-icon]:size-base-80 **:data-[slot=trailing-icon]:size-base-40 [&_.error-icon]:size-base-40 [&_.input-field-control]:h-base-120 [&_.input-field-control]:gap-semantic-inline-loose [&_.input-field-control]:p-semantic-inset-default [&_.input-field-control]:has-data-[slot=leading-icon]:py-semantic-inset-tighter [&_.input-field-control]:has-data-[slot=leading-icon]:pl-semantic-inset-tighter [&_.input-field-control_svg[data-slot=leading-icon]]:p-base-20 [&_.input-field-control:has([data-slot=custom-content]):not(:has([data-slot=trailing-icon]))]:pr-base-30`,
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

export {
  variants as inputFieldVariants,
  variantConfig as inputFieldVariantConfig,
};
