import * as React from "react";
import {
  Animated,
  Platform,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

import {
  color,
  spacing,
  typography,
} from "../../tokens/reactNative/stylesheet";

type OtpContextValue = {
  text: string;
  focusedInputIndex: number;
  isFocused: boolean;
  disabled?: boolean;
  handlePress: () => void;
};

const OtpContext = React.createContext<OtpContextValue>({
  text: "",
  focusedInputIndex: 0,
  isFocused: false,
  disabled: false,
  handlePress: () => {},
});

type OtpFieldProps = {
  numberOfDigits?: number;
  value?: string;
  onChangeText?: (text: string) => void;
  onFilled?: (text: string) => void;
  errorMessage?: string;
  onResend?: () => void;
  countdownSeconds?: number;
  disabled?: boolean;
  autoFocus?: boolean;
  secureTextEntry?: boolean;
  style?: StyleProp<ViewStyle>;
  textInputProps?: TextInputProps;
  children?: React.ReactNode;
};

type OtpFieldRef = {
  clear: () => void;
  focus: () => void;
  blur: () => void;
};

const OtpField = React.forwardRef<OtpFieldRef, OtpFieldProps>(
  (
    {
      numberOfDigits = 6,
      value,
      onChangeText,
      onFilled,
      errorMessage,
      onResend,
      countdownSeconds = 60,
      disabled = false,
      autoFocus = false,
      secureTextEntry = false,
      style,
      textInputProps,
      children,
    },
    ref,
  ) => {
    const [text, setText] = React.useState(value ?? "");
    const [isFocused, setIsFocused] = React.useState(false);
    const [countdown, setCountdown] = React.useState(0);

    const inputRef = React.useRef<TextInput>(null);
    const timerRef = React.useRef<ReturnType<typeof setInterval> | null>(null);

    React.useEffect(() => {
      if (value !== undefined) setText(value);
    }, [value]);

    React.useEffect(() => {
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }, []);

    React.useImperativeHandle(ref, () => ({
      clear: () => {
        setText("");
        onChangeText?.("");
      },
      focus: () => inputRef.current?.focus(),
      blur: () => inputRef.current?.blur(),
    }));

    const handleTextChange = (val: string) => {
      const next = val.slice(0, numberOfDigits);
      setText(next);
      onChangeText?.(next);
      if (next.length === numberOfDigits) {
        onFilled?.(next);
      }
    };

    const handlePress = () => {
      inputRef.current?.focus();
    };

    const handleResend = () => {
      onResend?.();
      if (timerRef.current) clearInterval(timerRef.current);
      setCountdown(countdownSeconds);
      timerRef.current = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            timerRef.current = null;
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    };

    const focusedInputIndex =
      text.length < numberOfDigits ? text.length : numberOfDigits - 1;

    return (
      <OtpContext.Provider
        value={{ text, focusedInputIndex, isFocused, disabled, handlePress }}
      >
        <View style={[styles.container, style]}>
          <View style={styles.labelRow}>
            <Text
              style={[
                typography.para[30],
                styles.label,
                disabled && styles.labelDisabled,
              ]}
              numberOfLines={1}
            >
              OTP
            </Text>

            {onResend &&
              (countdown > 0 ? (
                <Text
                  style={[typography.label[30], styles.resendCountdown]}
                  numberOfLines={1}
                >
                  Resend in {countdown}s
                </Text>
              ) : (
                <Pressable
                  onPress={handleResend}
                  disabled={disabled}
                  hitSlop={8}
                >
                  <Text
                    style={[
                      typography.label[30],
                      styles.resendButton,
                      disabled && styles.labelDisabled,
                    ]}
                  >
                    Resend
                  </Text>
                </Pressable>
              ))}
          </View>

          <View style={styles.inputArea}>
            {children ??
              Array(numberOfDigits)
                .fill(0)
                .map((_, index) => {
                  const char = text[index] ?? "";
                  const isFocusedSlot =
                    index === focusedInputIndex && isFocused && !disabled;
                  const isFilledLast =
                    text.length === numberOfDigits &&
                    index === numberOfDigits - 1;
                  const showCaret =
                    isFocusedSlot && !char && !(isFilledLast && char);

                  return (
                    <Pressable
                      key={index}
                      onPress={handlePress}
                      disabled={disabled}
                      style={[
                        styles.slot,
                        (isFocusedSlot || (isFilledLast && isFocused)) &&
                          !errorMessage &&
                          styles.slotActive,
                        !!errorMessage && styles.slotError,
                        disabled && styles.slotDisabled,
                      ]}
                    >
                      {showCaret ? (
                        <View style={styles.caret} />
                      ) : (
                        <Text
                          style={[
                            typography.para[30],
                            styles.slotText,
                            disabled && styles.labelDisabled,
                          ]}
                        >
                          {char && secureTextEntry ? "•" : char}
                        </Text>
                      )}
                    </Pressable>
                  );
                })}

            <TextInput
              ref={inputRef}
              value={text}
              onChangeText={handleTextChange}
              maxLength={numberOfDigits}
              inputMode="numeric"
              textContentType="oneTimeCode"
              autoFocus={autoFocus}
              secureTextEntry={secureTextEntry}
              autoComplete={
                Platform.OS === "android" ? "sms-otp" : "one-time-code"
              }
              editable={!disabled}
              caretHidden={Platform.OS === "ios"}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              {...textInputProps}
              style={[styles.hiddenInput, textInputProps?.style]}
            />
          </View>

          {!!errorMessage && (
            <Text style={[typography.para[30], styles.errorText]}>
              {errorMessage}
            </Text>
          )}
        </View>
      </OtpContext.Provider>
    );
  },
);

type OtpGroupProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const OtpGroup: React.FC<OtpGroupProps> = ({ children, style }) => {
  return <View style={[styles.group, style]}>{children}</View>;
};

type OtpSlotProps = {
  index: number;
  error?: boolean;
  style?: StyleProp<ViewStyle>;
};

const OtpSlot: React.FC<OtpSlotProps> = ({ index, error, style }) => {
  const { text, focusedInputIndex, isFocused, disabled, handlePress } =
    React.useContext(OtpContext);

  const char = text[index] ?? "";
  const isFocusedSlot = index === focusedInputIndex && isFocused && !disabled;
  const isFilledLast =
    text.length > index && index === focusedInputIndex && isFocused;
  const showCaret = isFocusedSlot && !char;
  const hasError = error;

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.slot,
        (isFocusedSlot || isFilledLast) && !hasError && styles.slotActive,
        hasError && styles.slotError,
        disabled && styles.slotDisabled,
        style,
      ]}
    >
      {showCaret ? (
        <View style={styles.caret} />
      ) : (
        <Text
          style={[
            typography.para[30],
            styles.slotText,
            disabled && styles.labelDisabled,
          ]}
        >
          {char}
        </Text>
      )}
    </Pressable>
  );
};

