"use client"

import { Navbar as NavbarUI } from "@workspace/ui/components/navbar"
import { cn } from "@workspace/ui/lib/utils"
import Image from "next/image"
import { pageSectionInner } from "@/lib/page-layout"

type NavbarProps = {
  contactLabel?: string
  contactHref?: string
}

export default function Navbar({ contactLabel = "1-855-916-3700", contactHref = "tel:+18559163700" }: NavbarProps = {}) {
  return (
    <NavbarUI
      variant="default"
      type="1"
      className={cn(pageSectionInner, "border-b border-gray-200 py-3.5")}
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
      contactText="Give us a call"
      contactTextClassName="text-lg text-zinc-900 font-semibold hidden lg:inline"
      showContactIcon={false}
      contactHref={contactHref}
      contactLabel={contactLabel}
      contactButton={{
        type: "1",
        variant: "ghost",
        size: "sm",
        className: "text-lg md:text-xl text-[#000000] font-bold hover:bg-transparent hover:text-[#3498DB]",
      }}
    />
  )
}