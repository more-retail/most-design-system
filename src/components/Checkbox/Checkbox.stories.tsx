import type { ComponentProps } from "react";

import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";

import preview from "@/storybook/preview";

import { Checkbox } from "./Checkbox";

const CheckboxStoryComponent = (props: ComponentProps<typeof Checkbox>) => {
  const [, updateArgs] = useArgs();

  return (
    <Checkbox
      {...props}
      onCheckedChange={(checked, eventDetails) => {
        updateArgs({ checked });
        props.onCheckedChange?.(checked, eventDetails);
      }}
    />
  );
};

function code(args: ComponentProps<typeof Checkbox>) {
  const checked = args.checked ? ` checked` : "";
  const indeterminate = args.indeterminate ? ` indeterminate` : "";
  const disabled = args.disabled ? ` disabled` : "";

  return `<Checkbox${checked}${indeterminate}${disabled} />`;
}

const meta = preview.meta({
  component: Checkbox,
  render: CheckboxStoryComponent,
  parameters: {
    docs: {
      description: {
        component:
          "A control for a binary choice - selected or not - meant for forms that are reviewed and submitted as a whole, unlike Switch which applies immediately. Supports an indeterminate state for representing a group where only some of its children are checked.",
      },
    },
    controls: {
      include: ["checked", "indeterminate", "disabled", "onCheckedChange"],
    },
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
    onCheckedChange: fn(),
  },
  argTypes: {
    checked: {
      control: "boolean",
    },
    indeterminate: {
      control: "boolean",
      description:
        "Whether the checkbox is in a mixed state - neither ticked nor unticked. Purely visual and independent from `checked`.",
    },
    disabled: {
      control: "boolean",
    },
    onCheckedChange: {
      control: false,
      description: "Called when the checkbox is ticked or unticked",
      table: { category: "Events" },
    },
  },
});

export const Unchecked = meta.story({
  args: {
    checked: false,
  },
  parameters: {
    docs: {
      description: {
        story: "The default, unselected state.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof Checkbox> },
        ) => code(args),
      },
    },
  },
});

export const Checked = meta.story({
  args: {
    checked: true,
  },
  parameters: {
    docs: {
      description: {
        story: "The selected state, set via `checked` or `defaultChecked`.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof Checkbox> },
        ) => code(args),
      },
    },
  },
});

export const Indeterminate = meta.story({
  args: {
    indeterminate: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          'Use for a "select all" checkbox when only some, but not all, of the items it controls are checked. It\'s a visual-only state - clicking it still toggles the underlying `checked` value like normal.',
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof Checkbox> },
        ) => code(args),
      },
    },
  },
});
