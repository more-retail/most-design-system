import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Label } from "./Label";

const meta: Meta<typeof Label> = {
  title: "Components/Label",
  component: Label,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Label",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Label>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Default: Story = {};

// ── States ────────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: { disabled: true },
};

// ── All states grid ───────────────────────────────────────────────────────────

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-[24px] p-60">
      <div className="flex items-center gap-[24px]">
        <p className="typography-label-30 text-neutral-60 uppercase tracking-widest w-[120px]">Default</p>
        <Label label="Label" />
      </div>
      <div className="flex items-center gap-[24px]">
        <p className="typography-label-30 text-neutral-60 uppercase tracking-widest w-[120px]">Hover</p>
        <p className="typography-label-30 text-neutral-40 italic">hover over the label →</p>
        <Label label="Label" />
      </div>
      <div className="flex items-center gap-[24px]">
        <p className="typography-label-30 text-neutral-60 uppercase tracking-widest w-[120px]">Active</p>
        <p className="typography-label-30 text-neutral-40 italic">click and hold →</p>
        <Label label="Label" />
      </div>
      <div className="flex items-center gap-[24px]">
        <p className="typography-label-30 text-neutral-60 uppercase tracking-widest w-[120px]">Disabled</p>
        <Label label="Label" disabled />
      </div>
    </div>
  ),
};
