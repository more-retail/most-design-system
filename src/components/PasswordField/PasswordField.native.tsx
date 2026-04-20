import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

import {
  KeyIcon,
  VisibilityIcon,
  VisibilityOffIcon,
} from "../../icons/index.native";
import {
  color,
  spacing,
  typography,
} from "../../tokens/reactNative/stylesheet";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "../InputGroup/InputGroup.native";

interface PasswordFieldProps {
  errorMessage?: string;
  disabled?: boolean;
  placeholder?: string;
  onForgotPassword?: () => void;
}

const PasswordField: React.FC<PasswordFieldProps> = ({
  errorMessage,
  disabled = false,
  placeholder,
  onForgotPassword,
}) => {
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <View style={styles.root}>
      <View style={styles.labelRow}>
        <Text
          style={[textStyles.label, disabled && styles.labelDisabled]}
          numberOfLines={1}
        >
          Password
        </Text>
        {onForgotPassword && (
          <Pressable onPress={onForgotPassword} hitSlop={8} disabled={disabled}>
            <Text
              style={[
                textStyles.forgotLabel,
                disabled && styles.forgotLabelDisabled,
              ]}
            >
              Forgot Password?
            </Text>
          </Pressable>
        )}
      </View>

      <InputGroup error={!!errorMessage} disabled={disabled}>
        <InputGroupAddon align="inline-start">
          <View
            style={[
              styles.keyIconWrapper,
              disabled && styles.keyIconWrapperDisabled,
            ]}
          >
            <KeyIcon
              size={spacing[60]}
              fill={disabled ? color.neutral[40] : color.orange[60]}
            />
          </View>
        </InputGroupAddon>

        <InputGroupInput
          secureTextEntry={!showPassword}
          placeholder={placeholder}
        />

        <InputGroupAddon align="inline-end">
          <InputGroupButton
            onPress={() => setShowPassword((v) => !v)}
            accessibilityLabel={
              showPassword ? "Hide password" : "Show password"
            }
          >
            {showPassword ? (
              <VisibilityIcon
                size={spacing[60]}
                fill={disabled ? color.neutral[40] : color.neutral[110]}
              />
            ) : (
              <VisibilityOffIcon
                size={spacing[60]}
                fill={disabled ? color.neutral[40] : color.neutral[110]}
              />
            )}
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>

      {/* Error message */}
      {errorMessage && <Text style={textStyles.errorText}>{errorMessage}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flexDirection: "column",
    gap: spacing[40],
    alignItems: "flex-start",
    width: 300,
  },
  labelRow: {
    flexDirection: "row",
    gap: spacing[50],
    alignItems: "flex-start",
    width: "100%",
  },
  labelDisabled: {
    color: color.neutral[40],
  },
  forgotLabelDisabled: {
    color: color.neutral[40],
  },
  keyIconWrapper: {
    backgroundColor: color.white,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    flexShrink: 0,
    width: spacing[100],
    height: spacing[100],
  },
  keyIconWrapperDisabled: {
    backgroundColor: color.neutral[10],
  },
  label: {
    color: color.neutral[110],
    flex: 1,
  },
  forgotLabel: {
    color: color.orange[60],
    flexShrink: 0,
  },
  errorText: {
    color: color.red[70],
  },
});

const textStyles = {
  label: StyleSheet.compose(typography.para[30], styles.label),
  forgotLabel: StyleSheet.compose(typography.label[30], styles.forgotLabel),
  errorText: StyleSheet.compose(typography.para[30], styles.errorText),
};

export { PasswordField };
export type { PasswordFieldProps };
