"use client";

import * as React from "react";

import { Input as InputPrimitive } from "@base-ui/react/input";
import { type VariantProps } from "class-variance-authority";

import { cn } from "@/utils/cn";

import { searchFieldVariants } from "./SearchField.variants";

import CloseIcon from "@material-symbols/svg-700/sharp/close-fill.svg?react";
import SearchIcon from "@material-symbols/svg-700/sharp/search-fill.svg?react";

type SearchFieldProps = Omit<
  React.ComponentProps<typeof InputPrimitive>,
  "size"
> &
  VariantProps<typeof searchFieldVariants> & {
    children?: React.ReactNode;
  };

function SearchField({
  className,
  size = "regular",
  disabled,
  children,
  ...props
}: SearchFieldProps) {
  const inputRef = React.useRef<HTMLElement>(null);

  return (
    // oxlint-disable-next-line jsx-a11y/no-static-element-interactions, jsx-a11y/click-events-have-key-events -- extends the click target to the real <input> descendant, which already handles keyboard interaction
    <div
      data-slot="search-field"
      data-disabled={disabled || undefined}
      onClick={() => inputRef.current?.focus()}
      className={cn(searchFieldVariants({ size, className }))}
    >
      <SearchIcon data-slot="search-icon" className="search-icon" />

      <InputPrimitive
        ref={inputRef}
        type="search"
        disabled={disabled}
        data-slot="input"
        className="input"
        {...props}
      />

      {children}
    </div>
  );
}

function SearchFieldClear({
  className,
  ...props
}: React.ComponentProps<"button">) {
  return (
    <button
      type="button"
      data-slot="search-field-clear"
      className={cn("clear-icon", className)}
      {...props}
    >
      <CloseIcon />
    </button>
  );
}

export { SearchField, SearchFieldClear };
export type { SearchFieldProps };
