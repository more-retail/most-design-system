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

const OPTIONS = [
  { value: "option-1", label: "Option 1" },
  { value: "option-2", label: "Option 2" },
  { value: "option-3", label: "Option 3" },
];

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    const label = OPTIONS.find((o) => o.value === value)?.label;
    return (
      <div className="flex flex-col gap-40 w-full">
        <Dropdown>
          <DropdownTrigger placeholder="Select an option" displayValue={label} />
          <DropdownContent value={value} onValueChange={setValue}>
            {OPTIONS.map((o) => (
              <DropdownItem key={o.value} value={o.value}>{o.label}</DropdownItem>
            ))}
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
    const [value, setValue] = React.useState("");
    const label = OPTIONS.find((o) => o.value === value)?.label;
    return (
      <div className="flex flex-col gap-40 w-full">
        <Dropdown>
          <DropdownLabel>Regular (md)</DropdownLabel>
          <DropdownTrigger size="md" placeholder="Select an option" displayValue={label} />
          <DropdownContent value={value} onValueChange={setValue}>
            {OPTIONS.map((o) => (
              <DropdownItem key={o.value} value={o.value}>{o.label}</DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>
      </div>
    );
  },
};

export const Small: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    const label = OPTIONS.find((o) => o.value === value)?.label;
    return (
      <div className="flex flex-col gap-40 w-full">
        <Dropdown>
          <DropdownLabel>Small (sm)</DropdownLabel>
          <DropdownTrigger size="sm" placeholder="Select an option" displayValue={label} />
          <DropdownContent value={value} onValueChange={setValue}>
            {OPTIONS.map((o) => (
              <DropdownItem key={o.value} value={o.value}>{o.label}</DropdownItem>
            ))}
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
      <Dropdown>
        <DropdownLabel disabled>Disabled</DropdownLabel>
        <DropdownTrigger placeholder="Select an option" disabled />
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
    const [value, setValue] = React.useState("");
    const label = OPTIONS.find((o) => o.value === value)?.label;
    return (
      <div className="flex flex-col gap-40 w-full">
        <Dropdown>
          <DropdownLabel>With Error</DropdownLabel>
          <DropdownTrigger placeholder="Select an option" displayValue={label} error />
          <DropdownContent value={value} onValueChange={setValue}>
            {OPTIONS.map((o) => (
              <DropdownItem key={o.value} value={o.value}>{o.label}</DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>
        <DropdownHint variant="error">Please select a valid option.</DropdownHint>
      </div>
    );
  },
};

/* -------------------------------------------------------------------------------------------------
 * With Leading Icon (trigger)
 * -----------------------------------------------------------------------------------------------*/

export const WithIcon: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    const label = OPTIONS.find((o) => o.value === value)?.label;
    return (
      <div className="flex flex-col gap-40 w-full">
        <Dropdown>
          <DropdownLabel>With Leading Icon</DropdownLabel>
          <DropdownTrigger
            placeholder="Select an option"
            displayValue={label}
            icon={<PersonIcon />}
          />
          <DropdownContent value={value} onValueChange={setValue}>
            {OPTIONS.map((o) => (
              <DropdownItem key={o.value} value={o.value}>{o.label}</DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>
      </div>
    );
  },
};

/* -------------------------------------------------------------------------------------------------
 * Items With Icons
 * -----------------------------------------------------------------------------------------------*/

const LANGUAGES = [
  { value: "en", label: "English" },
  { value: "fr", label: "French" },
  { value: "de", label: "German" },
];

export const ItemsWithIcons: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    const label = LANGUAGES.find((o) => o.value === value)?.label;
    return (
      <div className="flex flex-col gap-40 w-full">
        <Dropdown>
          <DropdownLabel>Language</DropdownLabel>
          <DropdownTrigger
            placeholder="Select a language"
            displayValue={label}
            icon={<TranslateIcon />}
          />
          <DropdownContent value={value} onValueChange={setValue}>
            {LANGUAGES.map((o) => (
              <DropdownItem key={o.value} value={o.value} icon={<PersonIcon />}>
                {o.label}
              </DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>
      </div>
    );
  },
};

/* -------------------------------------------------------------------------------------------------
 * Groups and Separator
 * -----------------------------------------------------------------------------------------------*/

const REGIONS = {
  Americas: [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    { value: "mx", label: "Mexico" },
  ],
  Europe: [
    { value: "gb", label: "United Kingdom" },
    { value: "fr", label: "France" },
    { value: "de", label: "Germany" },
  ],
};

export const WithGroups: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    const allRegions = [...REGIONS.Americas, ...REGIONS.Europe];
    const label = allRegions.find((o) => o.value === value)?.label;
    return (
      <div className="flex flex-col gap-40 w-full">
        <Dropdown>
          <DropdownLabel>Region</DropdownLabel>
          <DropdownTrigger
            placeholder="Select a region"
            displayValue={label}
            icon={<LocationOnIcon />}
          />
          <DropdownContent value={value} onValueChange={setValue}>
            <DropdownGroup>
              <DropdownGroupLabel>Americas</DropdownGroupLabel>
              {REGIONS.Americas.map((o) => (
                <DropdownItem key={o.value} value={o.value}>{o.label}</DropdownItem>
              ))}
            </DropdownGroup>
            <DropdownSeparator />
            <DropdownGroup>
              <DropdownGroupLabel>Europe</DropdownGroupLabel>
              {REGIONS.Europe.map((o) => (
                <DropdownItem key={o.value} value={o.value}>{o.label}</DropdownItem>
              ))}
            </DropdownGroup>
          </DropdownContent>
        </Dropdown>
      </div>
    );
  },
};

/* -------------------------------------------------------------------------------------------------
 * Checkmark Indicator
 * -----------------------------------------------------------------------------------------------*/

const PLANS = [
  { value: "starter", label: "Starter" },
  { value: "pro", label: "Pro" },
  { value: "enterprise", label: "Enterprise" },
];

export const WithCheckmark: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    const label = PLANS.find((o) => o.value === value)?.label;
    return (
      <div className="flex flex-col gap-40 w-full">
        <Dropdown>
          <DropdownLabel>Plan</DropdownLabel>
          <DropdownTrigger placeholder="Select a plan" displayValue={label} />
          <DropdownContent value={value} onValueChange={setValue}>
            {PLANS.map((o) => (
              <DropdownItem key={o.value} value={o.value}>
                {o.label}
                <DropdownItemIndicator />
              </DropdownItem>
            ))}
          </DropdownContent>
        </Dropdown>
      </div>
    );
  },
};

/* -------------------------------------------------------------------------------------------------
 * Long List
 * -----------------------------------------------------------------------------------------------*/

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
    const [value, setValue] = React.useState("");
    return (
      <div className="flex flex-col gap-40 w-full">
        <Dropdown>
          <DropdownLabel>Country</DropdownLabel>
          <DropdownTrigger placeholder="Select a country" displayValue={value || undefined} />
          <DropdownContent value={value} onValueChange={setValue}>
            <DropdownScrollUpArrow />
            {COUNTRIES.map((country) => (
              <DropdownItem key={country} value={country.toLowerCase().replace(/\s/g, "-")}>
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
            <Dropdown>
              <DropdownLabel>Empty</DropdownLabel>
              <DropdownTrigger size={size} placeholder="Select an option" />
              <DropdownContent>
                <DropdownItem value="option-1">Option 1</DropdownItem>
                <DropdownItem value="option-2">Option 2</DropdownItem>
                <DropdownItem value="option-3">Option 3</DropdownItem>
              </DropdownContent>
            </Dropdown>

            {/* Disabled */}
            <Dropdown>
              <DropdownLabel disabled>Disabled</DropdownLabel>
              <DropdownTrigger size={size} placeholder="Select an option" disabled />
              <DropdownContent>
                <DropdownItem value="option-1">Option 1</DropdownItem>
                <DropdownItem value="option-2">Option 2</DropdownItem>
              </DropdownContent>
            </Dropdown>

            {/* Error */}
            <div className="flex flex-col gap-40">
              <Dropdown>
                <DropdownLabel>Error</DropdownLabel>
                <DropdownTrigger size={size} placeholder="Select an option" error />
                <DropdownContent>
                  <DropdownItem value="option-1">Option 1</DropdownItem>
                  <DropdownItem value="option-2">Option 2</DropdownItem>
                </DropdownContent>
              </Dropdown>
              <DropdownHint variant="error">Please select a valid option.</DropdownHint>
            </div>

            {/* With leading icon */}
            <Dropdown>
              <DropdownLabel>With Icon</DropdownLabel>
              <DropdownTrigger
                size={size}
                placeholder="Select an option"
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
