"use client";

import { TOP_NAV_CONTENT } from "@/lib/constant";

function StarIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      className="h-4.5 w-4.5 xl:h-5 xl:w-5 shrink-0"
      aria-hidden
    >
      <path
        d="M7.91663 7.44382L10.3833 2.44574C10.6355 1.93475 11.3642 1.93475 11.6163 2.44574L14.0831 7.44382L19.5988 8.24531C20.1627 8.32724 20.3878 9.02023 19.9798 9.41797L15.9886 13.3084L16.9308 18.8019C17.0271 19.3635 16.4376 19.7918 15.9332 19.5266L10.9998 16.933L6.06643 19.5266C5.56206 19.7918 4.97258 19.3635 5.06891 18.8019L6.0111 13.3084L2.01989 9.41797C1.61185 9.02023 1.83701 8.32724 2.40091 8.24531L7.91663 7.44382Z"
        fill="#FFB300"
      />
    </svg>
  );
}

export default function TopNav() {
  return (
    <div className="top-nav hidden md:block w-full bg-[#0752A0] px-4  md:py-3.5 xl:py-4">
      <div className="container mx-auto">
        <div className="top-nav-content flex flex-wrap items-center justify-center gap-2 xl:gap-2.5">
          <p className="text-center font-sans text-sm xl:text-lg font-bold text-white tracking-normal">
            {TOP_NAV_CONTENT.headline}
          </p>
          <div className="flex shrink-0 items-center " aria-label="5 star rating">
            {Array.from({ length: 5 }).map((_, index) => (
              <StarIcon key={index} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
