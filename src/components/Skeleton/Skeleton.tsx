import { cn } from "@/utils/cn";

export type SkeletonProps = React.ComponentProps<"div">;

const Skeleton: React.FC<SkeletonProps> = ({ className, ...props }) => {
  return (
    <div
      data-slot="skeleton"
      className={cn("bg-muted animate-pulse rounded-md", className)}
      {...props}
    />
  );
};

export { Skeleton };
