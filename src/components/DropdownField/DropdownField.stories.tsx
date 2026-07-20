import type { ComponentProps } from "react";

import preview from "@/storybook/preview";

import {
  DropdownField,
  DropdownFieldItem,
  DropdownFieldLabel,
  DropdownFieldTrigger,
} from "./DropdownField";
import { dropdownFieldVariantConfig } from "./DropdownField.variants";

import PersonIcon from "@material-symbols/svg-700/sharp/person-fill.svg?react";

function code(args: ComponentProps<typeof DropdownField>, children: string) {
  const { size: defaultSize } = dropdownFieldVariantConfig.defaultVariants;

  const size =
    args.size && args.size !== defaultSize ? ` size="${args.size}"` : "";
  const error = args.error ? ` error="${args.error as string}"` : "";
  const disabled = args.disabled ? ` disabled` : "";

  return `<DropdownField${size}${error}${disabled}>${children}</DropdownField>`;
}

const sizeOptions = Object.keys(
  dropdownFieldVariantConfig.variants.size,
) as (keyof typeof dropdownFieldVariantConfig.variants.size)[];

const meta = preview.meta({
  component: DropdownField,
  parameters: {
    docs: {
      description: {
        component:
          "A labeled trigger that opens a list of mutually exclusive options - reach for it when a user picks exactly one value from a known, bounded set. Like `InputField`, pair it with a clear label rather than relying on placeholder text alone, and use `error` to explain exactly what's wrong when the selection is invalid.",
      },
    },
    controls: {
      include: ["error", "disabled", "size"],
    },
  },
  args: {
    disabled: false,
    size: "regular",
  },
  argTypes: {
    id: {
      control: false,
      description:
        "Links the label to the trigger. Auto-generated when omitted.",
    },
    error: {
      control: "text",
      description:
        "The error message shown below the field. Be specific about what's wrong and how to fix it - omit entirely for a valid field.",
    },
    disabled: {
      control: "boolean",
      description:
        "Dims the field and blocks interaction, signaling the field isn't available right now.",
    },
    size: {
      control: "select",
      options: sizeOptions,
      table: {
        type: {
          summary: Object.keys(dropdownFieldVariantConfig.variants.size).join(
            " | ",
          ),
        },
      },
    },
  },
});

const items = (
  <>
    <DropdownFieldItem value="option-1">Option 1</DropdownFieldItem>
    <DropdownFieldItem value="option-2">Option 2</DropdownFieldItem>
    <DropdownFieldItem value="option-3">Option 3</DropdownFieldItem>
  </>
);

export const Default = meta.story({
  args: {
    children: (
      <>
        <DropdownFieldLabel>Label</DropdownFieldLabel>
        <DropdownFieldTrigger placeholder="Placeholder">
          {items}
        </DropdownFieldTrigger>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "The baseline field: a visible label above a trigger that opens a list of options. `DropdownFieldItem` takes any `value` and renders its children as the option label.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof DropdownField> },
        ) =>
          code(
            args,
            `
  <DropdownFieldLabel>Label</DropdownFieldLabel>
  <DropdownFieldTrigger placeholder="Placeholder">
    <DropdownFieldItem value="option-1">Option 1</DropdownFieldItem>
    <DropdownFieldItem value="option-2">Option 2</DropdownFieldItem>
    <DropdownFieldItem value="option-3">Option 3</DropdownFieldItem>
  </DropdownFieldTrigger>
`,
          ),
      },
    },
  },
});

export const Error = meta.story({
  args: {
    error: "Something went wrong",
    children: (
      <>
        <DropdownFieldLabel>Label</DropdownFieldLabel>
        <DropdownFieldTrigger placeholder="Placeholder">
          {items}
        </DropdownFieldTrigger>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "A danger icon replaces the caret so users who rely on color alone still get the signal that a selection is required.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof DropdownField> },
        ) =>
          code(
            args,
            `
  <DropdownFieldLabel>Label</DropdownFieldLabel>
  <DropdownFieldTrigger placeholder="Placeholder">
    <DropdownFieldItem value="option-1">Option 1</DropdownFieldItem>
    <DropdownFieldItem value="option-2">Option 2</DropdownFieldItem>
    <DropdownFieldItem value="option-3">Option 3</DropdownFieldItem>
  </DropdownFieldTrigger>
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
      <>
        <DropdownFieldLabel>Label</DropdownFieldLabel>
        <DropdownFieldTrigger
          placeholder="Placeholder"
          leadingIcon={<PersonIcon />}
        >
          {items}
        </DropdownFieldTrigger>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pass `leadingIcon` on `DropdownFieldTrigger` when an icon helps users recognize the field's purpose faster than the label alone. `regular` wraps it in a filled circle; `small` renders it plainly, matching each size's Figma spec.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof DropdownField> },
        ) =>
          code(
            args,
            `
  <DropdownFieldLabel>Label</DropdownFieldLabel>
  <DropdownFieldTrigger placeholder="Placeholder" leadingIcon={<PersonIcon />}>
    <DropdownFieldItem value="option-1">Option 1</DropdownFieldItem>
    <DropdownFieldItem value="option-2">Option 2</DropdownFieldItem>
    <DropdownFieldItem value="option-3">Option 3</DropdownFieldItem>
  </DropdownFieldTrigger>
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
      <>
        <DropdownFieldLabel>Label</DropdownFieldLabel>
        <DropdownFieldTrigger
          placeholder="Placeholder"
          leadingIcon={<PersonIcon />}
        >
          {items}
        </DropdownFieldTrigger>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Reach for `small` in dense layouts like inline table editors or filter bars, where the regular size's height would crowd the surrounding rows.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof DropdownField> },
        ) =>
          code(
            args,
            `
  <DropdownFieldLabel>Label</DropdownFieldLabel>
  <DropdownFieldTrigger placeholder="Placeholder" leadingIcon={<PersonIcon />}>
    <DropdownFieldItem value="option-1">Option 1</DropdownFieldItem>
    <DropdownFieldItem value="option-2">Option 2</DropdownFieldItem>
    <DropdownFieldItem value="option-3">Option 3</DropdownFieldItem>
  </DropdownFieldTrigger>
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
      <>
        <DropdownFieldLabel>Label</DropdownFieldLabel>
        <DropdownFieldTrigger placeholder="Placeholder">
          {items}
        </DropdownFieldTrigger>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pass `value` or `defaultValue` on `DropdownField` to preselect an option, mirroring `@base-ui/react/select`'s controlled/uncontrolled API.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof DropdownField> },
        ) =>
          code(
            args,
            `
  <DropdownFieldLabel>Label</DropdownFieldLabel>
  <DropdownFieldTrigger placeholder="Placeholder">
    <DropdownFieldItem value="option-1">Option 1</DropdownFieldItem>
    <DropdownFieldItem value="option-2">Option 2</DropdownFieldItem>
    <DropdownFieldItem value="option-3">Option 3</DropdownFieldItem>
  </DropdownFieldTrigger>
`,
          ),
      },
    },
  },
});
