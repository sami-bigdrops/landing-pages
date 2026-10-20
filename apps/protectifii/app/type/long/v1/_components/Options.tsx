"use client";

import Image from "next/image";
import { OPTIONS_CONTENT, HERO_CONTENT } from "@/lib/constant";
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
    <div className="options bg-[#FFFFFF] w-full h-full px-6 py-8 md:px-8 md:py-10 lg:px-14 lg:py-12 xl:px-23 xl:py-16">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="options-content w-full flex flex-col md:flex-row items-center justify-center md:justify-start md:items-center lg:items-start gap-6 md:gap-6 lg:gap-10 xl:gap-14">
          <div className="flex flex-col items-center justify-center  md:items-start md:justify-start gap-2.5 xl:gap-4  md:w-[48%]  xl:w-[50%]">
            <h2 className="w-full text-2xl md:text-2xl xl:text-3xl   font-extrabold text-[#191443] text-center md:text-left  font-sans xl:max-w-[500px] tracking-normal" style={{ lineHeight: 1.3 }}>
              {OPTIONS_CONTENT.header}
            </h2>
            <p className="text-[#4B4B57] text-center font-normal font-sans text-[0.85rem] md:text-left xl:text-base md:max-w-[350px] lg:max-w-[430px] xl:max-w-[500px] " style={{ lineHeight: "1.6" }}>{OPTIONS_CONTENT.description}</p>
          </div>

          <div className="flex w-full md:w-[52%]  xl:w-[50%]  flex-col items-center gap-6 md:max-w-[500px] md:items-start lg:max-w-[500px] xl:max-w-[600px] xl:gap-6">
            <div className="flex w-full md:max-w-[380px] lg:max-w-[470px] xl:max-w-full flex-col items-center justify-center bg-[#F5F5F8] rounded-[10px] p-4.5 md:p-3.5 lg:p-4 xl:p-5.5">

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
                    {isRedirecting ? "Redirecting..." : <>Compare My Quotes <Image src="/arrow.svg" alt="" width={22} height={22} className="h-4.5 w-4.5 shrink-0" /></>}
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
                    {isRedirecting ? "Redirecting..." : <>Compare My Quotes <Image src="/arrow.svg" alt="" width={22} height={22} className="h-4.5 w-4.5 shrink-0 xl:h-5.5 xl:w-5.5" /></>}
                  </Button>
                </form>
              </div>
            </div>

            {/* Mobile: Trustpilot, then Free to compare • No obligation */}
            <div className="flex w-full flex-col items-center gap-3.5 md:hidden">
              <Image
                src={HERO_CONTENT.badge[0].icon}
                alt="Trustpilot"
                width={208}
                height={24}
                className="h-5 w-auto object-contain"
              />
              <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
                <div className="flex items-center gap-1.5">
                  <Image
                    src={HERO_CONTENT.badge[1].icon}
                    alt=""
                    width={20}
                    height={20}
                    className="size-4.5 shrink-0 object-contain"
                  />
                  <span className="font-sans text-[0.82rem] font-semibold text-[#191443]">
                    {HERO_CONTENT.badge[1].text}
                  </span>
                </div>
                <span className="size-1 shrink-0 rounded-full bg-[#191443]" aria-hidden />
                <div className="flex items-center gap-1.5">
                  <Image
                    src={HERO_CONTENT.badge[2].icon}
                    alt=""
                    width={20}
                    height={20}
                    className="size-4.5 shrink-0 object-contain"
                  />
                  <span className="font-sans text-[0.82rem] font-semibold text-[#191443]">
                    {HERO_CONTENT.badge[2].text}
                  </span>
                </div>
              </div>
            </div>

            {/* md: Trustpilot • Free to compare, then No obligation */}
            <div className="hidden w-full flex-col items-center gap-3.5 md:flex lg:hidden">
              <div className="flex flex-wrap items-center justify-center gap-x-2.5 gap-y-1">
                <Image
                  src={HERO_CONTENT.badge[0].icon}
                  alt="Trustpilot"
                  width={208}
                  height={24}
                  className="h-5 w-auto object-contain"
                />
                <span className="size-1 shrink-0 rounded-full bg-[#191443]" aria-hidden />
                <div className="flex items-center gap-1.5">
                  <Image
                    src={HERO_CONTENT.badge[1].icon}
                    alt=""
                    width={20}
                    height={20}
                    className="size-4.5 shrink-0 object-contain"
                  />
                  <span className="font-sans text-[0.82rem] font-semibold text-[#191443]">
                    {HERO_CONTENT.badge[1].text}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <Image
                  src={HERO_CONTENT.badge[2].icon}
                  alt=""
                  width={20}
                  height={20}
                  className="size-4.5 shrink-0 object-contain"
                />
                <span className="font-sans text-[0.82rem] font-semibold text-[#191443]">
                  {HERO_CONTENT.badge[2].text}
                </span>
              </div>
            </div>

            {/* lg+: all badges in one horizontal row */}
            <div className="hidden w-full items-center justify-center gap-x-2.5 whitespace-nowrap lg:flex lg:justify-start xl:gap-x-4">
              {HERO_CONTENT.badge.map((badge, index) => (
                <div
                  key={"text" in badge ? badge.text : badge.icon}
                  className="flex shrink-0 items-center gap-2.5 xl:gap-3"
                >
                  {index > 0 ? (
                    <span className="size-1 shrink-0 rounded-full bg-[#191443] xl:size-1.5" aria-hidden />
                  ) : null}
                  {"text" in badge && badge.text ? (
                    <div className="flex items-center gap-1.5 xl:gap-2">
                      <Image
                        src={badge.icon}
                        alt=""
                        width={20}
                        height={20}
                        className="size-4.5 shrink-0 object-contain xl:size-5.5"
                      />
                      <span className="font-sans text-[0.79rem] font-semibold text-[#191443] xl:text-[0.95rem]">
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
  );
}