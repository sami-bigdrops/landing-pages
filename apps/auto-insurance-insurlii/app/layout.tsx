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
    default: "Insurlii Auto Insurance - Get Quotes Fast",
    template: "%s | Insurlii Auto Insurance",
  },
  description:
    "Insurlii Auto Insurance helps you compare and get the best auto insurance quotes quickly. Fast, competitive rates, and excellent customer support across the USA.",
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
      <script type="text/javascript" src="//script.crazyegg.com/pages/scripts/0132/1582.js" async={true}></script>
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
