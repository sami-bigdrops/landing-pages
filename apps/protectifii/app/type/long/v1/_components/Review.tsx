import Image from "next/image"
import { REVIEW_CONTENT } from "@/lib/constant"

const STAR_COUNT = 5

function Stars() {
  return (
    <div
      className="flex items-center justify-center gap-0.5 md:justify-start"
      aria-label={`${STAR_COUNT} out of ${STAR_COUNT} stars`}
      role="img"
    >
      {Array.from({ length: STAR_COUNT }, (_, index) => (
        <svg
          key={index}
          xmlns="http://www.w3.org/2000/svg"
          width="26"
          height="26"
          viewBox="0 0 26 26"
          fill="none"
          className="h-5 w-5 xl:h-6 xl:w-6"
          aria-hidden
        >
          <path
            d="M9.35575 8.79725L12.2709 2.89042C12.569 2.28653 13.4301 2.28653 13.7281 2.89042L16.6433 8.79725L23.1619 9.74445C23.8283 9.84129 24.0944 10.6603 23.6122 11.1303L18.8953 15.7282L20.0088 22.2204C20.1227 22.8841 19.426 23.3903 18.8299 23.0769L12.9995 20.0117L7.16916 23.0769C6.57308 23.3903 5.87642 22.8841 5.99026 22.2204L7.10377 15.7282L2.38688 11.1303C1.90465 10.6603 2.17075 9.84129 2.83718 9.74445L9.35575 8.79725Z"
            fill="#FFB300"
          />
        </svg>
      ))}
    </div>
  )
}

export default function Review() {
  const { header, reviews } = REVIEW_CONTENT
  const lastReviewIndex = reviews.length - 1

  return (
    <div className="review h-full w-full bg-[#FFFCF2] px-6 py-8 md:px-8 md:py-10 lg:px-14 lg:py-12 xl:px-20 xl:py-14">
      <div className="container mx-auto max-w-[1280px]">
        <div className="review-content flex w-full flex-col items-center justify-center gap-8 md:gap-10  xl:gap-16">
          <h2
            className="w-full text-center font-sans text-2xl font-extrabold tracking-normal text-[#191443] md:text-2xl xl:text-3xl"
            style={{ lineHeight: 1.3 }}
          >
            {header}
          </h2>

          <div className="w-full">
            <div className="grid grid-cols-1 items-stretch gap-0 md:grid-cols-3 md:gap-6 lg:gap-8 xl:gap-15 ">
              {reviews.map((review, index) => (
                <div
                  key={review.id}
                  className={[
                    "flex h-full min-w-0 flex-col gap-4.5 md:gap-5 xl:gap-5",
                    "items-center text-center md:items-start md:text-left",
                    "py-7.5 first:pt-0 last:pb-0 md:py-0",
                    index < lastReviewIndex
                      ? "border-b border-[#D5D2E5] md:border-b-0"
                      : "",
                  ].join(" ")}
                >
                  <Stars />

                  <p
                    className="flex-1 font-sans text-sm text-[#191443] xl:text-base"
                    style={{ lineHeight: 1.5 }}
                  >
                    {review.quote}
                  </p>

                  <div className="mt-auto xl:mt-1.5 flex w-full items-center justify-center gap-3 md:justify-start">
                    <div className="relative h-10 w-10 flex-shrink-0 overflow-hidden rounded-full xl:h-11.5 xl:w-11.5">
                      <Image
                        src={review.customer.image.src}
                        alt={review.customer.image.alt}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="text-left ">
                      <p className="font-sans text-sm font-semibold text-[#191443]  xl:text-base">
                        {review.customer.name}
                      </p>
                      <p className="font-sans text-[0.84rem] text-[#4B4B57]  xl:text-[0.95rem]">
                        {review.customer.location}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
