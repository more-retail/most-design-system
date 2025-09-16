import React from "react";

import Color from "color";

import { useControllableState } from "@/hooks/useControllableState";
import { useThrottledCallback } from "@/hooks/useThrottledCallback";
import { type Cn, OptionalCn, cn as defaultCn } from "@/utils/cn";

import {
  DEFAULT_HUE_OFFSET,
  DEFAULT_MAX_LIGHTNESS,
  DEFAULT_MIN_LIGHTNESS,
  DEFAULT_SATURATION,
  SAVED_SWATCHES_KEY,
  SWATCH_PICKER_NAME,
} from "./constants";
import { InternalSwatch, Swatch, SwatchMode } from "./types";
import {
  clampInternalSwatch,
  convertInternalSwatchToSwatch,
  convertSwatchToInternalSwatch,
  getRandomInternalSwatch,
} from "./utils";

import DialogsIcon from "@material-symbols/svg-700/sharp/dialogs.svg?react";
import GradientIcon from "@material-symbols/svg-700/sharp/gradient.svg?react";

/* -------------------------------------------------------------------------------------------------
 * ColorPickerContext)
 * -----------------------------------------------------------------------------------------------*/

interface SwatchPickerContextValue extends Cn {
  swatch: Swatch;
  internalSwatch: InternalSwatch;
  setInternalSwatch: React.Dispatch<React.SetStateAction<InternalSwatch>>;
  disabled: boolean | undefined;
  defaultInternalSwatch: InternalSwatch;
  savedInternalSwatches: InternalSwatch[];
  handleSaveSwatch: (internalSwatch: InternalSwatch) => void;
}

const SwatchPickerContext =
  React.createContext<SwatchPickerContextValue | null>(null);

function useSwatchPickerContext() {
  const context = React.useContext(SwatchPickerContext);
  if (!context) {
    throw new Error(
      `${SWATCH_PICKER_NAME} components must be used within a <${SWATCH_PICKER_NAME}> provider`,
    );
  }
  return context;
}

/* -------------------------------------------------------------------------------------------------
 * ColorPicker (ColorPickerProvider)
 * -----------------------------------------------------------------------------------------------*/

interface SwatchPickerProps extends OptionalCn {
  swatch?: Swatch;
  defaultSwatch?: Swatch;
  onSwatchChange?: (swatch: Swatch) => void;
  onSwatchSave?: (swatch: Swatch) => void;
  savedSwatchesLimit?: number;
  disabled?: boolean;
  children?: React.ReactNode;
}

