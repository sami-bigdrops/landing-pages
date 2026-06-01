"use client"
import { Navbar as NavbarUI } from "@workspace/ui/components/navbar"
import { cn } from "@workspace/ui/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { BRAND_FULL_NAME } from "@/lib/constant"

interface NavbarProps {
  className?: string
}

export default function Navbar({ className }: NavbarProps) {
    return (
        <NavbarUI
        variant="default"
        type="2"
        className={cn(
          "container mx-auto border-b border-gray-200 py-4.5 px-4.5 xl:py-7 xl:px-7 xl:px-0",
          className
        )}
        logo={
            <Link href="/" className="block">
                <Image
                src="/insurlii-logo.svg"
                alt={BRAND_FULL_NAME}
                width={128}
                height={40}
                className="w-34 lg:w-36 xl:w-42 h-auto object-contain"
                priority
                />
            </Link>
        }
        />
    )
}