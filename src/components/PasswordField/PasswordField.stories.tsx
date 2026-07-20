import type { ComponentProps } from "react";

import preview from "@/storybook/preview";

import {
  PasswordField,
  PasswordFieldForgotAction,
  PasswordFieldInput,
  PasswordFieldLabel,
} from "./PasswordField";
import { passwordFieldVariantConfig } from "./PasswordField.variants";

function code(args: ComponentProps<typeof PasswordField>, children: string) {
  const { size: defaultSize } = passwordFieldVariantConfig.defaultVariants;

  const size =
    args.size && args.size !== defaultSize ? ` size="${args.size}"` : "";
  const error = args.error ? ` error="${args.error as string}"` : "";
  const disabled = args.disabled ? ` disabled` : "";

  return `<PasswordField${size}${error}${disabled}>${children}</PasswordField>`;
}

const sizeOptions = Object.keys(
  passwordFieldVariantConfig.variants.size,
) as (keyof typeof passwordFieldVariantConfig.variants.size)[];

const meta = preview.meta({
  component: PasswordField,
  parameters: {
    docs: {
      description: {
        component:
          "A labeled text input for collecting a password, with a built-in show/hide toggle so users can verify what they typed before submitting. Pair it with a `PasswordFieldForgotAction` as the `PasswordFieldLabel` action, since password fields are almost always the moment a user realizes they don't remember their credentials.",
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
      table: {
        type: {
          summary: Object.keys(passwordFieldVariantConfig.variants.size).join(
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
        <PasswordFieldLabel action={<PasswordFieldForgotAction />}>
          Password
        </PasswordFieldLabel>
        <PasswordFieldInput placeholder="Placeholder" />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "The baseline field: a label, an optional trailing action, and a masked input with a reveal toggle. The toggle switches the input between masked and plain text so users can double-check what they typed.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof PasswordField> },
        ) =>
          code(
            args,
            `
  <PasswordFieldLabel action={<PasswordFieldForgotAction />}>Password</PasswordFieldLabel>
  <PasswordFieldInput placeholder="Placeholder" />
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
        <PasswordFieldLabel action={<PasswordFieldForgotAction />}>
          Password
        </PasswordFieldLabel>
        <PasswordFieldInput placeholder="Placeholder" />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "The reveal toggle is replaced by a danger icon in the error state, so the field never asks the user to both fix an error and manage visibility from the same control.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof PasswordField> },
        ) =>
          code(
            args,
            `
  <PasswordFieldLabel action={<PasswordFieldForgotAction />}>Password</PasswordFieldLabel>
  <PasswordFieldInput placeholder="Placeholder" />
`,
          ),
      },
    },
  },
});

export const WithoutAction = meta.story({
  tags: ["!dev"],
  args: {
    children: (
      <>
        <PasswordFieldLabel>Password</PasswordFieldLabel>
        <PasswordFieldInput placeholder="Placeholder" />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Omit the `action` prop on `PasswordFieldLabel` entirely for password fields that don\'t need a recovery link, like a "create password" step during signup.',
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof PasswordField> },
        ) =>
          code(
            args,
            `
  <PasswordFieldLabel>Password</PasswordFieldLabel>
  <PasswordFieldInput placeholder="Placeholder" />
`,
          ),
      },
    },
  },
});
