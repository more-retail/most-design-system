import type { ComponentProps } from "react";

import preview from "@/storybook/preview";

import { Tab, TabList, TabPanel, Tabs } from "./Tab";

import HomeIcon from "@material-symbols/svg-700/sharp/home-fill.svg?react";

const meta = preview.meta({
  component: Tabs,
  parameters: {
    docs: {
      description: {
        component:
          "Switches between mutually exclusive views that live at the same level of a page, like sections of a settings screen. The active tab gets a filled background and a bold underline; reach for `Tab` inside a `TabList`, and render each corresponding view in a matching `TabPanel`.",
      },
    },
  },
  args: {
    defaultValue: "tab-1",
  },
});

export const Default = meta.story({
  args: {
    children: (
      <>
        <TabList>
          <Tab value="tab-1">Label</Tab>
          <Tab value="tab-2">Label</Tab>
          <Tab value="tab-3">Label</Tab>
        </TabList>
        <TabPanel value="tab-1">Content for the first tab.</TabPanel>
        <TabPanel value="tab-2">Content for the second tab.</TabPanel>
        <TabPanel value="tab-3">Content for the third tab.</TabPanel>
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          "The baseline pattern: a `TabList` of `Tab`s driving a matching set of `TabPanel`s. `Tabs` is uncontrolled by default via `defaultValue`, or controlled with `value`/`onValueChange`.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof Tabs> },
        ) =>
          `<Tabs defaultValue="${String(args.defaultValue)}">
  <TabList>
    <Tab value="tab-1">Label</Tab>
    <Tab value="tab-2">Label</Tab>
    <Tab value="tab-3">Label</Tab>
  </TabList>
  <TabPanel value="tab-1">Content for the first tab.</TabPanel>
  <TabPanel value="tab-2">Content for the second tab.</TabPanel>
  <TabPanel value="tab-3">Content for the third tab.</TabPanel>
</Tabs>`,
      },
    },
  },
});

export const WithIcon = meta.story({
  tags: ["!dev"],
  args: {
    children: (
      <TabList>
        <Tab value="tab-1">
          <HomeIcon data-slot="leading-icon" />
          Label
        </Tab>
        <Tab value="tab-2">Label</Tab>
      </TabList>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Add an icon with `data-slot="leading-icon"` when it reinforces what the tab leads to faster than the label alone - keep this rare so tabs stay scannable as a set.',
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: () => `<TabList>
  <Tab value="tab-1">
    <HomeIcon data-slot="leading-icon" />
    Label
  </Tab>
  <Tab value="tab-2">Label</Tab>
</TabList>`,
      },
    },
  },
});

export const WithShortcut = meta.story({
  tags: ["!dev"],
  args: {
    children: (
      <TabList>
        <Tab value="tab-1">
          Label
          <span data-slot="shortcut">Enter</span>
        </Tab>
        <Tab value="tab-2">Label</Tab>
      </TabList>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Add a keyboard shortcut hint with `data-slot="shortcut"` for power-user contexts where tabs are also reachable without a mouse.',
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: () => `<TabList>
  <Tab value="tab-1">
    Label
    <span data-slot="shortcut">Enter</span>
  </Tab>
  <Tab value="tab-2">Label</Tab>
</TabList>`,
      },
    },
  },
});
