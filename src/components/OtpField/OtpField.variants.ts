import { cva } from "class-variance-authority";

import { tw } from "@/utils/cn";

const variantConfig = {
  common: tw`group/otp-field caret-semantic-content-brand selection:bg-semantic-surface-brand selection:text-semantic-content-on-brand [&_.otp-field-input]:h-base-120 [&_.otp-field-input]:min-w-0 [&_.otp-field-input]:flex-1 [&_.otp-field-input]:rounded-base-30 [&_.otp-field-input]:border-0 [&_.otp-field-input]:bg-semantic-surface-secondary [&_.otp-field-input]:text-center [&_.otp-field-input]:text-semantic-content-on-tertiary [&_.otp-field-input]:ring-1 [&_.otp-field-input]:ring-transparent [&_.otp-field-input]:transition-colors [&_.otp-field-input]:outline-none not-data-error:[&_.otp-field-input]:hover:not-focus:ring-2 not-data-error:[&_.otp-field-input]:hover:not-focus:ring-semantic-border-primary not-data-error:[&_.otp-field-input]:hover:not-focus:ring-inset [&_.otp-field-input]:focus:ring-2 [&_.otp-field-input]:focus:ring-semantic-border-focus [&_.otp-field-input]:focus:ring-inset data-disabled:[&_.otp-field-input]:cursor-not-allowed data-disabled:[&_.otp-field-input]:bg-semantic-surface-disabled data-disabled:[&_.otp-field-input]:text-semantic-content-primary data-error:[&_.otp-field-input]:hover:not-focus:shadow-[0_0_0_3px_var(--color-semantic-border-danger-secondary)] [&_.otp-field-input[aria-invalid=true]]:ring-1 [&_.otp-field-input[aria-invalid=true]]:ring-semantic-border-danger [&_.otp-field-inputs]:flex [&_.otp-field-inputs]:w-full [&_.otp-field-inputs]:gap-semantic-inline-tight`,
  variants: {
    size: {
      regular: tw`gap-semantic-stack-default typography-para-30`,
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

export { variants as otpFieldVariants, variantConfig as otpFieldVariantConfig };
