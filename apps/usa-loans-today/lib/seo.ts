import type { Metadata } from "next"
import { FAQ_CONTENT } from "@/lib/constant"

export const SITE_URL = "https://www.usaloanstoday.com"
export const SITE_NAME = "USA Loans Today"
export const SITE_EMAIL = "contact@usaloanstoday.com"

export const SITE_TAGLINE =
  "Compare loan options from trusted U.S. lenders in one place."

export const DEFAULT_DESCRIPTION =
  "Compare personal, auto, and home loan offers from top lenders nationwide. USA Loans Today helps you find the best rates and terms with no hassle or obligation — get started today!"

export const HOME_TITLE =
  "Home Loans USA | USA Loans Today"

export const HOME_DESCRIPTION =
  "Explore and compare personal, auto, and home loan rates from leading U.S. providers. Find the best loan for your needs fast, free, and with confidence at USA Loans Today."

export const SEO_KEYWORDS = [
  "personal loans",
  "auto loans",
  "home loans",
  "compare loan offers",
  "USA Loans Today",
  "loan rates USA",
  "best loan deals",
  "trusted U.S. lenders",
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
      "https://usaloanstoday.com",
      
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
      name: "Compare personal, auto, and home loan offers from top lenders nationwide. USA Loans Today helps you find the best rates and terms with no hassle or obligation — get started today!",
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
