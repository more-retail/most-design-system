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

interface TextareaProps
  extends Omit<
    TextInputProps,
    "editable" | "style" | "multiline" | "textAlignVertical"
  > {
  error?: boolean;
  disabled?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

const Textarea: React.FC<TextareaProps> = ({
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
        multiline
        textAlignVertical="top"
        editable={!disabled}
        style={textStyles.input}
        placeholderTextColor={disabled ? color.neutral[60] : color.neutral[40]}
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
    height: 176,
    width: 300,
    padding: spacing[60],
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
    backgroundColor: color.neutral[20],
  },
  input: {
    flex: 1,
    color: color.neutral[110],
    backgroundColor: "transparent",
    padding: 0,
    margin: 0,
  },
  inputDisabled: {
    color: color.neutral[60],
  },
});

const textStyles = {
  input: StyleSheet.compose(typography.para[30], styles.input),
};

export { Textarea };
export type { TextareaProps };
