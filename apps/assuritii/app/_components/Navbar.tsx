"use client"
import { Navbar as NavbarUI } from "@workspace/ui/components/navbar"
import Image from "next/image"

export default function Navbar() {
    return (
        <NavbarUI
        variant="default"
        type="2"
        className="p-4 border-b border-gray-200"
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
        />
    )
}