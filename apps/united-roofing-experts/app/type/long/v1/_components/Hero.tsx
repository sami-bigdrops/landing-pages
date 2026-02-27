"use client";

import { useUtmParams } from "@workspace/lp-core";
import { HERO_CONTENT } from "@/lib/constant";
import Ribbon from "@/app/_components/Ribbon";
import { Button } from "@workspace/ui/components/button";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FormPage from "./Form";

export default function Hero() {
  useUtmParams(30);

  const router = useRouter();
  const handleGetPricing = () => {
    router.push("/form");
  };

  return (
    <div className=" w-full h-full px-4 py-8 md:px-6 md:py-8 lg:px-14 lg:py-10 xl:px-20 xl:py-14" style={{
      background: ` url(${HERO_CONTENT.image.src}) no-repeat center center`,
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}>
      <div className="container  mx-auto">
      <div className="hero-content  flex flex-col items-center justify-center md:flex-row  md:justify-between gap-6 ">
        
        <div className="left-content md:w-[50%] w-full flex flex-col items-center md:justify-start md:items-start justify-center gap-4 ">
          <h1 className="text-3xl lg:text-4xl xl:text-5xl md:max-w-[300px] lg:max-w-[350px] xl:max-w-[600px] font-bold md:text-left text-white text-center font-sans leading-tight tracking-tight">
            {HERO_CONTENT.headline}
          </h1>
          <p className="text-white text-center font-sans text-base lg:text-lg xl:text-xl font-normal md:text-left md:max-w-[300px] lg:max-w-[350px] xl:max-w-[400px] leading-normal tracking-tight">
            {HERO_CONTENT.description}
          </p>

          <div className="w-full flex items-center md:justify-start justify-center my-3 md:my-5 xl:my-7 gap-6 xl:gap-8 ">
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
        <div className="right-content md:w-[50%] w-full flex flex-col items-center justify-center md:justify-end gap-4 ">
          <FormPage />
        </div>
        </div>
      </div>
    </div>
  );
}
