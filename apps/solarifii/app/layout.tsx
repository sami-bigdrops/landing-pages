import { Metadata } from "next"

import "@workspace/ui/globals.css"
import { Analytics } from "@workspace/ui/components/analytics"
import { Providers } from "@/components/providers"
import { fontInter, fontPoppins } from "./fonts"

export const metadata: Metadata = {
  title: {
    default: "Solarifii - Solar Panel Solutions",
    template: "%s | Solarifii",
  },
  description:
    "Solarifii helps homeowners switch to solar energy with ease. Get expert advice, transparent pricing, and top-rated solar solutions to save money and protect the environment.",
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
    <html
      lang="en"
      suppressHydrationWarning
      className={`${fontInter.variable} ${fontPoppins.variable}`}
    >
      <head>
      <script type="text/javascript" src="//script.crazyegg.com/pages/scripts/0132/1582.js" async={true}></script>
      </head>
      <body
        className={`${fontInter.className} antialiased overflow-x-hidden overflow-y-auto`}
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
