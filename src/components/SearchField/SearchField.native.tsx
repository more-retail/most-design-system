import React from "react";
import {
  Pressable,
  StyleSheet,
  TextInput,
  type TextInputProps,
  View,
} from "react-native";

import { CloseIcon, SearchIcon } from "../../icons/index.native";
import {
  color,
  spacing,
  typography,
} from "../../tokens/reactNative/stylesheet";

/* -------------------------------------------------------------------------------------------------
 * Types
 * -----------------------------------------------------------------------------------------------*/

type SearchFieldSize = "md" | "sm";

interface SearchFieldProps
  extends Omit<TextInputProps, "editable" | "style" | "onChange"> {
  size?: SearchFieldSize;
  value?: string;
  onChange?: (value: string) => void;
  onClear?: () => void;
  placeholder?: string;
  disabled?: boolean;
}

/* -------------------------------------------------------------------------------------------------
 * Size map — mirrors web sizeStyles
 * -----------------------------------------------------------------------------------------------*/

const sizeMap: Record<
  SearchFieldSize,
  { height: number; paddingHorizontal: number; gap: number; width: number }
> = {
  md: {
    height: spacing[140],
    paddingHorizontal: spacing[60],
    gap: spacing[50],
    width: 300,
  },
  sm: {
    height: spacing[110],
    paddingHorizontal: spacing[50],
    gap: spacing[40],
    width: 240,
  },
};

/* -------------------------------------------------------------------------------------------------
 * Component
 * -----------------------------------------------------------------------------------------------*/

const SearchField: React.FC<SearchFieldProps> = ({
  size = "md",
  value = "",
  onChange,
  onClear,
  placeholder = "Search",
  disabled = false,
  onFocus,
  onBlur,
  ...inputProps
}) => {
  const [focused, setFocused] = React.useState(false);
  const inputRef = React.useRef<TextInput>(null);

  const hasValue = value.length > 0;
  const showClear = hasValue && !disabled;

  const handleClear = () => {
    onClear?.();
    inputRef.current?.focus();
  };

  const ss = sizeMap[size];

  return (
    <View
      style={[
        styles.root,
        {
          width: ss.width,
          height: ss.height,
          paddingHorizontal: ss.paddingHorizontal,
          gap: ss.gap,
        },
        focused && styles.rootFocused,
        disabled && styles.rootDisabled,
      ]}
      pointerEvents={disabled ? "none" : undefined}
    >
      {/* Search icon */}
      <SearchIcon size={spacing[60]} fill={color.neutral[110]} />

      {/* Text input */}
      <TextInput
        ref={inputRef}
        value={value}
        placeholder={placeholder}
        editable={!disabled}
        style={styles.input}
        placeholderTextColor={color.neutral[40]}
        selectionColor={color.orange[60]}
        cursorColor={color.orange[60]}
        onChangeText={onChange}
        onFocus={(e) => {
          setFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setFocused(false);
          onBlur?.(e);
        }}
        {...inputProps}
      />

      {/* Clear button */}
      {showClear && (
        <Pressable
          onPress={handleClear}
          hitSlop={8}
          style={styles.clearButton}
          accessibilityLabel="Clear search"
          accessibilityRole="button"
        >
          <CloseIcon size={spacing[60]} fill={color.neutral[110]} />
        </Pressable>
      )}
    </View>
  );
};

/* -------------------------------------------------------------------------------------------------
 * Styles
 * -----------------------------------------------------------------------------------------------*/

const styles = StyleSheet.create({
  root: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: color.neutral[10],
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: "transparent",
  },
  rootFocused: {
    borderColor: color.neutral[110],
  },
  rootDisabled: {
    opacity: 0.4,
  },
  input: {
    flex: 1,
    ...typography.para[30],
    color: color.neutral[110],
    backgroundColor: "transparent",
    padding: 0,
    margin: 0,
  },
  clearButton: {
    flexShrink: 0,
    width: spacing[60],
    height: spacing[60],
    alignItems: "center",
    justifyContent: "center",
  },
});

/* -------------------------------------------------------------------------------------------------
 * Exports
 * -----------------------------------------------------------------------------------------------*/

SearchField.displayName = "SearchField";

export { SearchField };
export type { SearchFieldProps, SearchFieldSize };
