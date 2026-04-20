import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { Dropzone } from "./Dropzone";

const mockFile = new File([""], "Lorem_Ipsum.xlsx", {
  type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  lastModified: new Date("2025-02-14T06:30:00").getTime(),
});

const meta: Meta<typeof Dropzone> = {
  title: "Components/Dropzone",
  component: Dropzone,
  tags: ["autodocs"],
  argTypes: {
    isLoading: { control: "boolean" },
    error: { control: "text" },
    accept: { control: "text" },
    maxFileSize: { control: "text" },
  },
  args: {
    isLoading: false,
  },
};

export default meta;
type Story = StoryObj<typeof Dropzone>;

// ── Individual states ─────────────────────────────────────────────────────────

export const Default: Story = {};

export const Loading: Story = {
  render: (args) => <Dropzone {...args} file={mockFile} isLoading />,
};

export const Populated: Story = {
  render: (args) => <Dropzone {...args} file={mockFile} />,
};

export const WithError: Story = {
  render: (args) => (
    <Dropzone {...args} file={mockFile} error="A friendly error message" />
  ),
};

// ── All states side by side ───────────────────────────────────────────────────

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-wrap items-start gap-[16px] p-[24px]">
      <div className="flex flex-col items-center gap-[8px]">
        <p className="typography-para-40 text-neutral-60">Default</p>
        <Dropzone />
      </div>
      <div className="flex flex-col items-center gap-[8px]">
        <p className="typography-para-40 text-neutral-60">Loading</p>
        <Dropzone isLoading file={mockFile} />
      </div>
      <div className="flex flex-col items-center gap-[8px]">
        <p className="typography-para-40 text-neutral-60">Populated</p>
        <Dropzone file={mockFile} />
      </div>
      <div className="flex flex-col items-center gap-[8px]">
        <p className="typography-para-40 text-neutral-60">Error</p>
        <Dropzone file={mockFile} error="A friendly error message" />
      </div>
    </div>
  ),
};

// ── Fully interactive ─────────────────────────────────────────────────────────

export const Interactive: Story = {
  render: (args) => {
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | undefined>();

    const handleFileChange = (f: File | null) => {
      setFile(f);
      console.log("File changed:", f);
      setError(undefined);
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    };

    return (
      <Dropzone
        {...args}
        file={file}
        onFileChange={handleFileChange}
        isLoading={loading}
        error={error}
        onCancelUpload={() => {
          setLoading(false);
          setFile(null);
        }}
        onDelete={() => setFile(null)}
        onDownload={() => alert(`Downloading: ${file?.name}`)}
        onReplace={() => alert("Replace triggered")}
      />
    );
  },
};
