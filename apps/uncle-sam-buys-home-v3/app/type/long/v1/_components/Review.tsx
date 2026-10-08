"use client"

import Image from "next/image"
import { REVIEW_CONTENT } from "@/lib/constant"
import { Button as ButtonUI } from "@workspace/ui/components/button"

type ReviewProps = {
    onGetQuoteClick?: () => void
}

export default function Review({ onGetQuoteClick }: ReviewProps) {
    return (
        <div

            className="w-full h-full bg-white px-6 py-8 md:px-8 md:py-10 lg:px-14 lg:py-12  xl:px-23 xl:py-18"
        >
            <div className="container mx-auto max-w-[1280px]">
                <div className="help-content w-full flex flex-col items-center justify-center gap-7 md:gap-11 lg:gap-14 xl:gap-16">
                    <div className="flex flex-col items-center justify-center gap-2.5 md:gap-3">
                        <h2 className="text-2xl text-center  md:text-2xl xl:text-[2.2rem] md:max-w-[450px] xl:max-w-[650px] font-bold text-[#182542] text-center font-sans " style={{ lineHeight: '1.3' }}>
                            {REVIEW_CONTENT.header}
                        </h2>

                        <p className="text-sm font-normal xl:text-lg text-[#4B5563] text-center  font-sans md:max-w-[570px] lg:max-w-[620px] xl:max-w-[800px]" style={{ lineHeight: '1.6' }}>{REVIEW_CONTENT.subheader}</p>
                    </div>

                    <div className="w-full flex flex-col items-center md:flex-row md:items-stretch gap-4.5 md:gap-5 xl:gap-7">
                        <div className="flex w-full md:w-[28%] lg:w-[22%] xl:w-[21%] md:h-full flex-col items-center justify-center gap-2.5 xl:gap-3.5 rounded-[10px] bg-[#355A89] px-6 py-5.5 md:min-h-[281px] lg:min-h-[340px] md:py-6 xl:min-h-[330px]">

                            <p className="text-center font-sans text-white">
                                <span className="text-3xl xl:text-4xl font-semibold leading-none">
                                    {REVIEW_CONTENT.rating.value}
                                </span>
                                <span className="text-lg xl:text-xl font-medium">
                                    {" "}/ {REVIEW_CONTENT.rating.scale}
                                </span>
                            </p>
                            <div className="flex flex-col items-center justify-center gap-2 xl:gap-2.5">
                                <div className="flex items-center justify-center gap-0.5" aria-hidden>
                                    {[...Array(5)].map((_, index) => (
                                        <Image
                                            key={index}
                                            src="/star.svg"
                                            alt=""
                                            width={28}
                                            height={28}
                                            className="size-5.5 xl:size-6"
                                        />
                                    ))}
                                </div>

                                <p className="text-center font-sans text-[0.83rem] xl:text-base font-normal text-[#D8E4F1]">
                                    {REVIEW_CONTENT.rating.reviewSubtext}
                                </p>
                            </div>

                            <Image
                                src={REVIEW_CONTENT.rating.image.src}
                                alt={REVIEW_CONTENT.rating.image.alt}
                                width={122}
                                height={40}
                                className="h-8 xl:h-10 w-auto object-contain "
                            />
                        </div>
                        <div className="w-full md:w-[72%] lg:w-[78%] md:flex md:flex-col md:self-stretch">
                            <div className="grid h-full grid-cols-1 md:grid-cols-2 md:items-stretch lg:grid-cols-3 gap-4.5 md:gap-4 xl:gap-5 ">
                                {REVIEW_CONTENT.reviews.map((review, index) => (
                                    <div
                                        key={review.id}
                                        className={`w-full md:w-auto md:h-full min-w-0 bg-white border border-[#D6E3F0] shadow-[0_0_10px_0_rgba(0,0,0,0.06)] rounded-[10px] flex flex-col items-start justify-start gap-4 p-5 py-6 xl:p-6 lg:gap-5.5 xl:gap-5 min-h-[260px] xl:min-h-[240px]${index >= 2 ? " md:hidden lg:flex" : ""}`}
                                    >
                               
                                        <div className="flex items-center justify-start gap-0.5">
                                            {[...Array(5)].map((_, index) => (
                                                <svg
                                                    key={index}
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    width="26"
                                                    height="26"
                                                    viewBox="0 0 26 26"
                                                    fill="none"
                                                    className="w-5 h-5 xl:w-6 xl:h-6"
                                                >
                                                    <path
                                                        d="M9.35575 8.79725L12.2709 2.89042C12.569 2.28653 13.4301 2.28653 13.7281 2.89042L16.6433 8.79725L23.1619 9.74445C23.8283 9.84129 24.0944 10.6603 23.6122 11.1303L18.8953 15.7282L20.0088 22.2204C20.1227 22.8841 19.426 23.3903 18.8299 23.0769L12.9995 20.0117L7.16916 23.0769C6.57308 23.3903 5.87642 22.8841 5.99026 22.2204L7.10377 15.7282L2.38688 11.1303C1.90465 10.6603 2.17075 9.84129 2.83718 9.74445L9.35575 8.79725Z"
                                                        fill="#FFB300"
                                                    />
                                                </svg>
                                            ))}
                                        </div>

                                        <p className="text-[0.85rem] font-normal  xl:text-base xl:max-w-[330px] text-[#4B5563] font-sans flex-1" style={{ lineHeight: 1.7 }}>
                                            &quot;{review.quote}&quot;
                                        </p>

                                        <div className="w-full flex flex-col items-start justify-start xl:flex-row xl:items-center xl:justify-between gap-2 mt-auto">
                                            <div className="flex items-center justify-start gap-3  ">
                                                <div className="w-10 h-10 xl:w-11.5 xl:h-11.5 overflow-hidden flex items-center justify-center flex-shrink-0 relative">
                                                    <Image
                                                        src={review.customer.image.src}
                                                        alt={review.customer.image.alt}
                                                        fill
                                                        className="object-cover"
                                                        priority
                                                    />
                                                </div>
                                                <div className="flex flex-col items-start justify-start gap-0.5">
                                                    <p className="font-semibold text-sm lg:text-sm xl:text-base text-[#182542] font-sans">
                                                        {review.customer.name}
                                                    </p>
                                                    <p className="text-sm lg:text-sm xl:text-base text-[#4B5563] font-inter">
                                                        {review.customer.location}
                                                    </p>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>




                    <div className="w-full md:w-[235px] xl:w-[300px] mt-2.5 md:mt-0 xl:mt-1">
                        <ButtonUI
                            type="1"
                            variant="default"
                            htmlType="button"
                            onClick={() => onGetQuoteClick?.()}
                            className="w-full bg-[#E71E26] text-white font-semibold h-14 xl:h-16 rounded-[10px] text-sm xl:text-lg shadow-[0_0_6px_0_rgba(0,0,0,0.15)] hover:bg-[#E71E26] cursor-pointer transition-all duration-300"
                        >
                            GET MY FREE CASH OFFER
                        </ButtonUI>
                    </div>


                </div>
            </div>
        </div>
    )
}
