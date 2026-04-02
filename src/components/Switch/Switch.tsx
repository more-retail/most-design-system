import React from "react";

import { cn  } from "@/utils/cn";

/* -------------------------------------------------------------------------------------------------
 * Switch
 * -----------------------------------------------------------------------------------------------*/

type SwitchSize = "xs" | "sm" | "md";

/*
 * Size specs (derived from Figma):
 *   xs → container 20×32  thumb default 12px (p=4px)  thumb hover 16px (p=2px)
 *   sm → container 24×40  thumb default 16px (p=4px)  thumb hover 20px (p=2px)
 *   md → container 36×60  thumb default 24px (p=6px)  thumb hover 32px (p=2px)
 */
const sizeStyles: Record<
  SwitchSize,
  {
    container: string;
    thumbDefault: string;
    thumbHover: string;
    thumbHoverTw: string;
    paddingDefault: string;
    paddingHover: string;
    paddingHoverTw: string;
  }
> = {
  xs: {
    container: "h-70 w-100",       // 20 × 32
    thumbDefault: "size-50",        // 12px
    thumbHover: "size-60",          // 16px
    thumbHoverTw: "group-hover:size-60",
    paddingDefault: "p-30",         // 4px
    paddingHover: "p-[2px]",
    paddingHoverTw: "hover:p-[2px]",
  },
  sm: {
    container: "h-80 w-120",       // 24 × 40
    thumbDefault: "size-60",        // 16px
    thumbHover: "size-70",          // 20px
    thumbHoverTw: "group-hover:size-70",
    paddingDefault: "p-30",         // 4px
    paddingHover: "p-[2px]",
    paddingHoverTw: "hover:p-[2px]",
  },
  md: {
    container: "h-110 w-170",      // 36 × 60
    thumbDefault: "size-80",        // 24px
    thumbHover: "size-100",         // 32px
    thumbHoverTw: "group-hover:size-100",
    paddingDefault: "p-[6px]",
    paddingHover: "p-[2px]",
    paddingHoverTw: "hover:p-[2px]",
  },
};

interface SwitchProps  {
  size?: SwitchSize;
  /** Whether the switch is on */
  checked?: boolean;
  /** Called with the next checked value when toggled */
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
}

// ── Component ────────────────────────────────────────────────────────────────

// Minimum px movement before a pointer move is treated as a drag
const DRAG_THRESHOLD = 5;

const Switch = ({
  size = "md",
  checked = false,
  onChange,
  disabled = false,
  className,
}: SwitchProps) => {
  // During a drag we show a local "visual" checked state so the thumb reacts
  // immediately, then commit via onChange on pointer-up.
  const [dragChecked, setDragChecked] = React.useState<boolean | null>(null);

  // Ref avoids stale-closure issues inside pointer handlers
  const dragRef = React.useRef<{
    startX: number;
    initialChecked: boolean;
    hasDragged: boolean;
  } | null>(null);

  const displayChecked = dragChecked !== null ? dragChecked : checked;

  const ss = sizeStyles[size];
  const isDragging = dragChecked !== null && !disabled;

  const handlePointerDown = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (disabled) return;
    e.currentTarget.setPointerCapture(e.pointerId);
    dragRef.current = { startX: e.clientX, initialChecked: checked, hasDragged: false };
    setDragChecked(checked);
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragRef.current || disabled) return;
    const dx = e.clientX - dragRef.current.startX;
    if (Math.abs(dx) >= DRAG_THRESHOLD) {
      dragRef.current.hasDragged = true;
      setDragChecked(dx > 0);
    }
  }

  const handlePointerUp = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (!dragRef.current || disabled) return;
    const { hasDragged, initialChecked } = dragRef.current;
    const dx = e.clientX - dragRef.current.startX;

    if (!hasDragged) {
      // Simple tap/click — toggle
      onChange?.(!initialChecked);
    } else {
      // Drag — commit direction
      onChange?.(dx > 0);
    }

    dragRef.current = null;
    setDragChecked(null);
  }

  return (
    <button
      type="button"
      role="switch"
      aria-checked={displayChecked}
      disabled={disabled}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      className={cn(
        "group flex items-center rounded-full transition-all duration-150 touch-none select-none",
        ss.container,
        ss.paddingDefault,
        ss.paddingHoverTw,
        isDragging && ss.paddingHover,
        displayChecked ? "bg-orange-60 justify-end" : "bg-neutral-20",
        disabled && "opacity-40 pointer-events-none",
        className,
      )}
    >
      <div
        className={cn(
          "rounded-full bg-white shrink-0 transition-all duration-150",
          "shadow-[0px_1px_4px_rgba(23,33,40,0.2)]",
          ss.thumbDefault,
          ss.thumbHoverTw,
          isDragging && ss.thumbHover,
        )}
      />
    </button>
  );
}

Switch.displayName = "Switch";

export { Switch };
export type { SwitchProps, SwitchSize };
