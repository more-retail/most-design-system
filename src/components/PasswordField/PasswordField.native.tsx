import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from "react-native";
import { color, spacing, typography } from "../../tokens/reactNative/stylesheet";
import { KeyIcon, VisibilityIcon, VisibilityOffIcon } from "../../icons/index.native";

interface PasswordFieldProps {
  label?: string;
  showLabel?: boolean;
  error?: boolean;
  errorMessage?: string;
  disabled?: boolean;
  placeholder?: string;
  forgotPasswordLabel?: string;
  onForgotPassword?: () => void;
}

function PasswordField({
  label = "Password",
  showLabel = true,
  error = false,
  errorMessage,
  disabled = false,
  forgotPasswordLabel = "Forgot Password?",
  onForgotPassword,
  placeholder
}: PasswordFieldProps) {
  const [showPassword, setShowPassword] = React.useState(false);
  const [focused, setFocused] = React.useState(false);

  return (
    <View style={[styles.root]} >

      {showLabel && (
        <View style={styles.labelRow}>
          <Text style={textStyles.label} numberOfLines={1}>
            {label}
          </Text>
          {forgotPasswordLabel ? (
            <Pressable onPress={onForgotPassword} hitSlop={8}>
              <Text style={textStyles.forgotLabel}>{forgotPasswordLabel}</Text>
            </Pressable>
          ) : null}
        </View>
      )}

      <View
        style={[
          styles.inputContainer,
          focused && styles.inputContainerFocused,
          error && styles.inputContainerError,
          disabled && styles.inputContainerDisabled,
        ]}
      >
        <View style={styles.keyIconWrapper}>
          <KeyIcon size={spacing[60]} fill={color.orange[60]} />
        </View>

        <TextInput
          secureTextEntry={!showPassword}
          editable={!disabled}
          style={textStyles.input}
          placeholderTextColor={color.neutral[40]}
          placeholder={placeholder}
          onFocus={(e) => {
            setFocused(true);
          }}
          onBlur={(e) => {
            setFocused(false);
          }}
        />

        <Pressable
          onPress={() => setShowPassword((v) => !v)}
          hitSlop={8}
          style={styles.visibilityButton}
          accessibilityLabel={showPassword ? "Hide password" : "Show password"}
          accessibilityRole="button"
        >
          {showPassword
            ? <VisibilityIcon size={spacing[60]} fill={color.white} />
            : <VisibilityOffIcon size={spacing[60]} fill={color.white} />
          }
        </Pressable>
      </View>

      {error && errorMessage ? (
        <Text style={textStyles.errorText}>{errorMessage}</Text>
      ) : null}

    </View>
  );
}
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
  label: {
    color: color.neutral[110],
    flex: 1,
  },
  forgotLabel: {
    color: color.orange[60],
    flexShrink: 0,
  },
  inputContainer: {
    flexDirection: "row",
    gap: spacing[50],         
    height: spacing[140],    
    alignItems: "center",
    paddingLeft: spacing[40],
    paddingRight: spacing[60],
    borderRadius: 12,     
    width: "100%",
    backgroundColor: color.neutral[10],
    borderWidth: 2,
    borderColor: "transparent",
  },
  inputContainerFocused: {
    borderColor: color.neutral[110],
  },
  inputContainerError: {
    borderColor: color.red[60],
  },
  inputContainerDisabled: {
    opacity: 0.4,
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

  input: {
    flex: 1,
    color: color.neutral[110],
    backgroundColor: "transparent",
    padding: 0,
    margin: 0,
    outlineWidth: 0,
  },

  visibilityButton: {
    flexShrink: 0,
    width: spacing[60],    
    height: spacing[60],   
    alignItems: "center",
    justifyContent: "center",
  },
  errorText: {
    color: color.red[60],
  },
});


// ── Composed text styles — StyleSheet.compose called once at module load ───────
const textStyles = {
  label:       StyleSheet.compose(typography.para[30],  styles.label),
  forgotLabel: StyleSheet.compose(typography.label[30], styles.forgotLabel),
  input:       StyleSheet.compose(typography.para[30], styles.input),
  errorText:   StyleSheet.compose(typography.para[30],  styles.errorText),
};

PasswordField.displayName = "PasswordField";

export { PasswordField };
export type { PasswordFieldProps };
