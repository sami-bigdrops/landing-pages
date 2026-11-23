"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function RefinanceRedirectPage() {
  const router = useRouter()

  useEffect(() => {
    router.replace("/form")
  }, [router])

  return null
}
