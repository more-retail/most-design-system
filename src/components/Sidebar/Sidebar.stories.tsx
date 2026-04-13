import React from "react";

import type { Meta, StoryObj } from "@storybook/react-vite";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarItem,
  SidebarProfileItem,
  SidebarProvider,
  SidebarToggle,
} from "./Sidebar";

import AnalyticsIcon from "@material-symbols/svg-700/sharp/analytics-fill.svg?react";
import AppIcon from "@material-symbols/svg-700/sharp/apps-fill.svg?react";
import AppsIcon from "@material-symbols/svg-700/sharp/apps.svg?react";
import CalendarIcon from "@material-symbols/svg-700/sharp/calendar_month-fill.svg?react";
import DashboardIcon from "@material-symbols/svg-700/sharp/dashboard-fill.svg?react";
import PeopleIcon from "@material-symbols/svg-700/sharp/group-fill.svg?react";
import HeadsetMicIcon from "@material-symbols/svg-700/sharp/headset_mic-fill.svg?react";
import InboxIcon from "@material-symbols/svg-700/sharp/inbox-fill.svg?react";
import NotificationsIcon from "@material-symbols/svg-700/sharp/notifications-fill.svg?react";
import SettingsIcon from "@material-symbols/svg-700/sharp/settings-fill.svg?react";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Sidebar>;

function SidebarShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-neutral-10">
      {children}
      <div className="flex flex-1 items-center justify-center typography-label-thick-30 text-neutral-60">
        Page content
      </div>
    </div>
  );
}

export const Expanded: Story = {
  render: () => (
    <SidebarShell>
      <SidebarProvider defaultCollapsed={false}>
        <Sidebar>
          <SidebarHeader>
            <AppIcon className="size-[48px] shrink-0" />
            <SidebarItem icon={<AppsIcon />} label="Apps" />
            <SidebarItem
              icon={<NotificationsIcon />}
              label="Notifications"
              badge={2}
            />
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup label="Workspace">
              <SidebarItem
                icon={<DashboardIcon />}
                label="Dashboard"
                isActive
              />
              <SidebarItem icon={<InboxIcon />} label="Inbox" />
              <SidebarItem icon={<AnalyticsIcon />} label="Analytics" />
            </SidebarGroup>

            <SidebarGroup label="Manage">
              <SidebarItem icon={<PeopleIcon />} label="People" />
              <SidebarItem icon={<CalendarIcon />} label="Calendar" />
              <SidebarItem icon={<SettingsIcon />} label="Settings" />
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <SidebarItem icon={<HeadsetMicIcon />} label="Help" />
            <SidebarProfileItem
              name="Jane Doe"
              email="jane.doe@more.in"
              onEdit={() => alert("Edit profile")}
              onLogout={() => alert("Logged out")}
            />
            <SidebarToggle />
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    </SidebarShell>
  ),
};

export const Collapsed: Story = {
  render: () => (
    <SidebarShell>
      <SidebarProvider defaultCollapsed={true}>
        <Sidebar>
          <SidebarHeader>
            <AppIcon className="size-[48px] shrink-0" />
            <SidebarItem icon={<AppsIcon />} label="Apps" />
            <SidebarItem
              icon={<NotificationsIcon />}
              label="Notifications"
              badge={2}
            />
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup label="Workspace">
              <SidebarItem
                icon={<DashboardIcon />}
                label="Dashboard"
                isActive
              />
              <SidebarItem icon={<InboxIcon />} label="Inbox" />
              <SidebarItem icon={<AnalyticsIcon />} label="Analytics" />
            </SidebarGroup>

            <SidebarGroup label="Manage">
              <SidebarItem icon={<PeopleIcon />} label="People" />
              <SidebarItem icon={<CalendarIcon />} label="Calendar" />
              <SidebarItem icon={<SettingsIcon />} label="Settings" />
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <SidebarItem icon={<HeadsetMicIcon />} label="Help" />
            <SidebarProfileItem
              name="Jane Doe"
              email="jane.doe@more.in"
              onEdit={() => alert("Edit profile")}
              onLogout={() => alert("Logged out")}
            />
            <SidebarToggle />
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    </SidebarShell>
  ),
};

