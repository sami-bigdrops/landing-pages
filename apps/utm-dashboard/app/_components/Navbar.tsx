"use client"

import { Navbar as NavbarUI } from "@workspace/ui/components/navbar"
import Image from "next/image"

import { useBrand } from "@/components/brand-provider"

export default function Navbar() {
  const brand = useBrand()

  return (
    <NavbarUI
      variant="default"
      type="2"
      className="container mx-auto py-4 px-4 xl:px-0 border-b border-gray-200"
      logo={
        <Image
          src={brand.logo}
          alt={brand.brandName}
          width={128}
          height={40}
          className="w-36 lg:w-40 h-auto object-contain"
          priority
        />
      }
    />
  )
}
