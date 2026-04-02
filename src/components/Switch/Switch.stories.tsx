import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { Switch } from "./Switch";

const meta: Meta<typeof Switch> = {
  title: "Components/Switch",
  component: Switch,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["xs", "sm", "md"] },
    checked: { control: "boolean" },
    disabled: { control: "boolean" },
  },
  args: {
    size: "md",
    checked: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Default: Story = {};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const ExtraSmall: Story = {
  args: { size: "xs" },
};

export const Small: Story = {
  args: { size: "sm" },
};

export const Regular: Story = {
  args: { size: "md" },
};

// ── States ────────────────────────────────────────────────────────────────────

export const On: Story = {
  args: { checked: true },
};

export const Off: Story = {
  args: { checked: false },
};

export const DisabledOff: Story = {
  args: { disabled: true, checked: false },
};

export const DisabledOn: Story = {
  args: { disabled: true, checked: true },
};

// ── All states grid ───────────────────────────────────────────────────────────

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-[48px] p-60">
      {(["md", "sm", "xs"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-[16px]">
          <p className="typography-label-30 text-neutral-60 uppercase tracking-widest">
            {size === "md" ? "Regular (md)" : size === "sm" ? "Small (sm)" : "Extra Small (xs)"}
          </p>
          <div className="flex items-center gap-[24px]">
            <Switch size={size} checked={false} />
            <Switch size={size} checked={true} />
            <Switch size={size} checked={false} disabled />
            <Switch size={size} checked={true} disabled />
          </div>
        </div>
      ))}
    </div>
  ),
};
