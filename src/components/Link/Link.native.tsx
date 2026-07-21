import React from "react";
import { Pressable, type PressableProps, StyleSheet, Text } from "react-native";

import { color, typography } from "../../tokens/reactNative/stylesheet";

interface LinkProps extends Omit<PressableProps, "style" | "disabled"> {
  label?: string;
  disabled?: boolean;
}

const Link: React.FC<LinkProps> = ({
  label = "Label",
  disabled = false,
  ...props
}) => {
  return (
    <Pressable disabled={disabled} {...props}>
      {({ pressed }) => (
        <Text
          style={[
            textStyles.label,
            pressed && styles.pressed,
            disabled && styles.disabled,
          ]}
        >
          {label}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  label: {
    color: color.orange[60],
  },
  pressed: {
    color: color.orange[70],
  },
  disabled: {
    color: color.neutral[40],
  },
});

const textStyles = {
  label: StyleSheet.compose(typography.label[30], styles.label),
};

export { Link };
export type { LinkProps };
