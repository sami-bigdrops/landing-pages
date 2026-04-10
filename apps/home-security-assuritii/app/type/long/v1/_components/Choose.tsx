import Image from "next/image"
import { cn } from "@workspace/ui/lib/utils"
import { CHOOSE_CONTENT } from "@/lib/constant"
import { pageSectionInner } from "@/lib/page-layout"

export default function Choose() {
  return (
    <section className="w-full bg-[#E8F0FA] py-10 md:py-12 lg:py-14 xl:py-16">
      <div className={cn(pageSectionInner)}>
        <div className="works-content w-full flex flex-col items-center justify-center gap-6 md:gap-10 lg:gap-12 xl:gap-16">
          <h2 className="text-xl text-center text-[#111827] md:text-2xl xl:text-3xl font-bold text-center font-sans" style={{ lineHeight: '1.4' }}>
            
          {CHOOSE_CONTENT.header}
          </h2>

          <div className="choose-container grid w-full grid-cols-1 gap-4 md:grid-cols-2  lg:grid-cols-4 lg:gap-6 xl:gap-8">
            {CHOOSE_CONTENT.items.map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col items-start gap-4 rounded-[20px] bg-[#FFF] p-5 md:p-6 xl:gap-5"
           
              >
                <div className="flex h-11 w-11 xl:h-13 xl:w-13 shrink-0 items-center justify-center ">
                  <Image
                    src={item.icon.src}
                    alt={item.icon.alt}
                    width={56}
                    height={56}
                    className="h-full w-full object-contain"
                  />
                </div>
                <p className="text-left text-sm font-normal leading-relaxed text-[#111827]  xl:text-base" style={{ lineHeight: '1.5' }}>
                  {item.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
