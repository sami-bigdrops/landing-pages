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
        <meta
          name="arohaa-verify"
          content="H311Yv6T527ov9GAlNtke9t0ONNZ1L8E"
        />
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
          data-wid="177339d1-d18b-41b1-b987-c93efaad56d7"
          data-api="https://api.arohaa.net"
          data-lp-id="lp_RDZ0cP79vmULSaSz"
          data-page="www.govmortgageoptions.com"
          data-formtype="zip"
        />
        <script
          type="text/javascript"
          src="//script.crazyegg.com/pages/scripts/0132/1582.js"
          async={true}
        />
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
