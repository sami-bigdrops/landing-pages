import { Inter } from "next/font/google"
import { Metadata } from "next"

import "@workspace/ui/globals.css"
import { Analytics } from "@workspace/ui/components/analytics"
import { Providers } from "@/components/providers"
import { SITE_BRAND } from "@/lib/constant"

const fontInter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.nationonedebtrelief.com"),
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
  other: {
    "arohaa-verify": "DYU1XydGlivBXRgaXkImckKISdyDlY5V",
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
        <meta name="arohaa-verify" content="DYU1XydGlivBXRgaXkImckKISdyDlY5V" />
        <script
          dangerouslySetInnerHTML={{
            __html:
              "!function(w){if(w.arohaa)return;var a=function(){(a.q=a.q||[]).push(arguments)};a.q=[];a.l=Date.now();w.arohaa=a}(window);",
          }}
        />
        <script
          id="arohaa-sdk"
          src="https://cdn.arohaa.net/sdk.js"
          async
          data-wid="847e0468-905e-46e7-8e9e-11b6a693c3d2"
          data-api="https://api.arohaa.net"
          data-lp-id="lp_DYFFNOWZsCUsjCdp"
          data-page="www.nationonedebtrelief.com"
          data-formtype="multiple"
        />
      </head>
      <body
        className={`${fontInter.variable} font-sans antialiased overflow-x-hidden overflow-y-auto`}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
