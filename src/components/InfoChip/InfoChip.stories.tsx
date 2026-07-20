import type { ComponentProps } from "react";

import preview from "@/storybook/preview";

import { InfoChip } from "./InfoChip";
import { infoChipVariantConfig } from "./InfoChip.variants";

import PersonIcon from "@material-symbols/svg-700/sharp/person-fill.svg?react";

function code(args: ComponentProps<typeof InfoChip>, children: string) {
  const { size: defaultSize } = infoChipVariantConfig.defaultVariants;

  const size =
    args.size && args.size !== defaultSize ? ` size="${args.size}"` : "";

  return `<InfoChip${size}>${children}</InfoChip>`;
}

const sizeOptions = Object.keys(
  infoChipVariantConfig.variants.size,
) as (keyof typeof infoChipVariantConfig.variants.size)[];

const meta = preview.meta({
  component: InfoChip,
  parameters: {
    docs: {
      description: {
        component:
          'A small, static label for surfacing metadata alongside content - a count, a category, a status - in three sizes for matching visual weight to context. It isn\'t interactive and carries no interaction state; use it to inform, not to filter or select. Supports an optional leading icon via `data-slot="leading-icon"` to reinforce meaning.',
      },
    },
    controls: {
      include: ["size", "children"],
    },
  },
  args: {
    size: "regular",
    children: "Label",
  },
  argTypes: {
    size: {
      control: "select",
      options: sizeOptions,
      table: {
        type: {
          summary: Object.keys(infoChipVariantConfig.variants.size).join(" | "),
        },
      },
    },
    children: {
      control: "text",
    },
  },
});

export const Default = meta.story({
  args: {
    size: "regular",
  },
  parameters: {
    docs: {
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof InfoChip> },
        ) => code(args, args.children as string),
      },
    },
  },
});

export const WithIcon = meta.story({
  tags: ["!dev"],
  args: {
    size: "regular",
    children: (
      <>
        <PersonIcon data-slot="leading-icon" />
        Label
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'A leading icon works as a scan aid - it should let users recognize the chip\'s category before they even read the label (a person icon says "this is about a user" faster than text alone). Only reach for one when the icon is unambiguous and reinforces the label.',
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof InfoChip> },
        ) =>
          code(
            args,
            `
  <PersonIcon data-slot="leading-icon" />
  Label
`,
          ),
      },
    },
  },
});

export const Small = meta.story({
  tags: ["!dev"],
  args: {
    size: "small",
    children: "Label",
  },
  render: (args) => (
    <div className="flex items-center gap-semantic-inline-loose">
      <InfoChip {...args} />
      <InfoChip {...args} className="normal-case" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          'At the `small` size, text renders in uppercase by default - it keeps short labels legible. Override it with `className="normal-case"` only in exceptional cases, such as a proper noun or required visual consistency, since mixing cases across chips undermines the scannability uppercase is meant to provide.',
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: () =>
          `<InfoChip size="small">Label</InfoChip>\n\n// Exceptional override\n<InfoChip size="small" className="normal-case">Label</InfoChip>`,
      },
    },
  },
});
