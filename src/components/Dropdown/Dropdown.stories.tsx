import React from "react";
import type { Meta, StoryObj } from "@storybook/react-vite";
import PersonIcon from "@material-symbols/svg-700/sharp/person-fill.svg?react";
import LocationOnIcon from "@material-symbols/svg-700/sharp/location_on-fill.svg?react";
import TranslateIcon from "@material-symbols/svg-700/sharp/translate-fill.svg?react";

import {
  Dropdown,
  DropdownLabel,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownItemIndicator,
  DropdownGroup,
  DropdownGroupLabel,
  DropdownSeparator,
  DropdownScrollUpArrow,
  DropdownScrollDownArrow,
  DropdownHint,
} from "./Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Components/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-60 w-[320px]">
        <Story />
      </div>
    ),
  ],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | null>(null);
    return (
      <div className="flex flex-col gap-40 w-full">
        <Dropdown value={value ?? undefined} onValueChange={setValue}>
          <DropdownLabel>Label</DropdownLabel>
          <DropdownTrigger placeholder="Select an option" />
          <DropdownContent>
            <DropdownItem value="option-1">Option 1</DropdownItem>
            <DropdownItem value="option-2">Option 2</DropdownItem>
            <DropdownItem value="option-3">Option 3</DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>
    );
  },
};

/* -------------------------------------------------------------------------------------------------
 * Sizes
 * -----------------------------------------------------------------------------------------------*/

export const Regular: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | null>(null);
    return (
      <div className="flex flex-col gap-40 w-full">
        <Dropdown size="md" value={value ?? undefined} onValueChange={setValue}>
          <DropdownLabel>Regular (md)</DropdownLabel>
          <DropdownTrigger placeholder="Select an option" />
          <DropdownContent>
            <DropdownItem value="option-1">Option 1</DropdownItem>
            <DropdownItem value="option-2">Option 2</DropdownItem>
            <DropdownItem value="option-3">Option 3</DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>
    );
  },
};

export const Small: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | null>(null);
    return (
      <div className="flex flex-col gap-40 w-full">
        <Dropdown size="sm" value={value ?? undefined} onValueChange={setValue}>
          <DropdownLabel>Small (sm)</DropdownLabel>
          <DropdownTrigger placeholder="Select an option" />
          <DropdownContent>
            <DropdownItem value="option-1">Option 1</DropdownItem>
            <DropdownItem value="option-2">Option 2</DropdownItem>
            <DropdownItem value="option-3">Option 3</DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>
    );
  },
};

/* -------------------------------------------------------------------------------------------------
 * States
 * -----------------------------------------------------------------------------------------------*/

export const Disabled: Story = {
  render: () => (
    <div className="flex flex-col gap-40 w-full">
      <Dropdown disabled>
        <DropdownLabel disabled>Disabled</DropdownLabel>
        <DropdownTrigger placeholder="Select an option" />
        <DropdownContent>
          <DropdownItem value="option-1">Option 1</DropdownItem>
          <DropdownItem value="option-2">Option 2</DropdownItem>
        </DropdownContent>
      </Dropdown>
    </div>
  ),
};

export const WithError: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | null>(null);
    return (
      <div className="flex flex-col gap-40 w-full">
        <Dropdown value={value ?? undefined} onValueChange={setValue}>
          <DropdownLabel>With Error</DropdownLabel>
          <DropdownTrigger placeholder="Select an option" error />
          <DropdownContent>
            <DropdownItem value="option-1">Option 1</DropdownItem>
            <DropdownItem value="option-2">Option 2</DropdownItem>
            <DropdownItem value="option-3">Option 3</DropdownItem>
          </DropdownContent>
        </Dropdown>
        <DropdownHint variant="error">Please select a valid option.</DropdownHint>
      </div>
    );
  },
};

/* -------------------------------------------------------------------------------------------------
 * showIcon control
 * -----------------------------------------------------------------------------------------------*/

