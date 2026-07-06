import { Metadata } from "next"
import { Poppins } from "next/font/google"

import "@workspace/ui/globals.css"
import { Analytics } from "@workspace/ui/components/analytics"
import { Providers } from "@/components/providers"


const fontPoppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})



export const metadata: Metadata = {
  title: {
    default: "Quotifii Home Insurance",
    template: "%s | Quotifii Home Insurance",
  },
  description:
    "Quotifii Home Insurance provides premier home insurance services to protect your property and peace of mind. Enjoy comprehensive coverage, expert guidance, and dedicated customer care for homeowners across the USA.",
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
          content="Ov27xAYSR8yrIogCaJcXAQ94H79ew2z9"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(w){if(w.arohaa)return;var a=function(){(a.q=a.q||[]).push(arguments)};a.q=[];a.l=Date.now();w.arohaa=a}(window);`,
          }}
        />
        <script
          src="https://cdn.arohaa.net/sdk.js"
          async
          data-wid="f09f813b-3037-43a4-b644-99b23b378e61"
          data-api="https://api.arohaa.net"
          data-lp-id="lp_s0kAPiNsNkZX1pHU"
          data-page="homequotes.quotifii.com"
          data-formtype="zip"
        />
        <script
          type="text/javascript"
          src="//script.crazyegg.com/pages/scripts/0132/1582.js"
          async={true}
        />
      </head>
      <body
        className={`${fontPoppins.variable} ${fontPoppins.className} antialiased overflow-x-hidden overflow-y-auto`}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
