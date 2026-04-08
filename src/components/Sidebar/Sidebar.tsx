import * as React from "react";

import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/utils/cn";

import LeftPanelOpenIcon from "@material-symbols/svg-700/sharp/left_panel_open-fill.svg?react";
import LogoutIcon from "@material-symbols/svg-700/sharp/logout-fill.svg?react";
import PersonEditIcon from "@material-symbols/svg-700/sharp/person_edit-fill.svg?react";

type SidebarContextProps = {
  collapsed: boolean;
  toggle: () => void;
  setCollapsed: (v: boolean) => void;
};

const SidebarContext = React.createContext<SidebarContextProps | null>(null);

function useSidebar() {
  const ctx = React.useContext(SidebarContext);
  if (!ctx)
    throw new Error("useSidebar must be used within a SidebarProvider.");
  return ctx;
}

type SidebarProviderProps = React.ComponentProps<"div"> & {
  defaultCollapsed?: boolean;
  collapsed?: boolean;
  onCollapsedChange?: (v: boolean) => void;
};

const SidebarProvider = ({
  defaultCollapsed = false,
  collapsed: collapsedProp,
  onCollapsedChange,
  className,
  style,
  children,
  ...props
}: SidebarProviderProps) => {
  const [_collapsed, _setCollapsed] = React.useState(defaultCollapsed);
  const collapsed = collapsedProp ?? _collapsed;

  const setCollapsed = React.useCallback(
    (value: boolean) => {
      if (onCollapsedChange) {
        onCollapsedChange(value);
      } else {
        _setCollapsed(value);
      }
    },
    [onCollapsedChange],
  );

  const toggle = React.useCallback(
    () => setCollapsed(!collapsed),
    [collapsed, setCollapsed],
  );

  const ctx = React.useMemo<SidebarContextProps>(
    () => ({ collapsed, toggle, setCollapsed }),
    [collapsed, toggle, setCollapsed],
  );

  return (
    <SidebarContext.Provider value={ctx}>
      <div
        data-slot="sidebar-provider"
        className={cn("flex h-full", className)}
        style={
          {
            "--sidebar-width": "180px",
            "--sidebar-width-collapsed": "64px",
            ...style,
          } as React.CSSProperties
        }
        {...props}
      >
        {children}
      </div>
    </SidebarContext.Provider>
  );
};

const Sidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { collapsed } = useSidebar();

  return (
    <div
      data-slot="sidebar"
      data-state={collapsed ? "collapsed" : "expanded"}
      className={cn(
        "group/sidebar relative flex h-full flex-col bg-white p-40",
        "transition-[width] duration-200 ease-linear",
        collapsed
          ? "w-[var(--sidebar-width-collapsed)]"
          : "w-[var(--sidebar-width)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const SidebarHeader = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="sidebar-header"
      className={cn(
        "flex flex-col gap-[4px] pb-[12px]",
        "group-data-[state=collapsed]/sidebar:items-center",
        "group-data-[state=expanded]/sidebar:items-start",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const SidebarContent = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="sidebar-content"
      className={cn(
        "flex min-h-0 flex-1 flex-col overflow-x-hidden overflow-y-auto",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const SidebarFooter = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      data-slot="sidebar-footer"
      className={cn(
        "flex flex-col gap-[4px] border-t border-neutral-20 pt-[12px] pb-[8px]",
        "group-data-[state=collapsed]/sidebar:items-center",
        "group-data-[state=expanded]/sidebar:items-start",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

type SidebarGroupProps = React.ComponentProps<"div"> & {
  label?: string;
};

const SidebarGroup = ({
  label,
  className,
  children,
  ...props
}: SidebarGroupProps) => {
  return (
    <div
      data-slot="sidebar-group"
      className={cn(
        "flex flex-col gap-[4px] border-t border-neutral-20 pt-[12px]",
        className,
      )}
      {...props}
    >
      {label && (
        <span
          data-slot="sidebar-group-label"
          className={cn(
            "h-[16px] shrink-0 px-[16px] typography-para-thick-30 text-neutral-110",
            "group-data-[state=collapsed]/sidebar:hidden",
          )}
        >
          {label}
        </span>
      )}
      {children}
    </div>
  );
};

const sidebarItemVariants = cva(
  [
    "relative flex items-center shrink-0 rounded-[16px] h-[48px]",
    "transition-colors cursor-pointer",
    "hover:bg-neutral-20",
    "disabled:pointer-events-none disabled:opacity-40",
    "[&_svg]:fill-current [&_svg]:shrink-0",
  ],
  {
    variants: {
      state: {
        collapsed: "w-[48px] justify-center [&_svg]:size-[20px]",
        expanded: "w-full gap-[8px] px-[16px] [&_svg]:size-[16px]",
      },
      isActive: {
        true: "bg-neutral-20",
        false: "",
      },
    },
    defaultVariants: {
      state: "expanded",
      isActive: false,
    },
  },
);

type SidebarItemProps = Omit<React.ComponentProps<"button">, "children"> &
  VariantProps<typeof sidebarItemVariants> & {
    icon: React.ReactNode;
    label: string;
    badge?: number | string;
  };

const SidebarItem = ({
  icon,
  label,
  isActive = false,
  badge,
  className,
  ...props
}: SidebarItemProps) => {
  const { collapsed } = useSidebar();
  const state = collapsed ? "collapsed" : "expanded";

  return (
    <button
      data-slot="sidebar-item"
      data-active={isActive || undefined}
      className={cn(sidebarItemVariants({ state, isActive }), className)}
      {...props}
    >
      {icon}
      <span
        className={cn(
          "flex-1 truncate text-left typography-para-thick-30 text-neutral-110",
          collapsed && "hidden",
        )}
      >
        {label}
      </span>
      {badge !== undefined && !collapsed && (
        <span
          className={cn(
            "inline-flex items-center justify-center",
            "rounded-[4px] bg-orange-60 text-white",
            "h-[16px] px-[4px]",
            "typography-label-40",
          )}
        >
          {badge}
        </span>
      )}

      {/* Badge dot — shown in collapsed */}
      {badge !== undefined && collapsed && (
        <span
          className="absolute top-[-2px] right-[-2px] size-[10px] rounded-full border-2 border-white bg-orange-60"
          aria-hidden
        />
      )}
    </button>
  );
};

type SidebarProfileItemProps = Omit<
  React.ComponentProps<"button">,
  "children"
> & {
  avatar?: React.ReactNode;
  name?: string;
  email?: string;
  onEdit?: () => void;
  onLogout?: () => void;
};

const SidebarProfileItem = ({
  avatar,
  name = "Jane Doe",
  email,
  onEdit,
  onLogout,
  className,
  ...props
}: SidebarProfileItemProps) => {
  const { collapsed } = useSidebar();
  const [open, setOpen] = React.useState(false);

  const ref = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    if (!open) return;
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open]);

  const avatarContent = avatar ?? (
    <span className="flex size-full items-center justify-center rounded-full bg-neutral-30 typography-label-thick-30 text-neutral-60">
      {name.charAt(0).toUpperCase()}
    </span>
  );

  return (
    <button
      ref={ref}
      data-slot="sidebar-profile-item"
      data-state={open ? "open" : "closed"}
      onClick={() => setOpen((v) => !v)}
      className={cn(
        "relative flex shrink-0 cursor-pointer items-center py-40 transition-colors",
        "bg-neutral-20",
        open ? "ring-2 ring-neutral-110" : "hover:ring-2 hover:ring-neutral-30",
        collapsed
          ? "size-[48px] justify-center rounded-full p-[4px]"
          : "h-[48px] w-full gap-[8px] rounded-[16px] pr-[16px] pl-[8px]",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "flex shrink-0 items-center overflow-hidden rounded-full",
          collapsed ? "size-full" : "aspect-square h-full",
        )}
      >
        {avatarContent}
      </span>

      {!collapsed && (
        <span className="flex-1 truncate text-left typography-para-thick-30 text-neutral-110">
          {name}
        </span>
      )}

      {open && (
        <div
          className={cn(
            "absolute bottom-[calc(100%+8px)] left-[-2px] z-50",
            "rounded-[20px] border border-neutral-10 bg-white",
            "shadow-[0px_4px_20px_0px_rgba(23,33,40,0.05)]",
            "flex w-[354px] flex-col gap-[12px] p-[12px] text-left",
          )}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex justify-between gap-[12px]">
            <div className="flex min-w-0 flex-1 flex-col gap-[8px] self-start">
              <p className="truncate typography-head-50 text-neutral-110">
                hi {name.split(" ")[0]}!
              </p>
              {email && (
                <p className="truncate typography-para-thick-30 text-neutral-60">
                  {email}
                </p>
              )}
            </div>
            <span className="flex size-[48px] shrink-0 items-center overflow-hidden rounded-full">
              {avatarContent}
            </span>
          </div>

          <div className="flex flex-col gap-[4px]">
            {onEdit && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                  onEdit();
                }}
                className={cn(
                  "flex h-[48px] items-center gap-[12px] rounded-[12px] px-[16px]",
                  "cursor-pointer bg-neutral-10 text-neutral-110",
                  "typography-label-30 transition-colors hover:bg-neutral-20",
                  "[&_svg]:size-[16px] [&_svg]:shrink-0 [&_svg]:fill-current",
                )}
              >
                <PersonEditIcon />
                Edit
              </button>
            )}
            {onLogout && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setOpen(false);
                  onLogout();
                }}
                className={cn(
                  "flex h-[48px] items-center gap-[12px] rounded-[12px] px-[16px]",
                  "cursor-pointer bg-red-70 text-white",
                  "typography-label-30 transition-opacity hover:opacity-90",
                  "[&_svg]:size-[16px] [&_svg]:shrink-0 [&_svg]:fill-current",
                )}
              >
                <LogoutIcon />
                Log Out
              </button>
            )}
          </div>
        </div>
      )}
    </button>
  );
};

const SidebarToggle = ({
  className,
  ...props
}: React.ComponentProps<"button">) => {
  const { toggle, collapsed } = useSidebar();

  return (
    <button
      data-slot="sidebar-toggle"
      onClick={toggle}
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      className={cn(
        "flex cursor-pointer items-center justify-center",
        "h-[36px] rounded-full px-[10px]",
        "text-neutral-110 transition-[background-color,transform] duration-200 hover:bg-neutral-20",
        "[&_svg]:size-[16px] [&_svg]:shrink-0 [&_svg]:fill-current",
        !collapsed && "rotate-180 self-end",
        className,
      )}
      {...props}
    >
      <LeftPanelOpenIcon />
    </button>
  );
};

export {
  useSidebar,
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarItem,
  SidebarProfileItem,
  SidebarToggle,
};

export type {
  SidebarProviderProps,
  SidebarGroupProps,
  SidebarItemProps,
  SidebarProfileItemProps,
};
