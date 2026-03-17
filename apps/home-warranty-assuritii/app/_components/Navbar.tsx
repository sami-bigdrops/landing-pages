"use client"

import { Navbar as NavbarUI } from "@workspace/ui/components/navbar"
import Image from "next/image"

type NavbarProps = {
  contactLabel?: string
  contactHref?: string
}

export default function Navbar({ contactLabel = "1-855-916-3700", contactHref = "tel:+18559163700" }: NavbarProps = {}) {
  return (
    <NavbarUI
      variant="default"
      type="1"
      className="container mx-auto py-4 px-4 xl:px-0 border-b border-gray-200"
      logo={
        <Image
          src="/assuritii.svg"
          alt="Assuritii"
          width={128}
          height={40}
          className="w-32 h-10 object-contain"
          priority
        />
      }
      contactText="Call Now"
      contactTextClassName="text-lg text-zinc-900 font-semibold hidden md:inline"
      showContactIcon={false}
      contactHref={contactHref}
      contactLabel={contactLabel}
      contactButton={{
        type: "1",
        variant: "ghost",
        size: "sm",
        className: "text-lg text-[#3498DB] font-bold hover:bg-transparent hover:text-[#3498DB]",
      }}
    />
  )
}