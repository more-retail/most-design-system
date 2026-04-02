import type { Meta, StoryObj } from "@storybook/react-vite";
import CalendarIcon from "@material-symbols/svg-700/sharp/date_range-fill.svg?react";
import PersonFillIcon from "@material-symbols/svg-700/sharp/person-fill.svg?react";
import SearchIcon from "@material-symbols/svg-700/sharp/search-fill.svg?react";

import { TextField } from "./TextField";

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    showLabel: { control: "boolean" },
    placeholder: { control: "text" },
    error: { control: "boolean" },
    errorMessage: { control: "text" },
    disabled: { control: "boolean" },
    multiline: { control: "boolean" },
    variant: { control: "radio", options: ["default", "ghost"] },
    richControls: { control: "boolean" },
  },
  args: {
    label: "Label",
    showLabel: true,
    placeholder: "Placeholder…",
    error: false,
    disabled: false,
    multiline: false,
    variant: "default",
    richControls: false,
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

// ── Single-line ──────────────────────────────────────────────────────────────

export const Default: Story = {};

export const WithLeadingIcon: Story = {
  args: {
    leadingIcon: <PersonFillIcon className="size-60 text-orange-60" />,
  },
};

export const WithTrailingIcon: Story = {
  args: {
    trailingIcon: <CalendarIcon className="size-60 text-neutral-70" />,
  },
};

export const WithBothIcons: Story = {
  args: {
    leadingIcon: <SearchIcon className="size-60 text-neutral-70" />,
    trailingIcon: <CalendarIcon className="size-60 text-neutral-70" />,
  },
};

export const Error: Story = {
  args: { error: true, defaultValue: "Invalid input" },
};

export const ErrorWithMessage: Story = {
  args: {
    error: true,
    defaultValue: "Invalid input",
    errorMessage: "This field is required.",
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Can't edit this" },
};

// ── Multiline ────────────────────────────────────────────────────────────────

export const Multiline: Story = {
  args: { multiline: true },
};

export const MultilineWithRichControls: Story = {
  args: { multiline: true, richControls: true },
};

export const MultilineError: Story = {
  args: {
    multiline: true,
    error: true,
    defaultValue: "Invalid input",
    errorMessage: "This field is required.",
  },
};

export const MultilineDisabled: Story = {
  args: { multiline: true, disabled: true, defaultValue: "Can't edit this" },
};

// ── Ghost ─────────────────────────────────────────────────────────────────────

export const Ghost: Story = {
  args: { variant: "ghost" },
};

export const GhostWithActions: Story = {
  args: {
    variant: "ghost",
    defaultValue: "Editable inline text",
    onConfirm: () => alert("Confirmed"),
    onCancel: () => alert("Cancelled"),
  },
};
