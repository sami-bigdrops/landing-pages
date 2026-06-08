import type { Metadata } from "next"
import { BRAND_FULL_NAME } from "@/lib/constant"

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${BRAND_FULL_NAME} for questions about auto insurance quotes and coverage.`,
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="h-screen overflow-y-auto">{children}</div>
}
