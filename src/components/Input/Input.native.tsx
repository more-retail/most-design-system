import React from "react";
import {
  type StyleProp,
  StyleSheet,
  TextInput,
  type TextInputProps,
  View,
  type ViewStyle,
} from "react-native";

import {
  color,
  spacing,
  typography,
} from "../../tokens/reactNative/stylesheet";

interface InputProps extends Omit<TextInputProps, "editable" | "style"> {
  error?: boolean;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const Input: React.FC<InputProps> = ({
  error = false,
  disabled = false,
  containerStyle,
  onFocus,
  onBlur,
  ...inputProps
}) => {
  const [focused, setFocused] = React.useState(false);

  return (
    <View
      style={[
        styles.container,
        focused && styles.containerFocused,
        error && styles.containerError,
        disabled && styles.containerDisabled,
        containerStyle,
      ]}
      pointerEvents={disabled ? "none" : undefined}
    >
      <TextInput
        editable={!disabled}
        style={textStyles.input}
        placeholderTextColor={color.neutral[40]}
        selectionColor={color.orange[60]}
        cursorColor={color.orange[60]}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: spacing[140],
    width: 300,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing[60],
    borderRadius: 12,
    backgroundColor: color.neutral[10],
    borderWidth: 2,
    borderColor: "transparent",
  },
  containerFocused: {
    borderColor: color.neutral[110],
  },
  containerError: {
    borderColor: color.red[70],
    borderWidth: 1,
  },
  containerDisabled: {
    opacity: 0.4,
  },
  input: {
    flex: 1,
    color: color.neutral[110],
    backgroundColor: "transparent",
    padding: 0,
    margin: 0,
  },
});

const textStyles = {
  input: StyleSheet.compose(typography.para[30], styles.input),
};

export { Input };
export type { InputProps };
