import { cva } from "class-variance-authority";

import { tw } from "@/utils/cn";

const variantConfig = {
  common: tw`group/checkbox relative flex size-base-60 shrink-0 cursor-pointer items-center justify-center rounded-base-20 bg-semantic-surface-secondary transition-colors duration-150 outline-none select-none not-data-disabled:hover:bg-semantic-surface-secondary-hover focus-visible:ring-3 focus-visible:ring-semantic-border-focus focus-visible:ring-offset-2 data-disabled:cursor-not-allowed data-disabled:bg-semantic-surface-disabled [&_.indicator]:flex [&_.indicator]:size-base-50 [&_.indicator]:scale-100 [&_.indicator]:items-center [&_.indicator]:justify-center [&_.indicator]:rounded-[6px] [&_.indicator]:bg-semantic-content-brand [&_.indicator]:opacity-100 [&_.indicator]:transition-[opacity,transform] [&_.indicator]:duration-300 [&_.indicator_svg]:size-base-50 [&_.indicator_svg]:fill-semantic-content-on-brand [&_.indicator[data-disabled]]:bg-semantic-content-disabled [&_.indicator[data-ending-style]]:scale-95 [&_.indicator[data-ending-style]]:opacity-0 [&_.indicator[data-starting-style]]:scale-95 [&_.indicator[data-starting-style]]:opacity-0`,
} as const;

const variants = cva(variantConfig.common);

export { variants as checkboxVariants, variantConfig as checkboxVariantConfig };
