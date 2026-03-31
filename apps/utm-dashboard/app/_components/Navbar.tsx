"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"

import { useBrand } from "@/components/brand-provider"

export default function Navbar() {
  const brand = useBrand()
  const router = useRouter()

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" })
    } finally {
      router.push("/auth")
      router.refresh()
    }
  }

  return (
    <header className="border-b border-gray-200">
      <div className="container mx-auto py-4 px-4 xl:px-0 flex items-center justify-between gap-4">
        <Image
          src={brand.logo}
          alt={brand.brandName}
          width={128}
          height={40}
          className="w-36 lg:w-40 h-auto object-contain"
          priority
        />
        <button
          type="button"
          onClick={handleLogout}
          className="rounded-md border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-100"
        >
          Logout
        </button>
      </div>
    </header>
  )
}
