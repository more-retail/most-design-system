import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import PersonIcon from "@material-symbols/svg-700/sharp/person-fill.svg?react";

import { Dropdown } from "./Dropdown";

const sampleOptions = [
  { value: "option-1", label: "Option 1" },
  { value: "option-2", label: "Option 2" },
  { value: "option-3", label: "Option 3" },
];

const iconOptions = [
  { value: "option-1", label: "Option 1", icon: <PersonIcon className="size-60" /> },
  { value: "option-2", label: "Option 2", icon: <PersonIcon className="size-60" /> },
  { value: "option-3", label: "Option 3", icon: <PersonIcon className="size-60" /> },
];

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-60 w-[300px]">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: { control: "select", options: ["md", "sm"] },
    disabled: { control: "boolean" },
    showLabel: { control: "boolean" },
    showIcon: { control: "boolean" },
  },
  args: {
    size: "md",
    label: "Label",
    placeholder: "Placeholder",
    showLabel: true,
    showIcon: true,
    disabled: false,
    options: sampleOptions,
  },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Default: Story = {};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Regular: Story = {
  args: { size: "md" },
};

export const Small: Story = {
  args: { size: "sm" },
};

// ── States ────────────────────────────────────────────────────────────────────

export const Populated: Story = {
  args: { value: "option-1" },
};

export const Empty: Story = {
  args: { value: undefined },
};

export const DisabledEmpty: Story = {
  args: { disabled: true },
};

export const DisabledPopulated: Story = {
  args: { disabled: true, value: "option-1" },
};

export const WithError: Story = {
  args: { value: "option-1", error: "A friendly error message" },
};

export const WithErrorEmpty: Story = {
  args: { error: "A friendly error message" },
};

export const NoLabel: Story = {
  args: { showLabel: false },
};

export const WithIcon: Story = {
  args: {
    showIcon: true,
    icon: <PersonIcon className="size-60" />,
    options: iconOptions,
    value: "option-1",
  },
};

// ── All states grid ───────────────────────────────────────────────────────────

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-[48px] p-60">
      {(["md", "sm"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-[16px]">
          <p className="typography-label-30 text-neutral-60 uppercase tracking-widest">
            {size === "md" ? "Regular (md)" : "Small (sm)"}
          </p>
          <div className="flex flex-col gap-[24px] w-[300px]">
            <Dropdown size={size} options={sampleOptions} label="Default (empty)" />
            <Dropdown size={size} options={sampleOptions} label="Populated" value="option-1" />
            <Dropdown size={size} options={sampleOptions} label="Disabled empty" disabled />
            <Dropdown
              size={size}
              options={sampleOptions}
              label="Disabled populated"
              value="option-1"
              disabled
            />
            <Dropdown
              size={size}
              options={sampleOptions}
              label="Error"
              value="option-1"
              error="A friendly error message"
            />
            <Dropdown
              size={size}
              options={iconOptions}
              label="With item icons"
              value="option-1"
            />
          </div>
        </div>
      ))}
    </div>
  ),
  decorators: [(Story) => <Story />],
};
