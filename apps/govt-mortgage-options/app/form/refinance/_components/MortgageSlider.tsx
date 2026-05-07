"use client";

import { useMemo } from "react";

function buildSnapPoints(): number[] {
  const pts: number[] = [];
  for (let v = 50_000; v <= 195_000; v += 5_000) pts.push(v);
  for (let v = 200_000; v <= 400_000; v += 10_000) pts.push(v);
  for (let v = 420_000; v <= 1_000_000; v += 20_000) pts.push(v);
  for (let v = 1_250_000; v <= 5_000_000; v += 250_000) pts.push(v);
  return pts;
}

export const SNAP_POINTS = buildSnapPoints();
export const SNAP_POINTS_WITH_ZERO = [0, ...SNAP_POINTS];

export function snapToNearest(value: number, points: number[] = SNAP_POINTS): number {
  if (points.length === 0) return value;
  return points.reduce((prev, curr) =>
    Math.abs(curr - value) < Math.abs(prev - value) ? curr : prev
  );
}

function stepSizeAt(value: number): number {
  if (value <= 195_000) return 5_000;
  if (value <= 400_000) return 10_000;
  if (value <= 1_000_000) return 20_000;
  return 250_000;
}

export function getAverageValue(snapValue: number, points: number[] = SNAP_POINTS): number {
  if (snapValue === 0) return 0;
  const isLast = points[points.length - 1] === snapValue;
  if (isLast) return snapValue;
  return snapValue + stepSizeAt(snapValue) / 2;
}

export function formatMoney(value: number): string {
  if (value === 0) return "$0";
  if (value >= 1_000_000) {
    const m = value / 1_000_000;
    const str = Number.isInteger(m) ? String(m) : m.toFixed(2).replace(/\.?0+$/, "");
    return `$${str}M`;
  }
  const k = value / 1_000;
  const str = Number.isInteger(k) ? String(k) : k.toFixed(1);
  return `$${str}k`;
}

interface MortgageSliderProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  maxSnap?: number;
  customPoints?: number[];
}

export default function MortgageSlider({
  id,
  label,
  value,
  onChange,
  maxSnap,
  customPoints,
}: MortgageSliderProps) {
  const points = useMemo(() => {
    if (customPoints) return maxSnap !== undefined ? customPoints.filter((p) => p <= maxSnap) : customPoints;
    return maxSnap !== undefined ? SNAP_POINTS.filter((p) => p <= maxSnap) : SNAP_POINTS;
  }, [maxSnap, customPoints]);

  const maxIdx = points.length - 1;
  const currentIdx = Math.max(0, points.indexOf(value) === -1 ? 0 : points.indexOf(value));
  const pct = maxIdx > 0 ? (currentIdx / maxIdx) * 100 : 0;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const snap = points[parseInt(e.target.value, 10)];
    if (snap !== undefined) onChange(snap);
  };

  const minLabel = formatMoney(points[0] ?? 0);
  const maxLabel = formatMoney(points[maxIdx] ?? 0);

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-[#1C2833] font-inter">{label}</p>
      <div className="flex items-baseline justify-center gap-1 py-1">
        <span className="text-[2rem] font-extrabold text-[#941F32] font-inter leading-none">
          {formatMoney(value)}
        </span>
      </div>
      <div className="px-1 py-4 sm:py-2 touch-none select-none">
        <style>{`
          #${id} {
            -webkit-tap-highlight-color: transparent;
            touch-action: none;
          }
          #${id}::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: 22px; width: 22px; border-radius: 50%;
            background: #941F32; border: 3px solid white;
            box-shadow: 0 1px 6px rgba(148,31,50,0.45); cursor: pointer;
            transition: transform 0.15s ease;
          }
          #${id}::-moz-range-thumb {
            height: 22px; width: 22px; border-radius: 50%;
            background: #941F32; border: 3px solid white;
            box-shadow: 0 1px 6px rgba(148,31,50,0.45); cursor: pointer;
            transition: transform 0.15s ease;
          }
          @media (max-width: 768px), (hover: none) {
            #${id}::-webkit-slider-thumb {
              height: 28px; width: 28px; border-width: 3px;
            }
            #${id}::-moz-range-thumb {
              height: 28px; width: 28px; border-width: 3px;
            }
          }
        `}</style>
        <input
          id={id}
          type="range"
          min={0}
          max={maxIdx}
          step={1}
          value={currentIdx}
          onChange={handleChange}
          className="w-full h-2 sm:h-2 min-h-[44px] sm:min-h-0 rounded-full appearance-none cursor-pointer outline-none accent-[#941F32]"
          style={{ background: `linear-gradient(to right, #941F32 ${pct}%, #fce7ea ${pct}%)` }}
        />
      </div>
      <div className="flex justify-between text-[11px] text-gray-400 font-inter px-1">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  );
}
