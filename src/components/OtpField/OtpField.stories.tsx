import React from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { OtpField, OtpGroup, OtpSlot } from "./OtpField";

type StoryArgs = React.ComponentProps<typeof OtpField> & {
  error?: boolean;
};

const meta: Meta<StoryArgs> = {
  title: "Components/OtpField",
  component: OtpField,
  tags: ["autodocs"],
  argTypes: {
    maxLength: { control: { type: "number", min: 4, max: 8 } },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    errorMessage: { control: "text" },
  },
  args: {
    maxLength: 4,
    disabled: false,
    error: false,
  },
  render: ({ error, maxLength = 4, ...args }) => {
    const [value, setValue] = React.useState("");
    return (
      <OtpField
        {...args}
        maxLength={maxLength}
        value={value}
        onChange={setValue}
        onResend={() => console.log("Resend clicked")}
      >
        <OtpGroup>
          {Array.from({ length: maxLength }).map((_, i) => (
            <OtpSlot key={i} index={i} error={error} />
          ))}
        </OtpGroup>
      </OtpField>
    );
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

export const Default: Story = {};

export const Populated: Story = {
  render: ({ error, maxLength = 4, ...args }) => {
    const [value, setValue] = React.useState("1234");
    return (
      <OtpField
        {...args}
        maxLength={maxLength}
        value={value}
        onChange={setValue}
        onResend={() => console.log("Resend clicked")}
      >
        <OtpGroup>
          {Array.from({ length: maxLength }).map((_, i) => (
            <OtpSlot key={i} index={i} error={error} />
          ))}
        </OtpGroup>
      </OtpField>
    );
  },
};

export const Error: Story = {
  args: { error: true, errorMessage: "A friendly error message" },
  render: ({ error, maxLength = 4, ...args }) => {
    const [value, setValue] = React.useState("1234");
    return (
      <OtpField
        {...args}
        maxLength={maxLength}
        value={value}
        onChange={setValue}
        onResend={() => console.log("Resend clicked")}
      >
        <OtpGroup>
          {Array.from({ length: maxLength }).map((_, i) => (
            <OtpSlot key={i} index={i} error={error} />
          ))}
        </OtpGroup>
      </OtpField>
    );
  },
};

export const Disabled: Story = {
  args: { disabled: true },
  render: ({ error, maxLength = 4, ...args }) => {
    const [value, setValue] = React.useState("1234");
    return (
      <OtpField
        {...args}
        maxLength={maxLength}
        value={value}
        onChange={setValue}
        onResend={() => console.log("Resend clicked")}
      >
        <OtpGroup>
          {Array.from({ length: maxLength }).map((_, i) => (
            <OtpSlot key={i} index={i} error={error} />
          ))}
        </OtpGroup>
      </OtpField>
    );
  },
};

// ── All states grid ───────────────────────────────────────────────────────────

const StaticOtp = ({
  value,
  disabled,
  error,
  errorMessage,
}: {
  value: string;
  disabled?: boolean;
  error?: boolean;
  errorMessage?: string;
}) => (
  <OtpField
    maxLength={4}
    value={value}
    disabled={disabled}
    errorMessage={errorMessage}
    onResend={() => {}}
    onChange={() => {}}
  >
    <OtpGroup>
      {Array.from({ length: 4 }).map((_, i) => (
        <OtpSlot key={i} index={i} error={error} />
      ))}
    </OtpGroup>
  </OtpField>
);

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-[48px] p-60">
      <StaticOtp value="" />
      <StaticOtp value="1234" />
      <StaticOtp value="" disabled />
      <StaticOtp value="1234" disabled />
      <StaticOtp value="1234" error errorMessage="A friendly error message" />
    </div>
  ),
};
