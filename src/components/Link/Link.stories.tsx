import type { Meta, StoryObj } from "@storybook/react-vite";

import { Link } from "./Link";

const meta: Meta<typeof Link> = {
  title: "Components/Link",
  component: Link,
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
type Story = StoryObj<typeof Link>;


export const Default: Story = {};


export const Disabled: Story = {
  args: { disabled: true },
};


export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-[24px] p-60">
      <div className="flex items-center gap-[24px]">
        <p className="typography-label-30 text-neutral-60 uppercase tracking-widest w-[120px]">Default</p>
        <Link label="Label" />
      </div>
      <div className="flex items-center gap-[24px]">
        <p className="typography-label-30 text-neutral-60 uppercase tracking-widest w-[120px]">Hover</p>
        <p className="typography-label-30 text-neutral-40 italic">hover over the label →</p>
        <Link label="Label" />
      </div>
      <div className="flex items-center gap-[24px]">
        <p className="typography-label-30 text-neutral-60 uppercase tracking-widest w-[120px]">Active</p>
        <p className="typography-label-30 text-neutral-40 italic">click and hold →</p>
        <Link  label="Label" />
      </div>
      <div className="flex items-center gap-[24px]">
        <p className="typography-label-30 text-neutral-60 uppercase tracking-widest w-[120px]">Disabled</p>
        <Link label="Label" disabled />
      </div>
    </div>
  ),
};