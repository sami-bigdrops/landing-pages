import { Inter, Poppins } from "next/font/google"
import { Metadata } from "next"

import "@workspace/ui/globals.css"
import { Analytics } from "@workspace/ui/components/analytics"
import { Providers } from "@/components/providers"

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const fontPoppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
})

export { fontInter, fontPoppins }

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
    <html lang="en" suppressHydrationWarning>
      <head>
      <script type="text/javascript" src="//script.crazyegg.com/pages/scripts/0132/1582.js" async={true}></script>
      </head>
      <body
        className="antialiased overflow-x-hidden overflow-y-auto"
      >
        <Providers>{children}</Providers>
        <Analytics />
      </body>
    </html>
  )
}
