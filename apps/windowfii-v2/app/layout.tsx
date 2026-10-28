import { Inter } from "next/font/google"
import { Metadata } from "next"

import "@workspace/ui/globals.css"
import { Analytics } from "@workspace/ui/components/analytics"
import { Providers } from "@/components/providers"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
})

export const metadata: Metadata = {
  title: {
    default: "Replacement Windows Near You | Free Quote | Windowfii",
    template: "%s | Windowfii",
  },
  description:
    "Compare replacement window options near you with Windowfii. Improve comfort, energy efficiency and curb appeal. Get your free window quote today.",
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
          content="5DVQsh9lgXaeYKHKu4n9EBg1BQfqaDlz"
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
          data-wid="571f11b1-e728-449d-b604-f32b89f6c01d"
          data-api="https://api.arohaa.net"
          data-lp-id="lp_uBBCAS65FEn8WK2n"
          data-page="get.windowfii.com"
          data-formtype="multiple"
        />
        <script
          type="text/javascript"
          src="//script.crazyegg.com/pages/scripts/0132/1582.js"
          async={true}
        />
      </head>
      <body
        className={`${fontSans.variable} ${fontSans.className} antialiased overflow-x-hidden`}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
