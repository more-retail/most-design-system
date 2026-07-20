import type { ComponentProps } from "react";

import preview from "@/storybook/preview";

import {
  OtpField,
  OtpFieldInputs,
  OtpFieldLabel,
  OtpFieldResendAction,
} from "./OtpField";
import { otpFieldVariantConfig } from "./OtpField.variants";

function code(args: ComponentProps<typeof OtpField>, children: string) {
  const { size: defaultSize } = otpFieldVariantConfig.defaultVariants;

  const size =
    args.size && args.size !== defaultSize ? ` size="${args.size}"` : "";
  const error = args.error ? ` error="${args.error as string}"` : "";
  const disabled = args.disabled ? ` disabled` : "";

  return `<OtpField${size}${error}${disabled}>${children}</OtpField>`;
}

const sizeOptions = Object.keys(
  otpFieldVariantConfig.variants.size,
) as (keyof typeof otpFieldVariantConfig.variants.size)[];

const meta = preview.meta({
  component: OtpField,
  decorators: [
    (Story) => (
      <div className="w-[300px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          "A segmented input for one-time passcodes sent by SMS or email. Each character gets its own box so users can see exactly what they've entered and where the cursor is, which reduces mistakes compared to a single free-text field. Pair it with an `OtpFieldLabel` action for the \"Resend code\" affordance, ideally disabled behind a countdown so users can't spam a resend.",
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
          summary: Object.keys(otpFieldVariantConfig.variants.size).join(" | "),
        },
      },
    },
  },
});

export const Default = meta.story({
  args: {
    children: (
      <>
        <OtpFieldLabel action={<OtpFieldResendAction />}>OTP</OtpFieldLabel>
        <OtpFieldInputs length={4} />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "The baseline field: a label, a resend action, and four segmented digit boxes. `length` controls how many boxes render - match it to the code length your provider sends. `OtpFieldResendAction` disables itself and counts down after each click, re-enabling once the cooldown elapses.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof OtpField> },
        ) =>
          code(
            args,
            `
  <OtpFieldLabel action={<OtpFieldResendAction onClick={handleResend} />}>OTP</OtpFieldLabel>
  <OtpFieldInputs length={4} />
`,
          ),
      },
    },
  },
});

export const Error = meta.story({
  args: {
    error: "A friendly error message",
    children: (
      <>
        <OtpFieldLabel action={<OtpFieldResendAction />}>OTP</OtpFieldLabel>
        <OtpFieldInputs length={4} />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "Every box gets a danger ring so the user doesn't need to hunt for which digit is wrong - the whole code needs re-entering, not a single character.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof OtpField> },
        ) =>
          code(
            args,
            `
  <OtpFieldLabel action={<OtpFieldResendAction onClick={handleResend} />}>OTP</OtpFieldLabel>
  <OtpFieldInputs length={4} />
`,
          ),
      },
    },
  },
});
