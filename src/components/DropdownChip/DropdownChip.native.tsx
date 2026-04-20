import React, {
  createContext,
  memo,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  Animated,
  LayoutChangeEvent,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
  useWindowDimensions,
} from "react-native";

import { ArrowDropDownIcon, ArrowDropUpIcon } from "../../icons/index.native";
import {
  color,
  spacing,
  typography,
} from "../../tokens/reactNative/stylesheet";

type DropdownChipVariant = "filled" | "outlined";
type DropdownChipSize = "lg" | "md" | "sm";

interface TriggerLayout {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface DropdownChipContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  value: string | undefined;
  onValueChange: (v: string) => void;
  size: DropdownChipSize;
  variant: DropdownChipVariant;
  triggerLayout: TriggerLayout | null;
  setTriggerLayout: (l: TriggerLayout) => void;
  triggerRef: React.RefObject<View | null>;
}

const DropdownChipContext = createContext<DropdownChipContextValue>({
  open: false,
  setOpen: () => {},
  value: undefined,
  onValueChange: () => {},
  size: "lg",
  variant: "filled",
  triggerLayout: null,
  setTriggerLayout: () => {},
  triggerRef: { current: null },
});

interface DropdownChipProps {
  children: React.ReactNode;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  size?: DropdownChipSize;
  variant?: DropdownChipVariant;
}

