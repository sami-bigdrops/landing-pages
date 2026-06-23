import { Baloo_Tamma_2, Poppins } from "next/font/google"
import { Metadata } from "next"

import "@workspace/ui/globals.css"
import { Analytics } from "@workspace/ui/components/analytics"
import { Providers } from "@/components/providers"

const fontSans = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

const fontHero = Baloo_Tamma_2({
  subsets: ["latin"],
  variable: "--font-hero",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
})

export const metadata: Metadata = {
  title: {
    default: "Quotifii - Auto Quotes",
    template: "%s | Quotifii",
  },
  description:
    "`Quotifii provides top-quality auto quotes services across the USA. We offer auto quotes, and outstanding customer care to help homeowners enhance comfort, value, and curb appeal.",
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
          content="JlUzIGhnLmtv-BDBL2S58efE4v96Offd"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(w){if(w.arohaa)return;var a=function(){(a.q=a.q||[]).push(arguments)};a.q=[];a.l=Date.now();w.arohaa=a}(window);`,
          }}
        />
        <script
          src="https://cdn.arohaa.net/sdk.js"
          async
          data-wid="ab47ed75-83f0-4d0d-842c-9eb248361fc6"
          data-api="https://api.arohaa.net"
          data-lp-id="lp_lOUhev9pvwxNI3bF"
          data-page="summerquotes.quotifii.com"
          data-formtype="zip"
        />
        <script
          type="text/javascript"
          src="//script.crazyegg.com/pages/scripts/0132/1582.js"
          async={true}
        />
      </head>
      <body
        className={`${fontSans.variable} ${fontHero.variable} ${fontSans.className} antialiased overflow-x-hidden overflow-y-auto`}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