export const ShowIcon: StoryObj<{ showIcon: boolean }> = {
  argTypes: {
    showIcon: { control: "boolean" },
  },
  args: {
    showIcon: true,
  },
  render: ({ showIcon }) => {
    const [value, setValue] = React.useState<string | null>(null);
    return (
      <div className="flex flex-col gap-40 w-full">
        <Dropdown value={value ?? undefined} onValueChange={setValue}>
          <DropdownLabel>Leading Icon</DropdownLabel>
          <DropdownTrigger
            placeholder="Select an option"
            showIcon={showIcon}
            icon={<PersonIcon />}
          />
          <DropdownContent>
            <DropdownItem value="option-1">Option 1</DropdownItem>
            <DropdownItem value="option-2">Option 2</DropdownItem>
            <DropdownItem value="option-3">Option 3</DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>
    );
  },
};

/* -------------------------------------------------------------------------------------------------
 * With Leading Icon (trigger)
 * -----------------------------------------------------------------------------------------------*/

export const WithIcon: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | null>(null);
    return (
      <div className="flex flex-col gap-40 w-full">
        <Dropdown value={value ?? undefined} onValueChange={setValue}>
          <DropdownLabel>With Leading Icon</DropdownLabel>
          <DropdownTrigger
            placeholder="Select an option"
            showIcon
            icon={<PersonIcon />}
          />
          <DropdownContent>
            <DropdownItem value="option-1">Option 1</DropdownItem>
            <DropdownItem value="option-2">Option 2</DropdownItem>
            <DropdownItem value="option-3">Option 3</DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>
    );
  },
};

/* -------------------------------------------------------------------------------------------------
 * Items With Icons
 * -----------------------------------------------------------------------------------------------*/

export const ItemsWithIcons: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | null>(null);
    return (
      <div className="flex flex-col gap-40 w-full">
        <Dropdown value={value ?? undefined} onValueChange={setValue}>
          <DropdownLabel>Language</DropdownLabel>
          <DropdownTrigger
            placeholder="Select a language"
            showIcon
            icon={<TranslateIcon />}
          />
          <DropdownContent>
            <DropdownItem value="en" icon={<PersonIcon />}>English</DropdownItem>
            <DropdownItem value="fr" icon={<PersonIcon />}>French</DropdownItem>
            <DropdownItem value="de" icon={<PersonIcon />}>German</DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>
    );
  },
};

/* -------------------------------------------------------------------------------------------------
 * Groups and Separator
 * -----------------------------------------------------------------------------------------------*/

export const WithGroups: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | null>(null);
    return (
      <div className="flex flex-col gap-40 w-full">
        <Dropdown value={value ?? undefined} onValueChange={setValue}>
          <DropdownLabel>Region</DropdownLabel>
          <DropdownTrigger
            placeholder="Select a region"
            showIcon
            icon={<LocationOnIcon />}
          />
          <DropdownContent>
            <DropdownGroup>
              <DropdownGroupLabel>Americas</DropdownGroupLabel>
              <DropdownItem value="us">United States</DropdownItem>
              <DropdownItem value="ca">Canada</DropdownItem>
              <DropdownItem value="mx">Mexico</DropdownItem>
            </DropdownGroup>
            <DropdownSeparator />
            <DropdownGroup>
              <DropdownGroupLabel>Europe</DropdownGroupLabel>
              <DropdownItem value="gb">United Kingdom</DropdownItem>
              <DropdownItem value="fr">France</DropdownItem>
              <DropdownItem value="de">Germany</DropdownItem>
            </DropdownGroup>
          </DropdownContent>
        </Dropdown>
      </div>
    );
  },
};

/* -------------------------------------------------------------------------------------------------
 * Checkmark Indicator (opt-in alternative to border-selected pattern)
 * -----------------------------------------------------------------------------------------------*/

