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
    <div className="bg-white w-full h-full px-4 py-8 md:px-6 md:py-8 lg:px-14 lg:py-10 xl:px-20 xl:py-14" style={{
      background: `url(${HERO_CONTENT.image.src}) no-repeat center center`,
      backgroundSize: "cover",
    }}>
      <div className="container mx-auto">
      <div className="hero-content flex flex-col items-center justify-center gap-4 ">
        
        <div className="left-content flex flex-col items-center justify-center gap-4 ">
          <h1 className="text-4xl lg:text-5xl xl:text-6xl md:max-w-[400px] lg:max-w-[550px] xl:max-w-[700px] font-bold text-white drop-shadow-lg text-center font-sans leading-tight tracking-tight">
            {HERO_CONTENT.headline}
          </h1>
          <p className="text-white font-sans text-sm lg:text-base xl:text-lg text-center font-medium">
            {HERO_CONTENT.description}
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
        <div className="right-content flex flex-col items-center justify-center gap-4 ">
          
        </div>
        </div>
      </div>
    </div>
  );
}
