"use client";

import { useUtmParams } from "@workspace/lp-core";
import { HERO_CONTENT } from "@/lib/constant";
import Ribbon from "@/app/_components/Ribbon";
import { Button } from "@workspace/ui/components/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Hero() {
  useUtmParams(30);

  const router = useRouter();
  const handleGetPricing = () => {
    router.push("/form");
  };

  return (
    <div className="bg-white w-full h-full">
      <div
        className="flex flex-col items-center justify-center gap-4 py-10 px-4"
        style={{
          background: `url(${HERO_CONTENT.image.src}) no-repeat center center`,
          backgroundSize: "cover",
        }}
      >
        <Ribbon />
        <div className="flex flex-col items-center justify-center gap-4 max-w-2xl py-6">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl md:max-w-[400px] lg:max-w-[550px] xl:max-w-[700px] font-bold text-white drop-shadow-lg text-center font-sans leading-tight tracking-tight">
            {HERO_CONTENT.headline}
          </h1>
          <Button
            type="1"
            variant="default"
            className="bg-[#2B96E4] cursor-pointer hover:bg-[#2B96E4] hover:translate-y-[-4px] transition-all duration-300 text-white font-semibold rounded-sm text-base lg:text-lg xl:text-xl py-10 px-12"
            onClick={handleGetPricing}
          >
            Get Pricing
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center gap-4 max-w-2xl py-4">
          <p className="text-white font-sans text-sm lg:text-base xl:text-lg text-center italic font-medium">
            Get matched with trusted local provider
          </p>
          <div className="flex items-center justify-center gap-8 lg:gap-10 xl:gap-12">
            {HERO_CONTENT.partners.map((partner) => (
              <Image
                key={partner.alt}
                src={partner.src}
                alt={partner.alt}
                width={partner.width}
                height={60}
                className={partner.className}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
