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
    default: "MediSavingz | Compare Medicare Options",
    template: "%s | MediSavingz",
  },
  description:
    "MediSavingz is a trusted, non-government resource that helps you compare Medicare Advantage, Part D, and related coverage options around your doctors, prescriptions, and budget.",
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
          content="v-jM43ZmTwj4teHpsj4tnkBJzm4xY4S8"
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
          data-wid="9b5448db-5321-4837-aa6a-d6a3e07aeb17"
          data-api="https://api.arohaa.net"
          data-lp-id="lp_EYSm8H5lSLsKE0a6"
          data-page="autoquote.cheapautoinsuranceoptions.com"
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
