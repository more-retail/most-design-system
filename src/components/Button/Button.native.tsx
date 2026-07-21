import React, { useMemo } from "react";
import {
  Pressable,
  type PressableProps,
  type StyleProp,
  StyleSheet,
  Text,
  type ViewStyle,
} from "react-native";

import {
  color,
  spacing,
  typography,
} from "../../tokens/reactNative/stylesheet";

type ButtonVariant = "primary" | "secondary" | "tertiary" | "ghost";
type ButtonSize =
  | "lg"
  | "md"
  | "sm"
  | "xs"
  | "icon"
  | "icon-lg"
  | "icon-md"
  | "icon-sm"
  | "icon-xs";

interface ButtonProps extends Omit<PressableProps, "style" | "children"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  label?: string;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
}

const variantTextColor: Record<ButtonVariant, string> = {
  primary: color.white,
  secondary: color.white,
  tertiary: color.neutral[110],
  ghost: color.neutral[110],
};

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "md",
  disabled = false,
  label,
  style,
  children,
  ...props
}) => {
  const textColor = disabled ? color.neutral[40] : variantTextColor[variant];

  const staticStyle = useMemo(
    () =>
      StyleSheet.compose(
        StyleSheet.compose(styles.base, sizeStyles[size]),
        disabled ? variantDisabledStyles[variant] : variantBaseStyles[variant],
      ),
    [size, variant, disabled],
  );

  return (
    <Pressable
      disabled={disabled}
      style={({ pressed }) => [
        staticStyle,
        pressed && variantPressedStyles[variant],
        style,
      ]}
      {...props}
    >
      {label ? (
        <Text style={[typography.labelThick[30], { color: textColor }]}>
          {label}
        </Text>
      ) : null}
      {children}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "flex-start",
    borderRadius: 9999,
  },
});

const variantBaseStyles = StyleSheet.create({
  primary: {
    backgroundColor: color.orange[60],
    boxShadow: "0 4px 12px 0 rgba(250, 75, 22, 0.50)",
  },
  secondary: {
    backgroundColor: color.neutral[100],
  },
  tertiary: {
    backgroundColor: color.neutral[10],
  },
  ghost: {
    backgroundColor: "transparent",
  },
});

const variantPressedStyles = StyleSheet.create({
  primary: {
    backgroundColor: color.orange[70],
  },
  secondary: {
    backgroundColor: color.neutral[110],
  },
  tertiary: {
    backgroundColor: color.neutral[20],
  },
  ghost: {
    backgroundColor: color.neutral[20],
  },
});

const variantDisabledStyles = StyleSheet.create({
  primary: {
    backgroundColor: color.neutral[20],
  },
  secondary: {
    backgroundColor: color.neutral[20],
  },
  tertiary: {
    backgroundColor: color.neutral[20],
  },
  ghost: {},
});

const sizeStyles = StyleSheet.create({
  lg: {
    height: spacing[160],
    paddingHorizontal: spacing[80],
    gap: spacing[50],
  },
  md: {
    height: spacing[140],
    paddingHorizontal: spacing[60],
    gap: spacing[50],
  },
  sm: {
    height: spacing[110],
    paddingHorizontal: spacing[50],
    gap: spacing[40],
  },
  xs: { height: spacing[80], paddingHorizontal: spacing[40], gap: spacing[30] },
  icon: { width: spacing[140], height: spacing[140] },
  "icon-lg": { width: spacing[160], height: spacing[160] },
  "icon-md": { width: spacing[140], height: spacing[140] },
  "icon-sm": { width: spacing[110], height: spacing[110] },
  "icon-xs": { width: spacing[80], height: spacing[80] },
});

export { Button };
export type { ButtonProps, ButtonVariant, ButtonSize };