export const Interactive: Story = {
  render: () => (
    <SidebarShell>
      <SidebarProvider defaultCollapsed={false}>
        <Sidebar>
          <SidebarHeader>
            <AppIcon className="size-[48px] shrink-0" />
            <SidebarItem icon={<AppsIcon />} label="Apps" />
            <SidebarItem
              icon={<NotificationsIcon />}
              label="Notifications"
              badge={5}
            />
          </SidebarHeader>

          <SidebarContent>
            <SidebarGroup label="Workspace">
              <SidebarItem
                icon={<DashboardIcon />}
                label="Dashboard"
                isActive
              />
              <SidebarItem icon={<InboxIcon />} label="Inbox" badge={12} />
              <SidebarItem icon={<AnalyticsIcon />} label="Analytics" />
            </SidebarGroup>

            <SidebarGroup label="Manage">
              <SidebarItem icon={<PeopleIcon />} label="People" />
              <SidebarItem icon={<CalendarIcon />} label="Calendar" />
              <SidebarItem icon={<SettingsIcon />} label="Settings" />
            </SidebarGroup>
          </SidebarContent>

          <SidebarFooter>
            <SidebarItem icon={<HeadsetMicIcon />} label="Help" />
            <SidebarProfileItem
              name="Jane Doe"
              email="jane.doe@more.in"
              onEdit={() => alert("Edit profile")}
              onLogout={() => alert("Logged out")}
            />
            <SidebarToggle />
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    </SidebarShell>
  ),
};

export const ItemStates: Story = {
  render: () => (
    <SidebarProvider defaultCollapsed={false}>
      <Sidebar>
        <SidebarContent>
          <SidebarGroup label="States">
            <SidebarItem icon={<DashboardIcon />} label="Default" />
            <SidebarItem icon={<DashboardIcon />} label="Active" isActive />
            <SidebarItem
              icon={<NotificationsIcon />}
              label="With Badge"
              badge={3}
            />
            <SidebarItem icon={<DashboardIcon />} label="Disabled" disabled />
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
    </SidebarProvider>
  ),
};

export const ProfileItemStates: Story = {
  render: () => (
    <div className="flex h-screen items-end gap-[24px] bg-neutral-10 p-[24px]">
      <SidebarProvider defaultCollapsed={true}>
        <Sidebar>
          <SidebarFooter>
            <SidebarProfileItem
              name="Jane Doe"
              email="jane.doe@more.in"
              onEdit={() => {}}
              onLogout={() => {}}
            />
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>

      <SidebarProvider defaultCollapsed={false}>
        <Sidebar>
          <SidebarFooter>
            <SidebarProfileItem
              name="Jane Doe"
              email="jane.doe@more.in"
              onEdit={() => {}}
              onLogout={() => {}}
            />
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>
    </div>
  ),
};

type PageId =
  | "dashboard"
  | "inbox"
  | "analytics"
  | "people"
  | "calendar"
  | "settings";

const pages: Record<
  PageId,
  { label: string; icon: React.ReactNode; description: string }
> = {
  dashboard: {
    label: "Dashboard",
    icon: <DashboardIcon />,
    description: "Overview of your workspace activity and key metrics.",
  },
  inbox: {
    label: "Inbox",
    icon: <InboxIcon />,
    description: "All your messages and notifications in one place.",
  },
  analytics: {
    label: "Analytics",
    icon: <AnalyticsIcon />,
    description: "Charts, reports and insights about your data.",
  },
  people: {
    label: "People",
    icon: <PeopleIcon />,
    description: "Manage your team members and contacts.",
  },
  calendar: {
    label: "Calendar",
    icon: <CalendarIcon />,
    description: "Schedule, events and upcoming deadlines.",
  },
  settings: {
    label: "Settings",
    icon: <SettingsIcon />,
    description: "Configure your account and preferences.",
  },
};

function PageContent({ id }: { id: PageId }) {
  const page = pages[id];
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-[16px] bg-neutral-10">
      <span className="flex size-[64px] items-center justify-center rounded-[20px] bg-white text-neutral-110 shadow-[0_2px_12px_0_rgba(23,33,40,0.06)] [&_svg]:size-[32px] [&_svg]:fill-current">
        {page.icon}
      </span>
      <p className="typography-head-50 text-neutral-110">{page.label}</p>
      <p className="max-w-[280px] text-center typography-para-thick-30 text-neutral-60">
        {page.description}
      </p>
    </div>
  );
}

