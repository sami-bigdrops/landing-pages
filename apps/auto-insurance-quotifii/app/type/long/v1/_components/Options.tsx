"use client";

import Image from "next/image";
import { OPTIONS_CONTENT } from "@/lib/constant";
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input";
import { Button } from "@workspace/ui/components/button";
import { useState, useEffect } from "react";
import { setCookie, getCookie } from "@workspace/lp-core";
import { track } from "@vercel/analytics";
import { ArrowRight } from "lucide-react";
import { trackArohaa } from "@/lib/arohaa";

const ZIP_COOKIE_NAME = "zipCode";
const ZIP_COOKIE_DAYS = 30;
const REDIRECT_BASE_URL = "https://auto.assurerates.com";
const REFERRER = "quotes.assurerates.com";
const TID = "3286";

export default function Options() {
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

    const utmSource = getCookie("subid1") || "";
    const utmId = getCookie("subid2") || "";
    const utmS1 = getCookie("subid3") || "";

    const params = new URLSearchParams({
      zip_code: trimmed,
      referrer: REFERRER,
      tid: TID,
    });
    if (utmSource) params.set("subid", utmSource);
    if (utmId) params.set("subid2", utmId);
    if (utmS1) params.set("c1", utmS1);

    const redirectUrl = `${REDIRECT_BASE_URL}/form?${params.toString()}`;

    track("zip_submission", { state: cityName || undefined, zip_code: trimmed });
    trackArohaa("form_success");

    setIsRedirecting(true);
    window.location.href = redirectUrl;
  };

  const zipValid = /^\d{5}$/.test(zipCode.replace(/\D/g, "").slice(0, 5));

  return (
    <div
      className="options relative w-full h-full overflow-visible px-4 py-8 md:px-6 md:py-10 lg:px-14 lg:py-12 xl:px-20 xl:py-25"
      style={{
        background: "linear-gradient(0deg, #EBF4FF 36.53%, #FFF 100%)"
      }}
    >
      <div className="container mx-auto relative">
        <div className="options-content relative w-full flex flex-col md:flex-row items-center justify-center md:justify-end gap-6 md:gap-0">
          <div className="hidden md:block absolute left-0 md:-bottom-65 md:-left-10 lg:-bottom-74 lg:-left-1 xl:-bottom-100 xl:-left-2 z-0 w-[38%] h-auto md:w-[360px]  lg:w-[420px] xl:w-[500px] pointer-events-none">
            <Image
              src={OPTIONS_CONTENT.image.src}
              alt={OPTIONS_CONTENT.image.alt}
              width={500}
              height={500}
              className="w-full h-full object-contain object-left-bottom"
              style={{ objectPosition: "left bottom" }}
            />
          </div>
          <div className="w-full md:w-[58%] lg:w-[52%] xl:w-[59%]  md:pl-4 flex flex-col items-center justify-center md:justify-start md:items-start gap-6 md:gap-5 xl:gap-9 relative z-[1]">
            <div className="flex flex-col items-center justify-center md:justify-start md:items-start gap-3 md:gap-4  xl:gap-5">
              <h2 className="text-2xl md:text-2xl lg:text-2xl xl:text-3xl font-bold text-[#1A1A1A] md:max-w-[320px] lg:max-w-[400px] xl:max-w-full md:text-left text-center font-sans leading-tight tracking-tight">
                {OPTIONS_CONTENT.header}
              </h2>
              <p className="text-sm lg:text-base xl:text-xl text-[#4B5563] md:text-left text-center font-sans leading-tight tracking-tight">
                {OPTIONS_CONTENT.description}
              </p>
            </div>
            <div className="w-full space-y-4 sm:space-y-0 lg:max-w-[490px] xl:max-w-full">
                  {/* Mobile */}
                  <form
                    data-arohaa-zip-form
                    onSubmit={handleSubmit}
                    className="block sm:hidden space-y-4"
                  >
                    <div className="relative w-full">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                        <Image src="/location.svg" alt="location icon" width={20} height={20} className="w-5 h-5 xl:w-6 xl:h-6 " />
                      </div>
                      <ZipCodeInput
                        id="options-zipcode-mobile"
                        name="zip"
                        data-arohaa-zip
                        value={zipCode}
                        onChange={(value) => setZipCode(value)}
                        placeholder="90001"
                        inputClassName="
                        h-14 pl-10 pr-2 text-[0.9rem] font-normal font-sans
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
                      className="bg-[#F16601] h-14 w-full cursor-pointer text-white font-medium font-sans rounded-[10px] text-[0.9rem] px-8 py-4 flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:bg-[#F16601] disabled:opacity-90 disabled:cursor-not-allowed"
                    >
                      {isRedirecting ? "Redirecting..." : <>Continue <ArrowRight className="w-5.5 h-5.5" /></>}
                    </Button>
                  </form>

                  {/* Desktop */}
                  <form
                    data-arohaa-zip-form
                    onSubmit={handleSubmit}
                    className="hidden sm:block relative w-full xl:max-w-[640px]"
                  >
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                      <Image src="/location.svg" alt="location icon" width={20} height={20} className="w-5 h-5 xl:w-6 xl:h-6 " />
                    </div>
                    <ZipCodeInput
                      id="options-zipcode"
                      name="zip"
                      data-arohaa-zip
                      value={zipCode}
                      onChange={(value) => setZipCode(value)}
                      placeholder="90001"
                      inputClassName="
                        h-14 md:h-14.5 xl:h-18 pl-10 xl:pl-11 pr-[180px] md:pr-[200px]  text-[0.9rem] lg:text-[1.05rem] xl:text-xl font-normal font-sans
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
                    <Button
                      type="1"
                      variant="default"
                      htmlType="submit"
                      data-arohaa-zip-submit
                      disabled={isRedirecting || !zipValid}
                      className="absolute right-0 top-0 h-14 md:h-14.5 xl:h-18 w-[180px] md:w-[170px] lg:w-[180px] xl:w-[225px]  rounded-r-[10px] rounded-l-none cursor-pointer text-white font-medium font-sans text-sm lg:text-[0.9rem] xl:text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-md hover:bg-[#F16601] disabled:opacity-90 disabled:cursor-not-allowed bg-[#F16601]"
                    >
                      {isRedirecting ? "Redirecting..." : <>Continue <ArrowRight className="w-5.5 h-5.5 xl:w-8 xl:h-8" /></>}
                    </Button>
                  </form>
                </div>
          </div>
        </div>
      </div>
    </div>
  );
}
