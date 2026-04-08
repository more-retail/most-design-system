import { cn } from "@/utils/cn"

export interface SkeletonProps extends React.ComponentProps<"div"> {}

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      data-slot="skeleton"
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
    />
  )
}

export { Skeleton }
