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
  TextStyle,
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

type DropdownSize = "md" | "sm";

interface DropdownContextValue {
  open: boolean;
  setOpen: (v: boolean) => void;
  size: DropdownSize;
  triggerLayout: { x: number; y: number; width: number; height: number } | null;
  setTriggerLayout: (layout: {
    x: number;
    y: number;
    width: number;
    height: number;
  }) => void;
  triggerRef: React.RefObject<View | null>;
}

const DropdownContext = createContext<DropdownContextValue>({
  open: false,
  setOpen: () => {},
  size: "md",
  triggerLayout: null,
  setTriggerLayout: () => {},
  triggerRef: { current: null },
});

interface DropdownProps {
  children: React.ReactNode;
  size?: DropdownSize;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  children,
  size = "md",
  defaultOpen = false,
  open: controlledOpen,
  onOpenChange,
}) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const [triggerLayout, setTriggerLayout] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);
  const triggerRef = useRef<View>(null);

  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;

  const setOpen = useCallback(
    (v: boolean) => {
      if (!isControlled) setInternalOpen(v);
      onOpenChange?.(v);
    },
    [isControlled, onOpenChange],
  );

  const contextValue = useMemo(
    () => ({
      open,
      setOpen,
      size,
      triggerLayout,
      setTriggerLayout,
      triggerRef,
    }),
    [open, setOpen, size, triggerLayout],
  );

  return (
    <DropdownContext.Provider value={contextValue}>
      {children}
    </DropdownContext.Provider>
  );
};

interface DropdownLabelProps {
  children: React.ReactNode;
  disabled?: boolean;
}

const DropdownLabel: React.FC<DropdownLabelProps> = ({
  children,
  disabled,
}) => {
  return (
    <Text
      style={[
        typography.para[30],
        { color: disabled ? color.neutral[60] : color.neutral[110] },
      ]}
      numberOfLines={1}
    >
      {children}
    </Text>
  );
};

interface DropdownTriggerProps {
  children?: React.ReactNode;
  disabled?: boolean;
  error?: boolean;
  icon?: React.ReactNode;
  placeholder?: string;
  displayValue?: string;
  style?: StyleProp<ViewStyle>;
}

const DropdownTrigger = memo<DropdownTriggerProps>(
  ({
    disabled = false,
    error = false,
    icon,
    placeholder = "Placeholder",
    displayValue,
    style,
  }) => {
    const { open, setOpen, size, setTriggerLayout, triggerRef } =
      useContext(DropdownContext);

    const TRIGGER_HEIGHT = size === "md" ? spacing[140] : spacing[110];
    const PADDING_H = size === "md" ? spacing[60] : spacing[50];

    const measureAndOpen = useCallback(() => {
      if (disabled) return;
      triggerRef.current?.measureInWindow((x, y, width, height) => {
        setTriggerLayout({ x, y, width, height });
        setOpen(true);
      });
    }, [disabled, triggerRef, setTriggerLayout, setOpen]);

    const borderColor = error
      ? color.red[70]
      : open
        ? color.neutral[110]
        : "transparent";

    const triggerStyle = useMemo(
      () =>
        StyleSheet.compose(styles.trigger, {
          height: TRIGGER_HEIGHT,
          paddingHorizontal: PADDING_H,
          borderColor,
          backgroundColor: disabled ? color.neutral[20] : color.neutral[10],
        }),
      [TRIGGER_HEIGHT, PADDING_H, borderColor, disabled],
    );

    const valueStyle = useMemo(
      () =>
        StyleSheet.compose(
          StyleSheet.compose(typography.para[30], styles.triggerValue),
          { color: displayValue ? color.neutral[110] : color.neutral[40] },
        ),
      [displayValue],
    );

    const chevronFill = disabled ? color.neutral[40] : color.neutral[110];

    return (
      <Pressable
        ref={triggerRef as React.RefObject<View>}
        onPress={measureAndOpen}
        disabled={disabled}
        style={style ? [triggerStyle, style] : triggerStyle}
      >
        {icon && <View style={styles.triggerIcon}>{icon}</View>}

        <Text numberOfLines={1} style={valueStyle}>
          {displayValue ?? placeholder}
        </Text>

        <View style={styles.chevron}>
          {open ? (
            <ArrowDropUpIcon size={spacing[60]} fill={chevronFill} />
          ) : (
            <ArrowDropDownIcon size={spacing[60]} fill={chevronFill} />
          )}
        </View>
      </Pressable>
    );
  },
);

interface DropdownContentProps {
  children: React.ReactNode;
  sideOffset?: number;
  maxHeight?: number;
  style?: StyleProp<ViewStyle>;
}

const BOTTOM_SAFE = Platform.OS === "ios" ? 34 : 16;

