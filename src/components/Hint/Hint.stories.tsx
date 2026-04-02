import type { Meta, StoryObj } from "@storybook/react-vite";

import { Hint } from "./Hint";

const meta: Meta<typeof Hint> = {
  title: "Components/Hint",
  component: Hint,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "warning", "error", "success"],
    },
    text: { control: "text" },
  },
  args: {
    variant: "default",
  },
};

export default meta;
type Story = StoryObj<typeof Hint>;

export const Default: Story = {
  args: { variant: "default" },
};

export const Warning: Story = {
  args: { variant: "warning" },
};

export const Error: Story = {
  args: { variant: "error" },
};

export const Success: Story = {
  args: { variant: "success" },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-50">
      <Hint variant="default" />
      <Hint variant="warning" />
      <Hint variant="error" />
      <Hint variant="success" />
    </div>
  ),
};

export const CustomText: Story = {
  args: {
    variant: "default",
    text: "Your session will expire in 5 minutes.",
  },
};
