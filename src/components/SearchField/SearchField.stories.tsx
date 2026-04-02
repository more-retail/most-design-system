import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";

import { SearchField } from "./SearchField";

const meta: Meta<typeof SearchField> = {
  title: "Components/SearchField",
  component: SearchField,
  tags: ["autodocs"],
  argTypes: {
    size: { control: "select", options: ["md", "sm"] },
    disabled: { control: "boolean" },
    showShortcutKey: { control: "boolean" },
  },
  args: {
    placeholder: "Search",
    value: "",
    size: "md",
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof SearchField>;

// ── Playground ────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = React.useState(args.value ?? "");
    return <SearchField {...args} value={value} onChange={setValue} />;
  },
};

// ── Sizes ─────────────────────────────────────────────────────────────────────

export const Regular: Story = {
  args: { size: "md" },
};

export const Small: Story = {
  args: { size: "sm" },
};

// ── States ────────────────────────────────────────────────────────────────────

export const WithValue: Story = {
  args: { value: "Lorem ipsum" },
};

export const SmallWithValue: Story = {
  args: { size: "sm", value: "Lorem ipsum" },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledWithValue: Story = {
  args: { disabled: true, value: "Lorem ipsum" },
};

export const SmallDisabled: Story = {
  args: { size: "sm", disabled: true },
};

// ── All states grid ───────────────────────────────────────────────────────────

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-[48px] p-60">
      <div className="flex flex-col gap-[16px]">
        <p className="typography-label-30 text-neutral-60 uppercase tracking-widest">Regular (md)</p>
        <SearchField placeholder="Search" value="" />
        <SearchField placeholder="Search" value="Lorem ipsum" />
        <SearchField placeholder="Search" value="" disabled />
        <SearchField placeholder="Search" value="Lorem ipsum" disabled />
      </div>
      <div className="flex flex-col gap-[16px]">
        <p className="typography-label-30 text-neutral-60 uppercase tracking-widest">Small (sm)</p>
        <SearchField size="sm" placeholder="Search" value="" />
        <SearchField size="sm" placeholder="Search" value="Lorem ipsum" />
        <SearchField size="sm" placeholder="Search" value="" disabled />
        <SearchField size="sm" placeholder="Search" value="Lorem ipsum" disabled />
      </div>
    </div>
  ),
};
