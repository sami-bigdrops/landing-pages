import Image from "next/image"
import { ROOF_CONTENT } from "@/lib/constant_v2"
import { Button } from "@workspace/ui/components/button";
import { useRouter } from "next/navigation";


type RoofProvider = (typeof ROOF_CONTENT.providers)[number]

function ProviderLogo({ provider }: { provider: RoofProvider }) {
  return (
    <Image
      src={provider.logo.src}
      alt={provider.logo.alt}
      width={provider.width}
      height={provider.height}
      className={provider.imageClassName}
    />
  )
}

export default function Roof() {
  const router = useRouter();
  const [primaryRow, secondaryRow] = [
    ROOF_CONTENT.providers.slice(0, 2),
    ROOF_CONTENT.providers.slice(2),
  ]



  return (
    <section className="w-full h-full px-6 py-8"
    style={{
      background: `linear-gradient(180deg, rgba(0, 0, 0, 0.60) 15.55%, rgba(17, 24, 39, 0.12) 84.84%), linear-gradient(0deg, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.25) 100%), url(${ROOF_CONTENT.image.src}) lightgray 50% / cover no-repeat`,
    }}
    >
      <div className="container mx-auto ">
        <div className="works-content flex w-full flex-col items-center justify-center gap-10 md:gap-10 lg:gap-12 xl:gap-14">
          <div>
          <h2
            className="text-center font-sans text-xl font-bold text-white md:text-2xl xl:text-3xl"
            style={{ lineHeight: "1.4" }}
          >
            {ROOF_CONTENT.headline}
          </h2>

          <div className="w-full flex items-center justify-center">
            <Button
              type="1"
              variant="default"
              onClick={() => router.push("/form")}
              className="flex h-12 xl:h-16.5 px-5  cursor-pointer items-center justify-center gap-2 rounded-[10px] font-semibold bg-[#E56A2E] text-[0.75rem] md:text-[0.8rem] xl:text-[1.05rem] font-inherit text-white shadow-[0_0_12px_0_rgba(0,0,0,0.20)] transition-all duration-300 hover:bg-[#E56A2E] disabled:cursor-not-allowed disabled:opacity-90 md:w-[210px] xl:w-[276px] "
            >
              <>Book a FREE Roof Inspection </>
            </Button>
       
          </div>
          </div>

          <div className="flex w-full flex-col gap-8 md:flex-row md:items-center md:justify-center md:gap-12 xl:mt-3 xl:gap-16">
            <div className="flex items-center justify-center gap-x-10 gap-y-6 md:gap-x-13 xl:gap-x-16">
              {primaryRow.map((provider) => (
                <ProviderLogo key={provider.logo.src} provider={provider} />
              ))}
            </div>
            <div className="flex justify-center">
              {secondaryRow.map((provider) => (
                <ProviderLogo key={provider.logo.src} provider={provider} />
              ))}
            </div>
          </div>

         
        </div>
      </div>
    </section>
  )
}
