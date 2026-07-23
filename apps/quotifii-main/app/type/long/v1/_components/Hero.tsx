"use client";

import { useState, useEffect } from "react";
import {
  useUtmParams,
  setCookie,
  getCookie,
  QUOTIFII_EXTENDED_UTM_OPTIONS,
} from "@workspace/lp-core";
import { track } from "@vercel/analytics";
import { Button } from "@workspace/ui/components/button";
import Image from "next/image";
import { HERO_CONTENT } from "@/lib/constant";

const ZIP_COOKIE_NAME = "zipCode";
const ZIP_COOKIE_DAYS = 30;
const ANALYTICS_FLUSH_DELAY_MS = 300;

const [autoButton, homeButton] = HERO_CONTENT.herobuttons;

const HERO_BUTTON_BASE_CLASS =
  "w-full md:flex-1 md:min-w-0 h-14 md:h-14.5 xl:h-18 rounded-[10px] cursor-pointer font-semibold font-poppins text-sm xl:text-lg flex items-center justify-between gap-2 px-4 xl:px-4.5 transition-all duration-300 shadow-[0_0_6px_0_rgba(0,53,153,0.20)] disabled:opacity-90 disabled:cursor-not-allowed";

const AUTO_BUTTON_CLASS = `${HERO_BUTTON_BASE_CLASS} text-white hover:bg-[#F16601] bg-[#F16601]`;
const HOME_BUTTON_CLASS = `${HERO_BUTTON_BASE_CLASS} text-[#1A1A1A] border border-[#F16601] bg-white hover:bg-white`;

const HERO_BUTTON_LABEL_CLASS = "flex items-center gap-2.5 xl:gap-3";
const HERO_BUTTON_ICON_CLASS = "h-5 w-5 xl:h-6.5 xl:w-6.5 shrink-0";
const HERO_BUTTON_ARROW_CLASS = "h-5 w-5 xl:h-6.5 xl:w-6.5 shrink-0";

