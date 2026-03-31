import { Metadata } from "next"
import { redirect } from "next/navigation"

import Navbar from "./_components/Navbar"
import StatsCard from "./_components/Dashboard/StatsCard"
import UtmParamsColumns from "./_components/Dashboard/UtmParamsColumns"
import { getCurrentUser } from "@/lib/auth"

export const metadata: Metadata = {
  title: "Dashboard - Quotifii",
}

export default async function Page() {
  const user = await getCurrentUser()
  if (!user) {
    redirect("/auth")
  }

  return (
    <>
      <Navbar />
      <StatsCard />
      <UtmParamsColumns />
    </>
  )
}
