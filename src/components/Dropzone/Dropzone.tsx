import React, { useCallback, useRef, useState } from "react";

import DocIcon from "../../../public/icons/doc.svg?react";
import PdfIcon from "../../../public/icons/pdf.svg?react";
import SheetIcon from "../../../public/icons/sheet.svg?react";
import { type VariantProps, cva } from "class-variance-authority";

import { Button } from "@/components/Button";
import { cn } from "@/utils/cn";

import AttachFileIcon from "@material-symbols/svg-700/sharp/attach_file-fill.svg?react";
import DeleteIcon from "@material-symbols/svg-700/sharp/delete-fill.svg?react";
import DownloadIcon from "@material-symbols/svg-700/sharp/download-fill.svg?react";
import ProgressActivityIcon from "@material-symbols/svg-700/sharp/progress_activity-fill.svg?react";

const dropzoneVariants = cva(
  [
    "relative flex flex-col rounded-[20px] w-[300px] border-2 border-dashed",
    "transition-colors cursor-pointer",
  ],
  {
    variants: {
      state: {
        idle: [
          "bg-neutral-10 border-neutral-30",
          "hover:border-neutral-40",
          "h-[168px] items-center gap-[16px] pt-[16px] pb-[12px] px-[16px]",
        ],
        active: [
          "bg-orange-60 border-orange-40",
          "h-[168px] items-center justify-center px-[16px] py-[16px]",
        ],
        loading: [
          "bg-neutral-10 border-neutral-30",
          "h-[168px] items-center justify-center gap-[16px] px-[16px] py-[16px]",
          "cursor-default",
        ],
        populated: [
          "bg-neutral-10 border-neutral-20",
          "h-[168px] flex-col items-start justify-between px-[16px] py-[16px]",
          "cursor-default",
        ],
        error: [
          "bg-neutral-10 border-red-70",
          "h-[168px] flex-col items-start justify-between px-[16px] py-[16px]",
          "cursor-default",
        ],
      },
    },
    defaultVariants: {
      state: "idle",
    },
  },
);

type DropzoneState = NonNullable<
  VariantProps<typeof dropzoneVariants>["state"]
>;

interface DropzoneProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  file?: File | null;
  onFileChange?: (file: File | null) => void;
  isLoading?: boolean;
  onCancelUpload?: () => void;
  error?: string;
  accept?: string;
  onDownload?: () => void;
  onDelete?: () => void;
  onReplace?: () => void;
  maxFileSize?: string;
}

function formatFileDate(date: Date): string {
  const day = date.getDate();
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = String(date.getFullYear()).slice(2);
  const hours = date.getHours();
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";
  const displayHours = String(hours % 12 || 12).padStart(2, "0");
  return `${day} ${month} '${year}, ${displayHours}:${minutes} ${ampm}`;
}

type FileIconType = "sheet" | "doc" | "pdf" | "generic";

const FILE_ICON_MAP: Record<
  FileIconType,
  React.FC<React.SVGProps<SVGSVGElement>>
> = {
  sheet: SheetIcon,
  doc: DocIcon,
  pdf: PdfIcon,
  generic: AttachFileIcon,
};

function getFileIconType(filename?: string): FileIconType {
  const ext = filename?.split(".").pop()?.toLowerCase();
  if (!ext) return "generic";
  if (["xls", "xlsx", "csv", "ods"].includes(ext)) return "sheet";
  if (["doc", "docx", "odt", "txt", "rtf"].includes(ext)) return "doc";
  if (ext === "pdf") return "pdf";
  return "generic";
}

type FileIconBadgeProps =
  | { filename?: string; type?: never }
  | { type: FileIconType; filename?: never };

const FileIconBadge = React.memo<FileIconBadgeProps>(({ filename, type }) => {
  const resolvedType = type ?? getFileIconType(filename);
  const Icon = FILE_ICON_MAP[resolvedType];
  return (
    <div className="flex size-[24px] shrink-0 items-center justify-center rounded-[6px] bg-neutral-20 p-[4px]">
      {resolvedType === "generic" ? (
        <Icon className="size-[12px] fill-neutral-60" />
      ) : (
        <Icon />
      )}
    </div>
  );
});

