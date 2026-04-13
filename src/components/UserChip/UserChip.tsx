import React, { useMemo, useState } from "react";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { type VariantProps, cva } from "class-variance-authority";

import { InfoChip } from "@/components/InfoChip/InfoChip";
import { cn } from "@/utils/cn";

import AccountCircleIcon from "@material-symbols/svg-700/sharp/account_circle.svg?react";
import CloseIcon from "@material-symbols/svg-700/sharp/close-fill.svg?react";
import SearchIcon from "@material-symbols/svg-700/sharp/search-fill.svg?react";

export interface UserChipUser {
  id: string;
  name: string;
  initials?: string;
  role?: string;
  avatar?: string;
}

const userChipVariants = cva(
  [
    "inline-flex items-center cursor-pointer select-none outline-none",
    "typography-para-thick-30 whitespace-nowrap",
    "[&_svg]:shrink-0 [&_svg]:fill-current",
    "transition-[border-color,box-shadow] duration-150",
    "bg-neutral-10",
    "border-2 border-transparent",
    "hover:border-neutral-20",
    "disabled:pointer-events-none",
    "data-[popup-open]:border-neutral-110 data-[popup-open]:hover:border-neutral-110",
  ],
  {
    variants: {
      size: {
        lg: "h-140 pl-30 pr-50 gap-40 rounded-xl rounded-30",
        md: "h-110 pl-30 pr-50 gap-40 rounded-xl rounded-30",
        sm: "h-80 pl-30 pr-40 gap-40 rounded-lg rounded-20",
      },
      selected: {
        true: "border-neutral-110 hover:border-neutral-110",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      selected: false,
    },
  },
);

export type UserChipSize = NonNullable<
  VariantProps<typeof userChipVariants>["size"]
>;

export interface UserChipProps
  extends Omit<
    React.ComponentProps<"button">,
    "children" | "onChange" | "value" | "defaultValue"
  > {
  size?: UserChipSize;
  error?: boolean;
  selected?: boolean;
  removable?: boolean;
  placeholder?: string;
  users?: UserChipUser[];
  value?: UserChipUser | null;
  defaultValue?: UserChipUser | null;
  onChange?: (user: UserChipUser | null) => void;
}

function UserAvatar({
  user,
  size,
  disabled,
}: {
  user: UserChipUser | null;
  size: UserChipSize;
  disabled?: boolean;
}) {
  const containerCls =
    size === "lg"
      ? "size-120 rounded-lg"
      : size === "md"
        ? "size-90 rounded-lg"
        : "size-60 rounded";

  if (user) {
    if (user.avatar) {
      return (
        <img
          src={user.avatar}
          alt={user.name}
          className={cn("shrink-0 object-cover", containerCls)}
        />
      );
    }
    return (
      <div className={cn("relative shrink-0 bg-orange-60", containerCls)}>
        <span className="absolute inset-0 flex items-center justify-center text-white">
          <span className="typography-para-thick-30">
            {user.initials ?? user.name.slice(0, 2).toUpperCase()}
          </span>
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center text-white",
        containerCls,
        disabled ? "bg-neutral-20" : "bg-neutral-110",
      )}
    >
      <AccountCircleIcon className={size === "sm" ? "size-50" : "size-60"} />
    </div>
  );
}

function DropdownSearch({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex h-140 w-full items-center gap-50 rounded-full bg-neutral-10 px-60">
      <SearchIcon className="size-60 shrink-0 text-neutral-40" />
      <input
        autoFocus
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Search"
        className="min-w-0 flex-1 bg-transparent typography-para-30 text-neutral-110 outline-none placeholder:text-neutral-40"
      />
    </div>
  );
}

function DropdownItem({
  user,
  onSelect,
}: {
  user: UserChipUser;
  onSelect: (user: UserChipUser) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(user)}
      className={cn(
        "flex h-140 w-full shrink-0 items-center justify-between rounded-xl outline-none",
        "border-2 border-transparent",
        "hover:border-neutral-10 focus-visible:border-neutral-110",
        "transition-colors duration-100",
      )}
    >
      <div className="flex items-center gap-40">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="size-[40px] shrink-0 rounded-lg object-cover"
          />
        ) : (
          <div className="flex size-[40px] shrink-0 items-center justify-center rounded-lg bg-orange-60">
            <span className="typography-para-thick-30 text-white">
              {user.initials ?? user.name.slice(0, 2).toUpperCase()}
            </span>
          </div>
        )}
        <span className="truncate typography-para-30 text-neutral-110">
          {user.name}
        </span>
      </div>
      {user.role && (
        <InfoChip
          size="sm"
          label={user.role}
          icon={null}
          className="shrink-0"
        />
      )}
    </button>
  );
}

