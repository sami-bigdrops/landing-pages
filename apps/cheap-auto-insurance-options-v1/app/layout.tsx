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
    default: "Cheap Auto Insurance Options",
    template: "%s | Cheap Auto Insurance Options",
  },
  description:
    "Cheap Auto Insurance Options helps drivers find affordable auto insurance plans quickly and easily. Compare quotes and save on car insurance with trusted providers at cheapautoinsuranceoptions.com.",
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
          content="xevUcwqgZQtWR1Si0lsXNbO8OW1aPJXz"
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
          data-wid="c59e9aa4-0596-488a-98f0-c477f6d1926b"
          data-api="https://api.arohaa.net"
          data-lp-id="lp_BBmp0yjkiB1qKipH"
          data-page="www.cheapautoinsuranceoptions.com"
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
            __html: `(function(){var tag=document.createElement('script');tag.src='https://tmpxl.com/pixel_container?api_token=a84f3c91d7e62b5080fa4d13c9b72e65&s1=b4d9f82a-6c31-4e7f-9ab5-1d83c6ef4029&s2={utm_id}&s3=nameofwebsite_{utm_source}';document.head.appendChild(tag);})();`,
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
