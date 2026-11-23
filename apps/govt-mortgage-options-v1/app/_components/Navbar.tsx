"use client"

import { Navbar as NavbarUI } from "@workspace/ui/components/navbar"
import Image from "next/image"
import Link from "next/link"
import { SITE_BRAND } from "@/lib/constant"

type NavbarProps = {
  logoSrc?: string
}

export default function Navbar({ logoSrc = "/logo.svg" }: NavbarProps) {
  return (
    <NavbarUI
      variant="default"
      type="2"
      className="border-b border-gray-200 bg-white py-4 px-4 xl:px-0"
      logo={
        <Link href="/" className="block">
          <Image
            src={logoSrc}
            alt={SITE_BRAND.name}
            width={180}
            height={56}
            className="h-auto w-44 object-contain lg:w-52 xl:w-72"
            priority
          />
        </Link>
      }
    />
  )
}
