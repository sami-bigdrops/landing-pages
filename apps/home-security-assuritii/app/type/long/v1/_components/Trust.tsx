import Image from "next/image"
import { cn } from "@workspace/ui/lib/utils"
import { TRUST_CONTENT } from "@/lib/constant"
import { pageSectionInner } from "@/lib/page-layout"

type TrustProvider = (typeof TRUST_CONTENT.providers)[number]

function ProviderLogo({ provider }: { provider: TrustProvider }) {
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

export default function Trust() {
  const [primaryRow, secondaryRow] = [
    TRUST_CONTENT.providers.slice(0, 2),
    TRUST_CONTENT.providers.slice(2),
  ]

  return (
    <section className="w-full bg-[#1F3A5F] py-10 md:py-12 lg:py-14">
      <div className={cn(pageSectionInner)}>
        <div className="works-content flex w-full flex-col items-center justify-center gap-10 md:gap-10 lg:gap-12 xl:gap-14">
          <h2
            className="text-center font-sans text-xl font-bold text-white md:text-2xl xl:text-3xl"
            style={{ lineHeight: "1.4" }}
          >
            {TRUST_CONTENT.headline}
          </h2>

          <div className="flex w-full flex-col gap-8 md:flex-row md:items-center md:justify-center md:gap-12 xl:mt-3 xl:gap-16">
            <div className="flex items-center justify-center gap-x-10 gap-y-6 md:gap-x-13 xl:gap-x-16">
              {primaryRow.map((provider) => (
                <ProviderLogo key={provider.name} provider={provider} />
              ))}
            </div>
            <div className="flex justify-center">
              {secondaryRow.map((provider) => (
                <ProviderLogo key={provider.name} provider={provider} />
              ))}
            </div>
          </div>

          <p className="text-center text-sm font-normal text-white xl:text-lg">
            {TRUST_CONTENT.description}
          </p>
        </div>
      </div>
    </section>
  )
}
