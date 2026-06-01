import { Montserrat } from "next/font/google"
import { Metadata } from "next"

import "@workspace/ui/globals.css"
import { Analytics } from "@workspace/ui/components/analytics"
import { Providers } from "@/components/providers"
import {
  BRAND_DESCRIPTION,
  BRAND_METADATA_TITLE,
  BRAND_METADATA_TITLE_TEMPLATE,
} from "@/lib/constant"

const fontSans = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: BRAND_METADATA_TITLE,
    template: BRAND_METADATA_TITLE_TEMPLATE,
  },
  description: BRAND_DESCRIPTION,
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
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
        <script
          type="text/javascript"
          src="//script.crazyegg.com/pages/scripts/0132/1582.js"
          async={true}
        />
      </head>
      <body
        className={`${fontSans.variable} font-sans antialiased overflow-x-hidden overflow-y-auto`}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
