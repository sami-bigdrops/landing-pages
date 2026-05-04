"use client"
import { Navbar as NavbarUI } from "@workspace/ui/components/navbar"
import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
  return (
    <div className="w-full border-b border-primary/20 bg-[#FFFFFF]">
      <div className="mx-auto w-full max-w-[1280px]">
        <NavbarUI
          variant="default"
          type="2"
          className="border-0 bg-transparent py-4"
          logo={
            <Link href="/" className="block">
              <Image
                src="/insurlii-logo.svg"
                alt="Insurlii Auto Insurance"
                width={128}
                height={40}
                className="w-36 lg:w-40 xl:w-48 h-auto object-contain"
                priority
              />
            </Link>
          }
        />
      </div>
    </div>
  )
}
