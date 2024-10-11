import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "@/lib/utils";

const Progress = React.forwardRef(
  ({ className, value, showLabel = true, ...props }, ref) => (
    <div className="font-mono text-primary">

      <ProgressPrimitive.Root
        ref={ref}
        className={cn(
          "relative h-4 w-full overflow-hidden bg-background rounded-md border-2 border-border ",
          className
        )}
        {...props}
      >
        <ProgressPrimitive.Indicator
          className="h-full bg-primary rounded transition-all relative"
          style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
        >
          {[...Array(20)].map((_, index) => (
            <div
              key={index}
              className="absolute top-0 bottom-0 w-1 bg-secondary rounded-xl"
              style={{ left: `${index * 5}%` }}
            />
          ))}
        </ProgressPrimitive.Indicator>
      </ProgressPrimitive.Root>
    </div>
  )
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
