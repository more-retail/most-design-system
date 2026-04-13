import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { UserChip, type UserChipUser } from "./UserChip";

const MOCK_USERS: UserChipUser[] = [
  { id: "1", name: "Tomato Sharma", initials: "TS", role: "Chief Fruits Officer" },
  { id: "2", name: "Potato Reddy", initials: "PR", role: "SDE I" },
  { id: "3", name: "Onion Kharde", initials: "OK", role: "Chief Tears Officers" },
];

const meta: Meta<typeof UserChip> = {
  title: "Components/UserChip",
  component: UserChip,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    placeholder: "Placeholder",
    size: "md",
    removable: true,
    selected: false,
    error: false,
    disabled: false,
  },
  argTypes: {
    size: { control: "select", options: ["md", "sm" , "lg"] },
    removable: { control: "boolean" },
    selected: { control: "boolean" },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof UserChip>;

export const WithDropdown: Story = {
  render: (args) => {
    const [value, setValue] = useState<UserChipUser | null>(null);
    return (
      <div className="p-60">
        <UserChip
          {...args}
          users={MOCK_USERS}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const WithDropdownSmall: Story = {
  render: (args) => {
    const [value, setValue] = useState<UserChipUser | null>(null);
    return (
      <div className="p-60">
        <UserChip
          {...args}
          size="sm"
          users={MOCK_USERS}
          value={value}
          onChange={setValue}
        />
      </div>
    );
  },
};

export const Populated: Story = {
  render: (args) => (
    <UserChip
      {...args}
      value={MOCK_USERS[0]}
      users={MOCK_USERS}
    />
  ),
};

export const Selected: Story = {
  render: (args) => (
    <UserChip {...args} value={MOCK_USERS[0]} users={MOCK_USERS} selected />
  ),
};

export const Error: Story = {
  render: (args) => (
    <UserChip {...args} value={MOCK_USERS[0]} users={MOCK_USERS} error />
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <UserChip {...args} value={MOCK_USERS[0]} users={MOCK_USERS} disabled />
  ),
};

export const AllVariants: Story = {
  render: () => {
    const [mdUser, setMdUser] = useState<UserChipUser | null>(null);
    const [smUser, setSmUser] = useState<UserChipUser | null>(null);
    return (
      <div className="flex flex-col gap-80 p-60">
        {(
          [
            { size: "md" as const, user: mdUser, setUser: setMdUser },
            { size: "sm" as const, user: smUser, setUser: setSmUser },
          ]
        ).map(({ size, user, setUser }) => (
          <div key={size} className="flex flex-col gap-40">
            <p className="tracking-widest typography-label-30 text-neutral-60 uppercase">
              {size}
            </p>
            <div className="flex flex-wrap items-center gap-40">
              {/* Dropdown */}
              <UserChip size={size} users={MOCK_USERS} value={user} onChange={setUser} />
              {/* Populated */}
              <UserChip size={size} value={MOCK_USERS[0]} />
              {/* Selected */}
              <UserChip size={size} value={MOCK_USERS[0]} selected />
              {/* Error */}
              <UserChip size={size} value={MOCK_USERS[0]} error />
              {/* Disabled */}
              <UserChip size={size} value={MOCK_USERS[0]} disabled />
              {/* Disabled placeholder */}
              <UserChip size={size} disabled />
            </div>
          </div>
        ))}
      </div>
    );
  },
  decorators: [(Story) => <Story />],
};
