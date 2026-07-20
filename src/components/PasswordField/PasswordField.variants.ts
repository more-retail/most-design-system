import { cva } from "class-variance-authority";

import { tw } from "@/utils/cn";

const variantConfig = {
  common: tw`group/password-field caret-semantic-content-brand selection:bg-semantic-surface-brand selection:text-semantic-content-on-brand **:data-[slot=leading-icon]:order-1 **:data-[slot=leading-icon]:flex **:data-[slot=leading-icon]:size-base-80 **:data-[slot=leading-icon]:items-center **:data-[slot=leading-icon]:justify-center **:data-[slot=leading-icon]:rounded-base-20 **:data-[slot=leading-icon]:bg-semantic-surface-primary **:data-[slot=leading-icon]:fill-semantic-content-brand [&_.error-icon]:order-3 [&_.error-icon]:size-base-40 [&_.error-icon]:shrink-0 [&_.error-icon]:fill-semantic-content-danger [&_.input]:order-2 [&_.input]:min-w-0 [&_.input]:flex-1 [&_.input]:border-0 [&_.input]:bg-transparent [&_.input]:p-0 [&_.input]:text-semantic-content-on-tertiary [&_.input]:outline-none [&_.input]:placeholder:text-semantic-content-tertiary [&_.input]:disabled:cursor-not-allowed [&_.input]:disabled:text-semantic-content-disabled [&_.password-field-control]:flex [&_.password-field-control]:h-base-120 [&_.password-field-control]:cursor-text [&_.password-field-control]:items-center [&_.password-field-control]:gap-semantic-inline-loose [&_.password-field-control]:rounded-base-30 [&_.password-field-control]:bg-semantic-surface-secondary [&_.password-field-control]:py-semantic-inset-tighter [&_.password-field-control]:pr-semantic-inset-default [&_.password-field-control]:pl-semantic-inset-tighter [&_.password-field-control]:ring-1 [&_.password-field-control]:ring-transparent [&_.password-field-control]:transition-colors [&_.password-field-control]:focus-within:ring-2 [&_.password-field-control]:focus-within:ring-semantic-border-focus [&_.password-field-control]:focus-within:ring-inset not-data-error:[&_.password-field-control]:hover:not-focus-within:ring-2 not-data-error:[&_.password-field-control]:hover:not-focus-within:ring-semantic-border-primary not-data-error:[&_.password-field-control]:hover:not-focus-within:ring-inset data-disabled:[&_.password-field-control]:cursor-not-allowed data-disabled:[&_.password-field-control]:bg-semantic-surface-disabled data-error:[&_.password-field-control]:ring-semantic-border-danger data-error:[&_.password-field-control]:hover:not-focus-within:shadow-[0_0_0_3px_var(--color-semantic-border-danger-secondary)] [&_.reveal-toggle]:order-3 [&_.reveal-toggle]:flex [&_.reveal-toggle]:size-base-40 [&_.reveal-toggle]:shrink-0 [&_.reveal-toggle]:cursor-pointer [&_.reveal-toggle]:items-center [&_.reveal-toggle]:justify-center [&_.reveal-toggle]:fill-semantic-content-primary`,
  variants: {
    size: {
      regular: tw`gap-semantic-stack-default typography-para-30 [&_.password-field-control_svg[data-slot=leading-icon]]:p-base-20`,
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
  variants as passwordFieldVariants,
  variantConfig as passwordFieldVariantConfig,
};
