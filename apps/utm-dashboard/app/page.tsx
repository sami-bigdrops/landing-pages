import { Metadata } from "next"

import Navbar from "./_components/Navbar"
import StatsCard from "./_components/Dashboard/StatsCard"
import UtmParamsColumns from "./_components/Dashboard/UtmParamsColumns"

export const metadata: Metadata = {
  title: "Dashboard - Quotifii",
}

export default function Page() {
  return (
    <>
      <Navbar />
      <StatsCard />
      <UtmParamsColumns />
    </>
  )
}
