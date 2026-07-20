import type { ComponentProps } from "react";

import { useArgs } from "storybook/preview-api";
import { fn } from "storybook/test";

import preview from "@/storybook/preview";

import { ToggleChip } from "./ToggleChip";

import PersonIcon from "@material-symbols/svg-700/sharp/person-fill.svg?react";

const ToggleChipStoryComponent = (props: ComponentProps<typeof ToggleChip>) => {
  const [, updateArgs] = useArgs();

  return (
    <ToggleChip
      {...props}
      onPressedChange={(pressed, eventDetails) => {
        updateArgs({ pressed });
        props.onPressedChange?.(pressed, eventDetails);
      }}
    />
  );
};

function code(args: ComponentProps<typeof ToggleChip>, extra?: string) {
  const pressed = args.pressed ? ` pressed` : "";
  const disabled = args.disabled ? ` disabled` : "";
  const leadingIcon = extra ? ` leadingIcon={${extra}}` : "";
  const onRemove = args.onRemove ? ` onRemove={() => {}}` : "";

  return `<ToggleChip label="${args.label}"${leadingIcon}${pressed}${disabled}${onRemove} onPressedChange={setPressed} />`;
}

const meta = preview.meta({
  component: ToggleChip,
  render: ToggleChipStoryComponent,
  parameters: {
    docs: {
      description: {
        component:
          "A pill-shaped control for filtering or selecting from a set - press it to toggle its state on, matching the pattern users expect from filter chips. Pass `onRemove` to add a trailing close icon for removing the chip entirely, independent of its pressed state.",
      },
    },
    controls: {
      include: ["label", "pressed", "disabled", "onPressedChange", "onRemove"],
    },
  },
  args: {
    pressed: false,
    disabled: false,
    onPressedChange: fn(),
  },
  argTypes: {
    label: {
      control: "text",
    },
    pressed: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    onPressedChange: {
      control: false,
      description: "Called when the pressed state changes",
      table: { category: "Events" },
    },
    onRemove: {
      control: false,
      description: "Called when the trailing close icon is clicked",
      table: { category: "Events" },
    },
  },
});

export const Default = meta.story({
  args: {
    label: "Label",
    onRemove: undefined,
  },
  parameters: {
    docs: {
      description: {
        story: "The baseline, unpressed chip.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof ToggleChip> },
        ) => code(args),
      },
    },
  },
});

export const WithLeadingIcon = meta.story({
  tags: ["!dev"],
  args: {
    label: "Label",
    leadingIcon: <PersonIcon />,
    onRemove: undefined,
  },
  parameters: {
    docs: {
      description: {
        story:
          "A leading icon works as a scan aid - it should let users recognize the chip's category before they even read the label. Only reach for one when the icon is unambiguous and reinforces the label.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof ToggleChip> },
        ) => code(args, "<PersonIcon />"),
      },
    },
  },
});

export const Removable = meta.story({
  tags: ["!dev"],
  args: {
    label: "Label",
    onRemove: fn(),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Passing `onRemove` adds a trailing close icon for removing the chip from the set entirely - a separate action from pressing it. The close icon is hidden while the chip is `disabled`.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof ToggleChip> },
        ) => code(args),
      },
    },
  },
});

export const Disabled = meta.story({
  tags: ["!dev"],
  args: {
    label: "Label",
    disabled: true,
    onRemove: undefined,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Dims the chip and blocks interaction, signaling it isn't available right now.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof ToggleChip> },
        ) => code(args),
      },
    },
  },
});