function SwatchPicker(props: SwatchPickerProps) {
  const {
    swatch: swatchProp,
    defaultSwatch,
    onSwatchChange,
    onSwatchSave,
    savedSwatchesLimit = 12,
    disabled,
    children,
    cn,
  } = props;

  const [savedInternalSwatches, setSavedInternalSwatches] = React.useState<
    InternalSwatch[]
  >(() => {
    if (typeof window === "undefined") return [];

    try {
      const item = window.localStorage.getItem(SAVED_SWATCHES_KEY);
      const parsed: unknown = item ? JSON.parse(item) : [];

      if (Array.isArray(parsed)) {
        return parsed
          .map((swatch) => {
            try {
              return convertSwatchToInternalSwatch(swatch as Swatch);
            } catch {
              return null;
            }
          })
          .filter((s): s is InternalSwatch => s !== null);
      }
    } catch (error) {
      console.error("Error reading saved swatches", error);
    }

    return [];
  });

  const defaultModeRef = React.useRef<SwatchMode>(
    swatchProp
      ? swatchProp.mode
      : savedInternalSwatches.length > 0
        ? savedInternalSwatches[0].mode
        : "gradient",
  );

  const defaultInternalSwatchRef = React.useRef(
    defaultSwatch
      ? clampInternalSwatch(convertSwatchToInternalSwatch(defaultSwatch))
      : getRandomInternalSwatch(defaultModeRef.current),
  );

  const [swatch, setSwatch] = useControllableState<Swatch>({
    prop: swatchProp,
    defaultProp: defaultSwatch
      ? defaultSwatch
      : convertInternalSwatchToSwatch(defaultInternalSwatchRef.current),
    onChange: onSwatchChange,
    caller: SWATCH_PICKER_NAME,
  });

  const [internalSwatch, setInternalSwatch] = React.useState<InternalSwatch>(
    convertSwatchToInternalSwatch(swatch),
  );

  React.useEffect(() => {
    if (!swatchProp) return;

    const externalInternalSwatch = clampInternalSwatch(
      convertSwatchToInternalSwatch(swatchProp),
    );

    setInternalSwatch((internalSwatch) => {
      if (internalSwatch.mode !== externalInternalSwatch.mode) {
        return externalInternalSwatch;
      }

      if (
        internalSwatch.mode === "solid" &&
        externalInternalSwatch.mode === "solid"
      ) {
        return internalSwatch.color.hex() === externalInternalSwatch.color.hex()
          ? internalSwatch
          : externalInternalSwatch;
      }

      if (
        internalSwatch.mode === "gradient" &&
        externalInternalSwatch.mode === "gradient"
      ) {
        const [c1, c2] = internalSwatch.colors.map((c) => c.hex());
        const [e1, e2] = externalInternalSwatch.colors.map((c) => c.hex());
        return c1 === e1 && c2 === e2 ? internalSwatch : externalInternalSwatch;
      }

      return externalInternalSwatch;
    });
  }, [swatchProp, setInternalSwatch]);

  React.useEffect(() => {
    setSwatch(convertInternalSwatchToSwatch(internalSwatch));
  }, [internalSwatch, setSwatch]);

  React.useEffect(() => {
    if (!onSwatchChange) return;

    onSwatchChange(swatch);
  }, [swatch, onSwatchChange]);

  React.useEffect(() => {
    try {
      const savedSwatches = savedInternalSwatches.map((internalSwatch) =>
        convertInternalSwatchToSwatch(internalSwatch),
      );

      window.localStorage.setItem(
        SAVED_SWATCHES_KEY,
        JSON.stringify(savedSwatches),
      );
    } catch (error) {
      console.error("Error savings swatches", error);
    }
  }, [savedInternalSwatches]);

  const handleSaveSwatch = React.useCallback(
    (swatchToSave: InternalSwatch) => {
      const otherSavedInternalSwatches = savedInternalSwatches.filter(
        (savedSwatch) => {
          if (savedSwatch.mode !== swatchToSave.mode) return true;

          // For solids, compare their hex strings
          if (savedSwatch.mode === "solid" && swatchToSave.mode === "solid") {
            return savedSwatch.color.hex() !== swatchToSave.color.hex();
          }

          // For gradients, compare the hex strings of both colors
          if (
            savedSwatch.mode === "gradient" &&
            swatchToSave.mode === "gradient"
          ) {
            const [c1, c2] = swatchToSave.colors;
            const [s1, s2] = savedSwatch.colors;
            // Return true (keep) if the color pairs are NOT the same
            return !(s1.hex() === c1.hex() && s2.hex() === c2.hex());
          }
          return true;
        },
      );

      // Add the new swatch to the beginning of the array and limit to 12
      setSavedInternalSwatches(
        [swatchToSave, ...otherSavedInternalSwatches].slice(
          0,
          savedSwatchesLimit,
        ),
      );

      if (!onSwatchSave) return;
      onSwatchSave(convertInternalSwatchToSwatch(swatchToSave));
    },
    [
      savedInternalSwatches,
      savedSwatchesLimit,
      setSavedInternalSwatches,
      onSwatchSave,
    ],
  );

  const contextValue: SwatchPickerContextValue = {
    swatch,
    internalSwatch,
    setInternalSwatch,
    disabled,
    defaultInternalSwatch: defaultInternalSwatchRef.current,
    savedInternalSwatches,
    handleSaveSwatch,
    cn: cn ? cn : defaultCn,
  };

  const [isMounted, setIsMounted] = React.useState(false);
  React.useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) {
    return null;
  }

  return (
    <SwatchPickerContext.Provider value={contextValue}>
      {children}
    </SwatchPickerContext.Provider>
  );
}

/* -------------------------------------------------------------------------------------------------
 * ColorPickerModeToggle
 * -----------------------------------------------------------------------------------------------*/

interface SwatchPickerModeToggleProps
  extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}
