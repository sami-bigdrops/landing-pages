"use client";

import { useUtmParams } from "@workspace/lp-core";
import { HERO_CONTENT } from "@/lib/constant_v2";
import { Button } from "@workspace/ui/components/button";

import { useRouter } from "next/navigation";

// const heroBackgroundStyle = {
//   backgroundColor: "lightgray",
//   backgroundImage: `linear-gradient(0deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.10) 100%), linear-gradient(180deg, rgba(255, 255, 255, 0.20) 31.48%, rgba(0, 0, 0, 0.20) 60.31%), url(${HERO_CONTENT.image.src})`,
//   backgroundPosition: "bottom ",
//   backgroundSize: "cover",
//   backgroundRepeat: "no-repeat",
//   filter: "blur(0.5px)",
// } as const;

export default function Hero() {
  useUtmParams(30);
  const router = useRouter();
  return (
    <div className="relative w-full h-full  md:min-h-[370px] lg:min-h-[410px] xl:min-h-[570px] overflow-hidden px-6 py-8 md:px-6 md:py-12 lg:px-14 lg:py-15 xl:px-20 xl:py-21" style={{  backgroundImage: `linear-gradient(0deg, rgba(255, 255, 255, 0.10) 0%, rgba(255, 255, 255, 0.10) 100%), linear-gradient(180deg, rgba(255, 255, 255, 0.20) 31.48%, rgba(0, 0, 0, 0.20) 60.31%), url(${HERO_CONTENT.image.src})`
    ,backgroundPosition: "bottom ",
  backgroundSize: "cover",
  backgroundRepeat: "no-repeat",
}}>
      {/* <div aria-hidden className="absolute inset-0" style={heroBackgroundStyle} /> */}

      <div className="relative z-10 container mx-auto">
        <div className="hero-content  flex flex-col items-center justify-center  gap-6 lg:gap-7 xl:gap-10 ">

          <div className=" w-full flex flex-col items-center  gap-2 md:gap-3">
            <h1 className="text-2xl md:text-3xl xl:text-5xl  md:max-w-[500px] lg:max-w-[550px] xl:max-w-[740px] font-extrabold  text-[#111827] text-center font-sans " style={{ lineHeight: "1.3" }}>
              {HERO_CONTENT.headline}
            </h1>
            <p className="text-[#475467] text-center font-sans text-[0.85rem] lg:text-sm xl:text-lg font-normal  md:max-w-[550px] xl:max-w-[730px]" style={{ lineHeight: "1.6" }}>
              {HERO_CONTENT.description}
            </p>


          </div>

          <div className="w-full flex items-center justify-center">
            <Button
              type="1"
              variant="default"
              onClick={() => router.push("/form")}
              className="flex h-12 xl:h-16 px-5  cursor-pointer items-center justify-center gap-2 rounded-[10px] font-semibold bg-[#E56A2E] text-[0.75rem] md:text-[0.8rem] xl:text-base font-inherit text-white shadow-[0_0_12px_0_rgba(0,0,0,0.20)] transition-all duration-300 hover:bg-[#E56A2E] disabled:cursor-not-allowed disabled:opacity-90 md:w-[210px] xl:w-[265px] "
            >
              <>Book a FREE Roof Inspection </>
            </Button>
       
          </div>
        </div>
      </div>
    </div>
  );
}
