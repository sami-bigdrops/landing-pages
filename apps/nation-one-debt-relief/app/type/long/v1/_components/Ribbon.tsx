import { RIBBON_CONTENT } from "@/lib/constant";
import Image from "next/image";


export default function Ribbon() {
    return (
        <div className="w-full h-full bg-[#0F2D52] px-6 py-5 md:px-6 md:py-5 lg:px-14 lg:py-6 xl:px-23 xl:py-7">
            <div className="container mx-auto max-w-[1280px]">
                <div className="grid w-full grid-cols-1 gap-x-4 gap-y-4 md:flex md:flex-nowrap md:items-center md:justify-between md:gap-2 lg:gap-6 xl:gap-20">
                    {RIBBON_CONTENT.items.map((item) => (
                        <div
                            key={item.text}
                            className="flex h-full w-full flex-row items-center justify-start gap-1.5 md:w-auto md:flex-row md:items-center md:justify-start md:gap-1.5 "
                        >
                            <Image
                                src={item.icon}
                                alt={item.text}
                                width={20}
                                height={20}
                                className="h-5 w-5 shrink-0 object-contain  xl:h-7 xl:w-7"
                            />
                            <p className="text-left font-sans text-[0.7rem] font-normal leading-snug text-white md:max-w-none md:whitespace-nowrap md:text-left md:text-[0.67rem] md:leading-normal lg:text-[0.8rem] xl:text-lg">
                                {item.text}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
