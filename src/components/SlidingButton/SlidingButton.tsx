import React from "react";

import ArrowForwardIcon from "@material-symbols/svg-700/sharp/arrow_forward-fill.svg?react";

import {  cn  } from "@/utils/cn";

/* -------------------------------------------------------------------------------------------------
 * SlidingButton
 * -----------------------------------------------------------------------------------------------*/

interface SlidingButtonProps  {
  className?: string;
  label?: string;
  disabled?: boolean;
  /** Called when the user successfully slides to the end */
  onComplete?: () => void;
}

const HANDLE_SIZE = 64; // px — square handle
const COMPLETE_THRESHOLD = 0.85; // fraction of max drag to trigger completion

const SlidingButton = ({
  label = "Slide To Label",
  disabled = false,
  onComplete,
  className,
}: SlidingButtonProps) => {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [dragX, setDragX] = React.useState(0);
  const [completed, setCompleted] = React.useState(false);
  const [transitioning, setTransitioning] = React.useState(false);
  const isDragging = React.useRef(false);
  const startX = React.useRef(0);

  const getMaxDrag = () => {
    return (containerRef.current?.offsetWidth ?? 328) - HANDLE_SIZE;
  }

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (disabled || completed) return;
    isDragging.current = true;
    setTransitioning(false);
    startX.current = e.clientX - dragX;
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging.current) return;
    const max = getMaxDrag();
    setDragX(Math.min(Math.max(0, e.clientX - startX.current), max));
  }

  const handlePointerUp = () => {
    if (!isDragging.current) return;
    isDragging.current = false;
    setTransitioning(true);

    if (dragX >= getMaxDrag() * COMPLETE_THRESHOLD) {
      setCompleted(true);
      onComplete?.();
    } else {
      setDragX(0);
    }
  }

  // The handle grows rightward as the user drags — the orange fill expands
  // naturally with the arrow icon always at the leading (right) edge.
  const handleWidth = completed ? "100%" : `${HANDLE_SIZE + dragX}px`;
  // Label fades out as handle approaches the right side
  const labelOpacity = completed
    ? 0
    : Math.max(0, 1 - (dragX / (getMaxDrag() || 1)) * 1.5);

  return (
    <div
      ref={containerRef}
      className={cn(
        "bg-neutral-10 relative overflow-hidden rounded-[16px] h-[64px] w-full",
        className,
      )}
    >
      {/* Label — stays behind the handle, fades as handle advances */}
      <span
        style={{
          opacity: labelOpacity,
          transition: "opacity 0.15s ease",
        }}
        className={cn(
          "absolute inset-y-0 left-[64px] right-[16px]",
          "flex items-center justify-center text-center",
          "typography-label-30 pointer-events-none select-none",
          disabled ? "text-neutral-40" : "text-neutral-110",
        )}
      >
        {label}
      </span>

      {/* Sliding handle */}
      <div
        style={{
          width: handleWidth,
          transition: transitioning
            ? "width 0.35s cubic-bezier(0.4, 0, 0.2, 1)"
            : "none",
        }}
        className={cn(
          "absolute left-0 top-0 h-[64px] rounded-[16px]",
          "flex items-center justify-end px-80",
          "touch-none select-none",
          disabled
            ? "bg-neutral-20 cursor-not-allowed"
            : "bg-orange-60 shadow-[0px_4px_12px_0px_rgba(250,75,22,0.5)] cursor-grab active:cursor-grabbing",
        )}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onTransitionEnd={() => setTransitioning(false)}
      >
        <ArrowForwardIcon
          className={cn(
            "size-60 shrink-0",
            disabled ? "text-neutral-40" : "text-white",
          )}
        />
      </div>
    </div>
  );
}

SlidingButton.displayName = "SlidingButton";

export { SlidingButton };
export type { SlidingButtonProps };
