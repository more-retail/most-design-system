import React from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "./InputGroup";

import CloseIcon from "@material-symbols/svg-700/sharp/close-fill.svg?react";
import CalendarIcon from "@material-symbols/svg-700/sharp/date_range-fill.svg?react";
import PersonIcon from "@material-symbols/svg-700/sharp/person-fill.svg?react";
import SearchIcon from "@material-symbols/svg-700/sharp/search-fill.svg?react";
import SendIcon from "@material-symbols/svg-700/sharp/send-fill.svg?react";

const meta: Meta<typeof InputGroup> = {
  title: "Components/InputGroup",
  component: InputGroup,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

// ── Inline addons ─────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Placeholder…" />
    </InputGroup>
  ),
};

export const WithLeadingIcon: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <SearchIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Search…" />
    </InputGroup>
  ),
};

export const WithTrailingIcon: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Pick a date…" />
      <InputGroupAddon align="inline-end">
        <CalendarIcon />
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithBothIcons: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <PersonIcon />
      </InputGroupAddon>
      <InputGroupInput placeholder="Username…" />
      <InputGroupAddon align="inline-end">
        <CalendarIcon />
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithLeadingText: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupText>https://</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="example.com" />
    </InputGroup>
  ),
};

export const WithTrailingText: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Amount…" />
      <InputGroupAddon align="inline-end">
        <InputGroupText>USD</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithTrailingButton: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Search…" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton>
          <CloseIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

export const WithLeadingAndTrailingButton: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <InputGroupButton>
          <SearchIcon />
        </InputGroupButton>
      </InputGroupAddon>
      <InputGroupInput placeholder="Search…" />
      <InputGroupAddon align="inline-end">
        <InputGroupButton>
          <CloseIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

// ── Block addons ──────────────────────────────────────────────────────────────

export const WithBlockStartAddon: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="block-start">
        <InputGroupText>Label</InputGroupText>
      </InputGroupAddon>
      <InputGroupInput placeholder="Placeholder…" />
    </InputGroup>
  ),
};

export const WithBlockEndAddon: Story = {
  render: () => (
    <InputGroup>
      <InputGroupInput placeholder="Placeholder…" />
      <InputGroupAddon align="block-end">
        <InputGroupButton>
          <SendIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

// ── Textarea ──────────────────────────────────────────────────────────────────

export const WithTextarea: Story = {
  render: () => (
    <InputGroup>
      <InputGroupTextarea placeholder="Write something…" rows={4} />
    </InputGroup>
  ),
};

export const TextareaWithTrailingButton: Story = {
  render: () => (
    <InputGroup>
      <InputGroupTextarea placeholder="Write something…" rows={4} />
      <InputGroupAddon align="block-end">
        <InputGroupButton>
          <SendIcon />
        </InputGroupButton>
      </InputGroupAddon>
    </InputGroup>
  ),
};

// ── States ────────────────────────────────────────────────────────────────────

export const Error: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <PersonIcon />
      </InputGroupAddon>
      <InputGroupInput
        placeholder="Username…"
        defaultValue="invalid@"
        aria-invalid="true"
      />
    </InputGroup>
  ),
};

export const Disabled: Story = {
  render: () => (
    <InputGroup>
      <InputGroupAddon align="inline-start">
        <PersonIcon />
      </InputGroupAddon>
      <InputGroupInput
        placeholder="Username…"
        disabled
        defaultValue="Can't edit this"
      />
    </InputGroup>
  ),
};

// ── All variants grid ─────────────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="flex max-w-[400px] flex-col gap-[16px] p-60">
      <InputGroup>
        <InputGroupInput placeholder="Default" />
      </InputGroup>

      <InputGroup>
        <InputGroupAddon align="inline-start">
          <SearchIcon />
        </InputGroupAddon>
        <InputGroupInput placeholder="Leading icon" />
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="Trailing icon" />
        <InputGroupAddon align="inline-end">
          <CalendarIcon />
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupAddon align="inline-start">
          <InputGroupText>https://</InputGroupText>
        </InputGroupAddon>
        <InputGroupInput placeholder="Leading text" />
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="Trailing text" />
        <InputGroupAddon align="inline-end">
          <InputGroupText>USD</InputGroupText>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput placeholder="Trailing button" />
        <InputGroupAddon align="inline-end">
          <InputGroupButton>
            <CloseIcon />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      <InputGroup>
        <InputGroupInput
          placeholder="Error state"
          defaultValue="invalid@"
          aria-invalid="true"
        />
      </InputGroup>

      <InputGroup>
        <InputGroupInput
          placeholder="Disabled"
          disabled
          defaultValue="Can't edit this"
        />
      </InputGroup>

      <InputGroup>
        <InputGroupTextarea placeholder="Textarea…" rows={3} />
      </InputGroup>
    </div>
  ),
};
