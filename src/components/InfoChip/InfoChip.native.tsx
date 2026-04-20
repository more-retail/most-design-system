import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

import {
  color,
  spacing,
  typography,
} from "../../tokens/reactNative/stylesheet";

export type InfoChipVariant = "filled" | "outlined";
export type InfoChipSize = "md" | "sm";

export interface InfoChipProps {
  variant?: InfoChipVariant;
  size?: InfoChipSize;
  label?: string;
  icon?: React.ReactNode;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const InfoChip: React.FC<InfoChipProps> = ({
  variant = "filled",
  size = "md",
  label,
  icon,
  onPress,
  style,
}) => {
  return (
    <Pressable
      style={[
        styles.base,
        sizeStyles[size],
        variant === "filled" ? styles.filled : styles.outlined,
        style,
      ]}
      onPress={onPress}
    >
      {icon && <View style={styles.iconWrapper}>{icon}</View>}
      {label && (
        <Text
          style={[typography.paraThick[30], styles.label]}
          numberOfLines={1}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  filled: {
    backgroundColor: color.neutral[10],
  },
  outlined: {
    borderWidth: 1,
    borderColor: color.neutral[10],
  },
  iconWrapper: {
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: color.neutral[110],
    flexShrink: 1,
  },
});

const sizeStyles = StyleSheet.create({
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

export { InfoChip };