type OtpSeparatorProps = {
  style?: StyleProp<ViewStyle>;
};

const OtpSeparator: React.FC<OtpSeparatorProps> = ({ style }) => {
  return <View accessibilityRole="none" style={[styles.separator, style]} />;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignSelf: "flex-start",
    gap: spacing[40],
  },
  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: spacing[50],
  },
  label: {
    flex: 1,
    color: color.neutral[110],
  },
  labelDisabled: {
    color: color.neutral[40],
  },
  resendCountdown: {
    color: color.neutral[40],
  },
  resendButton: {
    color: color.orange[60],
  },
  inputArea: {
    flexDirection: "row",
    gap: spacing[30],
  },
  slot: {
    height: spacing[140],
    width: spacing[170],
    borderRadius: 12,
    backgroundColor: color.neutral[10],
    alignItems: "center",
    justifyContent: "center",
  },
  slotActive: {
    borderWidth: 2,
    borderColor: color.neutral[110],
  },
  slotError: {
    borderWidth: 1,
    borderColor: color.red[70],
  },
  slotDisabled: {
    opacity: 0.5,
  },
  slotText: {
    color: color.neutral[110],
    textAlign: "center",
  },
  caret: {
    width: 1.5,
    height: 20,
    borderRadius: 1,
    backgroundColor: color.red[60],
  },
  hiddenInput: {
    position: "absolute",
    ...Platform.select({
      ios: { opacity: 0.02, color: "transparent" },
      default: { opacity: 0 },
    }),
  },
  group: {
    flexDirection: "row",
    gap: spacing[30],
  },
  separator: {
    width: spacing[40],
    height: 2,
    borderRadius: 1,
    backgroundColor: color.neutral[40],
    alignSelf: "center",
  },
  errorText: {
    color: color.red[70],
  },
});

export { OtpField, OtpGroup, OtpSlot, OtpSeparator };
export type {
  OtpFieldProps,
  OtpFieldRef,
  OtpGroupProps,
  OtpSlotProps,
  OtpSeparatorProps,
};
