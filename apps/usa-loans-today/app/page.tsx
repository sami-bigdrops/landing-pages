import type { Metadata } from "next"
import HomeContent from "@/app/_components/HomeContent"
import JsonLd from "@/app/_components/JsonLd"
import {
  HOME_DESCRIPTION,
  HOME_TITLE,
  buildPageMetadata,
  getHomeJsonLd,
} from "@/lib/seo"

export const metadata: Metadata = buildPageMetadata({
  title: HOME_TITLE,
  description: HOME_DESCRIPTION,
  path: "/",
  absoluteTitle: true,
})

export default function Page() {
  return (
    <>
      <JsonLd data={getHomeJsonLd()} />
      <HomeContent />
    </>
  )
}
