import React from "react";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";

import { cn } from "@/utils/cn";


function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: TabsPrimitive.Root.Props) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      orientation={orientation}
      className={cn(
        "group/tabs flex",
        "data-[orientation=horizontal]:flex-col",
        "data-[orientation=vertical]:flex-row",
        className,
      )}
      {...props}
    />
  );
}

Tabs.displayName = "Tabs";


function TabsList({ className, ...props }: TabsPrimitive.List.Props) {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
        "flex items-start",
        "group-data-[orientation=horizontal]/tabs:flex-row",
        "group-data-[orientation=vertical]/tabs:flex-col",
        className,
      )}
      {...props}
    />
  );
}

TabsList.displayName = "TabsList";


interface ShortcutKeyProps {
  className?: string;
  children: React.ReactNode;
}

function ShortcutKey({ className, children }: ShortcutKeyProps) {
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center",
        "min-w-[24px] px-40 py-30",
        "rounded-[8px]",
        "border border-neutral-40",
        "typography-para-thick-30 text-neutral-40",
        className,
      )}
    >
      {children}
    </span>
  );
}

ShortcutKey.displayName = "ShortcutKey";


interface TabsTriggerProps extends TabsPrimitive.Tab.Props {
  icon?: React.ReactNode;
  shortcutKey?: React.ReactNode;
}

function TabsTrigger({
  className,
  children,
  icon,
  shortcutKey,
  ...props
}: TabsTriggerProps) {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "group/trigger relative flex flex-col items-start",
        "overflow-hidden outline-none cursor-pointer select-none",
        "pb-40",
        "after:content-[''] after:absolute after:bottom-0 after:inset-x-0 after:h-0",
        "after:transition-[height,background-color] after:duration-150",
        "hover:after:h-[4px] hover:after:bg-neutral-20",
        "data-active:after:h-[2px] data-active:after:bg-neutral-110",
        "disabled:pointer-events-none disabled:opacity-50",
        "focus-visible:outline-none",
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "flex w-full items-center justify-center p-50",
          "rounded-tl-[12px] rounded-tr-[12px] rounded-bl-[4px] rounded-br-[4px]",
          "transition-colors duration-150",
          "group-data-[orientation=horizontal]/tabs:flex-row group-data-[orientation=horizontal]/tabs:gap-40",
          "group-data-[orientation=vertical]/tabs:flex-col group-data-[orientation=vertical]/tabs:gap-40",
          "group-data-active/trigger:bg-neutral-10",
        )}
      >
        {icon && (
          <span className="flex shrink-0 items-center justify-center [&_svg]:shrink-0 [&_svg]:fill-current [&_svg:not([class*='size-'])]:size-60">
            {icon}
          </span>
        )}

        <span className="shrink-0 whitespace-nowrap typography-para-thick-30 text-neutral-110">
          {children}
        </span>

        {shortcutKey !== undefined && (
          <ShortcutKey>{shortcutKey}</ShortcutKey>
        )}
      </div>
    </TabsPrimitive.Tab>
  );
}

TabsTrigger.displayName = "TabsTrigger";


function TabsContent({ className, ...props }: TabsPrimitive.Panel.Props) {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
}

TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent, ShortcutKey };

export type { TabsTriggerProps, ShortcutKeyProps };
