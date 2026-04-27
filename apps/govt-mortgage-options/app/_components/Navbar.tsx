"use client"
import { Navbar as NavbarUI } from "@workspace/ui/components/navbar"
import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
    return (
        <NavbarUI
        variant="default"
        type="2"
        className="py-4 px-4 xl:px-0 border-b border-gray-200"
        logo={
            <Link href="/" className="block">
                <Image
                src="/gov-mortgage-logo.svg"
                alt="Govt Mortgage Options"
                width={128}
                height={40}
                className="w-36 lg:w-40 xl:w-54 h-auto object-contain"
                priority
                />
            </Link>
        }
        />
    )
}