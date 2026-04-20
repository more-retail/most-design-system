import React from "react";
import {
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  type TextInputProps,
  View,
} from "react-native";

import { CheckIcon, CloseIcon } from "../../icons/index.native";
import {
  color,
  spacing,
  typography,
} from "../../tokens/reactNative/stylesheet";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "../InputGroup/InputGroup.native";
import { Label } from "../Label/Label.native";

type TextFieldVariant = "default" | "ghost" | "multiline";

interface TextFieldProps
  extends Omit<
    TextInputProps,
    "editable" | "style" | "multiline" | "textAlignVertical"
  > {
  label?: string;
  leadingIcon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
  errorMessage?: string;
  variant?: TextFieldVariant;
  onConfirm?: () => void;
  onCancel?: () => void;
  disabled?: boolean;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  leadingIcon,
  trailingIcon,
  errorMessage,
  variant = "default",
  onConfirm,
  onCancel,
  onChangeText,
  disabled = false,
  placeholder,
  onFocus,
  onBlur,
  ...inputProps
}) => {
  const [isFocused, setIsFocused] = React.useState(false);

  if (variant === "ghost") {
    const showActions = isFocused && (!!onConfirm || !!onCancel);

    return (
      <View style={styles.root}>
        {label && (
          <Label disabled={disabled} numberOfLines={1} style={styles.label}>
            {label}
          </Label>
        )}

        <View
          style={[
            styles.ghostContainer,
            isFocused && styles.ghostContainerFocused,
            disabled && styles.ghostContainerDisabled,
          ]}
          pointerEvents={disabled ? "none" : undefined}
        >
          <TextInput
            editable={!disabled}
            placeholder={placeholder}
            placeholderTextColor={color.neutral[40]}
            selectionColor={color.orange[60]}
            cursorColor={color.orange[60]}
            style={textStyles.ghostInput}
            onChangeText={onChangeText}
            onFocus={(e) => {
              setIsFocused(true);
              onFocus?.(e);
            }}
            onBlur={(e) => {
              setIsFocused(false);
              onBlur?.(e);
            }}
            {...inputProps}
          />
        </View>

        {showActions && (
          <View style={styles.actions}>
            {onCancel && (
              <Pressable
                onPress={onCancel}
                style={styles.cancelButton}
                accessibilityRole="button"
                accessibilityLabel="Cancel"
              >
                <CloseIcon size={spacing[60]} fill={color.neutral[110]} />
              </Pressable>
            )}
            {onConfirm && (
              <Pressable
                onPress={onConfirm}
                style={styles.confirmButton}
                accessibilityRole="button"
                accessibilityLabel="Confirm"
              >
                <CheckIcon size={spacing[60]} fill={color.white} />
              </Pressable>
            )}
          </View>
        )}
      </View>
    );
  }

  if (variant === "multiline") {
    return (
      <View style={styles.root}>
        {label && (
          <Label disabled={disabled} numberOfLines={1} style={styles.label}>
            {label}
          </Label>
        )}

        <InputGroup error={!!errorMessage} disabled={disabled}>
          <InputGroupTextarea
            placeholder={placeholder}
            onChangeText={onChangeText}
            onFocus={onFocus}
            onBlur={onBlur}
            {...inputProps}
          />
        </InputGroup>

        {errorMessage && (
          <Text style={textStyles.errorText}>{errorMessage}</Text>
        )}
      </View>
    );
  }

  return (
    <View style={styles.root}>
      {label && (
        <Label disabled={disabled} numberOfLines={1} style={styles.label}>
          {label}
        </Label>
      )}

      <InputGroup error={!!errorMessage} disabled={disabled}>
        {leadingIcon && (
          <InputGroupAddon align="inline-start">{leadingIcon}</InputGroupAddon>
        )}
        <InputGroupInput
          placeholder={placeholder}
          onChangeText={onChangeText}
          onFocus={onFocus}
          onBlur={onBlur}
          {...inputProps}
        />
        {trailingIcon && (
          <InputGroupAddon align="inline-end">{trailingIcon}</InputGroupAddon>
        )}
      </InputGroup>

      {errorMessage && <Text style={textStyles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const actionButtonShadow = Platform.select({
  ios: {
    shadowColor: "rgb(23,33,40)",
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 16,
    shadowOpacity: 0.1,
  },
  android: { elevation: 4 },
});

const styles = StyleSheet.create({
  root: {
    width: 300,
    flexDirection: "column",
    alignItems: "flex-start",
    gap: spacing[40],
  },

  label: {
    width: "100%",
    color: color.neutral[110],
  },

  // Ghost
  ghostContainer: {
    width: "100%",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
    paddingHorizontal: spacing[60],
    paddingVertical: spacing[50],
    backgroundColor: "transparent",
  },
  ghostContainerFocused: {
    borderColor: color.neutral[110],
    backgroundColor: color.neutral[10],
  },
  ghostContainerDisabled: {
    opacity: 0.4,
  },
  ghostInput: {
    color: color.neutral[110],
    backgroundColor: "transparent",
    padding: 0,
    margin: 0,
  },

  actions: {
    flexDirection: "row",
    gap: spacing[30],
    justifyContent: "flex-end",
    width: "100%",
  },
  cancelButton: {
    height: spacing[110],
    borderRadius: 9999,
    backgroundColor: color.neutral[10],
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    ...actionButtonShadow,
  },
  confirmButton: {
    height: spacing[110],
    borderRadius: 9999,
    backgroundColor: color.neutral[100],
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    ...actionButtonShadow,
  },
  errorText: {
    color: color.red[70],
  },
});

const textStyles = {
  ghostInput: StyleSheet.compose(typography.para[30], styles.ghostInput),
  errorText: StyleSheet.compose(typography.para[30], styles.errorText),
};

export { TextField };
export type { TextFieldProps, TextFieldVariant };