export const WithCheckmark: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | null>(null);
    return (
      <div className="flex flex-col gap-40 w-full">
        <Dropdown value={value ?? undefined} onValueChange={setValue}>
          <DropdownLabel>Plan</DropdownLabel>
          <DropdownTrigger placeholder="Select a plan" />
          <DropdownContent>
            <DropdownItem value="starter">
              Starter
              <DropdownItemIndicator />
            </DropdownItem>
            <DropdownItem value="pro">
              Pro
              <DropdownItemIndicator />
            </DropdownItem>
            <DropdownItem value="enterprise">
              Enterprise
              <DropdownItemIndicator />
            </DropdownItem>
          </DropdownContent>
        </Dropdown>
      </div>
    );
  },
};

const COUNTRIES = [
  "Argentina", "Australia", "Brazil", "Canada", "Chile", "China",
  "Denmark", "Egypt", "Finland", "France", "Germany", "Greece",
  "Hungary", "India", "Indonesia", "Ireland", "Italy", "Japan",
  "Mexico", "Netherlands", "New Zealand", "Norway", "Poland",
  "Portugal", "South Africa", "Spain", "Sweden", "Switzerland",
  "Turkey", "United Kingdom", "United States",
];

export const LongList: Story = {
  render: () => {
    const [value, setValue] = React.useState<string | null>(null);
    return (
      <div className="flex flex-col gap-40 w-full">
        <Dropdown value={value ?? undefined} onValueChange={setValue}>
          <DropdownLabel>Country</DropdownLabel>
          <DropdownTrigger placeholder="Select a country" />
          <DropdownContent>
            <DropdownScrollUpArrow />
            {COUNTRIES.map((country) => (
              <DropdownItem
                key={country}
                value={country.toLowerCase().replace(/\s/g, "-")}
              >
                {country}
              </DropdownItem>
            ))}
            <DropdownScrollDownArrow />
          </DropdownContent>
        </Dropdown>
      </div>
    );
  },
};

/* -------------------------------------------------------------------------------------------------
 * AllStates grid
 * -----------------------------------------------------------------------------------------------*/

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-80 p-60">
      {(["md", "sm"] as const).map((size) => (
        <div key={size} className="flex flex-col gap-40">
          <p className="typography-label-30 text-neutral-60 uppercase tracking-widest">
            {size === "md" ? "Regular (md)" : "Small (sm)"}
          </p>
          <div className="flex flex-col gap-60 w-[300px]">

            {/* Empty */}
            <Dropdown size={size}>
              <DropdownLabel>Empty</DropdownLabel>
              <DropdownTrigger placeholder="Select an option" />
              <DropdownContent>
                <DropdownItem value="option-1">Option 1</DropdownItem>
                <DropdownItem value="option-2">Option 2</DropdownItem>
                <DropdownItem value="option-3">Option 3</DropdownItem>
              </DropdownContent>
            </Dropdown>

            {/* Disabled */}
            <Dropdown size={size} disabled>
              <DropdownLabel disabled>Disabled</DropdownLabel>
              <DropdownTrigger placeholder="Select an option" />
              <DropdownContent>
                <DropdownItem value="option-1">Option 1</DropdownItem>
                <DropdownItem value="option-2">Option 2</DropdownItem>
              </DropdownContent>
            </Dropdown>

            {/* Error */}
            <div className="flex flex-col gap-40">
              <Dropdown size={size}>
                <DropdownLabel>Error</DropdownLabel>
                <DropdownTrigger placeholder="Select an option" error />
                <DropdownContent>
                  <DropdownItem value="option-1">Option 1</DropdownItem>
                  <DropdownItem value="option-2">Option 2</DropdownItem>
                </DropdownContent>
              </Dropdown>
              <DropdownHint variant="error">Please select a valid option.</DropdownHint>
            </div>

            {/* With leading icon */}
            <Dropdown size={size}>
              <DropdownLabel>With Icon</DropdownLabel>
              <DropdownTrigger
                placeholder="Select an option"
                showIcon
                icon={<PersonIcon />}
              />
              <DropdownContent>
                <DropdownItem value="option-1">Option 1</DropdownItem>
                <DropdownItem value="option-2">Option 2</DropdownItem>
              </DropdownContent>
            </Dropdown>

          </div>
        </div>
      ))}
    </div>
  ),
  decorators: [(Story) => <Story />],
};