const UserChip: React.FC<UserChipProps> = ({
  className,
  size = "md",
  error = false,
  selected = false,
  removable = true,
  placeholder = "Placeholder",
  users,
  value,
  defaultValue = null,
  onChange,
  disabled,
  ...props
}) => {
  const isControlled = value !== undefined;
  const [internalUser, setInternalUser] = useState<UserChipUser | null>(
    defaultValue,
  );
  const [searchQuery, setSearchQuery] = useState("");

  const currentUser = isControlled ? value : internalUser;
  const isPopulated = currentUser != null;

  function handleSelect(user: UserChipUser) {
    if (!isControlled) setInternalUser(user);
    onChange?.(user);
    setSearchQuery("");
  }

  function handleRemove(e: React.MouseEvent) {
    e.stopPropagation();
    if (!isControlled) setInternalUser(null);
    onChange?.(null);
  }

  const filteredUsers = useMemo(() => {
    if (!users) return [];
    if (!searchQuery.trim()) return users;
    const q = searchQuery.toLowerCase();
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) || u.role?.toLowerCase().includes(q),
    );
  }, [users, searchQuery]);

  const chipClasses = cn(
    userChipVariants({ size, selected }),
    error &&
      "border border-red-70 hover:border-red-70 hover:shadow-[0px_0px_0px_2px_var(--color-red-20)] data-[popup-open]:border-red-70",
    className,
  );

  const chipContent = (
    <>
      <span
        data-slot="user-chip-avatar"
        className="flex shrink-0 items-center justify-center"
      >
        <UserAvatar
          user={currentUser ?? null}
          size={size}
          disabled={disabled}
        />
      </span>
      <span
        data-slot="user-chip-label"
        className={cn(
          isPopulated && !disabled && "text-neutral-110",
          isPopulated && disabled && "text-neutral-60",
          !isPopulated && "text-neutral-40",
        )}
      >
        {isPopulated ? currentUser!.name : placeholder}
      </span>
      {removable && isPopulated && (
        <span
          data-slot="user-chip-remove"
          role={!disabled ? "button" : undefined}
          tabIndex={!disabled ? 0 : undefined}
          className={cn(
            "flex size-60 shrink-0 items-center justify-center",
            !disabled ? "cursor-pointer text-neutral-110" : "text-neutral-40",
          )}
          onClick={!disabled ? handleRemove : undefined}
        >
          <CloseIcon className="size-60" />
        </span>
      )}
    </>
  );

  if (!users) {
    return (
      <button
        data-slot="user-chip"
        type="button"
        disabled={disabled}
        aria-pressed={selected}
        className={chipClasses}
        {...props}
      >
        {chipContent}
      </button>
    );
  }

  return (
    <PopoverPrimitive.Root
      onOpenChange={(open) => {
        if (!open) setSearchQuery("");
      }}
    >
      <PopoverPrimitive.Trigger
        data-slot="user-chip"
        disabled={disabled}
        aria-pressed={selected}
        className={chipClasses}
        {...props}
      >
        {chipContent}
      </PopoverPrimitive.Trigger>

      <PopoverPrimitive.Portal>
        <PopoverPrimitive.Positioner
          side="bottom"
          align="start"
          sideOffset={6}
          className="isolate z-50 outline-none"
        >
          <PopoverPrimitive.Popup
            data-slot="user-chip-dropdown"
            className={cn(
              "w-[520px]",
              "flex flex-col gap-50",
              "rounded-2xl border border-neutral-10 bg-white",
              "shadow-[0px_4px_20px_0px_rgba(23,33,40,0.05)]",
              "px-50 pt-50 pb-40",
              "origin-(--transform-origin)",
              "data-[open]:animate-in data-[open]:fade-in-0 data-[open]:zoom-in-95",
              "data-[closed]:animate-out data-[closed]:fade-out-0 data-[closed]:zoom-out-95",
              "duration-150",
            )}
          >
            <DropdownSearch value={searchQuery} onChange={setSearchQuery} />
            <div className="flex flex-col gap-10">
              {filteredUsers.map((user) => (
                <PopoverPrimitive.Close key={user.id} render={<span />}>
                  <DropdownItem user={user} onSelect={handleSelect} />
                </PopoverPrimitive.Close>
              ))}
              {filteredUsers.length === 0 && (
                <p className="py-40 text-center typography-para-30 text-neutral-40">
                  No users found
                </p>
              )}
            </div>
          </PopoverPrimitive.Popup>
        </PopoverPrimitive.Positioner>
      </PopoverPrimitive.Portal>
    </PopoverPrimitive.Root>
  );
};

export { UserChip };
