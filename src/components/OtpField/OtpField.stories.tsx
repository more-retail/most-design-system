import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { OtpField } from "./OtpField";

const meta: Meta<typeof OtpField> = {
  title: "Components/OtpField",
  component: OtpField,
  tags: ["autodocs"],
  argTypes: {
    length: { control: { type: "number", min: 4, max: 8 } },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    showLabel: { control: "boolean" },
    resendCountdown: { control: { type: "number", min: 0, max: 60 } },
  },
  args: {
    label: "OTP",
    showLabel: true,
    length: 4,
    value: "",
    disabled: false,
    error: false,
    resendCountdown: 0,
  },
};

export default meta;
type Story = StoryObj<typeof OtpField>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value ?? "");
    return <OtpField {...args} value={value} onChange={setValue} />;
  },
};

// ── States ────────────────────────────────────────────────────────────────────

export const Populated: Story = {
  args: { value: "1234" },
};

export const WithResendCountdown: Story = {
  args: { resendCountdown: 59 },
};

export const PopulatedWithCountdown: Story = {
  args: { value: "1234", resendCountdown: 59 },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Error: Story = {
  args: {
    value: "1234",
    error: true,
    errorMessage: "A friendly error message",
  },
};

export const ErrorWithCountdown: Story = {
  args: {
    value: "1234",
    error: true,
    errorMessage: "A friendly error message",
    resendCountdown: 59,
  },
};

// ── All states grid ───────────────────────────────────────────────────────────

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-[48px] p-60">
      <OtpField label="OTP" value="" />
      <OtpField label="OTP" value="" resendCountdown={59} />
      <OtpField label="OTP" value="1234" />
      <OtpField label="OTP" value="1234" resendCountdown={59} />
      <OtpField label="OTP" value="" disabled />
      <OtpField
        label="OTP"
        value="1234"
        error
        errorMessage="A friendly error message"
      />
      <OtpField
        label="OTP"
        value="1234"
        error
        errorMessage="A friendly error message"
        resendCountdown={59}
      />
    </div>
  ),
};