function SwatchPickerModeToggle({
  className,
  ...props
}: SwatchPickerModeToggleProps) {
  const { internalSwatch, setInternalSwatch, disabled, cn } =
    useSwatchPickerContext();

  const handleModeToggle = React.useCallback(
    (newMode: SwatchMode) => {
      if (newMode === internalSwatch.mode) return;

      switch (internalSwatch.mode) {
        case "solid": {
          setInternalSwatch({
            mode: "gradient",
            colors: [
              internalSwatch.color,
              internalSwatch.color.rotate(DEFAULT_HUE_OFFSET),
            ],
          });
          break;
        }
        case "gradient": {
          setInternalSwatch({
            mode: "solid",
            color: internalSwatch.colors[0],
          });
          break;
        }
      }
    },
    [internalSwatch, setInternalSwatch],
  );

  return (
    <div
      className={cn(
        "swatch-picker-mode-toggle relative flex w-fit items-center gap-1 rounded-xl bg-neutral-10 p-1 data-[disabled=true]:cursor-not-allowed",
        className,
      )}
      {...props}
      data-disabled={disabled}
    >
      <div
        className="swatch-picker-mode-active-indicator absolute top-1 left-1 size-9 rounded-lg bg-white shadow-sm shadow-neutral-110/10 transition-transform duration-300 ease-in-out"
        style={{
          transform:
            internalSwatch.mode === "gradient"
              ? "translateX(calc(100% + 4px))"
              : "translateX(0)",
        }}
      />
      <button
        onClick={() => handleModeToggle("solid")}
        className="swatch-picker-solid-mode-button relative flex size-9 cursor-pointer items-center justify-center rounded-lg disabled:cursor-not-allowed [&_svg]:size-5 [&_svg]:fill-neutral-110 disabled:[&_svg]:fill-neutral-60"
        aria-label="Switch to solid color mode"
        disabled={disabled}
      >
        <DialogsIcon />
      </button>
      <button
        onClick={() => handleModeToggle("gradient")}
        className="swatch-picker-gradient-mode-button relative flex size-9 cursor-pointer items-center justify-center rounded-lg disabled:cursor-not-allowed [&_svg]:size-5 [&_svg]:fill-neutral-110 disabled:[&_svg]:fill-neutral-60"
        aria-label="Switch to gradient color mode"
        disabled={disabled}
      >
        <GradientIcon className="size-5" />
      </button>
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * SwatchPickerWheel
 * -----------------------------------------------------------------------------------------------*/

interface SwatchPickerWheelProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

function SwatchPickerWheel({ className, ...props }: SwatchPickerWheelProps) {
  const { internalSwatch, setInternalSwatch, handleSaveSwatch, disabled, cn } =
    useSwatchPickerContext();

  const swatchPickerWheelRef = React.useRef<HTMLDivElement>(null);
  const primaryKnobRef = React.useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = React.useState(false);
  const hasMovedRef = React.useRef(false);

  // Stores the hue to lock the movement when a predefined modifier key is pressed
  const lockedHueRef = React.useRef<number | null>(null);

  const swatchPickerSizeRef = React.useRef(
    swatchPickerWheelRef?.current?.offsetWidth ?? 0,
  );
  const primaryKnobSizeRef = React.useRef(
    primaryKnobRef?.current?.offsetWidth ?? 0,
  );
  const [radius, setRadius] = React.useState(swatchPickerSizeRef.current / 2);

  React.useEffect(() => {
    swatchPickerSizeRef.current =
      swatchPickerWheelRef?.current?.offsetWidth ?? 0;
    primaryKnobSizeRef.current = primaryKnobRef?.current?.offsetWidth ?? 0;
    setRadius(swatchPickerSizeRef.current / 2);
  }, []);

  // Set the primary color's knob position when loading saved swatches or when
  // the swatches are programmatically updated
  React.useEffect(() => {
    if (!isDragging && primaryKnobRef.current) {
      const primaryColor =
        internalSwatch.mode === "solid"
          ? internalSwatch.color
          : internalSwatch.colors[0];
      const distance =
        ((DEFAULT_MAX_LIGHTNESS - primaryColor.lightness()) /
          (DEFAULT_MAX_LIGHTNESS - DEFAULT_MIN_LIGHTNESS)) *
        radius;
      const angleInRad = (primaryColor.hue() * Math.PI) / 180;
      const knobX = distance * Math.cos(angleInRad);
      const knobY = distance * Math.sin(angleInRad);
      primaryKnobRef.current.style.transform = `translate(${knobX}px, ${knobY}px) scale(1)`;
      primaryKnobRef.current.style.transition = `transform 100ms ease-out, border-width 100ms ease-out`;
    }
  }, [internalSwatch, radius, isDragging]);

  // Keep the secondary color's knob visually aligned smoothly rotating along
  // the shortest path on the hue wheel (avoids the knob rotating a complete
  // 360° when the numbers wrap around)
  const [secondaryColorVisualHue, setSecondaryColorVisualHue] = React.useState(
    internalSwatch.mode === "gradient" ? internalSwatch.colors[1].hue() : 0,
  );
  React.useEffect(() => {
    const target =
      internalSwatch.mode === "gradient" ? internalSwatch.colors[1].hue() : 0;
    const current = secondaryColorVisualHue;
    const diff = target - (current % 360);
    let newVisualHue = current + diff;
    if (diff > 180) {
      newVisualHue = current + (diff - 360);
    } else if (diff < -180) {
      newVisualHue = current + (diff + 360);
    }
    setSecondaryColorVisualHue(newVisualHue);
  }, [internalSwatch]);

  React.useEffect(() => {
    setSecondaryColorVisualHue((secondaryColorVisualHue) => {
      const target =
        internalSwatch.mode === "gradient" ? internalSwatch.colors[1].hue() : 0;
      const current = secondaryColorVisualHue;
      const diff = target - (current % 360);
      if (diff > 180) {
        return current + (diff - 360);
      } else if (diff < -180) {
        return current + (diff + 360);
      } else return current + diff;
    });
  }, [internalSwatch]);

  const updateColor = React.useCallback(
    (clientX: number, clientY: number) => {
      if (!swatchPickerWheelRef.current) return;

      // Calculate distance of the click from the center of the color wheel
      const rect = swatchPickerWheelRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = clientX - centerX;
      const deltaY = clientY - centerY;

      let distance;
      let newHue;

      // Calculate a clamped distance and the new color's hue in degrees
      if (lockedHueRef.current !== null) {
        // If a hue has been locked in, stick with the locked hue
        newHue = lockedHueRef.current;

        // Convert hue from degrees to radians (JavaScript trig functions expect radians)
        const angleInRad = (newHue * Math.PI) / 180;

        // Project the drag vector (deltaX, deltaY) onto the locked hue
        // direction. This gives us the distance along that specific hue’s line,
        // ignoring any motion that is sideways relative to the hue angle.
        const projectedDistance =
          deltaX * Math.cos(angleInRad) + deltaY * Math.sin(angleInRad);

        // Clamp so the distance can’t go below 0 or exceed the wheel’s radius
        distance = Math.max(0, Math.min(radius, projectedDistance));
      } else {
        // No hue lock - user is free to rotate around the wheel

        // Calculate the angle of the drag vector using atan2:
        // - atan2(deltaY, deltaX) gives the angle of the line from center to cursor
        // - result is in radians, so convert to degrees
        newHue = (Math.atan2(deltaY, deltaX) * 180) / Math.PI;

        // atan2 can return negative angles (e.g., -90° instead of 270°).
        // If that happens, shift it into the standard 0–360 range.
        if (newHue < 0) newHue += 360;

        // Calculate the straight-line distance from center to cursor
        // with Pythagora's theorem (sqrt(deltaX^2 + deltaY^2))
        // Clamp so the distance can’t exceed the wheel’s radius
        distance = Math.min(radius, Math.sqrt(deltaX ** 2 + deltaY ** 2));
      }

      // Figure out lightness based on how far from the center we are.
      // - If we're at the center: use the brightest value (DEFAULT_MAX_LIGHTNESS).
      // - If we're all the way at the edge: use the darkest value (DEFAULT_MIN_LIGHTNESS).
      // - Everything in between scales smoothly as you drag outward.
      const newLightness =
        DEFAULT_MAX_LIGHTNESS - // start at the maximum lightness
        (distance / radius) * // scale factor: 0 at center to 1 at edge
          (DEFAULT_MAX_LIGHTNESS - DEFAULT_MIN_LIGHTNESS); // total range of lightness values

      // Calculate the knob's new position with polar to Cartesian conversion
      if (primaryKnobRef.current) {
        const angleInRad = (newHue * Math.PI) / 180;
        const knobX = distance * Math.cos(angleInRad);
        const knobY = distance * Math.sin(angleInRad);
        primaryKnobRef.current.style.transform = `translate(${knobX}px, ${knobY}px) scale(1.25)`;
      }

      setInternalSwatch((currentInternalSwatch) => {
        switch (currentInternalSwatch.mode) {
          case "solid": {
            return {
              mode: "solid",
              color: Color({
                h: newHue,
                s: currentInternalSwatch.color.saturationl(),
                l: newLightness,
              }),
            };
          }
          case "gradient": {
            const [currentPrimaryColor, currentSecondaryColor] =
              currentInternalSwatch.colors;
            const hueOffset =
              currentSecondaryColor.hue() - currentPrimaryColor.hue();

            const newPrimaryColor = Color({
              h: newHue,
              s: currentInternalSwatch.colors[0].saturationl(),
              l: newLightness,
            });
            const newSecondaryColor = newPrimaryColor.rotate(hueOffset);
            return {
              mode: "gradient",
              colors: [newPrimaryColor, newSecondaryColor],
            };
          }
        }
      });
    },
    [radius, setInternalSwatch],
  );

  const throttledUpdateColor = useThrottledCallback(updateColor, 20);
  const internalSwatchRef = React.useRef(internalSwatch);
  React.useEffect(() => {
    internalSwatchRef.current = internalSwatch;
  });

  const handleMouseDown = React.useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (disabled) return;

      hasMovedRef.current = false;
      document.body.style.cursor = "grabbing";

      // Store the current hue on pressing the Shift key to lock the movement
      if (
        "nativeEvent" in e &&
        "shiftKey" in e.nativeEvent &&
        e.nativeEvent.shiftKey
      ) {
        lockedHueRef.current = (
          internalSwatchRef.current.mode === "solid"
            ? internalSwatchRef.current.color
            : internalSwatchRef.current.colors[0]
        ).hue();
      } else {
        lockedHueRef.current = null;
      }

      if (primaryKnobRef.current) {
        primaryKnobRef.current.style.transition =
          "transform 100ms ease-out, background-color 100ms ease-out, border-width 100ms ease-out";
      }

      const clientX =
        "touches" in e ? e.touches[0].clientX : e.nativeEvent.clientX;
      const clientY =
        "touches" in e ? e.touches[0].clientY : e.nativeEvent.clientY;
      throttledUpdateColor(clientX, clientY);

      setIsDragging(true);
    },
    [throttledUpdateColor, setIsDragging, disabled],
  );

  const handleMouseMove = React.useCallback(
    (e: MouseEvent | TouchEvent) => {
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        if (primaryKnobRef.current) {
          primaryKnobRef.current.style.transition = "none";
        }
      }

      const clientX = "touches" in e ? e.touches[0].clientX : e.clientX;
      const clientY = "touches" in e ? e.touches[0].clientY : e.clientY;

      throttledUpdateColor(clientX, clientY);
    },
    [throttledUpdateColor],
  );

  const handleMouseUp = React.useCallback(() => {
    document.body.style.cursor = "";
    if (primaryKnobRef.current) {
      primaryKnobRef.current.style.transform =
        primaryKnobRef.current.style.transform.replace(
          /scale\([^)]+\)/,
          "scale(1)",
        );
      primaryKnobRef.current.style.transition = `transform 100ms ease-in-out, border-width 100ms ease-out`;
    }

    handleSaveSwatch(internalSwatchRef.current);
    setIsDragging(false);
  }, [handleSaveSwatch, setIsDragging]);

  React.useEffect(() => {
    if (!isDragging) return;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("touchend", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("touchend", handleMouseUp);
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const handleDoubleClick = React.useCallback(() => {
    if (disabled) return;

    if (internalSwatch.mode === "gradient") {
      const newInternalSwatch: InternalSwatch = {
        mode: "gradient",
        colors: [internalSwatch.colors[1], internalSwatch.colors[0]],
      };
      setInternalSwatch(newInternalSwatch);
      handleSaveSwatch(newInternalSwatch);
    }
  }, [internalSwatch, setInternalSwatch, handleSaveSwatch, disabled]);

  return (
    <div
      ref={swatchPickerWheelRef}
      className={cn(
        "swatch-picker-wheel group group relative size-60 rounded-full shadow-inner shadow-neutral-110/25 hover:cursor-pointer data-[disabled=true]:cursor-not-allowed",
        className,
      )}
      style={{
        background: `
            radial-gradient(circle, hsl(0, 0%, ${DEFAULT_MAX_LIGHTNESS}%), transparent),
            conic-gradient(from 90deg, hsl(0, ${DEFAULT_SATURATION}%, ${DEFAULT_MIN_LIGHTNESS}%), hsl(60, ${DEFAULT_SATURATION}%, ${DEFAULT_MIN_LIGHTNESS}%), hsl(120, ${DEFAULT_SATURATION}%, ${DEFAULT_MIN_LIGHTNESS}%), hsl(180, ${DEFAULT_SATURATION}%, ${DEFAULT_MIN_LIGHTNESS}%), hsl(240, ${DEFAULT_SATURATION}%, ${DEFAULT_MIN_LIGHTNESS}%), hsl(300, ${DEFAULT_SATURATION}%, ${DEFAULT_MIN_LIGHTNESS}%), hsl(0, ${DEFAULT_SATURATION}%, ${DEFAULT_MIN_LIGHTNESS}%))
          `,
      }}
      data-disabled={disabled}
      onMouseDown={handleMouseDown}
      onTouchStart={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      {...props}
    >
      <div className="absolute top-1/2 left-1/2">
        <div
          ref={primaryKnobRef}
          className="swatch-picker-primary-knob size-9 origin-right scale-100 rounded-full border-4 border-white shadow-xl shadow-neutral-110/25 group-data-[disabled=true]:cursor-not-allowed! group-data-[disabled=true]:border-4! group-data-[disabled=true]:border-white/50 hover:cursor-grab hover:border-5 active:cursor-grabbing"
          style={{
            backgroundColor: (internalSwatch.mode === "solid"
              ? internalSwatch.color
              : internalSwatch.colors[0]
            ).hex(),
            marginLeft: `-${primaryKnobSizeRef.current / 2}px`,
            marginTop: `-${primaryKnobSizeRef.current / 2}px`,
          }}
          onMouseDown={handleMouseDown}
          onTouchStart={handleMouseDown}
        />
      </div>
      {internalSwatch.mode === "gradient" && (
        <div
          className="pointer-events-none absolute top-0 left-0 h-full w-full transform-[rotate] duration-100 ease-out"
          style={{ transform: `rotate(${secondaryColorVisualHue}deg)` }}
        >
          <div
            className="swatch-picker-secondary-knob absolute top-1/2 left-1/2 flex size-3 animate-in cursor-default items-center justify-center rounded-full border-2 border-white transition-[transform] duration-100 ease-out fade-in group-data-[disabled=true]:border-white/50"
            style={{
              backgroundColor: internalSwatch.colors[1].hex(),
              transform: `translate(-50%, -50%) translateX(${
                ((DEFAULT_MAX_LIGHTNESS -
                  internalSwatch.colors[0].lightness()) /
                  (DEFAULT_MAX_LIGHTNESS - DEFAULT_MIN_LIGHTNESS)) *
                radius
              }px)`,
            }}
          />
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------------------------------
 * SwatchPickerPreview
 * -----------------------------------------------------------------------------------------------*/

interface SwatchPickerPreviewProps
  extends React.ButtonHTMLAttributes<HTMLDivElement> {
  className?: string;
}

function SwatchPickerPreview({
  className,
  ...props
}: SwatchPickerPreviewProps) {
  const { internalSwatch, cn } = useSwatchPickerContext();
  return (
    <div
      className={cn(
        "swatch-picker-preview size-12 rounded-xl transition-colors duration-200",
        className,
      )}
      style={{
        background:
          internalSwatch.mode === "solid"
            ? internalSwatch.color.hex()
            : `linear-gradient(135deg, ${internalSwatch.colors[0].hex()}, ${internalSwatch.colors[1].hex()})`,
      }}
      {...props}
    />
  );
}

/* -------------------------------------------------------------------------------------------------
 * ColorPickerSavedSwatches
 * -----------------------------------------------------------------------------------------------*/

interface SwatchPickerSavedSwatchesProps
  extends React.HTMLAttributes<HTMLDivElement> {
  onSavedSwatchSelect?: (swatch: Swatch) => void;
  className?: string;
}

function SwatchPickerSavedSwatches({
  onSavedSwatchSelect,
  className,
  ...props
}: SwatchPickerSavedSwatchesProps) {
  const { savedInternalSwatches, setInternalSwatch, disabled, cn } =
    useSwatchPickerContext();

  const [mounted, setMounted] = React.useState(false);

  // Animate the height of the grid, skipping the animation on first render
  const gridRef = React.useRef<HTMLDivElement>(null);
  const [gridHeight, setGridHeight] = React.useState<number>(
    () => gridRef.current?.scrollHeight || 0,
  );
  React.useLayoutEffect(() => {
    if (!gridRef.current) return;

    setGridHeight(
      savedInternalSwatches.length === 0 ? 0 : gridRef.current.scrollHeight,
    );

    // Enable transitions after the initial measurement
    requestAnimationFrame(() => setMounted(true));
  }, [savedInternalSwatches.length]);

  const handleSelectSavedSwatch = React.useCallback(
    (swatch: InternalSwatch) => {
      setInternalSwatch(swatch);

      if (!onSavedSwatchSelect) return;
      onSavedSwatchSelect(convertInternalSwatchToSwatch(swatch));
    },
    [setInternalSwatch, onSavedSwatchSelect],
  );

  const handleKeyDown = (
    event: React.KeyboardEvent,
    swatch: InternalSwatch,
  ) => {
    if (event.key === "Enter" || event.key === " ") {
      handleSelectSavedSwatch(swatch);
    }
  };

  if (savedInternalSwatches.length === 0) {
    return null;
  }

  return (
    <div
      ref={gridRef}
      className={cn(
        "swatch-picker-saved-swatches-grid grid w-full animate-in grid-cols-6 gap-1 overflow-hidden rounded-xl bg-neutral-10 p-1 duration-100 ease-in fade-in",
        className,
      )}
      style={{
        height: gridHeight,
        transition: mounted ? "height 0.3s ease-in-out" : "none",
      }}
      {...props}
    >
      {savedInternalSwatches.map((swatch) => {
        const swatchKey =
          swatch.mode === "solid"
            ? swatch.color.hex()
            : swatch.colors.map((c) => c.hex()).join("-");

        const background =
          swatch.mode === "solid"
            ? swatch.color.hex()
            : `linear-gradient(135deg, ${swatch.colors[0].hex()}, ${swatch.colors[1].hex()})`;

        const ariaLabel =
          swatch.mode === "solid"
            ? `Select solid color ${swatch.color.hex()}`
            : `Select gradient from ${swatch.colors[0].hex()} to ${swatch.colors[1].hex()}`;

        return (
          <button
            key={swatchKey}
            onClick={() => handleSelectSavedSwatch(swatch)}
            onKeyDown={(e) => handleKeyDown(e, swatch)}
            role="button"
            tabIndex={0}
            aria-label={ariaLabel}
            className="swatch-picker-saved-swatch aspect-square w-full animate-in cursor-pointer rounded-lg outline-2 -outline-offset-2 outline-transparent transition-[outline-color,box-shadow] zoom-in hover:shadow-[inset_0_0_0_4px_var(--color-neutral-10)] hover:outline-neutral-20 focus:shadow-[inset_0_0_0_4px_var(--color-neutral-10)] focus:outline-neutral-110 active:outline-neutral-110 disabled:cursor-not-allowed disabled:shadow-none disabled:outline-none"
            style={{ background }}
            disabled={disabled}
          />
        );
      })}
    </div>
  );
}

export {
  SwatchPicker,
  SwatchPickerModeToggle,
  SwatchPickerWheel,
  SwatchPickerPreview,
  SwatchPickerSavedSwatches,
};