const DropdownChip: React.FC<DropdownChipProps> = ({
  children,
  defaultValue,
  onValueChange,
  size = "lg",
  variant = "filled",
}) => {
  const [value, setValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  const [triggerLayout, setTriggerLayout] = useState<TriggerLayout | null>(
    null,
  );
  const triggerRef = useRef<View>(null);

  const handleValueChange = useCallback(
    (v: string) => {
      setValue(v);
      onValueChange?.(v);
    },
    [onValueChange],
  );

  const contextValue = useMemo(
    () => ({
      open,
      setOpen,
      value,
      onValueChange: handleValueChange,
      size,
      variant,
      triggerLayout,
      setTriggerLayout,
      triggerRef,
    }),
    [open, setOpen, value, handleValueChange, size, variant, triggerLayout],
  );

  return (
    <DropdownChipContext.Provider value={contextValue}>
      {children}
    </DropdownChipContext.Provider>
  );
};

interface DropdownChipTriggerProps {
  placeholder?: string;
  disabled?: boolean;
  error?: boolean;
  icon?: React.ReactNode;
  displayValue?: string;
  style?: StyleProp<ViewStyle>;
}

const DropdownChipTrigger = memo<DropdownChipTriggerProps>(
  ({
    placeholder = "Select…",
    disabled = false,
    error = false,
    icon,
    displayValue,
    style,
  }) => {
    const {
      open,
      setOpen,
      value,
      size,
      variant,
      setTriggerLayout,
      triggerRef,
    } = useContext(DropdownChipContext);

    const resolvedDisplayValue = displayValue ?? value;

    const TRIGGER_HEIGHT =
      size === "lg" ? spacing[140] : size === "md" ? spacing[110] : spacing[80];
    const PADDING_H =
      size === "lg" ? spacing[60] : size === "md" ? spacing[50] : spacing[40];
    const GAP = size === "lg" ? spacing[60] : spacing[30];
    const LEFT_GAP = size === "lg" ? spacing[40] : spacing[30];
    const RADIUS = size === "sm" ? 8 : 12;
    const ICON_SIZE = size === "sm" ? spacing[50] : spacing[60];

    const measureAndOpen = useCallback(() => {
      if (disabled) return;
      triggerRef.current?.measureInWindow((x, y, w, h) => {
        setTriggerLayout({ x, y, width: w, height: h });
        setOpen(true);
      });
    }, [disabled, triggerRef, setTriggerLayout, setOpen]);

    const triggerStyle = useMemo(() => {
      const borderStyle = error
        ? { borderWidth: 2, borderColor: color.red[70] }
        : open
          ? { borderWidth: 2, borderColor: color.neutral[110] }
          : variant === "outlined"
            ? { borderWidth: 1, borderColor: color.neutral[10] }
            : { borderWidth: 2, borderColor: "transparent" };

      const bgColor =
        variant === "filled"
          ? disabled
            ? color.neutral[20]
            : color.neutral[10]
          : "transparent";

      return StyleSheet.compose(styles.trigger, {
        height: TRIGGER_HEIGHT,
        paddingHorizontal: PADDING_H,
        gap: GAP,
        borderRadius: RADIUS,
        backgroundColor: bgColor,
        ...borderStyle,
      });
    }, [
      error,
      open,
      variant,
      disabled,
      TRIGGER_HEIGHT,
      PADDING_H,
      GAP,
      RADIUS,
    ]);

    const textColor = disabled ? color.neutral[40] : color.neutral[110];
    const textStyle = useMemo(
      () =>
        StyleSheet.compose(typography.labelThick[30], {
          color: resolvedDisplayValue ? textColor : color.neutral[40],
        }),
      [resolvedDisplayValue, textColor],
    );

    return (
      <Pressable
        ref={triggerRef as React.RefObject<View>}
        onPress={measureAndOpen}
        disabled={disabled}
        style={style ? [triggerStyle, style] : triggerStyle}
      >
        <View style={StyleSheet.compose(styles.triggerLeft, { gap: LEFT_GAP })}>
          {icon && <View style={styles.triggerIcon}>{icon}</View>}
          <Text numberOfLines={1} style={textStyle}>
            {resolvedDisplayValue ?? placeholder}
          </Text>
        </View>

        {open ? (
          <ArrowDropUpIcon size={ICON_SIZE} fill={textColor} />
        ) : (
          <ArrowDropDownIcon size={ICON_SIZE} fill={textColor} />
        )}
      </Pressable>
    );
  },
);

const BOTTOM_SAFE = Platform.OS === "ios" ? 34 : 16;

interface DropdownChipContentProps {
  children: React.ReactNode;
  sideOffset?: number;
  maxHeight?: number;
  style?: StyleProp<ViewStyle>;
}

const DropdownChipContent = memo<DropdownChipContentProps>(
  ({ children, sideOffset = 6, maxHeight = 300, style }) => {
    const { open, setOpen, triggerLayout } = useContext(DropdownChipContext);
    const { height: screenHeight } = useWindowDimensions();

    const opacity = useRef(new Animated.Value(0)).current;
    const [phase, setPhase] = useState<"hidden" | "ready">("hidden");
    const [popupHeight, setPopupHeight] = useState(0);

    React.useEffect(() => {
      if (!open) {
        setPhase("hidden");
        setPopupHeight(0);
        opacity.setValue(0);
      }
    }, [open, opacity]);

    React.useEffect(() => {
      if (!open || phase !== "ready") return;
      Animated.timing(opacity, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }, [open, phase, opacity]);

    const handleLayout = useCallback(
      (e: LayoutChangeEvent) => {
        if (phase === "hidden" && open) {
          setPopupHeight(e.nativeEvent.layout.height);
          setPhase("ready");
        }
      },
      [phase, open],
    );

    const onRequestClose = useCallback(() => setOpen(false), [setOpen]);
    const onBackdropPress = useCallback(() => setOpen(false), [setOpen]);

    const triggerBottom = triggerLayout
      ? triggerLayout.y + triggerLayout.height
      : 0;
    const spaceBelow = triggerLayout
      ? screenHeight - BOTTOM_SAFE - triggerBottom - sideOffset
      : 0;
    const spaceAbove = triggerLayout ? triggerLayout.y - sideOffset : 0;
    const wouldOverflowDown = popupHeight > spaceBelow;
    const canFitAbove = spaceAbove >= popupHeight;
    const opensUpward = phase === "ready" && wouldOverflowDown && canFitAbove;

    const effectiveMaxHeight =
      phase === "hidden" || opensUpward
        ? maxHeight
        : Math.max(60, Math.min(maxHeight, spaceBelow));

    const top = opensUpward
      ? (triggerLayout?.y ?? 0) - popupHeight - sideOffset
      : triggerBottom + sideOffset;

    const contentStyle = useMemo(
      () =>
        triggerLayout
          ? StyleSheet.compose(styles.content, {
              top,
              left: triggerLayout.x,
              width: triggerLayout.width,
              maxHeight: effectiveMaxHeight,
              opacity: phase === "hidden" ? 0 : opacity,
            })
          : styles.content,

      [triggerLayout, top, effectiveMaxHeight, phase, opacity],
    );

    if (!triggerLayout) return null;

    return (
      <Modal
        transparent
        animationType="none"
        visible={open}
        onRequestClose={onRequestClose}
      >
        <Pressable style={StyleSheet.absoluteFill} onPress={onBackdropPress} />
        <Animated.View
          onLayout={handleLayout}
          style={style ? [contentStyle, style] : contentStyle}
        >
          <ScrollView
            style={styles.contentScroll}
            bounces={false}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {children}
          </ScrollView>
        </Animated.View>
      </Modal>
    );
  },
);

interface DropdownChipItemProps {
  children: string;
  value: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

const DropdownChipItem = memo<DropdownChipItemProps>(
  ({ children, value, disabled = false, style }) => {
    const {
      value: selectedValue,
      onValueChange,
      setOpen,
      size,
    } = useContext(DropdownChipContext);

    const selected = selectedValue === value;
    const [pressed, setPressed] = useState(false);

    const ITEM_HEIGHT =
      size === "sm" ? spacing[80] : size === "md" ? spacing[110] : spacing[140];
    const PADDING_H =
      size === "sm" ? spacing[40] : size === "md" ? spacing[50] : spacing[60];

    const handlePress = useCallback(() => {
      if (disabled) return;
      onValueChange(value);
      setOpen(false);
    }, [disabled, onValueChange, value, setOpen]);

    const handlePressIn = useCallback(() => setPressed(true), []);
    const handlePressOut = useCallback(() => setPressed(false), []);

    const itemStyle = useMemo(
      () =>
        StyleSheet.compose(styles.item, {
          height: ITEM_HEIGHT,
          paddingHorizontal: PADDING_H,
          borderColor: selected
            ? color.neutral[110]
            : pressed
              ? color.neutral[10]
              : "transparent",
          opacity: disabled ? 0.4 : 1,
        }),
      [ITEM_HEIGHT, PADDING_H, selected, pressed, disabled],
    );

    return (
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={style ? [itemStyle, style] : itemStyle}
      >
        <Text
          numberOfLines={1}
          style={StyleSheet.compose(
            StyleSheet.compose(typography.para[30], styles.itemText),
            { color: color.neutral[110] },
          )}
        >
          {children}
        </Text>
      </Pressable>
    );
  },
);

const styles = StyleSheet.create({
  trigger: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
  },
  triggerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 1,
  },
  triggerIcon: {
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  content: {
    position: "absolute",
    backgroundColor: color.white,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: color.neutral[10],
    paddingVertical: spacing[50],
    paddingHorizontal: spacing[50],
    boxShadow: `0 4px 20px 0 rgba(23, 33, 40, 0.05)`,
    elevation: 8,
    overflow: "hidden",
  },
  contentScroll: {
    flex: 1,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 2,
    gap: spacing[40],
  },
  itemText: {
    flex: 1,
  },
});

export {
  DropdownChip,
  DropdownChipTrigger,
  DropdownChipContent,
  DropdownChipItem,
};

export type {
  DropdownChipProps,
  DropdownChipVariant,
  DropdownChipSize,
  DropdownChipTriggerProps,
  DropdownChipContentProps,
  DropdownChipItemProps,
};
