import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const widthSuffixes = [
  "base-10",
  "base-20",
  "base-30",
  "semantic-default",
  "semantic-thick",
  "semantic-focus",
];

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      rounded: [
        {
          rounded: [
            "base-0",
            "base-10",
            "base-20",
            "base-30",
            "base-40",
            "base-50",
            "base-60",
            "base-70",
            "base-80",
            "base-90",
            "base-100",
            "base-full",
          ],
        },
      ],
      "border-w": [{ border: widthSuffixes }],
      "ring-w": [{ ring: widthSuffixes }],
      "outline-w": [{ outline: widthSuffixes }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Cn {
  cn: typeof cn;
}

export interface OptionalCn {
  cn?: typeof cn;
}

export function tw(strings: TemplateStringsArray) {
  return strings[0];
}
