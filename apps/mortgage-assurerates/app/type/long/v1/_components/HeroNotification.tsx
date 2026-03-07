"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { MapPin, BadgeCheck } from "lucide-react";
import { HERO_NOTIFICATIONS } from "@/lib/constant";

const TIME_LABELS = [
  "Just now",
  "2 minutes ago",
  "4 minutes ago",
  "6 minutes ago",
  "9 minutes ago",
  "12 minutes ago",
];

function latLngToTile(lat: number, lng: number, zoom: number) {
  const n = Math.pow(2, zoom);
  const x = Math.floor(((lng + 180) / 360) * n);
  const latRad = (lat * Math.PI) / 180;
  const y = Math.floor(
    ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) / 2) * n
  );
  return { x, y };
}

const tileCache: Record<string, string> = {};

function MapThumbnail({ city }: { city: string }) {
  const [tileUrl, setTileUrl] = useState<string | null>(tileCache[city] ?? null);

  useEffect(() => {
    if (!city || tileCache[city]) {
      if (tileCache[city]) setTileUrl(tileCache[city]);
      return;
    }
    const run = async () => {
      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(city)}&format=json&limit=1`,
          { headers: { "Accept-Language": "en" } }
        );
        const data = await res.json();
        if (data?.[0]) {
          const lat = parseFloat(data[0].lat);
          const lng = parseFloat(data[0].lon);
          const zoom = 13;
          const { x, y } = latLngToTile(lat, lng, zoom);
          const url = `https://tile.openstreetmap.org/${zoom}/${x}/${y}.png`;
          tileCache[city] = url;
          setTileUrl(url);
        }
      } catch {
        // keep placeholder on failure
      }
    };
    run();
  }, [city]);

  if (!tileUrl) {
    return (
      <div
        className="h-[60px] w-[60px] rounded-xl shrink-0 border border-blue-100 bg-[#dbeafe] flex items-center justify-center"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148,187,233,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,187,233,0.5) 1px, transparent 1px)
          `,
          backgroundSize: "8px 8px",
        }}
      >
        <MapPin className="h-5 w-5 text-[#3498DB]" />
      </div>
    );
  }

  return (
    <div className="relative h-[60px] w-[60px] rounded-xl shrink-0 overflow-hidden border border-gray-200 shadow-sm">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={tileUrl}
        alt={`Map of ${city}`}
        className="h-full w-full object-cover scale-[1.6]"
      />
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative flex items-center justify-center">
          <span className="absolute h-5 w-5 rounded-full bg-red-500/25 animate-ping" />
          <MapPin
            className="relative z-10 h-5 w-5 drop-shadow-lg"
            style={{ color: "#e53e3e", fill: "#e53e3e", fillOpacity: 0.85 }}
            strokeWidth={1}
          />
        </div>
      </div>
    </div>
  );
}

type Phase = "hidden" | "entering" | "visible" | "leaving";

export default function HeroNotification() {
  const notifications = HERO_NOTIFICATIONS;
  const [index, setIndex] = useState(0);
  const [timeLabel, setTimeLabel] = useState(TIME_LABELS[0]);
  const [phase, setPhase] = useState<Phase>("hidden");
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const scheduleNext = useCallback((currentIndex: number) => {
    // Stay visible 5–7s, then slide out, then wait 18–28s before next
    const visibleDuration = 5000 + Math.random() * 2000;
    timerRef.current = setTimeout(() => {
      setPhase("leaving");
      timerRef.current = setTimeout(() => {
        const gapBeforeNext = 18000 + Math.random() * 10000;
        timerRef.current = setTimeout(() => {
          const next = (currentIndex + 1) % notifications.length;
          setIndex(next);
          setTimeLabel(TIME_LABELS[Math.floor(Math.random() * TIME_LABELS.length)]);
          setPhase("entering");
          timerRef.current = setTimeout(() => {
            setPhase("visible");
            scheduleNext(next);
          }, 50);
        }, gapBeforeNext);
      }, 450);
    }, visibleDuration);
  }, [notifications.length]);

  useEffect(() => {
    const initialDelay = 3000 + Math.random() * 3000;
    timerRef.current = setTimeout(() => {
      setPhase("entering");
      timerRef.current = setTimeout(() => {
        setPhase("visible");
        scheduleNext(0);
      }, 50);
    }, initialDelay);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [scheduleNext]);

  const notification = notifications[index]!;

  const translateClass =
    phase === "hidden"
      ? "-translate-x-[120%]"
      : phase === "entering"
        ? "-translate-x-[120%]"
        : phase === "leaving"
          ? "-translate-x-[120%]"
          : "translate-x-0";

  return (
    <div
      className={`fixed bottom-4 left-4 z-50 w-[290px] rounded-2xl bg-white shadow-[0_8px_32px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden transition-transform duration-[400ms] ease-[cubic-bezier(0.34,1.56,0.64,1)] ${translateClass}`}
    >
      <div className="flex items-center gap-0 px-3 py-3">
        <MapThumbnail city={notification.city} />

        <div className="flex-1 ml-3 min-w-0">
          <div className="flex items-start justify-between gap-1">
            <p className="font-bold text-[#1C2833] text-[13px] font-inter leading-tight">
              {notification.name}
            </p>
            <span className="flex items-center gap-0.5 text-[10px] text-emerald-500 font-semibold font-inter whitespace-nowrap shrink-0">
              <BadgeCheck className="h-3.5 w-3.5 shrink-0" />
              Verified
            </span>
          </div>

          <p className="text-[11px] text-gray-500 font-inter mt-0.5 leading-snug">
            {notification.message}
          </p>

          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[#3498DB] shrink-0" />
            <p className="text-[10px] text-gray-400 font-inter">{timeLabel}</p>
            <span className="text-gray-300">·</span>
            <p className="text-[10px] text-[#3498DB] font-inter font-medium truncate">
              {notification.city}
            </p>
          </div>
        </div>
      </div>

      <div className="h-[3px] w-full bg-gradient-to-r from-[#1e3a5f] via-[#3498DB] to-[#1e3a5f]" />
    </div>
  );
}
