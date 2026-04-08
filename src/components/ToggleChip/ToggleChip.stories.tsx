import React, { useState } from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import AppsIcon from "@material-symbols/svg-700/sharp/apps-fill.svg?react";
import CloseIcon from "@material-symbols/svg-700/sharp/close-fill.svg?react";

import { ToggleChip } from "./ToggleChip";

const meta: Meta<typeof ToggleChip> = {
  title: "Components/ToggleChip",
  component: ToggleChip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    label: "Label",
    variant: "filled",
    size: "md",
    icon: <AppsIcon />,
    trailingIcon: <CloseIcon />,
  },
  argTypes: {
    variant: { control: "select", options: ["filled", "outlined"] },
    size: { control: "select", options: ["lg", "md", "sm"] },
    selected: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof ToggleChip>;

export const Default: Story = {
  render: (args) => {
    const [selected, setSelected] = useState(false);
    return (
      <ToggleChip
        {...args}
        selected={selected}
        onClick={() => setSelected((s) => !s)}
      />
    );
  },
};


export const FilledLg: Story = {
  args: { variant: "filled", size: "lg" },
};

export const FilledMd: Story = {
  args: { variant: "filled", size: "md" },
};

export const FilledSm: Story = {
  args: { variant: "filled", size: "sm" },
};

export const OutlinedLg: Story = {
  args: { variant: "outlined", size: "lg" },
};

export const OutlinedMd: Story = {
  args: { variant: "outlined", size: "md" },
};

export const OutlinedSm: Story = {
  args: { variant: "outlined", size: "sm" },
};


export const Selected: Story = {
  args: { selected: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const LabelOnly: Story = {
  args: { icon: undefined, trailingIcon: undefined },
};

export const IconOnly: Story = {
  args: { label: undefined, trailingIcon: undefined },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-80 p-60">
      {(["filled", "outlined"] as const).map((variant) => (
        <div key={variant} className="flex flex-col gap-40">
          <p className="typography-label-30 text-neutral-60 uppercase tracking-widest">{variant}</p>

          {(["lg", "md", "sm"] as const).map((size) => (
            <div key={size} className="flex flex-col gap-20">
              <p className="typography-label-30 text-neutral-40 capitalize">{size}</p>
              <div className="flex items-center gap-40 flex-wrap">
                {/* Default */}
                <ToggleChip
                  variant={variant}
                  size={size}
                  icon={<AppsIcon />}
                  label="Label"
                  trailingIcon={<CloseIcon />}
                />
                {/* Selected */}
                <ToggleChip
                  variant={variant}
                  size={size}
                  icon={<AppsIcon />}
                  label="Label"
                  trailingIcon={<CloseIcon />}
                  selected
                />
                {/* Disabled */}
                <ToggleChip
                  variant={variant}
                  size={size}
                  icon={<AppsIcon />}
                  label="Label"
                  trailingIcon={<CloseIcon />}
                  disabled
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
