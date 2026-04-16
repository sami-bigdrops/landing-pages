import { CHOOSE_CONTENT } from "@/lib/constant";
import { Button } from "@workspace/ui/components/button";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Choose() {
  const router = useRouter();
  const handleGetPricing = () => {
    router.push("/form");
  };

  return (
    <div className="bg-white w-full h-full">
      <div
        className="flex flex-col items-center justify-center py-10 px-4"
        style={{
          background: `url(${CHOOSE_CONTENT.backgroundImage}) no-repeat center center`,
          backgroundSize: "cover",
        }}
      >

        <div className="w-full max-w-6xl mx-auto flex flex-col items-center justify-center gap-8 py-6">
          <h2 className="text-2xl lg:text-3xl xl:text-4xl md:max-w-[400px] lg:max-w-[550px] xl:max-w-[700px] font-bold text-white drop-shadow-lg text-center font-sans leading-tight tracking-tight">
            {CHOOSE_CONTENT.header}
          </h2>

          <div className="w-full flex flex-col-reverse md:flex-row items-center justify-center md:justify-between gap-8 py-4">
            <div className="flex flex-col items-center justify-center gap-4 w-full lg:w-1/2">
              <Image src={CHOOSE_CONTENT.image.src} alt={CHOOSE_CONTENT.image.alt} width={500} height={500} className="w-80 md:w-100 lg:w-110 xl:w-120 object-contain object-center h-auto" />
            </div>
            <div className="grid grid-cols-2 gap-4 w-full lg:w-1/2">
              {CHOOSE_CONTENT.windowStyles.map((windowStyle) => (
                <div key={windowStyle.id} className="flex flex-col items-center justify-center gap-4">
                <Image
                  key={windowStyle.id}
                  src={windowStyle.image.src}
                  alt={windowStyle.image.alt}
                  width={200}
                  height={200}
                  unoptimized
                  className="w-35 md:w-30 lg:w-35 xl:w-40 object-contain object-center h-auto"
                  />
                  <p className="text-white text-center font-sans text-sm lg:text-base xl:text-lg font-medium">{windowStyle.title}</p>
                </div>
              ))}
            </div>
          </div>
          <Button
            type="1"
            variant="default"
            className="bg-[#2B96E4] cursor-pointer hover:bg-[#2B96E4] hover:translate-y-[-4px] transition-all duration-300 text-white font-semibold rounded-sm text-base lg:text-lg xl:text-xl py-10 px-12 w-full max-w-sm"
            onClick={handleGetPricing}
          >
            Get Pricing
          </Button>
        </div>
      </div>
    </div>
  )
}