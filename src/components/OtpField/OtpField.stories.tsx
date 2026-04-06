import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { OtpField } from "./OtpField";

const meta: Meta<typeof OtpField> = {
  title: "Components/OtpField",
  component: OtpField,
  tags: ["autodocs"],
  argTypes: {
    maxLength: { control: { type: "number", min: 4, max: 8 } },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
  },
  args: {
    maxLength: 4,
    value: "",
    disabled: false,
    error: false,
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

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledPopulated: Story = {
  args: { value: "1234", disabled: true },
};

export const Error: Story = {
  args: { value: "1234", error: true },
};

// ── All states grid ───────────────────────────────────────────────────────────

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-[48px] p-60">
      <OtpField maxLength={4} value="" />
      <OtpField maxLength={4} value="1234" />
      <OtpField maxLength={4} value="" disabled />
      <OtpField maxLength={4} value="1234" disabled />
      <OtpField maxLength={4} value="1234" error />
    </div>
  ),
};
