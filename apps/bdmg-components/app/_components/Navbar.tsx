import { Navbar as NavbarUI } from "@workspace/ui/components/navbar"
import Image from "next/image"

export default function Navbar() {
  return (
    <div className="flex flex-col gap-4">
        <NavbarUI
        variant="default"
        type="1"
        contactText="Call us"
        contactTextClassName="text-base font-semibold"
        contactHref="#contact"
        contactLabel="(1800) 123 - 4567"
        contactButton={{ type: "1", variant: "default", className: "p-2 text-base font-semibold bg-[#059669] text-white" }}
        className="p-6 border-b border-gray-200"
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
    </div>
  )
}