import type { ComponentProps } from "react";

import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";

import preview from "@/storybook/preview";

import { Switch } from "./Switch";
import { switchVariantConfig } from "./Switch.variants";

const sizeOptions = Object.keys(
  switchVariantConfig.variants.size,
) as (keyof typeof switchVariantConfig.variants.size)[];

const SwitchStoryComponent = (props: ComponentProps<typeof Switch>) => {
  const [, updateArgs] = useArgs();

  return (
    <Switch
      {...props}
      onCheckedChange={(checked, eventDetails) => {
        updateArgs({ checked });
        props.onCheckedChange?.(checked, eventDetails);
      }}
    />
  );
};

function code(args: ComponentProps<typeof Switch>) {
  const { size: defaultSize } = switchVariantConfig.defaultVariants;

  const size =
    args.size && args.size !== defaultSize ? ` size="${args.size}"` : "";
  const checked = args.checked ? ` checked` : "";
  const disabled = args.disabled ? ` disabled` : "";

  return `<Switch${size}${checked}${disabled} />`;
}

const meta = preview.meta({
  component: Switch,
  render: SwitchStoryComponent,
  parameters: {
    docs: {
      description: {
        component:
          "A control for toggling a setting on or off that takes effect immediately, without a separate save step. Reach for Switch over Checkbox whenever the change applies right away; use Checkbox when the choice is part of a form reviewed before submitting.",
      },
    },
    controls: {
      include: ["size", "checked", "disabled", "onCheckedChange"],
    },
  },
  args: {
    size: "regular",
    checked: false,
    disabled: false,
    onCheckedChange: fn(),
  },
  argTypes: {
    size: {
      control: "select",
      options: sizeOptions,
    },
    checked: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    onCheckedChange: {
      control: false,
      description: "Called when the switch is activated or deactivated",
      table: { category: "Events" },
    },
  },
});

export const Default = meta.story({
  args: {
    size: "regular",
  },
  parameters: {
    docs: {
      description: {
        story: "The baseline, unchecked switch.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof Switch> },
        ) => code(args),
      },
    },
  },
});
