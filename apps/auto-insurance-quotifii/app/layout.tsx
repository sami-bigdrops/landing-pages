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
          content="RfawKozo7MhXK5KSjw43N877e8U2LoQr"
        />
        <script
          src="https://cdn.arohaa.net/sdk.js"
          async
          data-wid="e8b9a81b-fde8-49c4-83b8-1cc34e232b45"
          data-api="https://api.arohaa.net"
          data-lp-id="lp_xYqi6ZRztubAklEw"
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
