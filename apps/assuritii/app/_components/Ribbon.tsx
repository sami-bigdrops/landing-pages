"use client"
import Image from "next/image"

export default function Ribbon() {
    return (
        <div className="ribbon hidden md:flex md:items-center bg-[#283E61] p-4 xl:p-5 min-h-[56px] xl:min-h-[64px]">
            <div className="container mx-auto">
                <div className="ribbon-content flex items-center justify-center gap-4">
                    <div className="flex items-center  gap-5 lg:gap-6 xl:gap-7">
                    
                        <span className="text-white font-['Inter'] font-bold text-sm lg:text-base xl:text-lg">WINTER SAVINGS EVENT: Up to $500 Off Your Auto Coverage Policy</span>
                      
                    <div className="h-5 w-px xl:w-0.5 xl:h-6.5 bg-white"></div>
                    <div className="flex items-center gap-2">
                        <Image 
                            src="/call.svg" 
                            alt="Phone" 
                            width={24} 
                            height={24}
                            className="w-5 h-5 lg:w-6 lg:h-6"
                        />
                        <span className="text-white font-['Inter'] text-sm font-medium lg:text-base xl:text-lg flex items-center gap-2">
                           <span className="hidden xl:block">Speak to a protection specialist:</span>
                            +1 (800) 349-3027
                        </span>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
}