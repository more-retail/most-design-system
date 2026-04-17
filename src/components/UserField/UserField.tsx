import React, { useMemo, useState } from "react";

import { Popover as PopoverPrimitive } from "@base-ui/react/popover";
import { type VariantProps, cva } from "class-variance-authority";

import { InfoChip } from "@/components/InfoChip/InfoChip";
import { type UserChipUser } from "@/components/UserChip/UserChip";
import { cn } from "@/utils/cn";

import AccountCircleIcon from "@material-symbols/svg-700/sharp/account_circle.svg?react";
import ArrowDropDownIcon from "@material-symbols/svg-700/sharp/arrow_drop_down-fill.svg?react";
import SearchIcon from "@material-symbols/svg-700/sharp/search-fill.svg?react";

export type UserFieldUser = UserChipUser;

const userFieldTriggerVariants = cva(
  [
    "group w-full inline-flex items-center cursor-pointer select-none outline-none",
    "typography-para-30",
    "[&_svg]:shrink-0 [&_svg]:fill-current",
    "transition-[border-color,box-shadow] duration-150",
    "bg-neutral-10",
    "border-2 border-transparent",
    "hover:border-neutral-20",
    "disabled:bg-neutral-20 disabled:pointer-events-none",
    "data-[popup-open]:border-neutral-110 data-[popup-open]:hover:border-neutral-110",
  ],
  {
    variants: {
      size: {
        md: "h-140 pl-30 pr-50 py-30 gap-50 rounded-xl",
        sm: "h-110 pl-30 pr-50 py-30 gap-50 rounded-xl",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type UserFieldSize = NonNullable<
  VariantProps<typeof userFieldTriggerVariants>["size"]
>;

export interface UserFieldProps {
  className?: string;
  size?: UserFieldSize;
  label?: string;
  error?: boolean;
  errorMessage?: string;
  placeholder?: string;
  users?: UserFieldUser[];
  value?: UserFieldUser | null;
  defaultValue?: UserFieldUser | null;
  onChange?: (user: UserFieldUser | null) => void;
  disabled?: boolean;
}

function UserFieldAvatar({
  user,
  size,
  disabled,
}: {
  user: UserFieldUser | null;
  size: UserFieldSize;
  disabled?: boolean;
}) {
  const sizeCls = size === "md" ? "size-120" : "size-90";

  if (user) {
    if (user.avatar) {
      return (
        <img
          src={user.avatar}
          alt={user.name}
          className={cn("shrink-0 rounded-lg object-cover", sizeCls)}
        />
      );
    }
    return (
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-lg",
          disabled ? "bg-neutral-30" : "bg-orange-60",
          sizeCls,
        )}
      >
        <span className="absolute inset-0 flex items-center justify-center">
          <span
            className={cn(
              "typography-para-30",
              disabled ? "text-neutral-60" : "text-white",
            )}
          >
            {user.initials ?? user.name.slice(0, 2).toUpperCase()}
          </span>
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-lg",
        sizeCls,
        disabled ? "bg-neutral-30" : "bg-neutral-110",
      )}
    >
      <AccountCircleIcon className="size-70 text-white" />
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
    <div className="flex h-140 w-full items-center gap-30 rounded-full bg-neutral-10 px-60">
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
  user: UserFieldUser;
  onSelect: (user: UserFieldUser) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(user)}
      className={cn(
        "flex h-120 w-full shrink-0 items-center justify-between outline-none",
        "rounded-xl border-2 border-transparent",
        "hover:border-neutral-10 focus-visible:border-neutral-110",
        "transition-colors duration-100",
      )}
    >
      <div className="flex items-center gap-40">
        {user.avatar ? (
          <img
            src={user.avatar}
            alt={user.name}
            className="size-120 shrink-0 rounded-lg object-cover"
          />
        ) : (
          <div className="flex size-120 shrink-0 items-center justify-center rounded-lg bg-orange-60">
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

const UserField: React.FC<UserFieldProps> = ({
  className,
  size = "md",
  label,
  error = false,
  errorMessage,
  placeholder = "Placeholder",
  users,
  value,
  defaultValue = null,
  onChange,
  disabled,
}) => {
  const isControlled = value !== undefined;
  const [internalUser, setInternalUser] = useState<UserFieldUser | null>(
    defaultValue,
  );
  const [searchQuery, setSearchQuery] = useState("");

  const currentUser = isControlled ? value : internalUser;
  const isPopulated = currentUser != null;

  function handleSelect(user: UserFieldUser) {
    if (!isControlled) setInternalUser(user);
    onChange?.(user);
    setSearchQuery("");
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

  const wrapperCls = cn(
    "flex flex-col items-start gap-40",
    size === "md" ? "w-[300px]" : "w-[200px]",
    className,
  );

  const triggerCls = cn(
    userFieldTriggerVariants({ size }),
    error &&
      "border border-red-70 hover:border-red-70 hover:shadow-[0px_0px_0px_2px_var(--color-red-20)] data-[popup-open]:border-red-70",
  );

  const labelCls = cn(
    "w-full truncate typography-para-30",
    disabled ? "text-neutral-60" : "text-neutral-110",
  );

  const triggerContent = (
    <>
      <span className="flex shrink-0 items-center justify-center">
        <UserFieldAvatar
          user={currentUser ?? null}
          size={size}
          disabled={disabled}
        />
      </span>
      <span
        className={cn(
          "min-w-0 flex-1 truncate text-left typography-para-30",
          isPopulated && !disabled && "text-neutral-110",
          isPopulated && disabled && "text-neutral-60",
          !isPopulated && "text-neutral-40",
        )}
      >
        {isPopulated ? currentUser!.name : placeholder}
      </span>
      <ArrowDropDownIcon
        className={cn(
          "size-60 shrink-0 transition-transform group-data-[popup-open]:rotate-180",
          disabled ? "text-neutral-40" : "text-neutral-110",
        )}
      />
    </>
  );

  const dropdown = (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Positioner
        side="bottom"
        align="start"
        sideOffset={6}
        className="isolate z-50 outline-none"
      >
        <PopoverPrimitive.Popup
          data-slot="user-field-dropdown"
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
          <div className="flex flex-col gap-30">
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
  );

  if (!users) {
    return (
      <div data-slot="user-field" className={wrapperCls}>
        {label && <span className={labelCls}>{label}</span>}
        <button type="button" disabled={disabled} className={triggerCls}>
          {triggerContent}
        </button>
        {error && errorMessage && (
          <p className="typography-para-30 text-red-70">{errorMessage}</p>
        )}
      </div>
    );
  }

  return (
    <div data-slot="user-field" className={wrapperCls}>
      {label && <span className={labelCls}>{label}</span>}
      <PopoverPrimitive.Root
        onOpenChange={(open) => {
          if (!open) setSearchQuery("");
        }}
      >
        <PopoverPrimitive.Trigger disabled={disabled} className={triggerCls}>
          {triggerContent}
        </PopoverPrimitive.Trigger>
        {dropdown}
      </PopoverPrimitive.Root>
      {error && errorMessage && (
        <p className="typography-para-30 text-red-70">{errorMessage}</p>
      )}
    </div>
  );
};

export { UserField };
