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
      className="roof w-full  h-full px-6 py-10  md:px-6 md:py-12 lg:px-14 lg:py-10  xl:px-23 xl:py-11"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.77), rgba(0, 0, 0, 0.77)), url(${ROOF_CONTENT.roofImage.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
 
    >
      <div className="container mx-auto">




        <div className="flex w-full flex-col-reverse  items-center justify-center gap-6 md:flex-row-reverse md:items-start md:justify-center  md:gap-8 lg:gap-10 xl:gap-14">
          <div className="left flex flex-col items-center justify-center gap-5 xl:gap-5 md:w-[50%]  ">
            <div className="flex flex-col items-center justify-center gap-2">
              <h2 className="text-lg text-center  md:text-2xl md:max-w-[150px]  xl:text-3xl  font-semibold text-[#FFFFFF] text-center font-sans " style={{ lineHeight: '1.3' }}>
                {ROOF_CONTENT.headline}
              </h2>
              <h3 className="text-sm text-center md:text-base   font-normal text-[#FFFFFF] text-center font-sans " style={{ lineHeight: '1.3' }}>{ROOF_CONTENT.subheadline}</h3>
            </div>

            <div className="flex flex-col items-center justify-center gap-4 md:gap-4.5">
              <p className="text-[0.77rem] md:text-[0.77rem]  xl:text-base  text-[#FFFFFF] text-center font-sans font-normal " style={{ lineHeight: 1.5 }}>{ROOF_CONTENT.description}</p>


              <Button
                type="1"
                variant="default"
                onClick={handleCheckMyEligibility}
                className="w-full md:max-w-[220px] xl:max-w-[290px] flex h-15 flex-1 cursor-pointer items-center justify-center gap-2 rounded-none px-5 py-4 md:py-3.5 xl:py-5 font-semibold tracking-normal  text-sm font-inherit text-white transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-90 md:h-14 xl:h-19.5 xl:text-lg border-[3px] border-[#BC0B31] bg-[linear-gradient(180deg,_#CE1B31_0%,_#92040B_100%)] hover:bg-[linear-gradient(180deg,_#CE1B31_0%,_#92040B_100%)]"
              >
                Get Pricing
              </Button>

            </div>



          </div>

          <div className="right w-full flex flex-col items-center justify-center  md:w-[50%] md:justify-start  md:h-[190px] md:max-w-[250px] lg:h-[220px] xl:h-[300px] 2xl:h-[310px] ">
            <Image
              src={ROOF_CONTENT.image.src}
              alt={ROOF_CONTENT.image.alt}
              width={800}
              height={560}
              className="w-full h-full md object-cover"
              priority
            />
          </div>

        </div>


      </div>
    </div>
  )
}
