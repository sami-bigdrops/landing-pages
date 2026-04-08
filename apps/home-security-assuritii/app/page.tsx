import { Metadata } from "next"
import HomeContent from "@/app/_components/HomeContent"

export const metadata: Metadata = {
  title: "Home Warranty Assuritii | Get a free home warranty quote",
  description:
    "Protect your home and your wallet from expensive repair bills. Get a free home warranty quote from Assuritii.",
}

export default function Page() {
  return <HomeContent />
}
