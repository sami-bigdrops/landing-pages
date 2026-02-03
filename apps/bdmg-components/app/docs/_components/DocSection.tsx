import { cn } from "@workspace/ui/lib/utils"

export function DocSection({
  title,
  id,
  children,
  className,
}: {
  title: string
  id?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn("scroll-mt-20 mb-12 last:mb-0", className)}>
      <h2 className="text-xl font-semibold text-foreground border-b border-border pb-3 mb-6">
        {title}
      </h2>
      <div className="space-y-6">
        {children}
      </div>
    </section>
  )
}
