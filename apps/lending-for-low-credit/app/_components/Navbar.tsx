"use client"

import { Navbar as NavbarUI } from "@workspace/ui/components/navbar"
import Image from "next/image"



export default function Navbar() {
  return (
    <NavbarUI
      variant="default"
      type="2"
      className="relative z-20 mx-auto w-full bg-white px-4 py-6 sm:px-6 lg:px-8 border-none shadow-[0_2px_8px_rgba(0,0,0,0.08)]"
      logo={
        <>
          <Image
            src="/logo.svg"
            alt="Nation One Debt Relief"
            width={128}
            height={40}
            className="w-auto h-10 xl:h-12 object-contain"
            priority
          />
          
        </>
      }
    />
  )
}
