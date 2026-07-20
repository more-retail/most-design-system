import { cva } from "class-variance-authority";

import { tw } from "@/utils/cn";

const variantConfig = {
  common: tw`group/dropdown-chip inline-flex cursor-pointer items-center justify-center bg-semantic-surface-secondary ring-2 ring-transparent transition-colors ring-inset not-data-error:not-data-[placeholder]:ring-semantic-border-focus disabled:cursor-not-allowed disabled:opacity-50 data-error:ring-1 data-error:ring-semantic-border-danger data-error:hover:not-data-[popup-open]:shadow-[0_0_0_3px_var(--color-semantic-border-danger-secondary)] not-data-error:data-[placeholder]:hover:not-data-[popup-open]:ring-semantic-border-primary data-[popup-open]:ring-semantic-border-focus [&_.container]:flex [&_.container]:items-center [&_.value]:typography-para-thick-30 [&_.value]:text-semantic-content-on-tertiary disabled:[&_.value]:text-semantic-content-tertiary [&_.value]:data-[placeholder]:text-semantic-content-tertiary`,
  variants: {
    size: {
      regular: tw`h-base-90 gap-semantic-inline-tight rounded-base-30 px-semantic-inset-tight [&_.container]:gap-semantic-inline-default [&_.trailing-icon]:shrink-0 [&_.trailing-icon]:fill-semantic-content-on-tertiary [&_.trailing-icon]:transition-transform [&_.trailing-icon]:data-[popup-open]:rotate-180 [&_[data-slot=leading-icon]]:shrink-0 [&_[data-slot=leading-icon]]:fill-semantic-content-on-tertiary [&_svg:not([class*='size-'])]:size-base-40 [&_svg:not([class*='size-'])]:shrink-0`,
      small: tw`h-base-60 gap-semantic-inline-tight rounded-base-20 px-semantic-inset-tighter [&_.container]:gap-semantic-inline-tight [&_.trailing-icon]:shrink-0 [&_.trailing-icon]:fill-semantic-content-on-tertiary [&_.trailing-icon]:transition-transform [&_.trailing-icon]:data-[popup-open]:rotate-180 [&_.value]:uppercase [&_[data-slot=leading-icon]]:shrink-0 [&_[data-slot=leading-icon]]:fill-semantic-content-on-tertiary [&_svg:not([class*='size-'])]:size-base-30 [&_svg:not([class*='size-'])]:shrink-0`,
      large: tw`h-base-120 gap-semantic-inline-loose rounded-base-40 px-semantic-inset-default [&_.container]:gap-semantic-inline-default [&_.trailing-icon]:shrink-0 [&_.trailing-icon]:fill-semantic-content-on-tertiary [&_.trailing-icon]:transition-transform [&_.trailing-icon]:data-[popup-open]:rotate-180 [&_[data-slot=leading-icon]]:shrink-0 [&_[data-slot=leading-icon]]:fill-semantic-content-on-tertiary [&_svg:not([class*='size-'])]:size-base-40 [&_svg:not([class*='size-'])]:shrink-0`,
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
  common: tw`z-50 flex min-w-[176px] flex-col gap-semantic-stack-tight rounded-base-40 border border-semantic-border-secondary bg-semantic-surface-primary p-semantic-inset-tight shadow-lg [&_.dropdown-chip-item]:flex [&_.dropdown-chip-item]:h-base-120 [&_.dropdown-chip-item]:cursor-pointer [&_.dropdown-chip-item]:items-center [&_.dropdown-chip-item]:rounded-base-30 [&_.dropdown-chip-item]:p-semantic-inset-default [&_.dropdown-chip-item]:typography-para-30 [&_.dropdown-chip-item]:text-semantic-content-on-tertiary [&_.dropdown-chip-item]:outline-none [&_.dropdown-chip-item]:data-[highlighted]:ring-2 [&_.dropdown-chip-item]:data-[highlighted]:ring-semantic-border-secondary [&_.dropdown-chip-item]:data-[highlighted]:ring-inset [&_.dropdown-chip-item]:data-[selected]:ring-2 [&_.dropdown-chip-item]:data-[selected]:ring-semantic-border-focus [&_.dropdown-chip-item]:data-[selected]:ring-inset`,
} as const;

const popupVariants = cva(popupVariantConfig.common);

export {
  variants as dropdownChipVariants,
  variantConfig as dropdownChipVariantConfig,
  popupVariants as dropdownChipPopupVariants,
};
