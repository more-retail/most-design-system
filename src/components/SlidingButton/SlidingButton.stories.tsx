import React from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { SlidingButton } from "./SlidingButton";

const meta: Meta<typeof SlidingButton> = {
  title: "Components/SlidingButton",
  component: SlidingButton,
  tags: ["autodocs"],
  argTypes: {
    label: { control: "text" },
    disabled: { control: "boolean" },
    onComplete: { action: "completed" },
  },
  args: {
    label: "Slide To Confirm",
    disabled: false,
  },
  decorators: [
    (Story) => (
      <div className="max-w-[400px] p-60">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SlidingButton>;

// ── Interactive (resettable) ──────────────────────────────────────────────────

/**
 * Drag the orange handle to the right to confirm.
 * Use the Reset button below to try again.
 */
export const Default: Story = {
  render: (args) => {
    const [key, setKey] = React.useState(0);
    const [status, setStatus] = React.useState<"idle" | "completed">("idle");

    return (
      <div className="flex flex-col gap-50">
        <SlidingButton
          key={key}
          {...args}
          onComplete={() => {
            setStatus("completed");
            args.onComplete?.();
          }}
        />
        <div className="flex items-center gap-50">
          {status === "completed" && (
            <span className="typography-label-30 text-green-60">
              ✓ Completed!
            </span>
          )}
          <button
            type="button"
            onClick={() => {
              setKey((k) => k + 1);
              setStatus("idle");
            }}
            className="typography-label-30 text-neutral-70 underline"
          >
            Reset
          </button>
        </div>
      </div>
    );
  },
};

// ── Disabled ─────────────────────────────────────────────────────────────────

export const Disabled: Story = {
  args: { disabled: true },
};

// ── Custom label ──────────────────────────────────────────────────────────────

export const SlideToDelete: Story = {
  args: { label: "Slide To Delete" },
};

export const SlideToSend: Story = {
  args: { label: "Slide To Send" },
};

// ── Narrow container ─────────────────────────────────────────────────────────

export const Narrow: Story = {
  decorators: [
    (Story) => (
      <div className="w-[240px] p-60">
        <Story />
      </div>
    ),
  ],
};

// ── All states side by side ───────────────────────────────────────────────────

export const AllStates: Story = {
  render: () => (
    <div className="flex max-w-[400px] flex-col gap-50 p-60">
      <div className="flex flex-col gap-10">
        <span className="typography-para-30 text-neutral-70">Default</span>
        <SlidingButton label="Slide To Confirm" />
      </div>
      <div className="flex flex-col gap-10">
        <span className="typography-para-30 text-neutral-70">Disabled</span>
        <SlidingButton label="Slide To Confirm" disabled />
      </div>
    </div>
  ),
};
