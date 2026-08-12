import type { Metadata } from "next"
import { buildPageMetadata } from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: "Access Denied",
  description: "Your request could not be processed at this time.",
  path: "/access-denied",
  index: false,
  follow: false,
})

export default function AccessDeniedPage() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6">
      <section className="max-w-lg w-full rounded-2xl border border-rose-200 bg-rose-50 p-8 text-center">
        <h1 className="text-3xl font-bold text-rose-700">Access Denied</h1>
        <p className="mt-3 text-sm text-rose-700/90">
          Your request could not be processed at this time.
        </p>
      </section>
    </main>
  )
}
