import { Inter } from "next/font/google"
import { Metadata } from "next"

import "@workspace/ui/globals.css"
import { Analytics } from "@workspace/ui/components/analytics"
import { Providers } from "@/components/providers"

const fontSans = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

export const metadata: Metadata = {
  title: {
    default: "Mortgage Assurerates",
    template: "%s | Mortgage Assurerates",
  },
  description:
    "Mortgage Assurerates provides top-quality mortgage services across the USA. We offer mortgage, expert installation, and outstanding customer care to help homeowners enhance comfort, value, and curb appeal.",
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
  },
}

export default function RootLayout({
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
        <Providers>
          <main className="flex min-h-screen items-center justify-center bg-white px-6">
            <h1 className="text-3xl font-bold text-[#111827] md:text-4xl">Under Maintenance</h1>
          </main>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
