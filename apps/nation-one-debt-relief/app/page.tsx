import { Metadata } from "next"
import HomeContent from "@/app/_components/HomeContent"
import { SITE_BRAND } from "@/lib/constant"

export const metadata: Metadata = {
  title: `Nation One Debt Relief | ${SITE_BRAND.name}`,
  description: SITE_BRAND.description,
}

export default function Page() {
  return <HomeContent />
}
