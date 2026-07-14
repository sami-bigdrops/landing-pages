import { Inter } from "next/font/google"
import { Metadata } from "next"

import "@workspace/ui/globals.css"
import { Analytics } from "@workspace/ui/components/analytics"
import { Providers } from "@/components/providers"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  title: {
    default: "Cheap Auto Insurance Options",
    template: "%s | Cheap Auto Insurance Options",
  },
  description:
    "Cheap Auto Insurance Options helps you compare auto insurance and get quotes instantly from top companies. Find affordable coverage and save money with free, fast comparisons.",
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
          content="T03rnR6ZhV4MEqaeMrcWOUviXfkS1ZxZ"
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
          data-wid="2550427e-6a1c-47a7-9d9b-dd1756af0d79"
          data-api="https://api.arohaa.net"
          data-lp-id="lp_gpD0IbRv7QIE2wv5"
          data-page="autoinsurance.quotifii.com"
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
