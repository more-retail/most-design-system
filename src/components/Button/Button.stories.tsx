import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import ChevronRightIcon from "@material-symbols/svg-700/sharp/chevron_right-fill.svg?react";
import PersonIcon from "@material-symbols/svg-700/sharp/person-fill.svg?react";

import { Button } from "./Button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "tertiary", "ghost"],
    },
    size: {
      control: "select",
      options: ["lg", "md", "sm", "xs", "icon", "icon-lg", "icon-sm", "icon-xs"],
    },
    disabled: { control: "boolean" },
  },
  args: {
    children: "Label",
    variant: "primary",
    size: "md",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {};

export const Regular: Story = {
  args: { children: "Label" },
};

export const WithTrailingIcon: Story = {
  render: (args) => (
    <Button {...args}>
      Label
      <ChevronRightIcon />
    </Button>
  ),
};

export const IconOnly: Story = {
  args: {
    children: <PersonIcon />,
    size: "icon",
  },
};

export const Primary: Story = { args: { variant: "primary" } };

export const Secondary: Story = { args: { variant: "secondary" } };

export const Tertiary: Story = { args: { variant: "tertiary" } };

export const Ghost: Story = { args: { variant: "ghost" } };

export const PrimaryDisabled: Story = { args: { disabled: true } };

export const SecondaryDisabled: Story = { args: { variant: "secondary", disabled: true } };

export const TertiaryDisabled: Story = { args: { variant: "tertiary", disabled: true } };

export const GhostDisabled: Story = { args: { variant: "ghost", disabled: true } };

export const AllTypes: Story = {
  render: () => (
    <div className="flex flex-col gap-50 p-60">
      {(["primary", "secondary", "tertiary", "ghost"] as const).map((variant) => (
        <div key={variant} className="flex items-center gap-50 flex-wrap">
          <Button variant={variant}>Label</Button>
          <Button variant={variant}>
            Label
            <ChevronRightIcon />
          </Button>
          <Button variant={variant} size="icon">
            <PersonIcon />
          </Button>
          <Button variant={variant} disabled>
            Label
          </Button>
        </div>
      ))}
    </div>
  ),
};
