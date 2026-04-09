import { useState } from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import { UserField, type UserFieldUser } from "./UserField";

const MOCK_USERS: UserFieldUser[] = [
  { id: "1", name: "Tomato Sharma", initials: "TS", role: "Chief Fruits Officer" },
  { id: "2", name: "Potato Reddy", initials: "PR", role: "SDE I" },
  { id: "3", name: "Onion Kharde", initials: "OK", role: "Chief Tears Officers" },
];

const meta: Meta<typeof UserField> = {
  title: "Components/UserField",
  component: UserField,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
  args: {
    label: "Label",
    placeholder: "Placeholder",
    size: "md",
    error: false,
    disabled: false,
  },
  argTypes: {
    size: { control: "select", options: ["md", "sm"] },
    error: { control: "boolean" },
    disabled: { control: "boolean" },
    label: { control: "text" },
    placeholder: { control: "text" },
    errorMessage: { control: "text" },
  },
};

export default meta;
type Story = StoryObj<typeof UserField>;

export const Default: Story = {
  render: (args) => {
    const [value, setValue] = useState<UserFieldUser | null>(null);
    return (
      <UserField
        {...args}
        users={MOCK_USERS}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const Small: Story = {
  render: (args) => {
    const [value, setValue] = useState<UserFieldUser | null>(null);
    return (
      <UserField
        {...args}
        size="sm"
        users={MOCK_USERS}
        value={value}
        onChange={setValue}
      />
    );
  },
};

export const Populated: Story = {
  render: (args) => (
    <UserField
      {...args}
      label="Label"
      value={MOCK_USERS[0]}
      users={MOCK_USERS}
    />
  ),
};

export const WithError: Story = {
  render: (args) => (
    <UserField
      {...args}
      label="Label"
      value={MOCK_USERS[0]}
      users={MOCK_USERS}
      error
      errorMessage="A friendly error message"
    />
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <UserField
      {...args}
      label="Label"
      value={MOCK_USERS[0]}
      users={MOCK_USERS}
      disabled
    />
  ),
};

export const DisabledEmpty: Story = {
  render: (args) => (
    <UserField
      {...args}
      label="Label"
      users={MOCK_USERS}
      disabled
    />
  ),
};

export const NoLabel: Story = {
  render: (args) => {
    const [value, setValue] = useState<UserFieldUser | null>(null);
    return (
      <UserField
        {...args}
        users={MOCK_USERS}
        value={value}
        onChange={setValue}
      />
    );
  },
  args: { label: undefined },
};

export const AllVariants: Story = {
  render: () => {
    const [mdUser, setMdUser] = useState<UserFieldUser | null>(null);
    const [smUser, setSmUser] = useState<UserFieldUser | null>(null);
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
            <div className="flex flex-wrap items-start gap-60">
              {/* Default with dropdown */}
              <UserField
                size={size}
                label="Label"
                users={MOCK_USERS}
                value={user}
                onChange={setUser}
              />
              {/* Populated */}
              <UserField size={size} label="Label" value={MOCK_USERS[0]} users={MOCK_USERS} />
              {/* Error */}
              <UserField
                size={size}
                label="Label"
                value={MOCK_USERS[0]}
                users={MOCK_USERS}
                error
                errorMessage="A friendly error message"
              />
              {/* Disabled populated */}
              <UserField size={size} label="Label" value={MOCK_USERS[0]} users={MOCK_USERS} disabled />
              {/* Disabled empty */}
              <UserField size={size} label="Label" users={MOCK_USERS} disabled />
            </div>
          </div>
        ))}
      </div>
    );
  },
};
