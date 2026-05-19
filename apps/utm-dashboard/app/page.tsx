import { Metadata } from "next"
import { redirect } from "next/navigation"

import Navbar from "./_components/Navbar"
import UtmProductShell from "./_components/Dashboard/UtmProductShell"
import { getCurrentUser } from "@/lib/auth"
import { getBrandForRequest } from "@/lib/get-brand-for-request"

export async function generateMetadata(): Promise<Metadata> {
  const brand = await getBrandForRequest()
  return {
    title: `Dashboard - ${brand.brandName}`,
  }
}

export default async function Page() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/auth")
  }

  return (
    <>
      <Navbar />
      <UtmProductShell />
    </>
  )
}
