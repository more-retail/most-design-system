import type { Meta, StoryObj } from "@storybook/react-vite";

import StarIcon from "@material-symbols/svg-700/sharp/star-fill.svg?react";

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

export const Default: Story = {};

export const Warning: Story = {
  args: { variant: "warning" },
};

export const Error: Story = {
  args: { variant: "error" },
};

export const Success: Story = {
  args: { variant: "success" },
};

export const CustomText: Story = {
  args: {
    variant: "default",
    text: "Your session will expire in 5 minutes.",
  },
};

export const CustomIcon: Story = {
  render: (args) => (
    <Hint {...args}>
      <StarIcon />
    </Hint>
  ),
  args: {
    variant: "default",
    text: "This hint uses a custom icon passed as children.",
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-50">
      <Hint variant="default" text="This is a default message to provide general information to the user."/>
      <Hint variant="warning"  text="Please review this information, there may be something to check." />
      <Hint variant="error" text="Something went wrong. Please try again or fix the highlighted issue." />
      <Hint variant="success" text="Action completed successfully! Everything looks good." />
    </div>
  ),
};
