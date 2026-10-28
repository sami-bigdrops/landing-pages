"use client";

import { useState, useEffect, type FormEvent } from "react";
import {
  useUtmParams,
  setCookie,
  getCookie,
  QUOTIFII_EXTENDED_UTM_OPTIONS,
} from "@workspace/lp-core";
import { track } from "@vercel/analytics";
import { ZipCodeInput } from "@workspace/ui/components/zip-code-input";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import { HERO_CONTENT } from "@/lib/constant";

const ZIP_COOKIE_NAME = "zipCode";
const ZIP_COOKIE_DAYS = 30;
const BASE_URL = "https://autoquotes.protectifii.com";
const ANALYTICS_FLUSH_DELAY_MS = 300;
const ZIP_PATTERN = /^\d{5}$/;

function normalizeZip(value: string) {
  return value.replace(/\D/g, "").slice(0, 5);
}

export default function Hero() {
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
        const zip = data?.zip != null ? normalizeZip(String(data.zip)) : null;
        if (city) setCityName(city);
        if (zip && zip.length === 5) {
          setZipCode((prev) => (prev === "" ? zip : prev));
        }
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = normalizeZip(zipCode);
    if (!ZIP_PATTERN.test(trimmed)) {
      alert("Please enter a valid 5-digit ZIP code");
      return;
    }

    setCookie(ZIP_COOKIE_NAME, trimmed, ZIP_COOKIE_DAYS);

    const urlParams = new URLSearchParams(window.location.search);
    const utmSource =
      getCookie("subid1") || urlParams.get("sid") || urlParams.get("utm_source") || "";
    const utmId =
      getCookie("subid2") ||
      urlParams.get("pcid") ||
      urlParams.get("tid") ||
      urlParams.get("uid") ||
      urlParams.get("utm_id") ||
      "";
    const utmS1 =
      getCookie("subid3") || urlParams.get("sub1") || urlParams.get("utm_s1") || "";

    const params = new URLSearchParams();
    params.set("pcid", utmId);
    params.set("source", utmSource);
    params.set("sub1", utmS1);
    params.set("zip", trimmed);

    const redirectUrl = `${BASE_URL}/?${params.toString()}`;

    track("zip_submission", { state: cityName || undefined, zip_code: trimmed });

    setIsRedirecting(true);
    window.setTimeout(() => {
      window.location.href = redirectUrl;
    }, ANALYTICS_FLUSH_DELAY_MS);
  };

  const zipValid = ZIP_PATTERN.test(normalizeZip(zipCode));

  return (
    <div
      className="relative w-full overflow-x-hidden bg-[#F8D247] md:min-h-[370px] lg:min-h-[400px] xl:min-h-[500px] 2xl:min-h-[520px]"
    >
      <div className="relative z-10 h-full w-full px-6 py-8 md:px-8 md:pb-0 md:pt-10 lg:px-14 lg:pt-14 xl:px-23 xl:pt-18 2xl:pt-20">
        <div className="container mx-auto max-w-[1280px]">
          <div className="hero-content relative flex w-full min-w-0 flex-col items-center justify-center gap-4 md:flex-row md:items-center md:justify-between">
            <div className="left lg:pb-18 flex h-full w-full flex-col items-center justify-center gap-6 md:w-[55%] md:items-start md:justify-center md:gap-5 lg:gap-6 xl:gap-8">
              <div className="w-full flex flex-col items-center justify-center md:items-start  gap-2.5 xl:gap-3">
                <h1
                  className="text-2xl md:text-[1.6rem]  lg:text-3xl xl:text-4xl  md:max-w-[330px] lg:max-w-[450px] xl:max-w-[500px] font-extrabold text-[#191443] text-center md:text-left font-sans"
                  style={{
                    lineHeight: "1.3",
                  }}
                >
                  {HERO_CONTENT.headline}
                </h1>
                <p className="text-[#4B4B57] text-center md:text-left font-normal font-sans text-[0.85rem]  xl:text-base md:max-w-[350px] lg:max-w-[430px] xl:max-w-[560px] " style={{ lineHeight: "1.6" }}>
                  {HERO_CONTENT.description}
                </p>
              </div>

              <div className="flex w-full  flex-col items-center gap-6 md:max-w-[500px] md:items-start lg:max-w-[500px] xl:max-w-[600px] xl:gap-6">
                <div className="flex w-full md:max-w-[380px] lg:max-w-[470px] xl:max-w-full flex-col items-center justify-center bg-white/80 rounded-[10px] p-4.5 md:p-3.5 lg:p-4 xl:p-5.5">
                  <div className="w-full">
                    {/* Mobile */}
                    <form
                      data-arohaa-zip-form
                      onSubmit={handleSubmit}
                      className="block space-y-3 sm:hidden"
                    >
                      <div className="relative w-full">
                        <div className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 transform">
                          <Image src="/location.svg" alt="location icon" width={20} height={20} className="h-5 w-5 xl:h-6 xl:w-6" />
                        </div>
                        <ZipCodeInput
                          id="hero-zipcode-mobile"
                          name="zip"
                          data-arohaa-zip
                          value={zipCode}
                          onChange={(value) => setZipCode(value)}
                          placeholder="90001"
                          inputClassName="
                          h-14 pl-10 pr-2 text-[0.9rem] font-normal font-sans
                          rounded-[10px]
                          border border-[#D5D2E5]
                          bg-white
                          w-full
                          shadow-[0_0_2px_0_rgba(25,20,67,0.15)]
                          placeholder:text-[#191443]
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
                        className="flex h-14 w-full cursor-pointer items-center justify-center tracking-normal gap-3 rounded-[10px] bg-[#191443] px-8 py-4 font-sans text-[0.9rem] font-medium text-white shadow-[0_0_6px_0_rgba(0,53,153,0.20)] transition-all duration-300 hover:bg-[#191443] disabled:cursor-not-allowed disabled:opacity-90"
                      >
                        {isRedirecting ? "Redirecting..." : <>Get My Free Quotes <Image src="/arrow.svg" alt="" width={22} height={22} className="h-4.5 w-4.5 shrink-0" /></>}
                      </Button>
                    </form>

                    {/* Desktop */}
                    <form
                      data-arohaa-zip-form
                      onSubmit={handleSubmit}
                      className="hidden w-full items-stretch sm:flex md:gap-2.5 xl:gap-3.5"
                    >
                      <div className="relative min-w-0 flex-1">
                        <div className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 transform">
                          <Image src="/location.svg" alt="location icon" width={20} height={20} className="h-5 w-5 xl:h-5.5 xl:w-5.5" />
                        </div>
                        <ZipCodeInput
                          id="hero-zipcode"
                          name="zip"
                          data-arohaa-zip
                          value={zipCode}
                          onChange={(value) => setZipCode(value)}
                          placeholder="90001"
                          inputClassName="
                            h-14 md:h-14.5 xl:h-18 pl-10 xl:pl-11 pr-3 text-[0.9rem] lg:text-[1.05rem] xl:text-xl font-normal font-sans
                            rounded-[10px]
                            border border-[#D5D2E5]
                            bg-white
                            w-full
                            shadow-[0_0_2px_0_rgba(25,20,67,0.15)]
                            placeholder:text-[#191443]
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
                        className="flex h-14 w-[180px] shrink-0 cursor-pointer items-center justify-center gap-3  rounded-[10px] bg-[#191443] font-sans text-sm font-medium text-white shadow-[0_0_6px_0_rgba(0,53,153,0.20)] transition-all duration-300 hover:bg-[#191443] disabled:cursor-not-allowed disabled:opacity-90 md:h-14.5 md:w-[200px] lg:w-[215px] lg:text-[0.9rem] xl:h-18 xl:w-[255px] xl:text-lg"
                      >
                        {isRedirecting ? "Redirecting..." : <>Get My Free Quotes <Image src="/arrow.svg" alt="" width={22} height={22} className="h-4.5 w-4.5 shrink-0 xl:h-5.5 xl:w-5.5" /></>}
                      </Button>
                    </form>
                  </div>
                </div>

                {/* Mobile badges */}
                <div className="flex w-full flex-col items-center gap-3.5 md:hidden">
                  <Image
                    src={HERO_CONTENT.badge[0].icon}
                    alt="Trustpilot"
                    width={208}
                    height={24}
                    className="h-5 w-auto object-contain"
                  />
                  <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
                    {[HERO_CONTENT.badge[1], HERO_CONTENT.badge[2]].map((badge, index) => (
                      <div key={badge.text} className="flex items-center gap-2.5">
                        {index > 0 ? (
                          <span className="h-1 w-1 shrink-0 rounded-full bg-[#191443]" aria-hidden />
                        ) : null}
                        <div className="flex items-center gap-1.5">
                          <Image
                            src={badge.icon}
                            alt=""
                            width={20}
                            height={20}
                            className="size-4.5 shrink-0 object-contain"
                          />
                          <span className="font-sans text-[0.82rem] font-semibold text-[#191443]">
                            {badge.text}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* md Onwards badges */}
                <div className="hidden w-full items-center justify-start gap-x-2.5 whitespace-nowrap md:flex lg:gap-x-3 xl:gap-x-4">
                  {HERO_CONTENT.badge.map((badge, index) => (
                    <div
                      key={"text" in badge ? badge.text : badge.icon}
                      className="flex shrink-0 items-center gap-2.5 xl:gap-3"
                    >
                      {index > 0 ? (
                        <span className="size-1 xl:size-1.5 shrink-0 rounded-full bg-[#191443]" aria-hidden />
                      ) : null}
                      {"text" in badge && badge.text ? (
                        <div className="flex items-center gap-1.5 xl:gap-2">
                          <Image
                            src={badge.icon}
                            alt=""
                            width={20}
                            height={20}
                            className="size-4.5 xl:size-5.5 shrink-0 object-contain xl:size-5"
                          />
                          <span className="font-sans text-[0.79rem] font-semibold text-[#191443]  xl:text-[0.95rem]">
                            {badge.text}
                          </span>
                        </div>
                      ) : (
                        <Image
                          src={badge.icon}
                          alt="Trustpilot"
                          width={208}
                          height={24}
                          className="h-4.5 w-auto shrink-0 object-contain xl:h-6"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 right-0 z-[1] hidden h-full items-end justify-end md:flex md:w-[43%] md:-right-12 lg:w-[50%] lg:right-8 xl:w-[48%] xl:right-22 2xl:right-72 ">
        <Image
          src={HERO_CONTENT.image.src}
          alt={HERO_CONTENT.image.alt}
          width={860}
          height={1080}
          priority
          className="h-full max-h-[400px] w-auto max-w-none object-contain object-bottom lg:max-h-[480px] xl:max-h-[560px] "
        />
      </div>
    </div>
  );
}
