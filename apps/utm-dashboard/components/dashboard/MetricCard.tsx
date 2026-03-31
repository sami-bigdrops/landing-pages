type MetricCardProps = {
  title: string
  value: number
  tone?: "brand" | "success" | "danger"
  description?: string
  badge?: string
}

const cardToneClasses: Record<NonNullable<MetricCardProps["tone"]>, string> = {
  brand:
    "border-[color:var(--brand-primary)]/25 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(52,152,219,0.08))]",
  success:
    "border-emerald-500/25 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(16,185,129,0.08))]",
  danger:
    "border-rose-500/25 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(244,63,94,0.08))]",
}

const valueClasses: Record<NonNullable<MetricCardProps["tone"]>, string> = {
  brand: "text-[color:var(--brand-secondary)]",
  success: "text-emerald-700",
  danger: "text-rose-700",
}

const dotClasses: Record<NonNullable<MetricCardProps["tone"]>, string> = {
  brand: "bg-[color:var(--brand-primary)]",
  success: "bg-emerald-500",
  danger: "bg-rose-500",
}

const badgeClasses: Record<NonNullable<MetricCardProps["tone"]>, string> = {
  brand: "bg-[color:var(--brand-primary)]/10 text-[color:var(--brand-secondary)]",
  success: "bg-emerald-100 text-emerald-700",
  danger: "bg-rose-100 text-rose-700",
}

export default function MetricCard({
  title,
  value,
  tone = "brand",
  description,
  badge,
}: MetricCardProps) {
  return (
    <article
      className={`relative overflow-hidden rounded-2xl border p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${cardToneClasses[tone]}`}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold tracking-wide uppercase text-zinc-600">
          {title}
        </p>
        {badge ? (
          <span
            className={`rounded-full px-2 py-1 text-[11px] font-semibold ${badgeClasses[tone]}`}
          >
            {badge}
          </span>
        ) : null}
      </div>
      <p className={`mt-2 text-3xl font-bold ${valueClasses[tone]}`}>
        {value.toLocaleString()}
      </p>
      {description ? (
        <p className="mt-2 text-sm text-zinc-600">{description}</p>
      ) : null}
      <span
        className={`absolute right-4 top-4 h-2.5 w-2.5 rounded-full ${dotClasses[tone]}`}
      />
    </article>
  )
}