const Dropzone: React.FC<DropzoneProps> = ({
  file,
  onFileChange,
  isLoading = false,
  onCancelUpload,
  error,
  accept,
  onDownload,
  onDelete,
  onReplace,
  maxFileSize = "5MB",
  className,
  ...props
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const computedState: DropzoneState = (() => {
    if (isLoading) return "loading";
    if (isDragOver) return "active";
    if (file && error) return "error";
    if (file) return "populated";
    return "idle";
  })();

  const handleDragEnter = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragOver(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragOver(false);
      const dropped = e.dataTransfer.files[0];
      if (dropped) onFileChange?.(dropped);
    },
    [onFileChange],
  );

  const handleClick = useCallback(() => {
    if (computedState === "idle" || computedState === "active") {
      inputRef.current?.click();
    }
  }, [computedState]);

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const selected = e.target.files?.[0] ?? null;
      if (selected) onFileChange?.(selected);
      e.target.value = "";
    },
    [onFileChange],
  );

  const fileDate = file
    ? formatFileDate(new Date(file.lastModified))
    : undefined;

  return (
    <div className={cn("flex flex-col gap-[8px]", className)}>
      <div
        data-slot="dropzone"
        data-state={computedState}
        className={dropzoneVariants({ state: computedState })}
        onDragEnter={handleDragEnter}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
        {...props}
      >
        {computedState === "idle" && (
          <>
            <div className="flex w-full flex-1 flex-col items-center justify-center gap-[8px]">
              <p className="text-center typography-para-30 whitespace-nowrap text-neutral-110">
                Drag &amp; Drop
              </p>
              <p className="text-center typography-para-40 whitespace-nowrap text-neutral-40">
                OR
              </p>
              <div className="flex items-center gap-[4px]">
                <button
                  type="button"
                  className="cursor-pointer typography-label-thick-30 text-orange-60"
                  onClick={(e) => {
                    e.stopPropagation();
                    inputRef.current?.click();
                  }}
                >
                  Browse
                </button>
                <p className="typography-para-30 whitespace-nowrap text-neutral-110">
                  To Upload File
                </p>
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-center gap-[8px]">
              <div className="flex items-start gap-[4px]">
                <FileIconBadge type="sheet" />
                <FileIconBadge type="doc" />
                <FileIconBadge type="pdf" />
              </div>
              <p className="text-center typography-para-40 whitespace-nowrap text-neutral-40">
                Max {maxFileSize}
              </p>
            </div>
          </>
        )}

        {computedState === "active" && (
          <p className="w-full text-center typography-para-thick-30 text-white">
            Drop here to upload file
          </p>
        )}

        {computedState === "loading" && (
          <>
            <FileIconBadge filename={file?.name} />
            <p className="w-min min-w-full text-center typography-para-30 text-neutral-100">
              Uploading file &ldquo;{file?.name ?? "file"}&rdquo;
            </p>
            <ProgressActivityIcon className="size-[24px] animate-spin fill-neutral-60" />
          </>
        )}

        {(computedState === "populated" || computedState === "error") && (
          <>
            <FileIconBadge filename={file?.name} />

            <div className="flex shrink-0 flex-col items-start gap-[4px]">
              <p className="max-w-[268px] overflow-hidden typography-para-30 text-ellipsis whitespace-nowrap text-neutral-100">
                {file?.name}
              </p>
              <p className="overflow-hidden typography-para-40 text-ellipsis whitespace-nowrap text-neutral-60">
                {fileDate}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-[8px]">
              <Button
                className="bg-neutral-20 hover:bg-neutral-30 active:bg-neutral-30"
                variant="tertiary"
                size="icon-sm"
                onClick={onReplace}
              >
                <AttachFileIcon />
              </Button>
              <Button
                className="bg-neutral-20 hover:bg-neutral-30 active:bg-neutral-30"
                variant="tertiary"
                size="icon-sm"
                onClick={onDownload}
              >
                <DownloadIcon />
              </Button>
              <Button
                className="bg-neutral-20 hover:bg-neutral-30 active:bg-neutral-30"
                variant="tertiary"
                size="icon-sm"
                onClick={onDelete}
              >
                <DeleteIcon className="text-red-70" />
              </Button>
            </div>
          </>
        )}
      </div>

      {error && <p className="typography-para-30 text-red-70">{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleInputChange}
        tabIndex={-1}
        aria-hidden="true"
      />
    </div>
  );
};

export { Dropzone, dropzoneVariants };
export type { DropzoneProps, DropzoneState };
