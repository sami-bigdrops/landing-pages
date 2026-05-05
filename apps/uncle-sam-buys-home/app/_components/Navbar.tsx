"use client"

import { Navbar as NavbarUI } from "@workspace/ui/components/navbar"



export default function Navbar() {
  return (
    <NavbarUI
      variant="default"
      type="2"
      className="mx-auto w-full  px-4 py-6 sm:px-6 lg:px-8"
      logo={
        <>
          {/* <Image
            src="/assuritii.svg"
            alt="Assuritii"
            width={128}
            height={40}
            className="w-32 h-10 object-contain"
            priority
          /> */}
          <span className="text-2xl font-bold text-[#44BF7C]">Uncle Sam Buys Homes</span>
        </>
      }
    />
  )
}
