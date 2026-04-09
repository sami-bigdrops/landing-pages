import Image from "next/image"
import { WORKS_CONTENT } from "@/lib/constant"
import { Button as ButtonUI } from "@workspace/ui/components/button"

export default function Trust() {
  return (
    <div className="trust w-full bg-white  p-6 md:px-10 md:py-10 lg:px-16 lg:py-12 xl:px-24 2xl:px-64 xl:py-14">
      <div className="container mx-auto ">
        <div className="works-content w-full flex flex-col items-center justify-center gap-6 md:gap-10 lg:gap-12 xl:gap-14">
          <h2 className="text-xl text-center md:text-2xl xl:text-3xl font-bold text-[#111827] text-center font-sans ">
            {WORKS_CONTENT.header}
          </h2>

          

          
        </div>
      </div>
    </div>
  )
}
