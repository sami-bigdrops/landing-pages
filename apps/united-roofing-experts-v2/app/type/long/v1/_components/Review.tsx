"use client"

import Image from "next/image"
import { REVIEW_CONTENT } from "@/lib/constant"

const BOLD_PHRASES = [
  "I would highly recommend a metal roof",
  "They were surprised to learn that it was a metal roof",
  "As a construction worker myself it's nice to see a contractor that is on the ball.",
] as const

function renderReviewDescription(text: string) {
  const pattern = new RegExp(
    `(${BOLD_PHRASES.map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "g",
  )

  return text.split(pattern).map((part, index) =>
    BOLD_PHRASES.includes(part as (typeof BOLD_PHRASES)[number]) ? (
      <span key={index} className="font-bold">
        {part}
      </span>
    ) : (
      part
    ),
  )
}

export default function Review() {
  return (
    <div
      className="review w-full px-6 py-12 md:px-10 md:py-12 lg:px-25 lg:py-14 xl:px-38 xl:py-20"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.77), rgba(0, 0, 0, 0.77)), url(${REVIEW_CONTENT.image.src})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="container mx-auto xl:max-w-[1250px]">
        <div className="grid w-full grid-cols-1 gap-6 md:grid-cols-3 md:gap-5 xl:gap-6">
          {REVIEW_CONTENT.reviews.map((review) => (
            <div
              key={review.number}
              className="flex flex-col items-center gap-2.5 bg-white px-5 py-6 md:py-8 xl:px-8 xl:py-10"
            >
              <Image
                src={REVIEW_CONTENT.starImage.src}
                alt={REVIEW_CONTENT.starImage.alt}
                width={209}
                height={34}
                className="h-3 xl:h-4 w-auto object-contain "
              />

              <p
                className="text-center font-sans text-[0.85rem] font-normal text-[#111827] xl:text-base"
                style={{ lineHeight: 1.5 }}
              >
                &quot;{renderReviewDescription(review.description)}&quot;
              </p>

              <p className="text-center font-sans text-sm font-bold text-[#111827] xl:text-lg mt-1 xl:mt-2">
                {review.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
