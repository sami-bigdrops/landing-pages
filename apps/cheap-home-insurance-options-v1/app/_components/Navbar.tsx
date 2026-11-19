"use client"

import { Navbar as NavbarUI } from "@workspace/ui/components/navbar"
import { NAVBAR_CONTENT } from "@/lib/constant"
import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  return (
    <NavbarUI
      variant="default"
      type="2"
      className="border-b-0 bg-white py-5 px-4 lg:px-10 xl:px-22 xl:py-7 2xl:px-26"
      logo={
        <Link href="/" className="block">
          <Image
            src="/logo.svg"
            alt="Cheap Home Insurance Options"
            width={208}
            height={65}
            className="h-auto w-52 object-contain lg:w-56 xl:w-60"
            priority
          />
        </Link>
      }
    />
  )
}
