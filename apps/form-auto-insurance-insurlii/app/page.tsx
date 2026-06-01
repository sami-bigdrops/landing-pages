import { Metadata } from "next"
import HomeContent from "@/app/_components/HomeContent"
import {
  BRAND_DESCRIPTION,
  BRAND_METADATA_TITLE,
} from "@/lib/constant"

export const metadata: Metadata = {
  title: BRAND_METADATA_TITLE,
  description: BRAND_DESCRIPTION,
}

export default function Page() {
  return <HomeContent />
}