const DropdownContent = memo<DropdownContentProps>(
  ({ children, sideOffset = 6, maxHeight = 300, style }) => {
    const { open, setOpen, triggerLayout } = useContext(DropdownContext);
    const { height: screenHeight } = useWindowDimensions();

    const opacity = useRef(new Animated.Value(0)).current;

    const [phase, setPhase] = useState<"hidden" | "ready">("hidden");
    const [popupHeight, setPopupHeight] = useState(0);

    const layout = triggerLayout;

    // Reset every time the popup closes
    React.useEffect(() => {
      if (!open) {
        setPhase("hidden");
        setPopupHeight(0);
        opacity.setValue(0);
      }
    }, [open, opacity]);

    // Fade in once measurement is done
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

    const triggerBottom = layout ? layout.y + layout.height : 0;
    const spaceBelow = layout
      ? screenHeight - BOTTOM_SAFE - triggerBottom - sideOffset
      : 0;
    const spaceAbove = layout ? layout.y - sideOffset : 0;

    const wouldOverflowDown = popupHeight > spaceBelow;
    const canFitAbove = spaceAbove >= popupHeight;
    const opensUpward = phase === "ready" && wouldOverflowDown && canFitAbove;

    const effectiveMaxHeight =
      phase === "hidden" || opensUpward
        ? maxHeight
        : Math.max(60, Math.min(maxHeight, spaceBelow));

    const top = opensUpward
      ? (layout?.y ?? 0) - popupHeight - sideOffset
      : triggerBottom + sideOffset;

    const contentStyle = useMemo(
      () =>
        layout
          ? StyleSheet.compose(styles.content, {
              top,
              left: layout.x,
              width: layout.width,
              maxHeight: effectiveMaxHeight,
              opacity: phase === "hidden" ? 0 : opacity,
            })
          : styles.content,

      [layout, top, effectiveMaxHeight, phase, opacity],
    );

    if (!layout) return null;

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

interface DropdownItemProps {
  children: React.ReactNode;
  onSelect?: () => void;
  selected?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const DropdownItem = memo<DropdownItemProps>(
  ({ children, onSelect, selected = false, disabled = false, icon, style }) => {
    const { setOpen, size } = useContext(DropdownContext);
    const [pressed, setPressed] = useState(false);

    const ITEM_HEIGHT = size === "md" ? spacing[140] : spacing[110];
    const PADDING_H = size === "md" ? spacing[60] : spacing[50];

    const handlePress = useCallback(() => {
      if (disabled) return;
      onSelect?.();
      setOpen(false);
    }, [disabled, onSelect, setOpen]);

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

    const itemTextStyle = useMemo(
      () =>
        StyleSheet.compose(
          StyleSheet.compose(typography.para[30], styles.itemText),
          { color: color.neutral[110] },
        ),
      [],
    );

    return (
      <Pressable
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        disabled={disabled}
        style={style ? [itemStyle, style] : itemStyle}
      >
        {icon && <View style={styles.itemIcon}>{icon}</View>}

        <Text numberOfLines={1} style={itemTextStyle}>
          {children}
        </Text>
      </Pressable>
    );
  },
);

interface DropdownGroupProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

const DropdownGroup = memo<DropdownGroupProps>(({ children, style }) => {
  return (
    <View style={StyleSheet.compose(styles.group, style)}>{children}</View>
  );
});

interface DropdownGroupLabelProps {
  children: React.ReactNode;
  style?: StyleProp<TextStyle>;
}

const DropdownGroupLabel: React.FC<DropdownGroupLabelProps> = ({
  children,
  style,
}) => {
  const { size } = useContext(DropdownContext);
  const PADDING_H = size === "md" ? spacing[60] : spacing[50];

  return (
    <Text
      numberOfLines={1}
      style={[
        typography.label[30],
        { color: color.neutral[60], paddingHorizontal: PADDING_H },
        style,
      ]}
    >
      {children}
    </Text>
  );
};

const DropdownSeparator = memo<{ style?: StyleProp<ViewStyle> }>(
  ({ style }) => {
    return <View style={StyleSheet.compose(styles.separator, style)} />;
  },
);

interface DropdownHintProps {
  children: React.ReactNode;
  variant?: "default" | "error";
  style?: StyleProp<TextStyle>;
}

const DropdownHint = memo<DropdownHintProps>(
  ({ children, variant = "default", style }) => {
    const hintStyle = useMemo(
      () =>
        StyleSheet.compose(typography.para[30], {
          color: variant === "error" ? color.red[70] : color.neutral[60],
        }),
      [variant],
    );

    return (
      <Text style={style ? [hintStyle, style] : hintStyle}>{children}</Text>
    );
  },
);

const styles = StyleSheet.create({
  trigger: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 2,
    gap: spacing[50],
  },
  triggerIcon: {
    width: spacing[60],
    height: spacing[60],
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  triggerValue: {
    flex: 1,
    textAlign: "left",
  },
  chevron: {
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
    shadowColor: "#172128",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 8,
    overflow: "hidden",
  },
  contentScroll: {
    flex: 1,
  },
  item: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 12,
    borderWidth: 2,
    gap: spacing[40],
  },
  itemIcon: {
    width: spacing[60],
    height: spacing[60],
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },
  itemText: {
    flex: 1,
  },
  group: {
    flexDirection: "column",
    gap: spacing[30],
  },
  separator: {
    height: 1,
    backgroundColor: color.neutral[20],
    marginHorizontal: -spacing[50],
    marginVertical: spacing[30],
  },
});

export {
  Dropdown,
  DropdownLabel,
  DropdownTrigger,
  DropdownContent,
  DropdownItem,
  DropdownGroup,
  DropdownGroupLabel,
  DropdownSeparator,
  DropdownHint,
};

export type {
  DropdownProps,
  DropdownSize,
  DropdownTriggerProps,
  DropdownContentProps,
  DropdownItemProps,
  DropdownLabelProps,
  DropdownGroupLabelProps,
  DropdownHintProps,
};
