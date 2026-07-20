import { cva } from "class-variance-authority";

import { tw } from "@/utils/cn";

const variantConfig = {
  common: tw`group/tab flex shrink-0 cursor-pointer flex-col items-start overflow-clip border-b-base-30 border-transparent pb-semantic-inset-tighter transition-colors outline-none not-data-active:hover:border-semantic-border-primary focus-visible:ring-3 focus-visible:ring-semantic-border-focus focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-active:border-b-base-20 data-active:border-semantic-border-focus [&_.tab-container]:flex [&_.tab-container]:h-base-120 [&_.tab-container]:w-full [&_.tab-container]:items-center [&_.tab-container]:justify-center [&_.tab-container]:gap-semantic-inline-default [&_.tab-container]:rounded-t-base-30 [&_.tab-container]:rounded-b-base-10 [&_.tab-container]:p-semantic-inset-tight [&_.tab-container]:typography-label-thick-30 [&_.tab-container]:whitespace-nowrap [&_.tab-container]:text-semantic-content-primary data-active:[&_.tab-container]:bg-semantic-surface-secondary data-active:[&_.tab-container]:text-semantic-content-on-tertiary [&_[data-slot=leading-icon]]:size-base-40 [&_[data-slot=leading-icon]]:shrink-0 [&_[data-slot=leading-icon]]:fill-semantic-content-primary [&_[data-slot=shortcut]]:flex [&_[data-slot=shortcut]]:h-base-40 [&_[data-slot=shortcut]]:min-w-base-60 [&_[data-slot=shortcut]]:shrink-0 [&_[data-slot=shortcut]]:items-center [&_[data-slot=shortcut]]:justify-center [&_[data-slot=shortcut]]:rounded-base-20 [&_[data-slot=shortcut]]:border [&_[data-slot=shortcut]]:border-semantic-border-tertiary [&_[data-slot=shortcut]]:px-semantic-inset-tighter [&_[data-slot=shortcut]]:typography-para-thick-30 [&_[data-slot=shortcut]]:text-semantic-content-tertiary`,
} as const;

const variants = cva(variantConfig.common);

export { variants as tabVariants, variantConfig as tabVariantConfig };
