import { cn } from "@workspace/ui/lib/utils"

export interface PropRow {
  name: string
  type: string
  default?: string
  required?: boolean
  description: string
}

export function PropsTable({
  rows,
  className,
}: {
  rows: PropRow[]
  className?: string
}) {
  return (
    <div className={cn("overflow-x-auto rounded-lg border border-border", className)}>
      <table className="w-full text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-muted/60">
            <th className="px-5 py-3.5 font-semibold text-foreground">Prop</th>
            <th className="px-5 py-3.5 font-semibold text-foreground">Type</th>
            <th className="px-5 py-3.5 font-semibold text-foreground">Default</th>
            <th className="px-5 py-3.5 font-semibold text-foreground">Description</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.name} className="border-b border-border last:border-0 hover:bg-muted/20 transition-colors">
              <td className="px-5 py-3.5 font-mono text-primary">
                {row.name}
                {row.required ? (
                  <span className="ml-1 text-destructive">*</span>
                ) : null}
              </td>
              <td className="px-5 py-3.5 font-mono text-muted-foreground text-xs">
                {row.type}
              </td>
              <td className="px-5 py-3.5 text-muted-foreground">
                {row.default ?? "-"}
              </td>
              <td className="px-5 py-3.5 text-muted-foreground">{row.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
