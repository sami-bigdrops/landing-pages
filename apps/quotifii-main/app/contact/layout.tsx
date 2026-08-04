import type { Metadata } from "next"
import JsonLd from "@/app/_components/JsonLd"
import { buildPageMetadata, getBreadcrumbJsonLd } from "@/lib/seo"

const TITLE = "Contact Us"
const DESCRIPTION =
  "Contact Quotifii for questions about auto and home insurance quotes across the United States. Reach our team by email or through our contact form."

export const metadata: Metadata = buildPageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/contact",
})

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="h-screen overflow-y-auto">
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Contact Us", path: "/contact" },
        ])}
      />
      {children}
    </div>
  )
}
