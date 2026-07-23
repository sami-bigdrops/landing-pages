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
      contactHref={NAVBAR_CONTENT.contactPhoneHref}
      contactLabel={NAVBAR_CONTENT.contactPhoneLabel}
      contactText="Call us"
      logo={
        <Link href="/" className="flex flex-col items-start gap-0.5">
          <Image
            src="/logo.svg"
            alt="MediSavingz"
            width={128}
            height={40}
            className="h-auto w-36 object-contain lg:w-40 xl:w-48"
            priority
          />
          <span className="text-[0.55rem] font-light leading-tight text-[#9CA3AF] sm:text-[0.6rem] xl:text-[0.65rem]">
            A Trusted, Non-Government Resource
          </span>
        </Link>
      }
    />
  )
}
