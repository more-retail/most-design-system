import React from "react";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";

import { cn } from "@/utils/cn";

const Tabs: React.FC<TabsPrimitive.Root.Props> = ({
  className,
  orientation = "horizontal",
  ...props
}) => {
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
};

const TabsList: React.FC<TabsPrimitive.List.Props> = ({
  className,
  ...props
}) => {
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
};

interface ShortcutKeyProps {
  className?: string;
  children: React.ReactNode;
}

const ShortcutKey: React.FC<ShortcutKeyProps> = ({ className, children }) => {
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
};

interface TabsTriggerProps extends TabsPrimitive.Tab.Props {
  icon?: React.ReactNode;
  shortcutKey?: React.ReactNode;
}

const TabsTrigger: React.FC<TabsTriggerProps> = ({
  className,
  children,
  icon,
  shortcutKey,
  ...props
}) => {
  return (
    <TabsPrimitive.Tab
      data-slot="tabs-trigger"
      className={cn(
        "group/trigger relative flex flex-col items-start",
        "cursor-pointer overflow-hidden outline-none select-none",
        "pb-40",
        "after:absolute after:inset-x-0 after:bottom-0 after:h-0 after:content-['']",
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
          "rounded-tl-[12px] rounded-tr-[12px] rounded-br-[4px] rounded-bl-[4px]",
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

        <span className="shrink-0 typography-para-thick-30 whitespace-nowrap text-neutral-110">
          {children}
        </span>

        {shortcutKey !== undefined && <ShortcutKey>{shortcutKey}</ShortcutKey>}
      </div>
    </TabsPrimitive.Tab>
  );
};

const TabsContent: React.FC<TabsPrimitive.Panel.Props> = ({
  className,
  ...props
}) => {
  return (
    <TabsPrimitive.Panel
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props}
    />
  );
};

export { Tabs, TabsList, TabsTrigger, TabsContent, ShortcutKey };

export type { TabsTriggerProps, ShortcutKeyProps };
