import React, { useCallback, useMemo } from "react";
import {
  Animated,
  PanResponder,
  Pressable,
  type StyleProp,
  StyleSheet,
  type ViewStyle,
} from "react-native";

import { color, spacing } from "../../tokens/reactNative/stylesheet";

type SwitchSize = "xs" | "sm" | "md";

interface SwitchProps {
  value: boolean;
  onValueChange?: (value: boolean) => void;
  size?: SwitchSize;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const Switch: React.FC<SwitchProps> = ({
  value: checked,
  onValueChange,
  size = "md",
  disabled = false,
  style,
}) => {
  const thumbTravel = THUMB_TRAVEL[size];

  const anim = React.useRef(new Animated.Value(checked ? 1 : 0)).current;

  const animSnapshot = React.useRef(checked ? 1 : 0);
  React.useEffect(() => {
    const id = anim.addListener(({ value }) => {
      animSnapshot.current = value;
    });
    return () => anim.removeListener(id);
  }, [anim]);

  const liveRef = React.useRef({
    checked,
    disabled,
    onValueChange,
    thumbTravel,
  });
  React.useEffect(() => {
    liveRef.current = { checked, disabled, onValueChange, thumbTravel };
  });

  const springTo = React.useCallback(
    (toValue: boolean) => {
      Animated.spring(anim, {
        toValue: toValue ? 1 : 0,
        useNativeDriver: false,
        bounciness: 0,
        speed: 20,
      }).start();
    },
    [anim],
  );

  React.useEffect(() => {
    springTo(checked);
  }, [checked, springTo]);

  const panResponder = React.useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !liveRef.current.disabled,

      onMoveShouldSetPanResponder: (_, { dx, dy }) =>
        !liveRef.current.disabled &&
        Math.abs(dx) > 4 &&
        Math.abs(dx) > Math.abs(dy),

      onPanResponderGrant: () => {
        anim.stopAnimation();
      },

      onPanResponderMove: (_, { dx }) => {
        const { thumbTravel } = liveRef.current;
        const startPixels = animSnapshot.current * thumbTravel;
        const next = Math.max(0, Math.min(1, (startPixels + dx) / thumbTravel));
        anim.setValue(next);
      },

      onPanResponderRelease: (_, { vx }) => {
        const { onValueChange } = liveRef.current;
        const next = animSnapshot.current > 0.5 || vx > 0.3;
        onValueChange?.(next);
        springTo(next);
      },

      onPanResponderTerminate: () => {
        springTo(liveRef.current.checked);
      },
    }),
  ).current;

  const handlePress = useCallback(() => {
    if (liveRef.current.disabled) return;
    const { checked, onValueChange } = liveRef.current;
    const next = !checked;
    onValueChange?.(next);
  }, []);

  const translateX = useMemo(
    () =>
      anim.interpolate({ inputRange: [0, 1], outputRange: [0, thumbTravel] }),
    [anim, thumbTravel],
  );

  const trackBg = useMemo(
    () =>
      anim.interpolate({
        inputRange: [0, 1],
        outputRange: [color.neutral[20], color.orange[60]],
      }),
    [anim],
  );

  const trackSizeStyle = useMemo(
    () => StyleSheet.compose(styles.track, trackSizeStyles[size]),
    [size],
  );

  const thumbSizeStyle = useMemo(
    () => StyleSheet.compose(styles.thumb, thumbSizeStyles[size]),
    [size],
  );

  const pressableStyle = useMemo(
    () =>
      StyleSheet.compose(
        StyleSheet.compose(styles.pressable, disabled ? styles.disabled : null),
        style,
      ),
    [disabled, style],
  );

  return (
    <Pressable
      onPress={handlePress}
      accessibilityRole="switch"
      accessibilityState={{ checked, disabled: !!disabled }}
      style={pressableStyle}
      {...panResponder.panHandlers}
    >
      <Animated.View style={[trackSizeStyle, { backgroundColor: trackBg }]}>
        <Animated.View
          style={[thumbSizeStyle, { transform: [{ translateX }] }]}
        />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    alignSelf: "flex-start",
  },
  disabled: {
    opacity: 0.4,
  },
  track: {
    justifyContent: "center",
    overflow: "hidden",
  },
  thumb: {
    backgroundColor: color.white,
    shadowColor: "#172128",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 2,
  },
});

const THUMB_TRAVEL: Record<SwitchSize, number> = {
  xs: spacing[100] - spacing[50] - spacing[30] * 2,
  sm: spacing[120] - spacing[60] - spacing[30] * 2,
  md: 60 - spacing[80] - 6 * 2,
};

const trackSizeStyles = StyleSheet.create({
  xs: {
    height: spacing[70],
    width: spacing[100],
    padding: spacing[30],
    borderRadius: spacing[70] / 2,
  },
  sm: {
    height: spacing[80],
    width: spacing[120],
    padding: spacing[30],
    borderRadius: spacing[80] / 2,
  },
  md: {
    height: spacing[110],
    width: 60,
    padding: 6,
    borderRadius: spacing[110] / 2,
  },
});

const thumbSizeStyles = StyleSheet.create({
  xs: {
    width: spacing[50],
    height: spacing[50],
    borderRadius: spacing[50] / 2,
  },
  sm: {
    width: spacing[60],
    height: spacing[60],
    borderRadius: spacing[60] / 2,
  },
  md: {
    width: spacing[80],
    height: spacing[80],
    borderRadius: spacing[80] / 2,
  },
});

export { Switch };
export type { SwitchProps, SwitchSize };
