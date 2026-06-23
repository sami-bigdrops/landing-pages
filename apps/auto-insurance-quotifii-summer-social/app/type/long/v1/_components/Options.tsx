"use client";

import Image from "next/image";
import { OPTIONS_CONTENT } from "@/lib/constant";
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input";
import { Button } from "@workspace/ui/components/button";
import { useState, useEffect } from "react";
import {
  useUtmParams,
  setCookie,
  getCookie,
  QUOTIFII_EXTENDED_UTM_OPTIONS,
} from "@workspace/lp-core";
import { track } from "@vercel/analytics";

const ZIP_COOKIE_NAME = "zipCode";
const ZIP_COOKIE_DAYS = 30;
const BASE_URL = "https://auto-quote.quotifii.com";
const ANALYTICS_FLUSH_DELAY_MS = 300;

export default function Options() {
  useUtmParams(QUOTIFII_EXTENDED_UTM_OPTIONS);

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
    <div
      className="options w-full h-full bg-cover bg-center bg-no-repeat px-4 py-8 md:p-0"
      style={{
        backgroundImage: "url('/summer-bg.svg')",
      }}
    >
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="options-content w-full flex flex-col md:flex-row-reverse items-center justify-center md:justify-end gap-0">

          <div className="w-full md:w-[60%] lg:w-[59%] flex flex-col items-center justify-center md:justify-start md:items-start gap-6 md:gap-5 xl:gap-9 md:px-8 md:py-7 lg:px-14 lg:py-10 xl:px-23 xl:py-16 2xl:px-24 2xl:py-17">
            <div className="flex flex-col items-center justify-center md:justify-start md:items-start gap-3 md:gap-4  xl:gap-5">
              <h2 className="text-2xl md:text-2xl lg:text-2xl xl:text-3xl font-bold text-[#1A1A1A] md:max-w-[320px] lg:max-w-[400px] xl:max-w-full md:text-left text-center font-sans tracking-normal" style={{ lineHeight: 1.3 }}>
                {OPTIONS_CONTENT.header}
              </h2>
              <p className="text-sm lg:text-base xl:text-xl text-[#4B5563] md:text-left text-center font-sans tracking-normal" style={{ lineHeight: 1.5 }}>
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
                        placeholder:text-[#3A3A3A]
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
                  className="bg-[#F16601] h-14 w-full cursor-pointer text-white font-medium font-sans rounded-[10px] text-[0.9rem] px-8 py-4 flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_6px_0_rgba(0,53,153,0.20)] hover:bg-[#F16601] disabled:opacity-90 disabled:cursor-not-allowed"
                >
                  {isRedirecting ? "Redirecting..." : <>Request My Quotes </>}
                </Button>
              </form>

              {/* Desktop */}

              <form
                data-arohaa-zip-form
                onSubmit={handleSubmit}
                className="hidden relative w-full sm:flex w-full flex-row items-center justify-center md:justify-start gap-2 xl:gap-3.5"
              >
                <div className="relative w-full max-w-[290px] md:max-w-[220px] lg:max-w-full min-w-0 shrink">
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
                        h-14 md:h-14.5 xl:h-18 pl-10 xl:pl-11 pr-2 text-[0.9rem] lg:text-[1.05rem] xl:text-xl font-normal font-poppins
                        rounded-[10px]
                        border border-[#0035994D]
                        bg-white
                        w-full
                        shadow-[0_0_10px_0_rgba(0,53,153,0.15)]
                        placeholder:text-[#3A3A3A]
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
                  className="h-14 md:h-14.5 xl:h-18 w-[180px] md:w-[170px] lg:w-[178px] xl:w-[232px] shrink-0 rounded-[10px] cursor-pointer text-white font-medium font-poppins text-sm  xl:text-lg flex items-center justify-center gap-2 transition-all duration-300 shadow-[0_0_6px_0_rgba(0,53,153,0.20)] hover:bg-[#F16601] disabled:opacity-90 disabled:cursor-not-allowed bg-[#F16601]"
                >
                  {isRedirecting ? "Redirecting..." : <>Request My Quotes </>}
                </Button>
              </form>
              <div
              className="flex items-center justify-center md:justify-start gap-2 mt-6 md:mt-5 xl:mt-7 "
            >

              <Image src={OPTIONS_CONTENT.badge.image.src} alt={OPTIONS_CONTENT.badge.image.alt} width={20} height={20} className="w-4.5 h-4.5 xl:w-6 xl:h-6 " />
              <p className="text-[#4B5563] font-medium text-[0.85rem]  xl:text-[1.05rem]  tracking-medium  font-sans">
                {OPTIONS_CONTENT.badge.text}
              </p>
            </div>
            </div>

            
          </div>

          <div
            className="hidden md:block w-full md:w-[40%] lg:w-[41%] self-stretch bg-no-repeat bg-cover [background-position:right_40%_bottom] xl:[background-position:right_30%_top] "
            style={{
              backgroundImage: `url('${OPTIONS_CONTENT.image.src}')`,
            }}
            aria-hidden
          />
        </div>
      </div>
    </div>
  );
}
