import React from "react";
import {
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from "react-native";

import {
  DoneAllIcon,
  EmergencyHomeIcon,
  InfoIcon,
  WarningIcon,
} from "../../icons/index.native";
import {
  color,
  spacing,
  typography,
} from "../../tokens/reactNative/stylesheet";

type HintVariant = "default" | "warning" | "error" | "success";

type IconComponent = React.FC<{ size: number; fill: string }>;

interface HintProps {
  variant?: HintVariant;
  text?: string;
  icon?: IconComponent;
  style?: StyleProp<ViewStyle>;
}

const variantConfig: Record<HintVariant, { bg: string; fg: string }> = {
  default: { bg: color.orange[5], fg: color.orange[60] },
  warning: { bg: color.red[5], fg: color.red[70] },
  error: { bg: color.red[5], fg: color.red[70] },
  success: { bg: color.green[5], fg: color.green[70] },
};

const ICONS: Record<HintVariant, IconComponent> = {
  default: InfoIcon,
  warning: WarningIcon,
  error: EmergencyHomeIcon,
  success: DoneAllIcon,
};

const Hint: React.FC<HintProps> = ({
  variant = "default",
  text,
  icon,
  style,
}) => {
  const { bg, fg } = variantConfig[variant];
  const Icon = icon ?? ICONS[variant];

  return (
    <View style={[styles.base, { backgroundColor: bg }, style]}>
      <Icon size={spacing[60]} fill={fg} />
      <Text style={[typography.para[30], { color: fg }]}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    flexDirection: "column",
    gap: spacing[40],
    alignItems: "flex-start",
    padding: spacing[50],
    borderRadius: 12,
    width: "100%",
    maxWidth: 440,
  },
});

export { Hint };
export type { HintProps, HintVariant };
