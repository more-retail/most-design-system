import React from "react";
import {
  type StyleProp,
  Text,
  type TextProps,
  type TextStyle,
} from "react-native";

import { typography } from "../../tokens/reactNative/stylesheet";

interface LabelProps extends Omit<TextProps, "style"> {
  disabled?: boolean;
  style?: StyleProp<TextStyle>;
}

const Label: React.FC<LabelProps> = ({ disabled = false, style, ...props }) => {
  return (
    <Text
      style={[typography.para[30], disabled && styles.disabled, style]}
      {...props}
    />
  );
};

const styles = {
  disabled: { opacity: 0.5 },
} as const;

export { Label };
export type { LabelProps };
