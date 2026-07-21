import { RIBBON_CONTENT } from "@/lib/constant";
import Image from "next/image";


export default function Ribbon() {
    return (
        <div className="w-full h-full bg-[#1F7A63] px-6 py-5 md:px-8 md:py-5 lg:px-14 lg:py-6 xl:px-23 xl:py-7">
            <div className="container mx-auto max-w-[1280px]">
                <div className="grid w-full grid-cols-2 gap-x-4 gap-y-6 md:flex md:flex-nowrap md:items-center md:justify-between md:gap-2 lg:gap-6 xl:gap-20">
                    {RIBBON_CONTENT.badges.map((badge) => (
                        <div
                            key={badge.label}
                            className="flex h-full w-full flex-col items-center justify-center gap-2 md:w-auto md:flex-row md:items-center md:justify-start md:gap-1.5 lg:gap-2.5"
                        >
                            <Image
                                src={badge.icon}
                                alt={badge.label}
                                width={20}
                                height={20}
                                className="h-4.5 w-4.5 shrink-0 object-contain  xl:h-6.5 xl:w-6.5"
                            />
                            <p className="max-w-[9.5rem] text-center font-sans text-[0.75rem] font-normal leading-snug text-white md:max-w-none md:whitespace-nowrap md:text-left md:text-[0.72rem] md:leading-normal lg:text-[0.85rem] xl:text-lg">
                                {badge.label}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
