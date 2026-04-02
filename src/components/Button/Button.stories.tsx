import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import ChevronForwardIcon from "@material-symbols/svg-700/sharp/chevron_forward-fill.svg?react";
import ChevronRightIcon from "@material-symbols/svg-700/sharp/chevron_right-fill.svg?react";
import PersonIcon from "@material-symbols/svg-700/sharp/person-fill.svg?react";
import SearchIcon from "@material-symbols/svg-700/sharp/search-fill.svg?react";

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
      options: ["lg", "md", "sm", "xs"],
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

// ── Playground ────────────────────────────────────────────────────────────────

export const Default: Story = {};

// ── Variants ─────────────────────────────────────────────────────────────────

export const Primary: Story = { args: { variant: "primary" } };

export const Secondary: Story = { args: { variant: "secondary" } };

export const Tertiary: Story = { args: { variant: "tertiary" } };

export const Ghost: Story = { args: { variant: "ghost" } };

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Large: Story = { args: { size: "lg" } };

export const Regular: Story = { args: { size: "md" } };

export const Small: Story = { args: { size: "sm" } };

export const ExtraSmall: Story = { args: { size: "xs" } };

// ── With Icons ────────────────────────────────────────────────────────────────

export const WithLeadingIcon: Story = {
  args: {
    leadingIcon: <PersonIcon className="size-60" />,
  },
};

export const WithTrailingIcon: Story = {
  args: {
    trailingIcon: <ChevronForwardIcon className="size-60" />,
  },
};

export const TertiaryWithTrailingIcon: Story = {
  args: {
    variant: "tertiary",
    trailingIcon: <ChevronRightIcon className="size-60" />,
  },
};

// ── Icon Only ─────────────────────────────────────────────────────────────────

export const IconOnly: Story = {
  args: {
    children: undefined,
    leadingIcon: <PersonIcon className="size-60" />,
  },
};

export const IconOnlySecondary: Story = {
  args: {
    variant: "secondary",
    children: undefined,
    leadingIcon: <SearchIcon className="size-60" />,
  },
};

export const IconOnlyXs: Story = {
  args: {
    size: "xs",
    children: undefined,
    leadingIcon: <PersonIcon className="size-50" />,
  },
};

// ── Disabled ──────────────────────────────────────────────────────────────────

export const PrimaryDisabled: Story = {
  args: { disabled: true },
};

export const SecondaryDisabled: Story = {
  args: { variant: "secondary", disabled: true },
};

export const TertiaryDisabled: Story = {
  args: { variant: "tertiary", disabled: true },
};

export const GhostDisabled: Story = {
  args: { variant: "ghost", disabled: true },
};

// ── All Variants × Sizes grid (rendered in a decorator) ──────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-50 p-60">
      {(["primary", "secondary", "tertiary", "ghost"] as const).map((variant) => (
        <div key={variant} className="flex items-center gap-50 flex-wrap">
          {(["lg", "md", "sm", "xs"] as const).map((size) => (
            <Button key={size} variant={variant} size={size}>
              {variant} / {size}
            </Button>
          ))}
        </div>
      ))}
    </div>
  ),
};
