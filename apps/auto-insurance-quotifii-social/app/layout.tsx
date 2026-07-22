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
      <script type="text/javascript" src="//script.crazyegg.com/pages/scripts/0132/1582.js" async={true}></script>
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
