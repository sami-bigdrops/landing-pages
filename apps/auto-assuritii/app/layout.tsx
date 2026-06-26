import { Inter } from "next/font/google"
import { Metadata } from "next"

import "@workspace/ui/globals.css"
import { Analytics } from "@workspace/ui/components/analytics"
import { Providers } from "@/components/providers"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Assuritii - Vehicle Protection & Extended Warranty",
    template: "%s | Assuritii",
  },
  description:
    "Protect your car and your wallet from expensive repair bills. Get a free vehicle protection quote from Assuritii.",
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
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        <meta
          name="arohaa-verify"
          content="fTLEtuXNQmdw-OmS73VhDo1GXxgQYkt4"
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
          data-wid="cec70acb-a704-4ff6-9749-532ab9c846c6"
          data-api="https://api.arohaa.net"
          data-lp-id="lp_KHxPbBF6vSFh-Zur"
          data-page="auto.assuritii.com"
          data-formtype="single"
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
