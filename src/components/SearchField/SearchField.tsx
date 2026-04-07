import React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import CloseIcon from "@material-symbols/svg-700/sharp/close.svg?react";
import SearchIcon from "@material-symbols/svg-700/sharp/search-fill.svg?react";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/InputGroup/InputGroup";
import { cn } from "@/utils/cn";

const searchFieldVariants = cva("rounded-full", {
  variants: {
    size: {
      md: "h-140 w-[300px]",
      sm: "h-110 w-[240px]",
    },
  },
  defaultVariants: { size: "md" },
});

type SearchFieldSize = NonNullable<VariantProps<typeof searchFieldVariants>["size"]>;

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

  React.useEffect(() => {
    if (inputRef.current && !isFocused) {
      inputRef.current.scrollLeft = inputRef.current.scrollWidth;
    }
  }, [value, isFocused]);

  const hasValue = value.length > 0;
  const showKey = showShortcutKey && !isFocused;

  function handleClear() {
    if (onClear) {
      onClear();
    } else {
      onChange?.("");
    }
  }

  return (
    <InputGroup
      className={cn(
        searchFieldVariants({ size }),
        className,
      )}
    >
      <InputGroupAddon align="inline-start" className="cursor-default pl-60">
        <SearchIcon className="size-60 text-neutral-110" />
      </InputGroupAddon>

      <InputGroupInput
        ref={inputRef}
        type="text"
        value={value}
        placeholder={placeholder}
        disabled={disabled}
        onChange={(e) => onChange?.(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />

      {(hasValue || showKey) && (
        <InputGroupAddon align="inline-end" className="cursor-default">
          {hasValue && (
            <InputGroupButton
              aria-label="Clear search"
              onClick={handleClear}
              disabled={disabled}
            >
              <CloseIcon className="size-60" />
            </InputGroupButton>
          )}
          {showKey && !hasValue && (
            <div className="flex items-center justify-center min-w-[24px] border border-neutral-40 rounded-lg px-40 py-30">
              <span className="typography-label-30 text-neutral-40">/</span>
            </div>
          )}
        </InputGroupAddon>
      )}
    </InputGroup>
  );
};

SearchField.displayName = "SearchField";

export { SearchField };
export type { SearchFieldProps, SearchFieldSize };
