"use client";

import { useUtmParams } from "@workspace/lp-core";
import { HERO_CONTENT } from "@/lib/constant";
import { Button } from "@workspace/ui/components/button";

import { useRouter } from "next/navigation";
import Image from "next/image";


export default function Hero() {
  useUtmParams(30);
  const router = useRouter();

  const handleCheckMyEligibility = () => {
    router.push("/form");
  };
  return (
    <div className="relative w-full h-full  md:min-h-[370px] lg:min-h-[400px] xl:min-h-[600px] overflow-hidden px-6 py-8 md:px-6 md:py-10 lg:px-14  xl:px-20 xl:py-12"
    style={{
      backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.77), rgba(0, 0, 0, 0.77)), url(${HERO_CONTENT.image.src})`,
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
    }}
    >
     
      

      <div className="relative z-10 container mx-auto">
        <div className="hero-content  flex flex-col items-center justify-center  gap-4 xl:gap-5">

          <div className=" w-full flex flex-col items-center  gap-2 ">
            <h1 className="text-2xl md:text-3xl xl:text-4xl  md:max-w-[450px] lg:max-w-[550px] xl:max-w-[830px] font-bold  text-[#FFFFFF] text-center font-sans " style={{ lineHeight: "1.4" }}>
              {HERO_CONTENT.headline}
            </h1>
            <p className="text-[#F9FAFB] italic text-center font-sans text-sm lg:text-sm xl:text-lg font-normal  md:max-w-[550px] xl:max-w-[730px]" style={{ lineHeight: "1.6" }}>
              {HERO_CONTENT.description}
            </p>


          </div>

          <div className="w-full flex items-center justify-center ">
            <div className="flex w-full md:max-w-[430px] lg:max-w-[450px] xl:max-w-[650px] flex-col items-center gap-3 border-2 border-dashed border-white px-4 py-4  md:py-6 lg:px-5 lg:py-5 xl:px-7 xl:py-6">
       
              <p className="text-center font-sans text-base  xl:text-xl font-semibold text-white ">
                {HERO_CONTENT.subtitle}
              </p>
              <div className="flex w-full items-center justify-center gap-2 lg:gap-2 xl:gap-2.5  md:flex-col lg:flex-row max-w-[220px] lg:max-w-none">
                <Button
                  type="1"
                  variant="default"
                  onClick={handleCheckMyEligibility}
                  className="w-full flex h-13 flex-1 cursor-pointer items-center justify-center gap-2 rounded-none  px-5 md:py-3.5 xl:py-4 font-bold text-[0.85rem] font-inherit text-black  transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-90 md:h-14   xl:h-18.5  xl:text-lg border-[3px] border-[#1ECF2B] bg-gradient-to-b from-[#32FF3E] to-[#1ECF2B] hover:bg-gradient-to-b hover:from-[#32FF3E] hover:to-[#1ECF2B]"
                >
                  YES
                </Button>
           
                <Button
                  type="1"
                  variant="default"
                  onClick={handleCheckMyEligibility}
                  className="w-full flex h-13 flex-1 cursor-pointer items-center justify-center gap-2 rounded-none px-5 md:py-3.5 xl:py-4 font-bold text-[0.85rem] font-inherit text-white  transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-90 md:h-14 xl:h-18.5  xl:text-lg border-[3px] border-[#BC0B31] bg-[linear-gradient(180deg,_#CE1B31_0%,_#92040B_100%)] hover:bg-[linear-gradient(180deg,_#CE1B31_0%,_#92040B_100%)]"
                >
                  NO
                </Button>
           
              </div>
            </div>
          </div>

          <div className="w-full h-full md:h-auto md:w-[430px] lg:w-[450px] xl:w-[700px]  flex items-center justify-center mt-1">
            <Image src={HERO_CONTENT.heroImage.src} alt={HERO_CONTENT.heroImage.alt} width={500} height={500}
             className="w-full h-full object-cover"
             />
          </div>
        </div>
      </div>
    </div>
  );
}
