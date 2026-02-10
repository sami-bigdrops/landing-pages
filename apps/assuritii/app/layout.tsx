import { Inter } from "next/font/google"
import { Metadata } from "next"

import "@workspace/ui/globals.css"
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
  openGraph: {
    title: "Assuritii - Vehicle Protection & Extended Warranty",
    description:
      "Protect your car and your wallet from expensive repair bills. Get a free vehicle protection quote from Assuritii.",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontSans.variable} font-sans antialiased overflow-x-hidden overflow-y-auto`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
