import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    checked: { control: "boolean" },
    indeterminate: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => {
    const [checked, setChecked] = React.useState(args.checked ?? false);
    return <Checkbox {...args} checked={checked} onCheckedChange={setChecked} />;
  },
};

// ── States ────────────────────────────────────────────────────────────────────

export const Unchecked: Story = {
  args: { checked: false },
};

export const Indeterminate: Story = {
  args: { checked: false, indeterminate: true },
};

export const Checked: Story = {
  args: { checked: true },
};

export const DisabledUnchecked: Story = {
  args: { disabled: true, checked: false },
};

export const DisabledIndeterminate: Story = {
  args: { disabled: true, checked: false, indeterminate: true },
};

export const DisabledChecked: Story = {
  args: { disabled: true, checked: true },
};

// ── All states grid ───────────────────────────────────────────────────────────

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-80 p-60">
      <div className="flex items-center gap-80">
        <p className="typography-label-30 text-neutral-60 uppercase tracking-widest w-[120px]">Unchecked</p>
        <Checkbox checked={false} />
      </div>
      <div className="flex items-center gap-80">
        <p className="typography-label-30 text-neutral-60 uppercase tracking-widest w-[120px]">Indeterminate</p>
        <Checkbox indeterminate />
      </div>
      <div className="flex items-center gap-80">
        <p className="typography-label-30 text-neutral-60 uppercase tracking-widest w-[120px]">Checked</p>
        <Checkbox checked={true} />
      </div>
      <div className="flex items-center gap-80">
        <p className="typography-label-30 text-neutral-60 uppercase tracking-widest w-[120px]">Disabled</p>
        <Checkbox checked={false} disabled />
        <Checkbox indeterminate disabled />
        <Checkbox checked={true} disabled />
      </div>
    </div>
  ),
};
