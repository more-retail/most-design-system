import { cva } from "class-variance-authority";

import { tw } from "@/utils/cn";

const variantConfig = {
  common: tw`group/search-field flex cursor-text items-center rounded-base-full bg-semantic-surface-secondary ring-2 ring-transparent transition-colors ring-inset focus-within:ring-semantic-border-focus hover:not-focus-within:ring-semantic-border-primary data-disabled:cursor-not-allowed data-disabled:bg-semantic-surface-disabled [&_.clear-icon]:flex [&_.clear-icon]:shrink-0 [&_.clear-icon]:cursor-pointer [&_.clear-icon]:items-center [&_.clear-icon]:justify-center [&_.clear-icon]:fill-semantic-content-primary [&_.input]:min-w-0 [&_.input]:flex-1 [&_.input]:border-0 [&_.input]:bg-transparent [&_.input]:p-0 [&_.input]:text-semantic-content-on-tertiary [&_.input]:outline-none [&_.input]:placeholder:text-semantic-content-tertiary [&_.input]:disabled:cursor-not-allowed [&_.input]:disabled:text-semantic-content-tertiary [&_.search-icon]:shrink-0 [&_.search-icon]:fill-semantic-content-primary data-disabled:[&_.search-icon]:fill-semantic-content-tertiary`,
  variants: {
    size: {
      regular: tw`h-base-120 gap-semantic-inline-loose px-semantic-inset-default typography-para-30 [&_.clear-icon]:size-base-40 [&_.clear-icon_svg]:size-base-40 [&_.search-icon]:size-base-40`,
      small: tw`h-base-90 gap-semantic-inline-default px-semantic-inset-tight typography-para-30 [&_.clear-icon]:size-base-30 [&_.clear-icon_svg]:size-base-30 [&_.search-icon]:size-base-40`,
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
  variants as searchFieldVariants,
  variantConfig as searchFieldVariantConfig,
};
