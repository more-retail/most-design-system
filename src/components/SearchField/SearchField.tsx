import React from "react";

import CloseIcon from "@material-symbols/svg-700/sharp/close.svg?react";
import SearchIcon from "@material-symbols/svg-700/sharp/search-fill.svg?react";

import {  cn  } from "@/utils/cn";

/* -------------------------------------------------------------------------------------------------
 * SearchField
 * -----------------------------------------------------------------------------------------------*/

type SearchFieldSize = "md" | "sm";

const sizeStyles: Record<
  SearchFieldSize,
  { height: string; px: string; gap: string; width: string }
> = {
  md: { height: "h-140", px: "px-60", gap: "gap-50", width: "w-[300px]" },
  sm: { height: "h-110", px: "px-50", gap: "gap-40", width: "w-[240px]" },
};

interface SearchFieldProps {
  size?: SearchFieldSize;
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  disabled?: boolean;
  showShortcutKey?: boolean;
  className?: string;
}

// ── Component ────────────────────────────────────────────────────────────────

const SearchField = ({
  size = "md",
  value = "",
  onChange,
  onClear,
  placeholder = "Search",
  disabled = false,
  showShortcutKey = false,
  className,
}: SearchFieldProps) => {
  const [isFocused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  // Scroll to end so the most recent characters are always visible when not focused
  React.useEffect(() => {
    if (inputRef.current && !isFocused) {
      inputRef.current.scrollLeft = inputRef.current.scrollWidth;
    }
  }, [value, isFocused]);

  const ss = sizeStyles[size];
  const hasValue = value.length > 0;

  // Shortcut key badge: md-only by default, hidden while focused
  const showKey = (showShortcutKey ?? size === "md") && !isFocused;


  function handleClear() {
    if (onClear) {
      onClear();
    } else {
      onChange?.("");
    }
  }

  return (
    <div
      className={cn(
        "group flex items-center rounded-full bg-neutral-10 transition-colors border-2",
        ss.height,
        ss.px,
        ss.gap,
        ss.width,
        !disabled && isFocused
          ? "border-neutral-110"
          : "border-transparent hover:border-neutral-20",
        disabled && "pointer-events-none",
        className,
      )}
    >
      {/* Search icon */}
      <SearchIcon
        className={cn(
          "shrink-0 size-60 text-neutral-110",
          disabled && "opacity-40",
        )}
      />

      {/* Text input */}
      <input
        ref={inputRef}
        type="text"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={cn(
          "flex-1 min-w-0 bg-transparent outline-none",
          "typography-para-30 text-neutral-110 caret-orange-60",
          "placeholder:text-neutral-40",
          disabled && hasValue && "text-neutral-60",
        )}
      />

      {/* Clear button */}
      {hasValue && !disabled && (
        <button
          type="button"
          aria-label="Clear search"
          onClick={handleClear}
          className={cn(
            "shrink-0 items-center justify-center text-neutral-110",
            size === "md" ? "flex" : "hidden group-hover:flex group-focus-within:flex",
          )}
        >
          <CloseIcon className="size-60" />
        </button>
      )}

      {/* Shortcut key badge */}
      {showKey && (
        <div className="shrink-0 flex items-center justify-center min-w-[24px] border border-neutral-40 rounded-lg px-40 py-30">
          <span className="typography-label-30 text-neutral-40">/</span>
        </div>
      )}
    </div>
  );
}

SearchField.displayName = "SearchField";

export { SearchField };
export type { SearchFieldProps, SearchFieldSize };
