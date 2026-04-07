import type { Meta, StoryObj } from "@storybook/react-vite";
import AppsIcon from "@material-symbols/svg-700/sharp/apps-fill.svg?react";

import {
  DropdownChip,
  DropdownChipTrigger,
  DropdownChipContent,
  DropdownChipItem,
} from "./DropdownChip";

const meta: Meta<typeof DropdownChip> = {
  title: "Components/DropdownChip",
  component: DropdownChip,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="p-60 flex items-start gap-40 flex-wrap">
        <Story />
      </div>
    ),
  ],
  parameters: { layout: "centered" },
};

export default meta;
type Story = StoryObj<typeof DropdownChip>;

const OPTIONS = [
  { value: "option-1", label: "Option 1" },
  { value: "option-2", label: "Option 2" },
  { value: "option-3", label: "Option 3" },
];

/* -------------------------------------------------------------------------------------------------
 * Individual size + variant stories
 * -----------------------------------------------------------------------------------------------*/

export const FilledLarge: Story = {
  render: () => (
    <DropdownChip>
      <DropdownChipTrigger variant="filled" size="lg" placeholder="Label" icon={<AppsIcon />} />
      <DropdownChipContent>
        {OPTIONS.map((o) => (
          <DropdownChipItem key={o.value} value={o.value}>{o.label}</DropdownChipItem>
        ))}
      </DropdownChipContent>
    </DropdownChip>
  ),
};

export const FilledMedium: Story = {
  render: () => (
    <DropdownChip>
      <DropdownChipTrigger variant="filled" size="md" placeholder="Label" icon={<AppsIcon />} />
      <DropdownChipContent>
        {OPTIONS.map((o) => (
          <DropdownChipItem key={o.value} value={o.value}>{o.label}</DropdownChipItem>
        ))}
      </DropdownChipContent>
    </DropdownChip>
  ),
};

export const FilledSmall: Story = {
  render: () => (
    <DropdownChip>
      <DropdownChipTrigger variant="filled" size="sm" placeholder="Label" icon={<AppsIcon />} />
      <DropdownChipContent>
        {OPTIONS.map((o) => (
          <DropdownChipItem key={o.value} value={o.value}>{o.label}</DropdownChipItem>
        ))}
      </DropdownChipContent>
    </DropdownChip>
  ),
};

export const OutlinedLarge: Story = {
  render: () => (
    <DropdownChip>
      <DropdownChipTrigger variant="outlined" size="lg" placeholder="LABEL" icon={<AppsIcon />} />
      <DropdownChipContent>
        {OPTIONS.map((o) => (
          <DropdownChipItem key={o.value} value={o.value}>{o.label}</DropdownChipItem>
        ))}
      </DropdownChipContent>
    </DropdownChip>
  ),
};

export const OutlinedMedium: Story = {
  render: () => (
    <DropdownChip>
      <DropdownChipTrigger variant="outlined" size="md" placeholder="LABEL" icon={<AppsIcon />} />
      <DropdownChipContent>
        {OPTIONS.map((o) => (
          <DropdownChipItem key={o.value} value={o.value}>{o.label}</DropdownChipItem>
        ))}
      </DropdownChipContent>
    </DropdownChip>
  ),
};

export const OutlinedSmall: Story = {
  render: () => (
    <DropdownChip>
      <DropdownChipTrigger variant="outlined" size="sm" placeholder="LABEL" icon={<AppsIcon />} />
      <DropdownChipContent>
        {OPTIONS.map((o) => (
          <DropdownChipItem key={o.value} value={o.value}>{o.label}</DropdownChipItem>
        ))}
      </DropdownChipContent>
    </DropdownChip>
  ),
};

/* -------------------------------------------------------------------------------------------------
 * States (error, disabled, no icon)
 * -----------------------------------------------------------------------------------------------*/

