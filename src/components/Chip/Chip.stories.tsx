import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import StarIcon from "@material-symbols/svg-700/sharp/star-fill.svg?react";

import { Chip } from "./Chip";

const sampleOptions = [
  { value: "option-1", label: "Option 1" },
  { value: "option-2", label: "Option 2" },
  { value: "option-3", label: "Option 3" },
];

const meta: Meta<typeof Chip> = {
  title: "Components/Chip",
  component: Chip,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-60">
        <Story />
      </div>
    ),
  ],
  argTypes: {
    size: { control: "select", options: ["lg", "md", "sm"] },
    variant: { control: "select", options: ["filled", "outlined"] },
    disabled: { control: "boolean" },
    error: { control: "boolean" },
    showLeadingIcon: { control: "boolean" },
    showTrailingIcon: { control: "boolean" },
  },
  args: {
    size: "md",
    variant: "filled",
    placeholder: "Placeholder",
    showLeadingIcon: true,
    showTrailingIcon: true,
    disabled: false,
    error: false,
    options: sampleOptions,
  },
};

export default meta;
type Story = StoryObj<typeof Chip>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Default: Story = {};

// ── Variants ──────────────────────────────────────────────────────────────────

export const Filled: Story = {
  args: { variant: "filled" },
};

export const Outlined: Story = {
  args: { variant: "outlined" },
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Large: Story = {
  args: { size: "lg" },
};

export const Medium: Story = {
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
  args: { error: true },
};

export const WithErrorPopulated: Story = {
  args: { error: true, value: "option-1" },
};

// ── Icon variants ─────────────────────────────────────────────────────────────

export const NoLeadingIcon: Story = {
  args: { showLeadingIcon: false },
};

export const NoTrailingIcon: Story = {
  args: { showTrailingIcon: false },
};

export const CustomLeadingIcon: Story = {
  args: { leadingIcon: <StarIcon className="size-60 fill-neutral-110" /> },
};

// ── Static label (no dropdown) ────────────────────────────────────────────────

export const StaticLabel: Story = {
  args: { label: "Static chip", options: [] },
};

// ── All states grid ───────────────────────────────────────────────────────────

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-[48px] p-60">
      {(["filled", "outlined"] as const).map((variant) => (
        <div key={variant} className="flex flex-col gap-[16px]">
          <p className="typography-label-30 text-neutral-60 uppercase tracking-widest">
            {variant}
          </p>
          {(["lg", "md", "sm"] as const).map((size) => (
            <div key={size} className="flex flex-col gap-[16px]">
              <p className="typography-label-20 text-neutral-40">{size}</p>
              <div className="flex flex-wrap gap-[16px]">
                <Chip size={size} variant={variant} options={sampleOptions} />
                <Chip size={size} variant={variant} options={sampleOptions} value="option-1" />
                <Chip size={size} variant={variant} options={sampleOptions} disabled />
                <Chip
                  size={size}
                  variant={variant}
                  options={sampleOptions}
                  disabled
                  value="option-1"
                />
                <Chip size={size} variant={variant} options={sampleOptions} error />
                <Chip
                  size={size}
                  variant={variant}
                  options={sampleOptions}
                  error
                  value="option-1"
                />
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
  decorators: [(Story) => <Story />],
};
