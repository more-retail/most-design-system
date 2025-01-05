import type { FileHeader } from "style-dictionary/types";

export const mostFileHeader: FileHeader = async (defaultMessages = []) => [
  "most design system by more",
  "",
  ...defaultMessages,
  `Generated on ${new Date().toLocaleString("en-US", {
    timeZone: "Asia/Kolkata",
    dateStyle: "long",
    timeStyle: "long",
  })}`,
];
