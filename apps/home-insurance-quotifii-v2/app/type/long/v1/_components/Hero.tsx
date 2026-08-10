"use client";

import { useState, useEffect } from "react";
import { useUtmParams, setCookie, getCookie } from "@workspace/lp-core";
import { track } from "@vercel/analytics";
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import { HERO_CONTENT } from "@/lib/constant";


const ZIP_COOKIE_NAME = "zipCode";
const ZIP_COOKIE_DAYS = 30;
const BASE_URL = "https://home.quotifii.com";
const ANALYTICS_FLUSH_DELAY_MS = 300;

export default function Hero() {
  useUtmParams(30);

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

  const headlineText = cityName
    ? `Protect Your Home & Save On Insurance In   ${cityName} `
    : "Protect Your Home & Save On Insurance In Your Area";

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = zipCode.replace(/\D/g, "").slice(0, 5);
    if (!/^\d{5}$/.test(trimmed)) {
      alert("Please enter a valid 5-digit ZIP code");
      return;
    }

    setCookie(ZIP_COOKIE_NAME, trimmed, ZIP_COOKIE_DAYS);

    const urlParams = new URLSearchParams(window.location.search);
    const utmSource =
      getCookie("subid1") || urlParams.get("sid") || urlParams.get("utm_source") || "";
    const utmId =
      getCookie("subid2") ||
      urlParams.get("tid") ||
      urlParams.get("uid") ||
      urlParams.get("utm_id") ||
      "";
    const utmS1 =
      getCookie("subid3") || urlParams.get("sub1") || urlParams.get("utm_s1") || "";

    const params = new URLSearchParams();
    params.set("tid", utmId);
    params.set("uid", utmId);
    params.set("sid", utmSource);
    params.set("sub1", utmS1);
    params.set("zip", trimmed);

    const redirectUrl = `${BASE_URL}/?${params.toString()}`;

    track("zip_submission", { state: cityName || undefined, zip_code: trimmed });

    setIsRedirecting(true);
    window.setTimeout(() => {
      window.location.href = redirectUrl;
    }, ANALYTICS_FLUSH_DELAY_MS);
  };

  const zipValid = /^\d{5}$/.test(zipCode.replace(/\D/g, "").slice(0, 5));

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden rounded-[10px] md:rounded-none md:min-h-[292px] lg:min-h-[400px] xl:min-h-[550px] 2xl:min-h-[620px] ">
      <div
        className="absolute inset-0 w-full h-full rounded-[10px] bg-[#EBF4FF] md:rounded-none md:bg-[url('/hero-bg.webp')] md:bg-cover md:bg-no-repeat md:bg-[position:center] lg:bg-[position:right_center] 2xl:bg-[position:bottom_center]"
      />
      
      <div className="relative z-10 w-full h-full px-6 sm:px-6 lg:px-14 py-10 md:py-12 md:px-8 lg:py-15 xl:px-23 xl:py-22 ">
        <div className="container mx-auto max-w-[1400px]">
          <div className="hero-content w-full flex flex-col items-center justify-center md:justify-start md:items-start gap-3 md:gap-6 lg:gap-6.5 xl:gap-10 ">

            <div className="flex-1 w-full flex flex-col md:flex-row  md:max-w-[450px] lg:max-w-[500px] xl:max-w-[690px] 2xl:max-w-[750px] rounded-none justify-center items-center md:justify-center lg:items-center">
              <div className="w-full flex flex-col items-center md:items-start gap-6 md:gap-5 lg:gap-6 xl:gap-10  ">

                <div className="w-full">
                  <h1
                    className={`
                      text-[1.45rem] md:text-3xl  xl:text-5xl
                      max-w-full font-bold text-[#1A1A1A] md:text-white text-center md:text-left lg:text-left xl:text-left 2xl:text-left
                      font-poppins md:max-w-[340px] lg:max-w-[380px] xl:max-w-[600px]
                      md:[text-shadow:0_4px_4px_rgba(0,0,0,0.15)] tracking-relaxed
                    `}
                    style={{
                      lineHeight: "1.4",
                    }}
                  >
             
                    {headlineText}
                  </h1>
                </div>


                <div className="w-full space-y-4 sm:space-y-0 lg:max-w-[490px] xl:max-w-full">
                  {/* Mobile */}
                  <form
                    data-arohaa-zip-form
                    onSubmit={handleSubmit}
                    className="block sm:hidden space-y-3"
                  >
                    <div className="relative w-full">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                        <Image src="/location.svg" alt="location icon" width={20} height={20} className="w-5 h-5 xl:w-6 xl:h-6 " />
                      </div>
                      <ZipCodeInput
                        id="hero-zipcode-mobile"
                        name="zip"
                        data-arohaa-zip
                        value={zipCode}
                        onChange={(value) => setZipCode(value)}
                        placeholder="90001"
                        inputClassName="
                        h-14 pl-10 pr-2 text-[0.9rem] font-normal font-poppins
                        rounded-[10px]
                        border border-[#0035994D]
                        bg-white
                        w-full
                        shadow-[0_0_10px_0_rgba(0,53,153,0.15)]
                        placeholder:text-[#444444]
                        focus-visible:ring-0 focus-visible:ring-offset-0
                      "
                        containerClassName="w-full"
                      />
                    </div>
                    <Button
                      type="1"
                      variant="default"
                      htmlType="submit"
                      data-arohaa-zip-submit
                      disabled={isRedirecting || !zipValid}
                      className="bg-[#F16601] h-14 w-full cursor-pointer text-white font-medium font-poppins rounded-[10px] text-[0.9rem] px-8 py-4 flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:bg-[#F16601] disabled:opacity-90 disabled:cursor-not-allowed"
                    >
                      {isRedirecting ? "Redirecting..." : <>Request My Quotes </>}
                    </Button>
                  </form>

                  {/* Desktop */}

                  <form
                    data-arohaa-zip-form
                    onSubmit={handleSubmit}
                    className="hidden relative w-full sm:flex w-full flex-row items-center justify-center md:justify-start gap-2.5 xl:gap-3.5"
                  >
                    <div className="relative w-full max-w-[290px] md:max-w-[170px] lg:max-w-[200px] xl:max-w-[300px] min-w-0 shrink">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                        <Image src="/location.svg" alt="location icon" width={20} height={20} className="w-5 h-5 xl:w-6 xl:h-6 " />
                      </div>
                      <ZipCodeInput
                        id="hero-zipcode"
                        name="zip"
                        data-arohaa-zip
                        value={zipCode}
                        onChange={(value) => setZipCode(value)}
                        placeholder="90001"
                        inputClassName="
                        h-14 md:h-14.5 xl:h-18 pl-10 xl:pl-11 pr-2 text-[0.9rem] lg:text-[1.05rem] xl:text-xl font-normal font-poppins
                        rounded-[10px]
                        border border-[#0035994D]
                        bg-white
                        w-full
                        shadow-[0_0_10px_0_rgba(0,53,153,0.15)]
                        placeholder:text-[#444444]
                        focus-visible:ring-0 focus-visible:ring-offset-0
                      "
                        containerClassName="w-full"
                      />
                    </div>
                    <Button
                      type="1"
                      variant="default"
                      htmlType="submit"
                      data-arohaa-zip-submit
                      disabled={isRedirecting || !zipValid}
                      className="h-14 md:h-14.5 xl:h-18 w-[180px] md:w-[190px] lg:w-[190px] xl:w-[232px] shrink-0 rounded-[10px] cursor-pointer text-white font-medium font-poppins text-sm  xl:text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:bg-[#F16601] disabled:opacity-90 disabled:cursor-not-allowed bg-[#F16601]"
                    >
                      {isRedirecting ? "Redirecting..." : <>Request My Quotes </>}
                    </Button>
                  </form>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-center gap-3 lg:gap-4 ">
              {HERO_CONTENT.features.map((feature, index) => (
                <div key={index} className="flex items-center justify-center gap-2">
                  <Image
                    src={feature.image}
                    alt={feature.alt}
                    width={20}
                    height={20}
                    className="w-4 h-4 xl:w-5.5 xl:h-5.5"
                  />
                  <p className="text-[0.82rem]   xl:text-lg font-normal text-[#4B5563] md:text-white text-center font-poppins">
                    {feature.text}
                  </p>
                  
                </div>
              ))}
            </div>

            <div className="mt-5 w-full h-full flex items-center justify-center md:hidden">
              <Image src="/mobile.webp" alt="hero image" width={500} height={500} className="w-full h-full object-cover" />
            </div>



          </div>
        </div>
      </div>
    </div>
  );
}
