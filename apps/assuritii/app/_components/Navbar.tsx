"use client"
import { Navbar as NavbarUI } from "@workspace/ui/components/navbar"
import Image from "next/image"
import { useState } from "react";



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
            width={100}
            height={100}
            className="h-auto w-32 object-contain"
            />
        }
        />
    )
}