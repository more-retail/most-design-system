import type { Meta, StoryObj } from "@storybook/react-vite";
import { Snackbar } from "./Snackbar";

const meta: Meta<typeof Snackbar> = {
  title: "Components/Snackbar",
  component: Snackbar,
  tags: ["autodocs"],
  argTypes: {
    variant: { control: "select", options: ["warning", "error"] },
    callout: { control: "text" },
    message: { control: "text" },
    showAction: { control: "boolean" },
    actionLabel: { control: "text" },
  },
  args: { variant: "warning", showAction: true },
};

export default meta;
type Story = StoryObj<typeof Snackbar>;

export const Warning: Story = {
  args: { variant: "warning" },
};

export const Error: Story = {
  args: { variant: "error" },
};

export const NoAction: Story = {
  args: { showAction: false },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-50">
      <Snackbar variant="warning" />
      <Snackbar variant="error" />
    </div>
  ),
};
