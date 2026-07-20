import type { ComponentProps } from "react";

import { fn } from "storybook/test";

import preview from "@/storybook/preview";

import { Button } from "./Button";
import { buttonVariantConfig } from "./Button.variants";

import ChevronForwardIcon from "@material-symbols/svg-700/sharp/chevron_forward-fill.svg?react";
import PersonIcon from "@material-symbols/svg-700/sharp/person-fill.svg?react";
import ProgressActivityIcon from "@material-symbols/svg-700/sharp/progress_activity-fill.svg?react";

function code(
  args: ComponentProps<typeof Button>,
  children: string,
  extraProps = "",
) {
  const { variant: defaultVariant, size: defaultSize } =
    buttonVariantConfig.defaultVariants;

  const variant =
    args.variant && args.variant !== defaultVariant
      ? ` variant="${args.variant}"`
      : "";
  const size =
    args.size && args.size !== defaultSize ? ` size="${args.size}"` : "";
  const disabled = args.disabled ? ` disabled` : "";

  return `<Button${variant}${size}${disabled}${extraProps}>${children}</Button>`;
}

const variantOptions = Object.keys(
  buttonVariantConfig.variants.variant,
) as (keyof typeof buttonVariantConfig.variants.variant)[];

const sizeOptions = Object.keys(
  buttonVariantConfig.variants.size,
) as (keyof typeof buttonVariantConfig.variants.size)[];

const iconSizeOptions = Object.keys(buttonVariantConfig.variants.size).filter(
  (size) => size.startsWith("icon-"),
) as (keyof typeof buttonVariantConfig.variants.size)[];

const meta = preview.meta({
  component: Button,
  parameters: {
    docs: {
      description: {
        component:
          'A clickable action element with five variants for signaling relative importance, four regular sizes for matching visual weight to context, and their respective `icon-[size]` sizes for icon-only use. Pick a variant by asking "how much attention should this compete for against everything else on screen?", instead of isolated visual aesthetics. Supports optional leading/trailing icons via `data-slot` to reinforce meaning or hint at where an action leads.',
      },
    },
    controls: {
      include: ["variant", "size", "children", "disabled", "onClick"],
    },
  },
  args: {
    variant: "primary",
    size: "regular",
    children: "Label",
    disabled: false,
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: "select",
      options: variantOptions,
    },
    size: {
      control: "select",
      options: sizeOptions,
      table: {
        type: {
          summary: Object.keys(buttonVariantConfig.variants.size).join(" | "),
        },
      },
    },
    disabled: {
      control: "boolean",
    },
    onClick: {
      control: false,
      description: "Called when the button is clicked",
      table: { category: "Events" },
    },
  },
});

export const Primary = meta.story({
  args: {
    variant: "primary",
  },
  parameters: {
    docs: {
      description: {
        story:
          'The one action you want the user\'s eye drawn to first. Reserve it for the single most important action in a given screen or section - if two things compete for "primary," neither reads as the default anymore and the whole hierarchy collapses. When a flow genuinely needs two strong calls-to-action side by side, pair Primary with Secondary rather than using Primary twice.',
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof Button> },
        ) => code(args, args.children as string),
      },
    },
  },
});

export const Secondary = meta.story({
  args: {
    variant: "secondary",
  },
  parameters: {
    docs: {
      description: {
        story:
          'A high-contrast, inverse-fill counterpart to Primary, built for the rare case where a screen needs two actions competing for attention without either one reading as "the brand default." If only one action truly matters, use Tertiary or Ghost instead so the hierarchy stays legible.',
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof Button> },
        ) => code(args, args.children as string),
      },
    },
  },
});

export const Tertiary = meta.story({
  args: {
    variant: "tertiary",
    size: "regular",
  },
  parameters: {
    docs: {
      description: {
        story:
          'The default choice for supporting actions that live next to a Primary or Secondary button: "Cancel" beside "Save," a row action beside a table\'s main CTA. Low enough emphasis that it doesn\'t fight for attention, but still reads as a deliberate, clickable action. If you\'re using more than one Tertiary button in the same view for genuinely different actions, double check none of them should actually be the Primary.',
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof Button> },
        ) => code(args, args.children as string),
      },
    },
  },
});

export const Ghost = meta.story({
  args: {
    variant: "ghost",
    size: "regular",
    disabled: false,
    children: "Label",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The lowest-emphasis button that's transparent until interacted with, so it recedes into the layout. Use it for optional, dismissive or unfavourable actions (closing a panel, \"skip for now\") and in dense contexts like toolbars or repeated list/row actions where a filled button at every row would create visual noise. Because it has so little inherent affordance, avoid using it for anything the user must notice - pair with clear copy or icon so intent doesn't get lost in the background.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof Button> },
        ) => code(args, args.children as string),
      },
    },
  },
});

