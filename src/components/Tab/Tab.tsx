"use client";

import * as React from "react";

import { Tabs as TabsPrimitive } from "@base-ui/react/tabs";

import { cn } from "@/utils/cn";

import { tabVariants } from "./Tab.variants";

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col", className)}
      {...props}
    />
  );
}

function TabList({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List>) {
  return (
    <TabsPrimitive.List
      data-slot="tab-list"
      className={cn("flex items-end", className)}
      {...props}
    />
  );
}

function Tab({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Tab>) {
  return (
    <TabsPrimitive.Tab
      data-slot="tab"
      className={cn(tabVariants({ className }))}
      {...props}
    >
      <span className="tab-container">{children}</span>
    </TabsPrimitive.Tab>
  );
}

function TabPanel({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Panel>) {
  return (
    <TabsPrimitive.Panel
      data-slot="tab-panel"
      className={cn("typography-para-30", className)}
      {...props}
    />
  );
}

export { Tabs, TabList, Tab, TabPanel };
