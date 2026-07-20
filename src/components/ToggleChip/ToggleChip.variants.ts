import { cva } from "class-variance-authority";

import { tw } from "@/utils/cn";

const variantConfig = {
  common: tw`group/toggle-chip h-base-90 gap-semantic-inline-default rounded-[var(--spacing-base-30)] border-2 border-transparent bg-semantic-surface-secondary px-semantic-inset-tight transition-colors hover:border-semantic-border-primary disabled:border-transparent data-[pressed]:border-semantic-border-focus [&_.label]:truncate [&_.label]:typography-para-thick-30 [&_.label]:text-semantic-content-on-tertiary disabled:[&_.label]:text-semantic-content-disabled [&_.remove-icon]:flex [&_.remove-icon]:size-base-40 [&_.remove-icon]:shrink-0 [&_.remove-icon]:cursor-pointer [&_.remove-icon]:items-center [&_.remove-icon]:justify-center [&_.remove-icon_svg]:size-base-40 [&_.remove-icon_svg]:fill-semantic-content-primary [&_[data-slot=leading-icon]]:flex [&_[data-slot=leading-icon]]:size-base-40 [&_[data-slot=leading-icon]]:shrink-0 [&_[data-slot=leading-icon]]:items-center [&_[data-slot=leading-icon]]:justify-center [&_[data-slot=leading-icon]_svg]:size-base-40 [&_[data-slot=leading-icon]_svg]:fill-semantic-content-primary`,
} as const;

const variants = cva(variantConfig.common);

export {
  variants as toggleChipVariants,
  variantConfig as toggleChipVariantConfig,
};
