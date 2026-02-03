import { cn } from "@workspace/ui/lib/utils"

export function DocPreview({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-border bg-card/50 p-6 sm:p-8 text-card-foreground",
        className
      )}
    >
      {children}
    </div>
  )
}
