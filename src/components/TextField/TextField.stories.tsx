import type { Meta, StoryObj } from "@storybook/react-vite";

import { TextField } from "./TextField";

import CalendarIcon from "@material-symbols/svg-700/sharp/date_range-fill.svg?react";
import PersonFillIcon from "@material-symbols/svg-700/sharp/person-fill.svg?react";
import SearchIcon from "@material-symbols/svg-700/sharp/search-fill.svg?react";

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    placeholder: { control: "text" },
    errorMessage: { control: "text" },
    disabled: { control: "boolean" },
    variant: { control: "radio", options: ["default", "ghost", "multiline"] },
  },
  args: {
    label: "Label",
    placeholder: "Placeholder…",
    disabled: false,
    variant: "default",
  },
};

export default meta;
type Story = StoryObj<typeof TextField>;

// ── Single-line ──────────────────────────────────────────────────────────────

export const Default: Story = {};

export const WithLeadingIcon: Story = {
  args: {
    leadingIcon: (
      <div className="flex size-100 shrink-0 items-center justify-center rounded-lg bg-white">
        <PersonFillIcon className="size-60 fill-orange-60" />{" "}
      </div>
    ),
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
  args: { defaultValue: "Invalid input" },
};

export const ErrorWithMessage: Story = {
  args: {
    defaultValue: "Invalid input",
    errorMessage: "This field is required.",
  },
};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: "Can't edit this" },
};

export const MultilineWithRichControls: Story = {
  args: { variant: "multiline" },
};

export const MultilineError: Story = {
  args: {
    variant: "multiline",
    defaultValue: "Invalid input",
    errorMessage: "This field is required.",
  },
};

export const MultilineDisabled: Story = {
  args: {
    variant: "multiline",
    disabled: true,
    defaultValue: "Can't edit this",
  },
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
