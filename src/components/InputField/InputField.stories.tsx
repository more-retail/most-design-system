import type { ComponentProps } from "react";

import { InfoChip } from "@/components/InfoChip";
import preview from "@/storybook/preview";

import { InputField, InputFieldInput, InputFieldLabel } from "./InputField";
import { inputFieldVariantConfig } from "./InputField.variants";

import CircleCircleIcon from "@material-symbols/svg-700/sharp/circle_circle-fill.svg?react";
import PersonIcon from "@material-symbols/svg-700/sharp/person-fill.svg?react";

function code(args: ComponentProps<typeof InputField>, children: string) {
  const { size: defaultSize } = inputFieldVariantConfig.defaultVariants;

  const size =
    args.size && args.size !== defaultSize ? ` size="${args.size}"` : "";
  const error = args.error ? ` error="${args.error as string}"` : "";
  const disabled = args.disabled ? ` disabled` : "";

  return `<InputField${size}${error}${disabled}>${children}</InputField>`;
}

const sizeOptions = Object.keys(
  inputFieldVariantConfig.variants.size,
) as (keyof typeof inputFieldVariantConfig.variants.size)[];

const meta = preview.meta({
  component: InputField,
  parameters: {
    docs: {
      description: {
        component:
          "A labeled text input for collecting a single piece of information in a form - a name, an email, a search query. Pair it with a clear, specific label rather than relying on placeholder text alone, since placeholders disappear the moment a user starts typing and shouldn't be the only cue for what belongs in the field. Reach for a leading or trailing icon only when it genuinely helps users recognize the field's purpose faster, and use `error` to explain exactly what's wrong and how to fix it.",
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
      description: "Links the label to the input. Auto-generated when omitted.",
    },
    error: {
      control: "text",
      description:
        "The error message shown below the field. Be specific about what's wrong and how to fix it - omit entirely for a valid field.",
    },
    disabled: {
      control: "boolean",
      description:
        "Dims the field and blocks input, signaling the field isn't available right now.",
    },
    size: {
      control: "select",
      options: sizeOptions,
      description:
        "`regular` is the default for standalone forms; `small` suits dense layouts like inline table editors or filter bars.",
      table: {
        type: {
          summary: Object.keys(inputFieldVariantConfig.variants.size).join(
            " | ",
          ),
        },
      },
    },
  },
});

export const Default = meta.story({
  args: {
    children: (
      <>
        <InputFieldLabel>Label</InputFieldLabel>
        <InputFieldInput placeholder="Placeholder" />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "The baseline field: a visible label above a bordered input. Reach for this whenever a form has room for a label - it's more discoverable and more accessible than relying on a placeholder alone.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof InputField> },
        ) =>
          code(
            args,
            `
  <InputFieldLabel>Label</InputFieldLabel>
  <InputFieldInput placeholder="Placeholder" />
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
        <InputFieldLabel>Label</InputFieldLabel>
        <InputFieldInput placeholder="Placeholder" />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Shows the user exactly what went wrong and, ideally, how to fix it - "Something went wrong" is a placeholder here, but a real message should be specific enough that the user doesn\'t have to guess ("Enter a valid email address" beats "Invalid input"). The danger icon reinforces the red border for users who rely on color alone less.',
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof InputField> },
        ) =>
          code(
            args,
            `
  <InputFieldLabel>Label</InputFieldLabel>
  <InputFieldInput placeholder="Placeholder" />
`,
          ),
      },
    },
  },
});

export const WithIcons = meta.story({
  args: {
    children: (
      <>
        <InputFieldLabel>Label</InputFieldLabel>
        <InputFieldInput placeholder="Placeholder">
          <PersonIcon data-slot="leading-icon" />
          <CircleCircleIcon data-slot="trailing-icon" />
        </InputFieldInput>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Combining a leading and trailing icon on one field should stay rare - each icon adds visual weight, and stacking both risks crowding the input. Use this pattern only when both icons are independently meaningful, not as a default way to make a field feel more polished.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof InputField> },
        ) =>
          code(
            args,
            `
  <InputFieldLabel>Label</InputFieldLabel>
  <InputFieldInput placeholder="Placeholder">
    <PersonIcon data-slot="leading-icon" />
    <ChevronForwardIcon data-slot="trailing-icon" />
  </InputFieldInput>
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
        <InputFieldLabel>Label</InputFieldLabel>
        <InputFieldInput placeholder="Placeholder">
          <PersonIcon data-slot="leading-icon" />
        </InputFieldInput>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'A leading icon works as a scan aid - it should let users recognize a field\'s purpose before they even read the label (a person icon says "this is a name field" faster than text alone). Only reach for one when the icon is unambiguous; a vague or merely decorative icon adds visual weight without adding clarity.',
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof InputField> },
        ) =>
          code(
            args,
            `
  <InputFieldLabel>Label</InputFieldLabel>
  <InputFieldInput placeholder="Placeholder">
    <PersonIcon data-slot="leading-icon" />
  </InputFieldInput>
`,
          ),
      },
    },
  },
});

export const WithTrailingIcon = meta.story({
  tags: ["!dev"],
  args: {
    children: (
      <>
        <InputFieldLabel>Label</InputFieldLabel>
        <InputFieldInput placeholder="Placeholder">
          <CircleCircleIcon data-slot="trailing-icon" />
        </InputFieldInput>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "A trailing icon reads as an affordance for what happens next - expanding a picker, revealing a password, navigating onward. Reserve this placement for icons that signal an action available on the field itself, not decoration; a mismatch between what the icon promises and what actually happens undermines trust in the control.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof InputField> },
        ) =>
          code(
            args,
            `
  <InputFieldLabel>Label</InputFieldLabel>
  <InputFieldInput placeholder="Placeholder">
    <ChevronForwardIcon data-slot="trailing-icon" />
  </InputFieldInput>
`,
          ),
      },
    },
  },
});

export const WithoutLabel = meta.story({
  tags: ["!dev"],
  args: {
    children: <InputFieldInput aria-label="Search" placeholder="Search" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Reserve an unlabeled field for compact, self-evident contexts - a search bar next to a magnifying-glass icon, a filter bar where space is tight. Because there's no visible label, `aria-label` isn't optional here - it's the only accessible name the field has for assistive tech.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof InputField> },
        ) =>
          code(
            args,
            `
  <InputFieldInput aria-label="Search" placeholder="Search" />
`,
          ),
      },
    },
  },
});

export const WithCustomContent = meta.story({
  tags: ["!dev"],
  args: {
    children: (
      <>
        <InputFieldLabel>Label</InputFieldLabel>
        <InputFieldInput placeholder="Placeholder">
          <InfoChip
            data-slot="custom-content"
            size="small"
            className="bg-semantic-surface-raised"
          >
            Label
          </InfoChip>
        </InputFieldInput>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "For trailing content that's more than a plain icon - a unit badge, a character counter, a small inline action. There's no dedicated component for this: pass any content as a child of `InputFieldInput` with `data-slot=\"custom-content\"` to position it correctly. Use it when the content adds information the user needs while they're typing, not as a catch-all for anything that doesn't fit elsewhere.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof InputField> },
        ) =>
          code(
            args,
            `
  <InputFieldLabel>Label</InputFieldLabel>
  <InputFieldInput placeholder="Placeholder">
    <InfoChip data-slot="custom-content">Label</InfoChip>
  </InputFieldInput>
`,
          ),
      },
    },
  },
});
