import { cva } from "class-variance-authority";

import { tw } from "@/utils/cn";

const variantConfig = {
  common: tw`group/dropdown-field [&_.dropdown-field-trigger]:flex [&_.dropdown-field-trigger]:w-full [&_.dropdown-field-trigger]:cursor-pointer [&_.dropdown-field-trigger]:items-center [&_.dropdown-field-trigger]:gap-semantic-inline-loose [&_.dropdown-field-trigger]:bg-semantic-surface-secondary [&_.dropdown-field-trigger]:ring-1 [&_.dropdown-field-trigger]:ring-transparent [&_.dropdown-field-trigger]:transition-colors not-data-error:[&_.dropdown-field-trigger]:hover:not-data-[popup-open]:ring-2 not-data-error:[&_.dropdown-field-trigger]:hover:not-data-[popup-open]:ring-semantic-border-primary not-data-error:[&_.dropdown-field-trigger]:hover:not-data-[popup-open]:ring-inset [&_.dropdown-field-trigger]:focus-visible:ring-2 [&_.dropdown-field-trigger]:focus-visible:ring-semantic-border-focus [&_.dropdown-field-trigger]:focus-visible:ring-inset data-disabled:[&_.dropdown-field-trigger]:cursor-not-allowed data-disabled:[&_.dropdown-field-trigger]:bg-semantic-surface-disabled data-error:[&_.dropdown-field-trigger]:ring-semantic-border-danger data-error:[&_.dropdown-field-trigger]:hover:not-data-[popup-open]:shadow-[0_0_0_3px_var(--color-semantic-border-danger-secondary)] [&_.dropdown-field-trigger]:data-[popup-open]:ring-2 [&_.dropdown-field-trigger]:data-[popup-open]:ring-semantic-border-focus [&_.dropdown-field-trigger]:data-[popup-open]:ring-inset [&_.dropdown-field-trigger_svg:not([class*='size-'])]:size-base-40 [&_.dropdown-field-trigger_svg:not([class*='size-'])]:shrink-0 [&_.error-icon]:shrink-0 [&_.error-icon]:fill-semantic-content-danger [&_.trailing-icon]:shrink-0 [&_.trailing-icon]:fill-semantic-content-primary [&_.trailing-icon]:transition-transform [&_.trailing-icon]:data-[popup-open]:rotate-180 [&_.value]:min-w-0 [&_.value]:flex-1 [&_.value]:truncate [&_.value]:text-left [&_.value]:text-semantic-content-on-tertiary data-disabled:[&_.value]:text-semantic-content-tertiary [&_.value]:data-[placeholder]:text-semantic-content-tertiary`,
  variants: {
    size: {
      regular: tw`gap-semantic-stack-default typography-para-30 **:data-[slot=leading-icon]:flex **:data-[slot=leading-icon]:size-base-80 **:data-[slot=leading-icon]:shrink-0 **:data-[slot=leading-icon]:items-center **:data-[slot=leading-icon]:justify-center **:data-[slot=leading-icon]:rounded-base-20 **:data-[slot=leading-icon]:bg-semantic-surface-primary **:data-[slot=leading-icon]:fill-semantic-content-primary [&_.dropdown-field-trigger]:h-base-120 [&_.dropdown-field-trigger]:rounded-base-30 [&_.dropdown-field-trigger]:p-semantic-inset-default`,
      small: tw`gap-semantic-stack-default typography-para-30 **:data-[slot=leading-icon]:flex **:data-[slot=leading-icon]:size-base-40 **:data-[slot=leading-icon]:shrink-0 **:data-[slot=leading-icon]:items-center **:data-[slot=leading-icon]:justify-center **:data-[slot=leading-icon]:fill-semantic-content-primary [&_.dropdown-field-trigger]:h-base-90 [&_.dropdown-field-trigger]:rounded-base-20 [&_.dropdown-field-trigger]:p-semantic-inset-tight`,
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

const popupVariantConfig = {
  common: tw`z-50 flex w-(--anchor-width) flex-col gap-semantic-stack-tight rounded-base-40 border border-semantic-border-secondary bg-semantic-surface-primary p-semantic-inset-tight shadow-lg [&_.dropdown-field-item]:flex [&_.dropdown-field-item]:h-base-120 [&_.dropdown-field-item]:cursor-pointer [&_.dropdown-field-item]:items-center [&_.dropdown-field-item]:gap-semantic-inline-default [&_.dropdown-field-item]:rounded-base-30 [&_.dropdown-field-item]:p-semantic-inset-default [&_.dropdown-field-item]:text-semantic-content-primary [&_.dropdown-field-item]:ring-0 [&_.dropdown-field-item]:outline-none [&_.dropdown-field-item]:data-[highlighted]:ring-2 [&_.dropdown-field-item]:data-[highlighted]:ring-semantic-border-secondary [&_.dropdown-field-item]:data-[highlighted]:ring-inset [&_.dropdown-field-item]:data-[selected]:ring-2 [&_.dropdown-field-item]:data-[selected]:ring-semantic-border-focus [&_.dropdown-field-item]:data-[selected]:ring-inset`,
} as const;

const popupVariants = cva(popupVariantConfig.common);

export {
  variants as dropdownFieldVariants,
  variantConfig as dropdownFieldVariantConfig,
  popupVariants as dropdownFieldPopupVariants,
};
