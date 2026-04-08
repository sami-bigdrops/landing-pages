import { Metadata } from "next"
import TestContent from "./TestContent"

export const metadata: Metadata = {
  title: "Test | Home Warranty Assuritii",
  description: "Test page with placeholder content for offer, phone, and reviews.",
}

export default function TestPage() {
  return <TestContent />
}
