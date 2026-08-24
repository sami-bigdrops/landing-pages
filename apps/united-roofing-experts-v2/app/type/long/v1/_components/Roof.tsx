"use client"

import Image from "next/image"
import { ROOF_CONTENT } from "@/lib/constant"
import { Button } from "@workspace/ui/components/button";
import { useRouter } from "next/navigation";



export default function Roof() {

  const router = useRouter();

  const handleCheckMyEligibility = () => {
    router.push("/form");
  };
  return (
    <div
      className="roof w-full  h-full px-6 py-10  md:px-6 md:py-12 lg:px-14 lg:py-12  xl:px-23 xl:py-18"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.77), rgba(0, 0, 0, 0.77)), url(${ROOF_CONTENT.roofImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div   className="container mx-auto xl:max-w-[1250px]">
        <div className="flex w-full flex-col items-center gap-6 md:flex-row md:items-start md:gap-6 lg:gap-0  xl:gap-0">
          <div className="w-full md:w-1/2 lg:w-[50%]  flex items-center justify-center md:items-start  md:h-[200px] lg:h-[230px] xl:h-[300px] ">
            <Image
              src={ROOF_CONTENT.image.src}
              alt={ROOF_CONTENT.image.alt}
              width={800}
              height={560}
              className="h-full w-full max-w-[320px] md:max-w-[320px] lg:max-w-[370px] xl:max-w-[490px] object-cover object-center "
              priority
            />
          </div>

          <div className="flex w-full flex-col items-center gap-5 md:w-1/2 lg:w-[50%]   md:items-center md:gap-4 xl:gap-6">
            <div className="w-full flex flex-col items-center gap-2 md:items-center">
              <h2
                className="text-center font-sans text-lg font-semibold text-white  md:text-3xl  xl:text-4xl md:max-w-[200px] lg:max-w-none"
                style={{ lineHeight: "1.3" }}
              >
                {ROOF_CONTENT.headline}
              </h2>
              <h3
                className="text-center font-sans text-sm font-normal text-white md:text-lg lg:text-lg  xl:text-xl "
                style={{ lineHeight: "1.3" }}
              >
                {ROOF_CONTENT.subheadline}
              </h3>
            </div>

            <p
              className="text-center md:mt-2 font-sans text-[0.77rem] font-normal text-white  xl:text-base lg:max-w-[370px] xl:max-w-[525px] "
              style={{ lineHeight: 1.5 }}
            >
              {ROOF_CONTENT.description}
            </p>

            <div className="w-full md:max-w-[220px] xl:max-w-[290px]">
              <Button
                type="1"
                variant="default"
                onClick={handleCheckMyEligibility}
                className="flex h-14 w-full cursor-pointer items-center justify-center rounded-none border-[3px] border-[#BC0B31] bg-[linear-gradient(180deg,_#CE1B31_0%,_#92040B_100%)] px-5 py-4 text-sm font-semibold tracking-normal text-white transition-all duration-300 hover:bg-[linear-gradient(180deg,_#CE1B31_0%,_#92040B_100%)] disabled:cursor-not-allowed disabled:opacity-90 xl:h-19.5 xl:text-lg"
              >
                Get Pricing
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
