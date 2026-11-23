import { Inter } from "next/font/google"
import { Metadata } from "next"

import "@workspace/ui/globals.css"
import "./styles.css"
import { Analytics } from "@workspace/ui/components/analytics"
import { Providers } from "@/components/providers"
import { SITE_BRAND } from "@/lib/constant"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: SITE_BRAND.name,
    template: `%s | ${SITE_BRAND.name}`,
  },
  description: SITE_BRAND.description,
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
      <script type="text/javascript" src="//script.crazyegg.com/pages/scripts/0132/1582.js" async={true}></script>
      </head>
      <body
        className={`${fontSans.variable} ${fontSans.className} antialiased overflow-x-hidden overflow-y-auto`}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
