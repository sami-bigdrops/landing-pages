"use client"
import { Navbar as NavbarUI } from "@workspace/ui/components/navbar"
import Image from "next/image"
import Link from "next/link"

export default function Navbar() {
    return (
        <NavbarUI
        variant="default"
        type="2"
        className="mx-auto w-full max-w-none py-5 xl:py-7 px-4 sm:px-6 lg:px-8 xl:px-20 border-b border-gray-200 bg-white shadow-[0_1px_10px_0_rgba(0,0,0,0.12)]"
   
        logo={
            <Link href="/" className="block">
                <Image
                src="/URE-logo.svg"
                alt="United Roofing Experts"
                width={128}
                height={40}
                className="w-36 lg:w-40 xl:w-48 h-auto object-contain"
                priority
                />
            </Link>
        }
        />
    )
}