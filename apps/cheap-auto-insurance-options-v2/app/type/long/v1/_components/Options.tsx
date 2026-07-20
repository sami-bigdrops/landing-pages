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
const BASE_URL = "https://quote.cheapautoinsuranceoptions.com";
const ANALYTICS_FLUSH_DELAY_MS = 300;

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

const renderBadge = (badge: (typeof OPTIONS_CONTENT.badges)[number]) => (
  <div key={badge.text} className="flex items-center gap-1 xl:gap-1.5 ">
    <Image
      src={badge.icon}
      alt="badge icon"
      width={18}
      height={18}
      className="size-[16px] xl:size-5 shrink-0 object-contain"
    />
    <span className=" text-[0.8rem] md:text-[0.77rem] lg:text-[0.75rem] xl:text-[0.98rem] font-normal leading-tight text-white ">
      {badge.text}
    </span>
  </div>
)

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
      <div className="options bg-[#0752A0] w-full h-full px-6 py-8 md:px-8 md:py-10 lg:px-14  xl:px-23 xl:py-15">
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="options-content w-full flex flex-col md:flex-row items-center justify-center md:justify-start md:items-center lg:items-start gap-6 md:gap-6 lg:gap-10 xl:gap-14">
            <div className="flex flex-col items-center justify-center  md:items-start md:justify-start gap-2.5 xl:gap-4  md:w-[50%] lg:w-[48%] xl:w-[50%]">
              <h2 className="text-[1.4rem] text-center  md:text-2xl xl:text-4xl md:max-w-[500px] lg:max-w-[380px] xl:max-w-[450px] font-bold text-white md:text-left text-center font-sans " style={{ lineHeight: 1.3 }}>
                {OPTIONS_CONTENT.header}
              </h2>
              <p className="text-sm lg:text-sm xl:text-[1.05rem] text-white md:max-w-[320px] lg:max-w-[380px] xl:max-w-[490px] md:text-left text-center font-sans" style={{ lineHeight: 1.6 }}>{OPTIONS_CONTENT.description}</p>
            </div>

            <div className="flex-1 w-full flex flex-col   justify-center items-center xl:gap-2 md:w-[50%] lg:w-[52%] xl:w-[50%]">
              <div className="w-full flex flex-col items-center justify-center gap-4 md:gap-4 lg:gap-5 xl:gap-6  ">

                <div className="w-full space-y-4 sm:space-y-0  xl:max-w-full">
                  {/* Mobile */}
                  <form
                    data-arohaa-zip-form
                    onSubmit={handleSubmit}
                    className="block sm:hidden space-y-2"
                  >
                    <div className="relative w-full">
                      <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                        <Image src="/location.svg" alt="location icon" width={20} height={20} className="w-4.5 h-4.5 xl:w-6 xl:h-6 " />
                      </div>
                      <ZipCodeInput
                        id="options-zipcode-mobile"
                        name="zip"
                        data-arohaa-zip
                        value={zipCode}
                        onChange={(value) => setZipCode(value)}
                        placeholder="90001"
                        inputClassName="
                          h-14 pl-9.5 pr-2 text-[0.9rem] font-normal font-poppins
                          rounded-[6px]
                          border border-[#0752A0]
                          bg-white
                          w-full
                          shadow-[0_0_10px_0_rgba(31,58,95,0.10)]
                          placeholder:text-[#102A43]
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
                      className="flex h-14 w-full cursor-pointer items-center justify-center gap-1.5 rounded-[6px] bg-[#F59E0B] px-8 py-4 font-poppins text-[0.9rem] font-semibold uppercase  text-[#102A43] shadow-[0_0_10px_0_rgba(31,58,95,0.10)] transition-all duration-300 hover:bg-[#F59E0B] disabled:cursor-not-allowed disabled:opacity-90"
                    >
                      {isRedirecting ? (
                        "Redirecting..."
                      ) : (
                        <>
                          Get My Free Quote
                          <QuoteArrowIcon />
                        </>
                      )}
                    </Button>
                  </form>




                </div>




                {/* Desktop */}

                <form
                  data-arohaa-zip-form
                  onSubmit={handleSubmit}
                  className="hidden relative w-full sm:flex w-full flex-row items-start justify-start  gap-1.5 xl:gap-3"
                >
                  <div className="relative w-full max-w-full min-w-0 shrink ">
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none">
                      <Image src="/location.svg" alt="location icon" width={20} height={20} className="w-4.5 h-4.5 xl:w-5.5 xl:h-5.5 " />
                    </div>
                    <ZipCodeInput
                      id="options-zipcode"
                      name="zip"
                      data-arohaa-zip
                      value={zipCode}
                      onChange={(value) => setZipCode(value)}
                      placeholder="90001"
                      inputClassName="
                          h-14 md:h-13.5 xl:h-17.5 pl-9.5 xl:pl-10.5 pr-2 text-[0.9rem] lg:text-[0.95rem] xl:text-xl font-normal font-poppins
                          rounded-[6px]
                          border border-[#0752A0]
                          bg-white
                          w-full
                          shadow-[0_0_10px_0_rgba(31,58,95,0.10)]
                          placeholder:text-[#102A43]
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
                    className="flex h-14 w-[190px] shrink-0 cursor-pointer items-center justify-center gap-1.5 rounded-[6px] bg-[#F59E0B] px-4 font-poppins text-[0.85rem] font-bold uppercase text-[#102A43] shadow-[0_0_10px_0_rgba(31,58,95,0.10)] transition-all duration-300 hover:bg-[#F59E0B] disabled:cursor-not-allowed disabled:opacity-90 md:h-13.5 lg:w-[200px] xl:h-17.5 xl:w-[260px] xl:text-lg"
                  >
                    {isRedirecting ? (
                      "Redirecting..."
                    ) : (
                      <>
                        Get My Free Quote
                        <QuoteArrowIcon />
                      </>
                    )}
                  </Button>
                </form>


              </div>
              <div className="mt-4 flex w-full flex-col items-center gap-3 lg:flex-row md:flex-nowrap  md:gap-y-3 xl:gap-4.5 2xl:gap-6 ">
                <div className="flex items-start justify-start gap-x-3.5 xl:gap-x-5 2xl:gap-x-6 ">
                  {OPTIONS_CONTENT.badges.slice(0, 2).map(renderBadge)}
                </div>
                <div className="flex items-start justify-start ">
                  {renderBadge(OPTIONS_CONTENT.badges[2])}
                </div>
              </div>
            </div>
          </div>



        </div>
      </div>
    );
}