export const WithError: Story = {
  render: () => (
    <div className="flex items-center gap-40 flex-wrap">
      {(["lg", "md", "sm"] as const).map((size) => (
        <DropdownChip key={size}>
          <DropdownChipTrigger variant="filled" size={size} placeholder="Label" icon={<AppsIcon />} error />
          <DropdownChipContent>
            {OPTIONS.map((o) => <DropdownChipItem key={o.value} value={o.value}>{o.label}</DropdownChipItem>)}
          </DropdownChipContent>
        </DropdownChip>
      ))}
    </div>
  ),
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-40 flex-wrap">
      {(["lg", "md", "sm"] as const).map((size) => (
        <DropdownChip key={size} disabled>
          <DropdownChipTrigger variant="filled" size={size} placeholder="Label" icon={<AppsIcon />} />
          <DropdownChipContent>
            {OPTIONS.map((o) => <DropdownChipItem key={o.value} value={o.value}>{o.label}</DropdownChipItem>)}
          </DropdownChipContent>
        </DropdownChip>
      ))}
    </div>
  ),
};

export const NoIcon: Story = {
  render: () => (
    <div className="flex items-center gap-40 flex-wrap">
      {(["lg", "md", "sm"] as const).map((size) => (
        <DropdownChip key={size}>
          <DropdownChipTrigger variant="filled" size={size} placeholder="Label" />
          <DropdownChipContent>
            {OPTIONS.map((o) => <DropdownChipItem key={o.value} value={o.value}>{o.label}</DropdownChipItem>)}
          </DropdownChipContent>
        </DropdownChip>
      ))}
    </div>
  ),
};

/* -------------------------------------------------------------------------------------------------
 * All States
 * -----------------------------------------------------------------------------------------------*/

export const AllStates: Story = {
  render: () => (
    <div className="flex flex-col gap-80 p-60">

      {(["filled", "outlined"] as const).map((variant) => (
        <div key={variant} className="flex flex-col gap-40">
          <p className="typography-label-30 text-neutral-60 uppercase tracking-widest">{variant}</p>

          {(["lg", "md", "sm"] as const).map((size) => (
            <div key={size} className="flex flex-col gap-20">
              <p className="typography-label-30 text-neutral-40 capitalize">{size}</p>
              <div className="flex items-center gap-40 flex-wrap">

                {/* Default (placeholder) */}
                <DropdownChip>
                  <DropdownChipTrigger variant={variant} size={size} placeholder="Label" icon={<AppsIcon />} />
                  <DropdownChipContent>
                    {OPTIONS.map((o) => <DropdownChipItem key={o.value} value={o.value}>{o.label}</DropdownChipItem>)}
                  </DropdownChipContent>
                </DropdownChip>

                {/* Selected */}
                <DropdownChip defaultValue="option-1">
                  <DropdownChipTrigger variant={variant} size={size} placeholder="Label" icon={<AppsIcon />} />
                  <DropdownChipContent>
                    {OPTIONS.map((o) => <DropdownChipItem key={o.value} value={o.value}>{o.label}</DropdownChipItem>)}
                  </DropdownChipContent>
                </DropdownChip>

                {/* Error */}
                <DropdownChip>
                  <DropdownChipTrigger variant={variant} size={size} placeholder="Label" icon={<AppsIcon />} error />
                  <DropdownChipContent>
                    {OPTIONS.map((o) => <DropdownChipItem key={o.value} value={o.value}>{o.label}</DropdownChipItem>)}
                  </DropdownChipContent>
                </DropdownChip>

                {/* Disabled */}
                <DropdownChip disabled>
                  <DropdownChipTrigger variant={variant} size={size} placeholder="Label" icon={<AppsIcon />} />
                  <DropdownChipContent>
                    {OPTIONS.map((o) => <DropdownChipItem key={o.value} value={o.value}>{o.label}</DropdownChipItem>)}
                  </DropdownChipContent>
                </DropdownChip>

                {/* No icon */}
                <DropdownChip>
                  <DropdownChipTrigger variant={variant} size={size} placeholder="Label" />
                  <DropdownChipContent>
                    {OPTIONS.map((o) => <DropdownChipItem key={o.value} value={o.value}>{o.label}</DropdownChipItem>)}
                  </DropdownChipContent>
                </DropdownChip>

              </div>
            </div>
          ))}
        </div>
      ))}

    </div>
  ),
  decorators: [(Story) => <Story />],
};
