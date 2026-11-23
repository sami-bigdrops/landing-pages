"use client"

import { Suspense } from "react"
import FormClient from "./FormClient"

export default function FormPage() {
  return (
    <Suspense fallback={null}>
      <FormClient />
    </Suspense>
  )
}
