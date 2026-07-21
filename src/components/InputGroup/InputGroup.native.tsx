import React from "react";
import {
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
import { Button, type ButtonProps } from "../Button/Button.native";
import { Input, type InputProps } from "../Input/Input.native";
import { Textarea, type TextareaProps } from "../Textarea/Textarea.native";

interface InputGroupContextValue {
  focused: boolean;
  setFocused: (v: boolean) => void;
  error: boolean;
  disabled: boolean;
}

const InputGroupContext = React.createContext<InputGroupContextValue>({
  focused: false,
  setFocused: () => {},
  error: false,
  disabled: false,
});

interface InputGroupTextProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const InputGroupText: React.FC<InputGroupTextProps> = ({ children, style }) => {
  return (
    <View style={[styles.addonText, style]}>
      {typeof children === "string" ? (
        <Text style={textStyles.addonText}>{children}</Text>
      ) : (
        children
      )}
    </View>
  );
};

// Mirrors web: variant="ghost" size="icon-xs" rounded-lg shadow-none
type InputGroupButtonProps = Omit<ButtonProps, "variant" | "size">;

const InputGroupButton: React.FC<InputGroupButtonProps> = ({
  style,
  ...props
}) => {
  return (
    <Button
      variant="ghost"
      size="icon-xs"
      style={[{ borderRadius: 8 }, style]}
      {...props}
    />
  );
};

// Omit props managed by InputGroup context
type InputGroupInputProps = Omit<
  InputProps,
  "error" | "disabled" | "containerStyle"
>;

const InputGroupInput: React.FC<InputGroupInputProps> = ({
  onFocus,
  onBlur,
  ...inputProps
}) => {
  const { setFocused, disabled } = React.useContext(InputGroupContext);

  return (
    <Input
      disabled={disabled}
      placeholderTextColor={disabled ? color.neutral[60] : color.neutral[40]}
      containerStyle={styles.innerInput}
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
  );
};

type InputGroupTextareaProps = Omit<
  TextareaProps,
  "error" | "disabled" | "containerStyle"
>;

const InputGroupTextarea: React.FC<InputGroupTextareaProps> = ({
  onFocus,
  onBlur,
  ...inputProps
}) => {
  const { setFocused, disabled } = React.useContext(InputGroupContext);

  return (
    <Textarea
      disabled={disabled}
      placeholderTextColor={disabled ? color.neutral[60] : color.neutral[40]}
      containerStyle={styles.innerTextarea}
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
  );
};

type InputGroupAddonAlign =
  | "inline-start"
  | "inline-end"
  | "block-start"
  | "block-end";

interface InputGroupAddonProps {
  children?: React.ReactNode;
  align?: InputGroupAddonAlign;
  style?: StyleProp<ViewStyle>;
}

const InputGroupAddon: React.FC<InputGroupAddonProps> = ({
  children,
  align = "inline-start",
  style,
}) => {
  const { disabled } = React.useContext(InputGroupContext);

  return (
    <View
      style={[
        styles.addon,
        addonAlignStyles[align],
        disabled && styles.addonDisabled,
        style,
      ]}
    >
      {children}
    </View>
  );
};

interface InputGroupProps {
  children?: React.ReactNode;
  error?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const InputGroup: React.FC<InputGroupProps> = ({
  children,
  error = false,
  disabled = false,
  style,
}) => {
  const [focused, setFocused] = React.useState(false);

  // Auto-detect layout from children — mirrors web `has-[>*]` selectors
  const flatChildren = React.Children.toArray(children);
  const isColumn =
    flatChildren.some(
      (child) =>
        React.isValidElement(child) &&
        child.type === InputGroupAddon &&
        ["block-start", "block-end"].includes(
          (child.props as InputGroupAddonProps).align ?? "",
        ),
    ) ||
    flatChildren.some(
      (child) =>
        React.isValidElement(child) && child.type === InputGroupTextarea,
    );

  return (
    <InputGroupContext.Provider
      value={{ focused, setFocused, error, disabled }}
    >
      <View
        style={[
          styles.root,
          isColumn ? styles.rootColumn : styles.rootRow,
          focused && styles.rootFocused,
          error && styles.rootError,
          disabled && styles.rootDisabled,
          style,
        ]}
        pointerEvents={disabled ? "none" : undefined}
      >
        {children}
      </View>
    </InputGroupContext.Provider>
  );
};

const styles = StyleSheet.create({
  root: {
    width: 300,
    backgroundColor: color.neutral[10],
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
    alignItems: "center",
    overflow: "hidden",
  },
  rootRow: {
    flexDirection: "row",
    height: spacing[140],
  },
  rootColumn: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  rootFocused: {
    borderColor: color.neutral[110],
  },
  rootError: {
    borderColor: color.red[70],
    borderWidth: 1,
  },
  rootDisabled: {
    backgroundColor: color.neutral[20],
  },

  addon: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[50],
    flexShrink: 0,
  },
  addonDisabled: {
    opacity: 0.4,
  },

  addonText: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing[50],
  },
  addonTextColor: {
    color: color.neutral[40],
  },

  innerInput: {
    flex: 1,
    alignSelf: "stretch",
    height: "100%",
    borderRadius: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    opacity: 1,
  },

  innerTextarea: {
    flex: 1,
    alignSelf: "stretch",
    borderRadius: 0,
    borderWidth: 0,
    backgroundColor: "transparent",
    opacity: 1,
  },
});

const addonAlignStyles: Record<InputGroupAddonAlign, object> = {
  "inline-start": {
    paddingLeft: spacing[40],
    paddingVertical: spacing[40],
  },
  "inline-end": {
    paddingRight: spacing[60],
    paddingVertical: spacing[40],
  },
  "block-start": {
    width: "100%",
    paddingHorizontal: spacing[60],
    paddingTop: spacing[40],
  },
  "block-end": {
    width: "100%",
    paddingHorizontal: spacing[60],
    paddingBottom: spacing[40],
  },
};

const textStyles = {
  addonText: StyleSheet.compose(typography.para[30], styles.addonTextColor),
};

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
};
export type {
  InputGroupProps,
  InputGroupAddonProps,
  InputGroupAddonAlign,
  InputGroupInputProps,
  InputGroupTextareaProps,
};
