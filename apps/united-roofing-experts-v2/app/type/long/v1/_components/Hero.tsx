"use client";

import { HERO_CONTENT } from "@/lib/constant";
import { Button } from "@workspace/ui/components/button";

import { useRouter } from "next/navigation";
import Image from "next/image";


export default function Hero() {
  const router = useRouter();

  const handleHomeownerAnswer = (answer: "yes" | "no") => {
    router.push(`/form?isHomeowner=${answer}`);
  };

  const handleCheckMyEligibility = () => {
    router.push("/form");
  };

  return (
    <div className="relative flex h-full w-full flex-1 flex-col items-center justify-center overflow-hidden px-6 py-8 md:px-6 md:py-10 lg:px-14 xl:px-20 xl:py-12">
      <div className="relative z-10 container mx-auto">
        <div className="hero-content flex flex-col items-center justify-center gap-4 xl:gap-5">

          <div className=" w-full flex flex-col items-center  gap-2 ">
            <h1 className="text-2xl md:text-3xl xl:text-4xl  md:max-w-[450px] lg:max-w-[550px] xl:max-w-[600px] font-bold  text-[#000000] text-center font-sans " style={{ lineHeight: "1.4" }}>
              {HERO_CONTENT.headline}
            </h1>
            <p className="text-[#FF0000] italic text-center font-sans text-sm lg:text-sm xl:text-lg font-semibold  md:max-w-[550px] xl:max-w-[730px]" style={{ lineHeight: "1.6" }}>
              {HERO_CONTENT.description}
            </p>
          </div>

          <div className="w-full flex items-center justify-center ">
            <div className="flex w-full md:max-w-[430px] lg:max-w-[450px] xl:max-w-[650px] flex-col items-center gap-3 border-2 border-dashed border-gray-300 px-4 py-4  md:py-6 lg:px-5 lg:py-5 xl:px-7 xl:py-6">

              <p className="text-center font-sans text-lg  xl:text-2xl font-bold text-black ">
                {HERO_CONTENT.subtitle}
              </p>
              <div className="flex w-full items-center justify-center gap-2 lg:gap-2 xl:gap-2.5   md:flex-row max-w-[220px] md:max-w-[350px] lg:max-w-none">
                <Button
                  type="1"
                  variant="default"
                  onClick={() => handleHomeownerAnswer("yes")}
                  className="w-full flex h-14 flex-1 cursor-pointer items-center justify-center gap-2 rounded-none  px-5 md:py-3.5 xl:py-4 font-bold text-[0.85rem] font-inherit text-black  transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-90 md:h-14   xl:h-18.5  xl:text-lg  bg-[#00F00F] hover:bg-[#00F00F]"
                >
                  YES
                </Button>

                <Button
                  type="1"
                  variant="default"
                  onClick={() => handleHomeownerAnswer("no")}
                  className="w-full flex h-14 flex-1 cursor-pointer items-center justify-center gap-2 rounded-none px-5 md:py-3.5 xl:py-4 font-bold text-[0.85rem] font-inherit text-black  transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-90 md:h-14 xl:h-18.5  xl:text-lg  bg-[#F50202] hover:bg-[#F50202]"
                >
                  NO
                </Button>

              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-center gap-2.5 mt-2 xl:mt-4">
            <p className="text-center font-sans text-base md:text-lg xl:text-xl font-medium italic text-black  md:max-w-[350px] lg:max-w-[400px] xl:max-w-[500px] " style={{ lineHeight: "1.4" }}>
              {HERO_CONTENT.subheadline}
            </p>

            <div className="w-[130px] h-full md:h-auto md:w-[140px] lg:w-[150px]   flex items-center justify-center mt-1">
              <Image src={HERO_CONTENT.heroSubheadlineImage.src} alt={HERO_CONTENT.heroSubheadlineImage.alt} width={500} height={500}
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full md:max-w-[220px] xl:max-w-[290px] mt-3">
              <Button
                type="1"
                variant="default"
                onClick={handleCheckMyEligibility}
                className="flex h-14 w-full cursor-pointer items-center justify-center rounded-none  bg-[#00F00F] px-5 py-4 text-base font-bold tracking-normal text-black transition-all duration-300  hover:bg-[#00F00F] disabled:cursor-not-allowed disabled:opacity-90 xl:h-19.5 xl:text-xl"
              >
                Click for Pricing!
              </Button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
