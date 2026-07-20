import type { ComponentProps } from "react";

import preview from "@/storybook/preview";

import {
  DropdownChip,
  DropdownChipItem,
  DropdownChipTrigger,
} from "./DropdownChip";
import { dropdownChipVariantConfig } from "./DropdownChip.variants";

import AppsIcon from "@material-symbols/svg-700/sharp/apps-fill.svg?react";

function code(args: ComponentProps<typeof DropdownChip>, children: string) {
  const { size: defaultSize } = dropdownChipVariantConfig.defaultVariants;

  const size =
    args.size && args.size !== defaultSize ? ` size="${args.size}"` : "";
  const error = args.error ? ` error` : "";
  const disabled = args.disabled ? ` disabled` : "";

  return `<DropdownChip${size}${error}${disabled}>${children}</DropdownChip>`;
}

const sizeOptions = Object.keys(
  dropdownChipVariantConfig.variants.size,
) as (keyof typeof dropdownChipVariantConfig.variants.size)[];

const meta = preview.meta({
  component: DropdownChip,
  parameters: {
    docs: {
      description: {
        component:
          "A compact, pill-shaped trigger for picking a single value from a list - reach for it in filter bars and toolbars where a full `DropdownField` would take up too much space, since it has no visible label of its own. Pass `placeholder` on `DropdownChipTrigger` to describe what the chip filters when nothing is selected yet.",
      },
    },
    controls: {
      include: ["error", "disabled", "size"],
    },
  },
  args: {
    disabled: false,
    error: false,
    size: "regular",
  },
  argTypes: {
    error: {
      control: "boolean",
      description:
        "Marks the chip as invalid with a danger ring. Unlike `DropdownField`, there's no room for an inline error message - pair it with an error elsewhere in the layout.",
    },
    disabled: {
      control: "boolean",
      description:
        "Dims the chip and blocks interaction, signaling it isn't available right now.",
    },
    size: {
      control: "select",
      options: sizeOptions,
      table: {
        type: {
          summary: Object.keys(dropdownChipVariantConfig.variants.size).join(
            " | ",
          ),
        },
      },
    },
  },
});

const items = (
  <>
    <DropdownChipItem value="option-1">Option 1</DropdownChipItem>
    <DropdownChipItem value="option-2">Option 2</DropdownChipItem>
    <DropdownChipItem value="option-3">Option 3</DropdownChipItem>
  </>
);

export const Default = meta.story({
  args: {
    children: (
      <DropdownChipTrigger placeholder="Placeholder">
        {items}
      </DropdownChipTrigger>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "The baseline chip: a placeholder, a caret, and a list of mutually exclusive options.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof DropdownChip> },
        ) =>
          code(
            args,
            `
  <DropdownChipTrigger placeholder="Placeholder">
    <DropdownChipItem value="option-1">Option 1</DropdownChipItem>
    <DropdownChipItem value="option-2">Option 2</DropdownChipItem>
    <DropdownChipItem value="option-3">Option 3</DropdownChipItem>
  </DropdownChipTrigger>
`,
          ),
      },
    },
  },
});

export const WithLeadingIcon = meta.story({
  tags: ["!dev"],
  args: {
    children: (
      <DropdownChipTrigger placeholder="Placeholder" leadingIcon={<AppsIcon />}>
        {items}
      </DropdownChipTrigger>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pass `leadingIcon` on `DropdownChipTrigger` when an icon helps users recognize the filter's category faster than the label alone.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof DropdownChip> },
        ) =>
          code(
            args,
            `
  <DropdownChipTrigger placeholder="Placeholder" leadingIcon={<AppsIcon />}>
    <DropdownChipItem value="option-1">Option 1</DropdownChipItem>
    <DropdownChipItem value="option-2">Option 2</DropdownChipItem>
    <DropdownChipItem value="option-3">Option 3</DropdownChipItem>
  </DropdownChipTrigger>
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
    children: (
      <DropdownChipTrigger placeholder="Placeholder">
        {items}
      </DropdownChipTrigger>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "The label goes uppercase at `small`, matching `InfoChip`'s small size - reach for it in the tightest toolbars.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof DropdownChip> },
        ) =>
          code(
            args,
            `
  <DropdownChipTrigger placeholder="Placeholder">
    <DropdownChipItem value="option-1">Option 1</DropdownChipItem>
    <DropdownChipItem value="option-2">Option 2</DropdownChipItem>
    <DropdownChipItem value="option-3">Option 3</DropdownChipItem>
  </DropdownChipTrigger>
`,
          ),
      },
    },
  },
});

export const Large = meta.story({
  tags: ["!dev"],
  args: {
    size: "large",
    children: (
      <DropdownChipTrigger placeholder="Placeholder">
        {items}
      </DropdownChipTrigger>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Reach for `large` when the chip needs to hold its own next to bigger controls, like a filter row above a data table with large action buttons.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof DropdownChip> },
        ) =>
          code(
            args,
            `
  <DropdownChipTrigger placeholder="Placeholder">
    <DropdownChipItem value="option-1">Option 1</DropdownChipItem>
    <DropdownChipItem value="option-2">Option 2</DropdownChipItem>
    <DropdownChipItem value="option-3">Option 3</DropdownChipItem>
  </DropdownChipTrigger>
`,
          ),
      },
    },
  },
});

export const Populated = meta.story({
  tags: ["!dev"],
  args: {
    defaultValue: "option-1",
    children: (
      <DropdownChipTrigger placeholder="Placeholder">
        {items}
      </DropdownChipTrigger>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Once a value is selected, the chip's border switches to the focus color to stay legible as an active filter even when not focused.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof DropdownChip> },
        ) =>
          code(
            args,
            `
  <DropdownChipTrigger placeholder="Placeholder">
    <DropdownChipItem value="option-1">Option 1</DropdownChipItem>
    <DropdownChipItem value="option-2">Option 2</DropdownChipItem>
    <DropdownChipItem value="option-3">Option 3</DropdownChipItem>
  </DropdownChipTrigger>
`,
          ),
      },
    },
  },
});
