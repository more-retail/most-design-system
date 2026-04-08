import type { Meta, StoryObj } from "@storybook/react-vite";
import AppsIcon from "@material-symbols/svg-700/sharp/apps-fill.svg?react";

import { InfoChip } from "./InfoChip";

const meta: Meta<typeof InfoChip> = {
  title: "Components/InfoChip",
  component: InfoChip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    label: "Label",
    variant: "filled",
    size: "md",
  },
  argTypes: {
    variant: { control: "select", options: ["filled", "outlined"] },
    size: { control: "select", options: ["md", "sm"] },
  },
};

export default meta;
type Story = StoryObj<typeof InfoChip>;


export const FilledMd: Story = {
  args: { variant: "filled", size: "md", icon: <AppsIcon />, label: "Label" },
};

export const FilledSm: Story = {
  args: { variant: "filled", size: "sm", icon: <AppsIcon />, label: "Label" },
};

export const OutlinedMd: Story = {
  args: { variant: "outlined", size: "md", icon: <AppsIcon />, label: "Label" },
};

export const OutlinedSm: Story = {
  args: { variant: "outlined", size: "sm", icon: <AppsIcon />, label: "Label" },
};

export const IconOnly: Story = {
  args: { icon: <AppsIcon /> },
};

export const LabelOnly: Story = {
  args: { label: "Label" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-80 p-60">
      {(["filled", "outlined"] as const).map((variant) => (
        <div key={variant} className="flex flex-col gap-40">
          <p className="typography-label-30 text-neutral-60 uppercase tracking-widest">{variant}</p>
          <div className="flex items-center gap-40 flex-wrap">
            <InfoChip variant={variant} size="md" icon={<AppsIcon />} label="Label" />
            <InfoChip variant={variant} size="sm" icon={<AppsIcon />} label="Label" />
            <InfoChip variant={variant} size="md" label="Label" />
            <InfoChip variant={variant} size="sm" label="Label" />
            <InfoChip variant={variant} size="md" icon={<AppsIcon />} />
            <InfoChip variant={variant} size="sm" icon={<AppsIcon />} />
          </div>
        </div>
      ))}
    </div>
  ),
  decorators: [(Story) => <Story />],
};