export const Destructive = meta.story({
  args: {
    variant: "destructive",
  },
  parameters: {
    docs: {
      description: {
        story:
          'Signals that an action is irreversible or has real consequences - deleting data, cancelling without saving, taking up design as a career. Its danger colour is the whole point, so it should never appear next to a look-alike action for something harmless; if a screen has both a destructive and a safe action, make sure they\'re visually and spatially distinct (e.g. "Cancel" as Tertiary/Ghost, "Delete" as Destructive) so a misclick isn\'t easy. Pair with a confirmation step when the consequence can\'t be undone.',
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof Button> },
        ) => code(args, args.children as string),
      },
    },
  },
});

export const WithLeadingIcon = meta.story({
  tags: ["!dev"],
  args: {
    variant: "primary",
    children: (
      <>
        <PersonIcon data-slot="leading-icon" />
        Label
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'A leading icon works as a scan aid - it should let users recognize the action\'s category before they even read the label (a person icon says "this is about your account" faster than text alone). Only reach for one when the icon is unambiguous and reinforces the label; a vague or merely decorative icon adds visual weight without adding clarity, which defeats the purpose.',
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof Button> },
        ) =>
          code(
            args,
            `
  <PersonIcon data-slot="leading-icon" />
  Label
`,
          ),
      },
    },
  },
});

export const WithTrailingIcon = meta.story({
  tags: ["!dev"],
  args: {
    variant: "primary",
    size: "regular",
    disabled: false,
    children: (
      <>
        Label
        <ChevronForwardIcon data-slot="trailing-icon" />
      </>
    ),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Trailing icons carry directional meaning - they signal that clicking moves the user forward (to a next step, external destination, or expanded state), so reserve this placement for actions that actually advance something, like "Continue" or "Next." Putting a trailing icon on a non-directional action (like "Save") creates a mismatch between what the icon promises and what actually happens.',
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof Button> },
        ) =>
          code(
            args,
            `
  Label
  <ChevronForwardIcon data-slot="trailing-icon" />
`,
          ),
      },
    },
  },
});

export const WithIcons = meta.story({
  args: {
    variant: "primary",
    size: "regular",
    disabled: false,
    children: "Label",
  },
  render: (args) => (
    <Button {...args}>
      <PersonIcon data-slot="leading-icon" />
      {args.children}
      <ChevronForwardIcon data-slot="trailing-icon" />
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Combining leading and trailing icons on one button should stay rare - each icon adds cognitive load, and stacking both risks turning a simple label into something the user has to decode rather than read. Use this pattern only when both icons are independently meaningful, not as a default way to make a button feel more polished.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof Button> },
        ) =>
          code(
            args,
            `
  <PersonIcon data-slot="leading-icon" />
  Label
  <ChevronForwardIcon data-slot="trailing-icon" />
`,
          ),
      },
    },
  },
});

export const IconOnly = meta.story({
  args: {
    variant: "primary",
    size: "icon-regular",
    disabled: false,
    "aria-label": "Person",
    children: "Label",
  },
  render: (args) => (
    <Button {...args}>
      <PersonIcon />
    </Button>
  ),
  argTypes: {
    children: {
      control: false,
    },
    size: {
      control: "select",
      options: iconSizeOptions,
    },
  },
  parameters: {
    docs: {
      description: {
        story:
          "A circular button with no visible label, meant for compact, high-frequency contexts - toolbars, table row actions, mobile nav - where a text label would either be redundant (the icon is already universally understood) or the space genuinely can't fit one. Because there's no text for assistive tech, `aria-label` isn't optional here - it's the only accessible name the button has. If the icon's meaning isn't instantly obvious to a new user, this is the wrong pattern.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof Button> },
        ) =>
          code(
            args,
            `
  <PersonIcon />
`,
            ' aria-label="Person"',
          ),
      },
    },
  },
});

export const Loading = meta.story({
  args: {
    variant: "primary",
    size: "regular",
    disabled: false,
    children: "Label",
  },
  render: (args) => (
    <Button {...args} className="pointer-events-none">
      <ProgressActivityIcon data-slot="leading-icon" className="animate-spin" />
      {args.children}
    </Button>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "A temporary state that communicates that an action was received and is being processed. Use it for actions that take long enough to create uncertainty. To prevent duplicate submissions, consider adding `pointer-events-none` while loading. This component has no built-in loading state; replace any existing leading icon with a spinning `ProgressActivityIcon` while the action is in progress, then restore it when complete.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof Button> },
        ) =>
          code(
            args,
            `
  <ProgressActivityIcon data-slot="leading-icon" className="animate-spin" />
  Label
`,
            ' className="pointer-events-none"',
          ),
      },
    },
  },
});
