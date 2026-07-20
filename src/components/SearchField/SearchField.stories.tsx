import type { ComponentProps } from "react";

import preview from "@/storybook/preview";

import { SearchField, SearchFieldClear } from "./SearchField";
import { searchFieldVariantConfig } from "./SearchField.variants";

function code(args: ComponentProps<typeof SearchField>, children: string) {
  const { size: defaultSize } = searchFieldVariantConfig.defaultVariants;

  const size =
    args.size && args.size !== defaultSize ? ` size="${args.size}"` : "";
  const disabled = args.disabled ? ` disabled` : "";

  return `<SearchField${size}${disabled}>${children}</SearchField>`;
}

const sizeOptions = Object.keys(
  searchFieldVariantConfig.variants.size,
) as (keyof typeof searchFieldVariantConfig.variants.size)[];

const meta = preview.meta({
  component: SearchField,
  parameters: {
    docs: {
      description: {
        component:
          "A pill-shaped input for filtering or searching content, distinct from `InputField` by its rounded shape and lack of a visible label - reach for it when the search icon alone is enough to communicate purpose, like a global search bar or a filter above a table. Because there's no visible label, pass `aria-label` for assistive tech.",
      },
    },
    controls: {
      include: ["disabled", "size", "placeholder"],
    },
  },
  args: {
    disabled: false,
    size: "regular",
    placeholder: "Search",
  },
  argTypes: {
    disabled: {
      control: "boolean",
      description:
        "Dims the field and blocks input, signaling the field isn't available right now.",
    },
    size: {
      control: "select",
      options: sizeOptions,
      description:
        "`regular` suits standalone search bars; `small` suits dense layouts like table toolbars or filter bars.",
      table: {
        type: {
          summary: Object.keys(searchFieldVariantConfig.variants.size).join(
            " | ",
          ),
        },
      },
    },
  },
});

export const Default = meta.story({
  args: {
    "aria-label": "Search",
  },
  parameters: {
    docs: {
      description: {
        story:
          "The baseline field: a search icon and an input. On its own, this is enough for a lightweight filter bar.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof SearchField> },
        ) => code(args, ""),
      },
    },
  },
});

export const Populated = meta.story({
  args: {
    "aria-label": "Search",
    defaultValue: "Lorem",
    children: <SearchFieldClear aria-label="Clear search" />,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Once a query is entered, swap the shortcut hint for a clear button so users can reset the field in one click rather than selecting and deleting the text manually.",
      },
      source: {
        type: "dynamic",
        language: "tsx",
        transform: (
          _code: string,
          { args }: { args: ComponentProps<typeof SearchField> },
        ) => code(args, `\n  <SearchFieldClear aria-label="Clear search" />\n`),
      },
    },
  },
});
