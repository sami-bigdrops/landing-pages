"use client";

interface InterestSliderProps {
  id: string;
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}

export default function InterestSlider({
  id,
  label,
  value,
  onChange,
  min = 3,
  max = 24,
  step = 0.25,
}: InterestSliderProps) {
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;

  const display = value <= min ? `${min}% or less` : `${value.toFixed(2)}%`;

  return (
    <div className="space-y-2">
      <p className="text-sm font-semibold text-[#1C2833] font-inter">{label}</p>
      <div className="flex items-baseline justify-center gap-1 py-1">
        <span className="text-[2rem] font-extrabold text-[#3498DB] font-inter leading-none">
          {display}
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
            background: #3498DB; border: 3px solid white;
            box-shadow: 0 1px 6px rgba(52,152,219,0.45); cursor: pointer;
            transition: transform 0.15s ease;
          }
          #${id}::-moz-range-thumb {
            height: 22px; width: 22px; border-radius: 50%;
            background: #3498DB; border: 3px solid white;
            box-shadow: 0 1px 6px rgba(52,152,219,0.45); cursor: pointer;
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
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="w-full h-2 sm:h-2 min-h-[44px] sm:min-h-0 rounded-full appearance-none cursor-pointer outline-none accent-[#3498DB]"
          style={{ background: `linear-gradient(to right, #3498DB ${pct}%, #dbeafe ${pct}%)` }}
        />
      </div>
      <div className="flex justify-between text-[11px] text-gray-400 font-inter px-1">
        <span>{min}%</span>
        <span>{max}%</span>
      </div>
    </div>
  );
}
