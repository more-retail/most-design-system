import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Cn {
  cn: typeof cn;
}

export interface OptionalCn {
  cn?: typeof cn;
}
