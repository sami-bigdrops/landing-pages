"use client"

import Image from "next/image"
import { CHOOSE_CONTENT, INFO_CONTENT } from "@/lib/constant"
import { Button } from "@workspace/ui/components/button";
import { useRouter } from "next/navigation";

function renderDescription(text: string) {
    return text.split(/(BIG)/g).map((part, index) =>
        part === "BIG" ? (
            <span key={index} className="font-bold">
                {part}
            </span>
        ) : (
            part
        ),
    );
}

export default function Info() {

    const router = useRouter();

    const handleCheckMyEligibility = () => {
        router.push("/form");
    };
    return (
        <div
            className="info w-full  h-full px-6 py-6 md:px-6 md:py-8 lg:px-26 lg:py-10  xl:px-40 xl:py-11"

        >
            <div className="container mx-auto xl:max-w-[1170px]">
                <div className="flex w-full flex-col-reverse items-center gap-6 md:flex-row-reverse md:items-start md:gap-3 lg:gap-10 xl:gap-5 ">
                    <div className="w-full md:w-[50%] lg:w-[50%]  flex items-center justify-center md:items-start  md:h-[230px] lg:h-[250px] xl:h-[320px] ">
                        <Image
                            src={INFO_CONTENT.image.src}
                            alt={INFO_CONTENT.image.alt}
                            width={800}
                            height={560}
                            className="h-full w-full md:max-w-[320px] lg:max-w-[380px] xl:max-w-[500px] object-cover object-center "
                            priority
                        />
                    </div>

                    <div className="flex w-full flex-col items-center gap-8 md:w-[50%] lg:w-[50%]  md:items-start md:gap-8 xl:gap-10">
                        <div className="flex w-full flex-col items-center justify-start gap-4   xl:gap-5">

                            <h2 className=" text-2xl md:text-3xl xl:text-4xl  font-bold  text-[#000000] text-center font-sans xl:max-w-[470px] " style={{ lineHeight: "1.2" }}>
                                {INFO_CONTENT.headline}
                            </h2>


                            <p
                                className="text-center font-sans text-[0.77rem] lg:max-w-[360px] xl:max-w-[470px] text-center font-normal text-[#000000]  xl:text-base "
                                style={{ lineHeight: 1.6 }}
                            >
                                {renderDescription(INFO_CONTENT.description)}
                            </p>

                            <div className="w-full flex flex-col items-start justify-start gap-2">
                                {INFO_CONTENT.features.map((feature) => (
                                    <div key={feature.label} className="flex items-center justify-start gap-2 xl:gap-3">
                                        <Image src={INFO_CONTENT.featureIcon.src} alt={INFO_CONTENT.featureIcon.alt} width={20} height={20}
                                            className="w-4 h-4 xl:w-5 xl:h-5 object-cover object-center" />
                                        <p className="text-left font-sans text-[0.77rem]  font-normal text-[#000000]  xl:text-base  " style={{ lineHeight: 1.5 }}>{feature.label}</p>
                                    </div>
                                ))}
                            </div>


                        </div>


                        <div className="w-full md:max-w-[220px] xl:max-w-[290px]">
                            <Button
                                type="1"
                                variant="default"
                                onClick={handleCheckMyEligibility}
                                className="flex h-14 w-full cursor-pointer items-center justify-center rounded-none border-[3px] border-[#BC0B31] bg-[linear-gradient(180deg,_#CE1B31_0%,_#92040B_100%)] px-5 py-4 text-sm font-semibold tracking-normal text-white transition-all duration-300 hover:bg-[linear-gradient(180deg,_#CE1B31_0%,_#92040B_100%)] disabled:cursor-not-allowed disabled:opacity-90 xl:h-19.5 xl:text-lg"
                            >
                                Get Pricing
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