export default function Hero() {
  useUtmParams(QUOTIFII_EXTENDED_UTM_OPTIONS);

  const [zipCode, setZipCode] = useState("");
  const [cityName, setCityName] = useState("");
  const [redirectingTo, setRedirectingTo] = useState<"auto" | "home" | null>(null);

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

  const buildRedirectUrl = (baseUrl: string) => {
    const trimmed = zipCode.replace(/\D/g, "").slice(0, 5);
    if (trimmed.length === 5) {
      setCookie(ZIP_COOKIE_NAME, trimmed, ZIP_COOKIE_DAYS);
    }

    const utmSource = getCookie("subid1") || "";
    const utmId = getCookie("subid2") || "";
    const utmS1 = getCookie("subid3") || "";

    const params = new URLSearchParams();
    params.set("tid", utmId);
    params.set("uid", utmId);
    params.set("sid", utmSource);
    params.set("sub1", utmS1);
    if (trimmed.length === 5) {
      params.set("zip", trimmed);
    }

    return {
      redirectUrl: `${baseUrl}/?${params.toString()}`,
      zip: trimmed.length === 5 ? trimmed : undefined,
    };
  };

  const handleAutoClick = () => {
    if (redirectingTo) return;

    const { redirectUrl, zip } = buildRedirectUrl(autoButton.href);

    track("hero_cta_click", {
      product: "auto",
      state: cityName || undefined,
      zip_code: zip,
    });

    setRedirectingTo("auto");
    window.setTimeout(() => {
      window.location.href = redirectUrl;
    }, ANALYTICS_FLUSH_DELAY_MS);
  };

  const handleHomeClick = () => {
    if (redirectingTo) return;

    const { redirectUrl, zip } = buildRedirectUrl(homeButton.href);

    track("hero_cta_click", {
      product: "home",
      state: cityName || undefined,
      zip_code: zip,
    });

    setRedirectingTo("home");
    window.setTimeout(() => {
      window.location.href = redirectUrl;
    }, ANALYTICS_FLUSH_DELAY_MS);
  };

  return (
    <div className="relative flex items-center justify-center min-h-0 flex-1 w-full overflow-hidden xl:min-h-[590px] 2xl:min-h-[620px]">
      <div
        className="absolute inset-0 w-full h-full bg-[url('/hero-bg.webp')] bg-cover bg-no-repeat bg-[position:left_42%] md:bg-[position:52%_32%] lg:bg-[position:38%_28%] xl:bg-[position:48%_24%] 2xl:bg-[position:top_68%_right_38%]"
      />

      <div className="relative z-10 flex h-full min-h-0 w-full flex-col items-center justify-center p-4 py-6 md:px-8 md:py-12 lg:px-14 lg:py-18 xl:px-23 xl:py-25">
        <div className="mx-auto w-full max-w-[1380px]">
          <div className="hero-content flex w-full min-h-0 flex-col items-center justify-center gap-4 md:items-start md:justify-center md:gap-5 lg:gap-6 xl:gap-7">
            <div className="w-full min-w-0 flex flex-col md:flex-row bg-[#FFFFFF] px-5 py-6 md:max-w-[440px] md:p-6 lg:max-w-[470px] xl:max-w-[620px] xl:px-8 xl:py-9 rounded-none justify-center items-center md:justify-center lg:items-center">
              <div className="w-full min-w-0 flex flex-col items-center md:items-start gap-6 md:gap-7 xl:gap-10">

                <div
                  className="flex flex-col items-center md:items-start gap-2.5 md:gap-3 xl:gap-4 max-w-[40rem] xl:max-w-[44rem] font-[family-name:var(--font-hero)]"
                >
                  <h1
                    className="w-full text-center md:text-left font-bold text-[#1A1A1A] text-[1.5rem] md:text-[1.6rem]  lg:text-[1.7rem] xl:text-4xl md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px]"

                    style={{ lineHeight: "1.3" }}>
                    {HERO_CONTENT.headlineLead}
                  </h1>
                  <p
                    className="w-full text-center md:text-left font-normal text-[#4B5563] text-sm  xl:text-xl md:max-w-[370px] lg:max-w-[400px] xl:max-w-[540px]"

                    style={{ lineHeight: "1.6" }}>
                    {HERO_CONTENT.subheadline}
                  </p>
                </div>

                <div className="w-full min-w-0 flex flex-col justify-center items-stretch md:flex-row gap-3 xl:gap-4">
                  <Button
                    type="1"
                    variant="default"
                    htmlType="button"
                    disabled={redirectingTo !== null}
                    onClick={handleAutoClick}
                    className={AUTO_BUTTON_CLASS}
                  >
                    {redirectingTo === "auto" ? (
                      "Redirecting..."
                    ) : (
                      <>
                        <span className={HERO_BUTTON_LABEL_CLASS}>
                          <Image
                            src={autoButton.icon}
                            alt={autoButton.iconAlt}
                            width={24}
                            height={24}
                            className={HERO_BUTTON_ICON_CLASS}
                          />
                          {autoButton.label}
                        </span>
                        <Image
                          src={autoButton.arrow}
                          alt=""
                          width={20}
                          height={20}
                          className={HERO_BUTTON_ARROW_CLASS}
                          aria-hidden
                        />
                      </>
                    )}
                  </Button>

                  <Button
                    type="1"
                    variant="default"
                    htmlType="button"
                    disabled={redirectingTo !== null}
                    onClick={handleHomeClick}
                    className={HOME_BUTTON_CLASS}
                  >
                    {redirectingTo === "home" ? (
                      "Redirecting..."
                    ) : (
                      <>
                        <span className={HERO_BUTTON_LABEL_CLASS}>
                          <Image
                            src={homeButton.icon}
                            alt={homeButton.iconAlt}
                            width={24}
                            height={24}
                            className={HERO_BUTTON_ICON_CLASS}
                          />
                          {homeButton.label}
                        </span>
                        <Image
                          src={homeButton.arrow}
                          alt=""
                          width={20}
                          height={20}
                          className={HERO_BUTTON_ARROW_CLASS}
                          aria-hidden
                        />
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
