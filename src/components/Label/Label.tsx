import * as React from "react"

import { cn } from  "@/utils/cn"

export interface LabelProps extends React.ComponentProps<"label"> {}

const  Label = ({ className, ...props }: LabelProps) => {
  return (
    <label
      data-slot="label"
      className={cn(
        "flex items-center typography-para-30 gap-2  select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      )}
      {...props}
    />
  )
}

export { Label }
