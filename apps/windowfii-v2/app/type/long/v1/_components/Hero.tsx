"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  useUtmParams,
  setCookie,
  QUOTIFII_EXTENDED_UTM_OPTIONS,
} from "@workspace/lp-core";
import { track } from "@vercel/analytics";
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { HERO_CONTENT } from "@/lib/constant"
import Form from "@/app/type/long/v1/_components/Form"
import Navbar from "@/app/_components/Navbar"



const ZIP_COOKIE_NAME = "zipCode";
const ZIP_COOKIE_DAYS = 30;
const ANALYTICS_FLUSH_DELAY_MS = 300;

export default function Hero() {
  useUtmParams(QUOTIFII_EXTENDED_UTM_OPTIONS);
  const router = useRouter();

  const [zipCode, setZipCode] = useState("");
  const [cityName, setCityName] = useState("");
  const [isRedirecting, setIsRedirecting] = useState(false);


  useEffect(() => {
    let cancelled = false;
    fetch("/api/location")
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        const city = data?.city != null ? String(data.city).trim() : null;
        const zip = data?.zip != null ? String(data.zip).replace(/\D/g, "").slice(0, 5) : null;
        if (city) setCityName(city);
        if (zip && zip.length === 5) {
          setZipCode((prev) => (prev === "" ? zip : prev));
        }
      })
      .catch(() => { });
    return () => { cancelled = true };
  }, []);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = zipCode.replace(/\D/g, "").slice(0, 5);
    if (!/^\d{5}$/.test(trimmed)) {
      alert("Please enter a valid 5-digit ZIP code");
      return;
    }

    setCookie(ZIP_COOKIE_NAME, trimmed, ZIP_COOKIE_DAYS);
    track("zip_submission", { state: cityName || undefined, zip_code: trimmed });
    setIsRedirecting(true);
    window.setTimeout(() => {
      router.push("/form");
    }, ANALYTICS_FLUSH_DELAY_MS);
  };

  const zipValid = /^\d{5}$/.test(zipCode.replace(/\D/g, "").slice(0, 5));


  function QuoteArrowIcon() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        className="size-4 shrink-0  xl:size-5"
        aria-hidden
      >
        <path
          d="M8 4.16669L15.5 11.8062L8 19.4442"
          stroke="#102A43"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    );
  }






  return (
    <div
      className="relative w-full h-full md:min-h-[292px] lg:min-h-[320px] xl:min-h-[510px] 2xl:min-h-[580px]"
      style={{
        backgroundImage: `url('${HERO_CONTENT.image.src}')`,
        backgroundPosition: "85% top",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >


      <div className="relative z-10 bg-white w-full h-full md:max-w-[650px]  xl:max-w-[720px] mx-auto ">
        <div className="container ">
         
          <div className="hero-content w-full flex flex-col items-center justify-center  gap-2  ">
          <div className="hidden md:block">
            <Navbar />
          </div>

          <div className="w-full flex flex-col items-center justify-center  gap-6 md:gap-5 xl:gap-6  pb-4 md:pt-0 xl:pb-6 ">
          <div className=" w-full flex flex-col items-center  gap-2  border-none">
              <Image
                src="/hero-img.webp"
                alt="Hero image"
                width={1000}
                height={1000}
                className="w-full h-full object-cover rounded-none   md:h-[310px]  xl:h-[350px]"
                priority
              />

              <p className="text-[#000000] text-center font-bold font-sans uppercase text-[0.93rem] lg:text-[1rem] xl:text-[1.1rem] font-bold  px-6 tracking-wide" style={{ lineHeight: "1.5" }}>
                {HERO_CONTENT.description}
              </p>

         
            </div>

            <div className="w-full flex flex-col items-center justify-center border-none px-6  py-5 ">
              <Form initialZip={zipCode} />
            </div>

            <div className="w-full flex flex-col items-center justify-center px-6  ">
              <p className="text-[#808080] text-center font-normal font-sans text-xs  text-justify md:text-left xl:text-sm font-normal  " style={{ lineHeight: "1.5" }}>
                {HERO_CONTENT.disclaimer}
              </p>
            </div>


          </div>












          </div>







        </div>
      </div>
    </div>
  )

}