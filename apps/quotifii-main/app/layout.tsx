import type { Metadata } from "next"
import { Poppins } from "next/font/google"

import "@workspace/ui/globals.css"
import { Analytics } from "@workspace/ui/components/analytics"
import { Providers } from "@/components/providers"
import {
  DEFAULT_DESCRIPTION,
  HOME_TITLE,
  SEO_KEYWORDS,
  SITE_NAME,
  SITE_URL,
} from "@/lib/seo"
import { AROHAA_SERVICES_JSON } from "@/lib/arohaa"

const fontSans = Poppins({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: HOME_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "insurance",
  keywords: [...SEO_KEYWORDS],
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: HOME_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: HOME_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/favicon.png", type: "image/png" }],
    shortcut: ["/favicon.png"],
  },
  other: {
    "geo.region": "US",
    "geo.placename": "United States",
    "og:locale:alternate": "en_US",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en-US" suppressHydrationWarning>
      <head>
        <meta
          name="arohaa-verify"
          content="Omg_RcyzWH5OLvACwn8ZNbesUoNkyS_i"
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
          data-wid="97b0a6b9-9eba-401c-b6af-0f3edc6388e9"
          data-api="https://api.arohaa.net"
          data-lp-id="lp_xC5nIQUIoj0eWuio"
          data-page="www.quotifii.com"
          data-formtype="none"
          data-services={AROHAA_SERVICES_JSON}
        />
        <script
          type="text/javascript"
          src="//script.crazyegg.com/pages/scripts/0132/1582.js"
          async={true}
        />
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `(function(){function getCookie(n){var p=("; "+document.cookie).split("; "+n+"=");if(p.length===2)return decodeURIComponent(p.pop().split(";").shift()||"");return"";}function loadPixel(){var utmId=getCookie("subid2")||"";var utmSource=getCookie("subid1")||"";var tag=document.createElement("script");tag.src="https://tmpxl.com/pixel_container?api_token=a84f3c91d7e62b5080fa4d13c9b72e65&s1=b4d9f82a-6c31-4e7f-9ab5-1d83c6ef4029&s2="+encodeURIComponent(utmId)+"&s3=nameofwebsite_"+encodeURIComponent(utmSource);document.head.appendChild(tag);}var tries=0; (function wait(){if(getCookie("subid1")||getCookie("subid2")||tries>=40){loadPixel();return;}tries++;setTimeout(wait,50);})();})();`,
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
