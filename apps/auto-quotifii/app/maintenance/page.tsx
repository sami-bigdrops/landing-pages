import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Maintenance",
  robots: { index: false, follow: false },
}

export default function MaintenancePage() {
  if (process.env.MAINTENANCE_MODE !== "true") {
    redirect("/")
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-white px-6">
      <section className="w-full max-w-lg rounded-2xl border border-[#1E3A8A]/20 bg-[#1E3A8A]/5 p-8 text-center">
        <h1 className="text-3xl font-bold text-[#1E3A8A]">We&apos;ll be back soon</h1>
        <p className="mt-3 text-sm text-[#1E3A8A]/90">
          This site is temporarily unavailable while we perform maintenance. Please try again later.
        </p>
      </section>
    </main>
  )
}
