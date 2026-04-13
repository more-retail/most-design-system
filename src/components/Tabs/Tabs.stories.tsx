import type { Meta, StoryObj } from "@storybook/react-vite";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "./Tabs";

import HomeIcon from "@material-symbols/svg-700/sharp/home-fill.svg?react";
import PersonIcon from "@material-symbols/svg-700/sharp/person-fill.svg?react";
import StarIcon from "@material-symbols/svg-700/sharp/star-fill.svg?react";

const meta: Meta<typeof Tabs> = {
  title: "Components/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

export const Horizontal: Story = {
  render: () => (
    <Tabs defaultValue="tab-1" className="w-[480px]">
      <TabsList>
        <TabsTrigger value="tab-1" shortcutKey="Enter">
          Label
        </TabsTrigger>
        <TabsTrigger value="tab-2" shortcutKey="Enter">
          Label
        </TabsTrigger>
        <TabsTrigger value="tab-3" shortcutKey="Enter">
          Label
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1" className="p-50">
        Content for Tab 1
      </TabsContent>
      <TabsContent value="tab-2" className="p-50">
        Content for Tab 2
      </TabsContent>
      <TabsContent value="tab-3" className="p-50">
        Content for Tab 3
      </TabsContent>
    </Tabs>
  ),
};

export const HorizontalWithIcons: Story = {
  render: () => (
    <Tabs defaultValue="tab-1" className="w-[480px]">
      <TabsList>
        <TabsTrigger value="tab-1" icon={<HomeIcon />} shortcutKey="Enter">
          Home
        </TabsTrigger>
        <TabsTrigger value="tab-2" icon={<StarIcon />} shortcutKey="Enter">
          Starred
        </TabsTrigger>
        <TabsTrigger value="tab-3" icon={<PersonIcon />} shortcutKey="Enter">
          Profile
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1" className="p-50">
        Home content
      </TabsContent>
      <TabsContent value="tab-2" className="p-50">
        Starred content
      </TabsContent>
      <TabsContent value="tab-3" className="p-50">
        Profile content
      </TabsContent>
    </Tabs>
  ),
};

export const HorizontalNoShortcut: Story = {
  render: () => (
    <Tabs defaultValue="tab-1" className="w-[480px]">
      <TabsList>
        <TabsTrigger value="tab-1">Label</TabsTrigger>
        <TabsTrigger value="tab-2">Label</TabsTrigger>
        <TabsTrigger value="tab-3">Label</TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1" className="p-50">
        Content for Tab 1
      </TabsContent>
      <TabsContent value="tab-2" className="p-50">
        Content for Tab 2
      </TabsContent>
      <TabsContent value="tab-3" className="p-50">
        Content for Tab 3
      </TabsContent>
    </Tabs>
  ),
};

export const Vertical: Story = {
  render: () => (
    <Tabs defaultValue="tab-1" orientation="vertical" className="min-h-[200px]">
      <TabsList>
        <TabsTrigger value="tab-1" shortcutKey="Enter">
          Label
        </TabsTrigger>
        <TabsTrigger value="tab-2" shortcutKey="Enter">
          Label
        </TabsTrigger>
        <TabsTrigger value="tab-3" shortcutKey="Enter">
          Label
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1" className="p-50">
        Content for Tab 1
      </TabsContent>
      <TabsContent value="tab-2" className="p-50">
        Content for Tab 2
      </TabsContent>
      <TabsContent value="tab-3" className="p-50">
        Content for Tab 3
      </TabsContent>
    </Tabs>
  ),
};

export const VerticalWithIcons: Story = {
  render: () => (
    <Tabs defaultValue="tab-1" orientation="vertical" className="min-h-[200px]">
      <TabsList>
        <TabsTrigger value="tab-1" icon={<HomeIcon />} shortcutKey="Enter">
          Home
        </TabsTrigger>
        <TabsTrigger value="tab-2" icon={<StarIcon />} shortcutKey="Enter">
          Starred
        </TabsTrigger>
        <TabsTrigger value="tab-3" icon={<PersonIcon />} shortcutKey="Enter">
          Profile
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1" className="p-50">
        Home content
      </TabsContent>
      <TabsContent value="tab-2" className="p-50">
        Starred content
      </TabsContent>
      <TabsContent value="tab-3" className="p-50">
        Profile content
      </TabsContent>
    </Tabs>
  ),
};

export const WithDisabled: Story = {
  render: () => (
    <Tabs defaultValue="tab-1" className="w-[480px]">
      <TabsList>
        <TabsTrigger value="tab-1" shortcutKey="Enter">
          Active
        </TabsTrigger>
        <TabsTrigger value="tab-2" shortcutKey="Enter">
          Default
        </TabsTrigger>
        <TabsTrigger value="tab-3" shortcutKey="Enter" disabled>
          Disabled
        </TabsTrigger>
      </TabsList>
      <TabsContent value="tab-1" className="p-50">
        Content for Tab 1
      </TabsContent>
      <TabsContent value="tab-2" className="p-50">
        Content for Tab 2
      </TabsContent>
      <TabsContent value="tab-3" className="p-50">
        Content for Tab 3
      </TabsContent>
    </Tabs>
  ),
};

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-80 p-60">
      {/* Horizontal */}
      <div className="flex flex-col gap-40">
        <p className="tracking-widest typography-label-30 text-neutral-60 uppercase">
          Horizontal
        </p>

        <div className="flex flex-col gap-20">
          <p className="typography-label-30 text-neutral-40">
            With shortcut key
          </p>
          <Tabs defaultValue="tab-2" className="w-[480px]">
            <TabsList>
              <TabsTrigger value="tab-1" shortcutKey="Enter">
                Label
              </TabsTrigger>
              <TabsTrigger value="tab-2" shortcutKey="Enter">
                Label
              </TabsTrigger>
              <TabsTrigger value="tab-3" shortcutKey="Enter">
                Label
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tab-1" className="p-50">
              Tab 1
            </TabsContent>
            <TabsContent value="tab-2" className="p-50">
              Tab 2
            </TabsContent>
            <TabsContent value="tab-3" className="p-50">
              Tab 3
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex flex-col gap-20">
          <p className="typography-label-30 text-neutral-40">
            With icon + shortcut key
          </p>
          <Tabs defaultValue="tab-3" className="w-[480px]">
            <TabsList>
              <TabsTrigger
                value="tab-1"
                icon={<HomeIcon />}
                shortcutKey="Enter"
              >
                Home
              </TabsTrigger>
              <TabsTrigger
                value="tab-2"
                icon={<StarIcon />}
                shortcutKey="Enter"
              >
                Starred
              </TabsTrigger>
              <TabsTrigger
                value="tab-3"
                icon={<PersonIcon />}
                shortcutKey="Enter"
              >
                Profile
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tab-1" className="p-50">
              Home
            </TabsContent>
            <TabsContent value="tab-2" className="p-50">
              Starred
            </TabsContent>
            <TabsContent value="tab-3" className="p-50">
              Profile
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex flex-col gap-20">
          <p className="typography-label-30 text-neutral-40">No shortcut key</p>
          <Tabs defaultValue="tab-1" className="w-[480px]">
            <TabsList>
              <TabsTrigger value="tab-1">Label</TabsTrigger>
              <TabsTrigger value="tab-2">Label</TabsTrigger>
              <TabsTrigger value="tab-3" disabled>
                Label (disabled)
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tab-1" className="p-50">
              Tab 1
            </TabsContent>
            <TabsContent value="tab-2" className="p-50">
              Tab 2
            </TabsContent>
            <TabsContent value="tab-3" className="p-50">
              Tab 3
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Vertical */}
      <div className="flex flex-col gap-40">
        <p className="tracking-widest typography-label-30 text-neutral-60 uppercase">
          Vertical
        </p>

        <div className="flex flex-col gap-20">
          <p className="typography-label-30 text-neutral-40">
            With shortcut key
          </p>
          <Tabs
            defaultValue="tab-2"
            orientation="vertical"
            className="min-h-[180px]"
          >
            <TabsList>
              <TabsTrigger value="tab-1" shortcutKey="Enter">
                Label
              </TabsTrigger>
              <TabsTrigger value="tab-2" shortcutKey="Enter">
                Label
              </TabsTrigger>
              <TabsTrigger value="tab-3" shortcutKey="Enter">
                Label
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tab-1" className="p-50">
              Tab 1
            </TabsContent>
            <TabsContent value="tab-2" className="p-50">
              Tab 2
            </TabsContent>
            <TabsContent value="tab-3" className="p-50">
              Tab 3
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex flex-col gap-20">
          <p className="typography-label-30 text-neutral-40">
            With icon + shortcut key
          </p>
          <Tabs
            defaultValue="tab-1"
            orientation="vertical"
            className="min-h-[180px]"
          >
            <TabsList>
              <TabsTrigger
                value="tab-1"
                icon={<HomeIcon />}
                shortcutKey="Enter"
              >
                Home
              </TabsTrigger>
              <TabsTrigger
                value="tab-2"
                icon={<StarIcon />}
                shortcutKey="Enter"
              >
                Starred
              </TabsTrigger>
              <TabsTrigger
                value="tab-3"
                icon={<PersonIcon />}
                shortcutKey="Enter"
              >
                Profile
              </TabsTrigger>
            </TabsList>
            <TabsContent value="tab-1" className="p-50">
              Home
            </TabsContent>
            <TabsContent value="tab-2" className="p-50">
              Starred
            </TabsContent>
            <TabsContent value="tab-3" className="p-50">
              Profile
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  ),
  decorators: [(Story) => <Story />],
};
