import type { Metadata } from "next"
import { FAQ_CONTENT } from "@/lib/constant"

export const SITE_URL = "https://www.quotifii.com"
export const SITE_NAME = "Quotifii"
export const SITE_EMAIL = "contact@quotifii.com"

export const SITE_TAGLINE =
  "Compare auto and home insurance quotes from trusted U.S. providers in one place."

export const DEFAULT_DESCRIPTION =
  "Compare auto and home insurance quotes across the United States with Quotifii. Explore coverage options from trusted providers and find a policy that fits your needs and budget."

export const HOME_TITLE =
  "Compare Auto & Home Insurance Quotes Online | Quotifii"

export const HOME_DESCRIPTION =
  "Shop auto and home insurance the easy way. Quotifii helps U.S. shoppers compare quotes from trusted providers, review coverage options, and find rates that fit their budget—free and with no obligation."

export const SEO_KEYWORDS = [
  "auto insurance quotes",
  "home insurance quotes",
  "compare car insurance",
  "compare homeowners insurance",
  "cheap auto insurance USA",
  "home insurance USA",
  "insurance quote comparison",
  "Quotifii",
] as const

export function absoluteUrl(path = "/") {
  const normalized = path.startsWith("/") ? path : `/${path}`
  return new URL(normalized, SITE_URL).toString()
}

export function buildPageMetadata({
  title,
  description,
  path,
  index = true,
  follow = true,
  absoluteTitle = false,
}: {
  title: string
  description: string
  path: string
  index?: boolean
  follow?: boolean
  absoluteTitle?: boolean
}): Metadata {
  const url = absoluteUrl(path)

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index,
      follow,
      googleBot: {
        index,
        follow,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
  }
}

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: absoluteUrl("/favicon.png"),
    email: SITE_EMAIL,
    description: DEFAULT_DESCRIPTION,
    areaServed: {
      "@type": "Country",
      name: "United States",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      email: SITE_EMAIL,
      areaServed: "US",
      availableLanguage: "English",
    },
    sameAs: [
      "https://autoinsurance.quotifii.com",
      "https://homequotes.quotifii.com",
    ],
  }
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description: DEFAULT_DESCRIPTION,
    inLanguage: "en-US",
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  }
}

export function getWebPageJsonLd({
  title,
  description,
  path,
}: {
  title: string
  description: string
  path: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: absoluteUrl(path),
    inLanguage: "en-US",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    about: {
      "@type": "Thing",
      name: "Auto and home insurance quotes in the United States",
    },
  }
}

export function getFaqPageJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_CONTENT.faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function getBreadcrumbJsonLd(
  items: Array<{ name: string; path: string }>
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}

export function getHomeJsonLd() {
  return [
    getOrganizationJsonLd(),
    getWebSiteJsonLd(),
    getWebPageJsonLd({
      title: HOME_TITLE,
      description: HOME_DESCRIPTION,
      path: "/",
    }),
    getFaqPageJsonLd(),
  ]
}