export const WithNavigation: Story = {
  render: () => {
    const [active, setActive] = React.useState<PageId>("dashboard");

    return (
      <div className="flex h-screen">
        <SidebarProvider defaultCollapsed={false}>
          <Sidebar>
            <SidebarHeader>
              <AppIcon className="size-[48px] shrink-0" />
              <SidebarItem icon={<AppsIcon />} label="Apps" />
              <SidebarItem
                icon={<NotificationsIcon />}
                label="Notifications"
                badge={2}
              />
            </SidebarHeader>

            <SidebarContent>
              <SidebarGroup label="Workspace">
                {(["dashboard", "inbox", "analytics"] as PageId[]).map((id) => (
                  <SidebarItem
                    key={id}
                    icon={pages[id].icon}
                    label={pages[id].label}
                    isActive={active === id}
                    onClick={() => setActive(id)}
                  />
                ))}
              </SidebarGroup>

              <SidebarGroup label="Manage">
                {(["people", "calendar", "settings"] as PageId[]).map((id) => (
                  <SidebarItem
                    key={id}
                    icon={pages[id].icon}
                    label={pages[id].label}
                    isActive={active === id}
                    onClick={() => setActive(id)}
                  />
                ))}
              </SidebarGroup>
            </SidebarContent>

            <SidebarFooter>
              <SidebarItem icon={<HeadsetMicIcon />} label="Help" />
              <SidebarProfileItem
                name="Jane Doe"
                email="jane.doe@more.in"
                onEdit={() => alert("Edit profile")}
                onLogout={() => alert("Logged out")}
              />
              <SidebarToggle />
            </SidebarFooter>
          </Sidebar>
        </SidebarProvider>

        <PageContent id={active} />
      </div>
    );
  },
};

export const BothStates: Story = {
  render: () => (
    <div className="flex h-screen bg-neutral-10">
      {/* Collapsed */}
      <SidebarProvider defaultCollapsed={true}>
        <Sidebar>
          <SidebarHeader>
            <AppIcon className="size-[48px] shrink-0" />
            <SidebarItem icon={<AppsIcon />} label="Apps" />
            <SidebarItem
              icon={<NotificationsIcon />}
              label="Notifications"
              badge={2}
            />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup label="Workspace">
              <SidebarItem
                icon={<DashboardIcon />}
                label="Dashboard"
                isActive
              />
              <SidebarItem icon={<InboxIcon />} label="Inbox" />
              <SidebarItem icon={<AnalyticsIcon />} label="Analytics" />
            </SidebarGroup>
            <SidebarGroup label="Manage">
              <SidebarItem icon={<PeopleIcon />} label="People" />
              <SidebarItem icon={<CalendarIcon />} label="Calendar" />
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarItem icon={<HeadsetMicIcon />} label="Help" />
            <SidebarProfileItem
              name="Jane Doe"
              email="jane.doe@more.in"
              onEdit={() => {}}
              onLogout={() => {}}
            />
            <SidebarToggle />
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>

      <div className="w-px bg-neutral-20" />

      {/* Expanded */}
      <SidebarProvider defaultCollapsed={false}>
        <Sidebar>
          <SidebarHeader>
            <AppIcon className="size-[48px] shrink-0" />
            <SidebarItem icon={<AppsIcon />} label="Apps" />
            <SidebarItem
              icon={<NotificationsIcon />}
              label="Notifications"
              badge={2}
            />
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup label="Workspace">
              <SidebarItem
                icon={<DashboardIcon />}
                label="Dashboard"
                isActive
              />
              <SidebarItem icon={<InboxIcon />} label="Inbox" />
              <SidebarItem icon={<AnalyticsIcon />} label="Analytics" />
            </SidebarGroup>
            <SidebarGroup label="Manage">
              <SidebarItem icon={<PeopleIcon />} label="People" />
              <SidebarItem icon={<CalendarIcon />} label="Calendar" />
            </SidebarGroup>
          </SidebarContent>
          <SidebarFooter>
            <SidebarItem icon={<HeadsetMicIcon />} label="Help" />
            <SidebarProfileItem
              name="Jane Doe"
              email="jane.doe@more.in"
              onEdit={() => {}}
              onLogout={() => {}}
            />
            <SidebarToggle />
          </SidebarFooter>
        </Sidebar>
      </SidebarProvider>

      <div className="flex flex-1 items-center justify-center typography-label-thick-30 text-neutral-60">
        Page content
      </div>
    </div>
  ),
};
