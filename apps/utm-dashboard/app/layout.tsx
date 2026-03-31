import { Inter } from "next/font/google"
import type { Metadata } from "next"

import "@workspace/ui/globals.css"
import { Analytics } from "@workspace/ui/components/analytics"
import { Providers } from "@/components/providers"
import { getBrandForRequest } from "@/lib/get-brand-for-request"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

function faviconMimeType(path: string): string {
  if (path.endsWith(".svg")) return "image/svg+xml"
  if (path.endsWith(".png")) return "image/png"
  if (path.endsWith(".ico")) return "image/x-icon"
  return "image/png"
}

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getBrandForRequest()
  return {
    title: {
      default: `${brand.brandName} Dashboard`,
      template: `%s | ${brand.brandName}`,
    },
    description: `Dashboard for ${brand.brandName}.`,
    icons: {
      icon: [{ url: brand.favicon, type: faviconMimeType(brand.favicon) }],
    },
  }
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const brand = await getBrandForRequest()
  const brandCssVars = {
    "--brand-primary": brand.colors.primary,
    "--brand-secondary": brand.colors.secondary,
    "--brand-accent": brand.colors.accent,
  } as React.CSSProperties

  return (
    <html lang="en" style={brandCssVars} suppressHydrationWarning>
      <body
        className={`${fontSans.variable} font-sans antialiased overflow-x-hidden overflow-y-auto`}
      >
        <Providers brand={brand}>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
