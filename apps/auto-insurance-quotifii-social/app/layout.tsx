import { Poppins } from "next/font/google"
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
  other: {
    "arohaa-verify": "uI1o9-7U6ytHo-XmLrG5tpANJ-jNixRi",
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
          content="uI1o9-7U6ytHo-XmLrG5tpANJ-jNixRi"
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
          data-wid="4a46a75f-de6b-4ad8-8bc6-5311240d1bd7"
          data-api="https://api.arohaa.net"
          data-lp-id="lp_y9bGdjsdg01KiXGA"
          data-page="autocoverage.quotifii.com"
          data-formtype="zip"
        />
        <script
          type="text/javascript"
          src="//script.crazyegg.com/pages/scripts/0132/1582.js"
          async={true}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(){function getCookie(n){var p=("; "+document.cookie).split("; "+n+"=");if(p.length===2)return decodeURIComponent(p.pop().split(";").shift()||"");return"";}function loadPixel(){var utmId=getCookie("subid2")||"";var utmSource=getCookie("subid1")||"";var tag=document.createElement("script");tag.src="https://tmpxl.com/pixel_container?api_token=a84f3c91d7e62b5080fa4d13c9b72e65&s1=b4d9f82a-6c31-4e7f-9ab5-1d83c6ef4029&s2="+encodeURIComponent(utmId)+"&s3="+encodeURIComponent(utmSource);document.head.appendChild(tag);}var tries=0; (function wait(){if(getCookie("subid1")||getCookie("subid2")||tries>=40){loadPixel();return;}tries++;setTimeout(wait,50);})();})();`,
          }}
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
