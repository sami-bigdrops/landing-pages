import { Poppins } from "next/font/google"
import { Metadata } from "next"

import "@workspace/ui/globals.css"
import { Analytics } from "@workspace/ui/components/analytics"
import { Providers } from "@/components/providers"
import { SITE_BRAND } from "@/lib/constant"

const fontPoppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://www.unclesambuyshomes.com"),
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
    "arohaa-verify": "UfPQM9JECAG3h59PAveHdpjzYpDtYwB3",
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
        <meta name="arohaa-verify" content="UfPQM9JECAG3h59PAveHdpjzYpDtYwB3" />
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
          data-wid="462a497d-9779-4df0-bccb-57b92b3f942d"
          data-api="https://api.arohaa.net"
          data-lp-id="lp_PZX-YRhm9okxJxtr"
          data-page="www.unclesambuyshomes.com"
          data-formtype="multiple"
        />
      </head>
      <body
        className={`${fontPoppins.variable} font-sans antialiased overflow-x-hidden overflow-y-auto`}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
