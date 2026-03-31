import MetricCard from "@/components/dashboard/MetricCard"

export default function StatsCard() {
  const stats = [
    {
      title: "Total UTM Params",
      value: 240,
      tone: "brand" as const,
      description: "All tracked UTM parameter entries.",
      badge: "100%",
    },
    {
      title: "Active UTM Params",
      value: 198,
      tone: "success" as const,
      description: "Currently allowed and processing traffic.",
      badge: "82.5%",
    },
    {
      title: "Blocked UTM Params",
      value: 42,
      tone: "danger" as const,
      description: "Disabled due to rules or policy checks.",
      badge: "17.5%",
    },
  ]

  return (
    <section className="container mx-auto px-4 xl:px-0 mt-8">
      <div className="mb-4">
        <h2 className="text-xl font-semibold text-[color:var(--brand-secondary)]">
          UTM Overview
        </h2>
        <p className="text-sm text-zinc-600">
          Quick health summary of your current UTM parameter status.
        </p>
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => (
          <MetricCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            tone={stat.tone}
            description={stat.description}
            badge={stat.badge}
          />
        ))}
      </div>
    </section>
  )
}