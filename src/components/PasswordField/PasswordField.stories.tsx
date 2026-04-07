import type { Meta, StoryObj } from "@storybook/react-vite";

import { PasswordField } from "./PasswordField";

const meta: Meta<typeof PasswordField> = {
  title: "Components/PasswordField",
  component: PasswordField,
  tags: ["autodocs"],
  argTypes: {
    placeholder: { control: "text" },
    errorMessage: { control: "text" },
    disabled: { control: "boolean" },
    onForgotPassword: { action: "forgotPassword" },
  },
  args: {
    placeholder: "Enter password…",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof PasswordField>;

export const Default: Story = {};

export const ErrorWithMessage: Story = {
  args: {
    errorMessage: "Incorrect password. Please try again.",
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};


export const WithForgotPasswordAndError: Story = {
  args: {
    errorMessage: "Incorrect password. Please try again.",
  },
};
