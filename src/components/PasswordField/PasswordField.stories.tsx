import type { Meta, StoryObj } from "@storybook/react-vite";

import { PasswordField } from "./PasswordField";

const meta: Meta<typeof PasswordField> = {
  title: "Components/PasswordField",
  component: PasswordField,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    showLabel: { control: "boolean" },
    placeholder: { control: "text" },
    error: { control: "boolean" },
    errorMessage: { control: "text" },
    disabled: { control: "boolean" },
  },
  args: {
    label: "Password",
    showLabel: true,
    placeholder: "Enter password…",
    error: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof PasswordField>;

export const Default: Story = {};

export const WithValue: Story = {
  args: { defaultValue: "mysecretpassword" },
};

export const Error: Story = {
  args: { error: true, defaultValue: "wrongpass" },
};

export const ErrorWithMessage: Story = {
  args: {
    error: true,
    defaultValue: "wrongpass",
    errorMessage: "Incorrect password. Please try again.",
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "mysecretpassword" },
};
