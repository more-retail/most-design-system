import React from "react";
import {
  Pressable,
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewStyle,
} from "react-native";

import {
  color,
  spacing,
  typography,
} from "../../tokens/reactNative/stylesheet";

type SnackbarVariant = "warning" | "error";

interface SnackbarProps {
  variant?: SnackbarVariant;
  callout?: string;
  message?: string;
  showAction?: boolean;
  actionLabel?: string;
  onAction?: () => void;
  style?: StyleProp<ViewStyle>;
}

const Snackbar: React.FC<SnackbarProps> = ({
  variant = "warning",
  callout,
  message,
  showAction = true,
  actionLabel,
  onAction,
  style,
}) => {
  return (
    <View style={[styles.base, variantBgStyles[variant], style]}>
      <View style={styles.content}>
        {callout ? (
          <Text style={[textStyles.callout, variantTextStyles[variant]]}>
            {callout}
          </Text>
        ) : null}

        {message ? (
          <Text style={[typography.para[30], variantTextStyles[variant]]}>
            {message}
          </Text>
        ) : null}
      </View>

      {showAction && actionLabel ? (
        <Pressable
          onPress={onAction}
          accessibilityRole="button"
          style={styles.actionButton}
        >
          <Text style={[typography.label[30], variantTextStyles[variant]]}>
            {actionLabel}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
};
const styles = StyleSheet.create({
  base: {
    flexDirection: "row",
    gap: spacing[50],
    alignItems: "flex-end",
    padding: spacing[60],
    borderRadius: 16,
    width: 328,
    boxShadow: "0 16px 32px 0 rgba(23, 33, 40, 0.12)",
  },
  content: {
    flex: 1,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: spacing[40],
    minWidth: 0,
  },
  callout: {
    fontStyle: "italic",
    width: "100%",
  },
  actionButton: {
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
});

const variantBgStyles = StyleSheet.create({
  warning: { backgroundColor: color.gold[50] },
  error: { backgroundColor: color.red[60] },
});

const variantTextStyles = StyleSheet.create({
  warning: { color: color.neutral[110] },
  error: { color: color.white },
});

const textStyles = {
  callout: StyleSheet.compose(typography["para pop"][30], styles.callout),
};

export { Snackbar };
export type { SnackbarProps, SnackbarVariant };
