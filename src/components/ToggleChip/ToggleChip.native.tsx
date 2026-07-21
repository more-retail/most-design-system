import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

import { CloseIcon, DefaultAppsIcon } from "../../icons/index.native";
import {
  color,
  spacing,
  typography,
} from "../../tokens/reactNative/stylesheet";

export type ToggleChipVariant = "filled" | "outlined";
export type ToggleChipSize = "lg" | "md" | "sm";

export interface ToggleChipProps {
  variant?: ToggleChipVariant;
  size?: ToggleChipSize;
  label?: string;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onPress?: () => void;
  onRemove?: () => void;
  style?: StyleProp<ViewStyle>;
}

const iconSizes = {
  lg: spacing[60],
  md: spacing[60],
  sm: spacing[50],
} as const;

const ToggleChip: React.FC<ToggleChipProps> = ({
  variant = "filled",
  size = "md",
  label,
  icon,
  trailingIcon,
  selected = false,
  disabled = false,
  onPress,
  onRemove,
  style,
}) => {
  const iconFill = disabled ? color.neutral[60] : color.neutral[110];

  const resolvedIcon = icon ?? (
    <DefaultAppsIcon size={iconSizes[size]} fill={iconFill} />
  );
  const resolvedTrailingIcon = trailingIcon ?? (
    <CloseIcon size={iconSizes[size]} fill={iconFill} />
  );

  const borderStyle = selected
    ? styles.borderSelected
    : variant === "filled"
      ? styles.borderFilled
      : styles.borderOutlined;

  return (
    <Pressable
      style={[
        styles.base,
        sizeStyles[size],
        borderStyle,
        selected || variant === "filled" ? styles.bgFilled : null,
        style,
      ]}
      onPress={disabled ? undefined : onPress}
      accessibilityRole="button"
      disabled={disabled}
    >
      {resolvedIcon && <View style={styles.iconWrapper}>{resolvedIcon}</View>}
      {label && (
        <Text
          style={[typography.paraThick[30], styles.label]}
          numberOfLines={1}
        >
          {label}
        </Text>
      )}
      {!disabled && (
        <Pressable
          style={styles.trailingWrapper}
          onPress={onRemove}
          hitSlop={8}
        >
          {resolvedTrailingIcon}
        </Pressable>
      )}
    </Pressable>
  );
};

const sizeStyles = StyleSheet.create({
  lg: {
    height: spacing[140],
    paddingHorizontal: spacing[60],
    gap: spacing[50],
    borderRadius: spacing[40],
  },
  md: {
    height: spacing[110],
    paddingHorizontal: spacing[50],
    gap: spacing[40],
    borderRadius: spacing[30],
  },
  sm: {
    height: spacing[80],
    paddingHorizontal: spacing[40],
    gap: spacing[30],
    borderRadius: spacing[20],
  },
});

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  bgFilled: {
    backgroundColor: color.neutral[10],
  },
  borderSelected: {
    borderWidth: 2,
    borderColor: color.neutral[110],
  },
  borderFilled: {
    borderWidth: 2,
    borderColor: "transparent",
  },
  borderOutlined: {
    borderWidth: 1,
    borderColor: color.neutral[10],
  },
  label: {
    color: color.neutral[110],
  },
  iconWrapper: {
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  trailingWrapper: {
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
  },
});

export { ToggleChip };
