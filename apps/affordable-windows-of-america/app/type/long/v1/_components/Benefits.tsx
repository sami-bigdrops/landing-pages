import Image from "next/image";
import { BENEFITS_CONTENT } from "@/lib/constant";

export default function Benefits() {
  const { before, gradient, after } = BENEFITS_CONTENT.headerParts;
  const cards = BENEFITS_CONTENT.benefitCards;
  const card0 = cards[0];
  const card1 = cards[1];
  const card2 = cards[2];
  return (
    <div className="benefits bg-[#F3F6FA] w-full h-full px-4 py-8 md:px-6 md:py-8 lg:px-14 lg:py-10 xl:px-20 xl:py-14">
      <div className="container mx-auto">
        <div className="benefits-content w-full flex flex-col items-center justify-center gap-3 md:gap-6 lg:gap-10 xl:gap-14">
          <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-[#111827] text-center font-sans md:max-w-[400px] lg:max-w-[500px] xl:max-w-[600px] leading-tight tracking-tight">
            {before}
            <span
              style={{
                background: BENEFITS_CONTENT.headingGradient,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {gradient}
            </span>
            {after}
          </h2>
        </div>

        <div className="mobile-view md:hidden flex flex-col items-center justify-center gap-3 mt-6">
          <div className="window-image-container w-full flex items-center justify-center">
            <Image
              src={BENEFITS_CONTENT.windowImage}
              alt="Energy Saving Window"
              width={500}
              height={600}
              className="w-[300px] h-[330px] object-contain"
            />
          </div>
          <div className="benefit-cards flex flex-col items-center justify-center gap-4 w-full">
            {BENEFITS_CONTENT.benefitCards.map((card, index) => (
              <div
                key={index}
                className="benefit-card p-6 flex flex-col items-center justify-center gap-5 w-full border border-[#BBB] bg-white shadow-[4px_4px_12px_0_rgba(0,0,0,0.05)]"
              >
                <div className="flex flex-col items-start justify-start gap-3">
                  <div className="icon-container flex items-center justify-start gap-2">
                    <div className="w-7 h-7 rounded-full flex items-center justify-center">
                      <Image
                        src={card.icon}
                        alt={card.title}
                        width={32}
                        height={32}
                        className="w-6 h-6"
                      />
                    </div>
                    <h3 className="card-title text-lg font-semibold font-sans">
                      {card.title}
                    </h3>
                  </div>
                  <div className="content">
                    <p className="card-description text-gray text-sm leading-relaxed font-sans">
                      {card.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="desktop-view hidden md:block relative w-full max-w-6xl mx-auto">
          <div className="relative flex items-center justify-center">
            <div className="relative window-container z-0">
              <Image
                src={BENEFITS_CONTENT.windowImage}
                alt="Energy Saving Window"
                width={350}
                height={500}
                className="w-[350px] h-[500px] lg:w-[400px] lg:h-[500px] xl:w-[550px] xl:h-[660px] object-contain"
              />
            </div>

            <div className="absolute top-21 xl:top-19 left-0 xl:-left-14 w-58 lg:w-62 xl:w-96 p-4 xl:p-6 border border-[#BBB] bg-white shadow-[4px_4px_12px_0_rgba(0,0,0,0.05)]">
              <div className="icon-container flex items-center gap-2 mb-1 xl:gap-4">
                <div className="w-[22px] h-[22px] xl:w-[40px] xl:h-[40px] rounded-full flex items-center justify-center">
                  <Image
                    src={card0!.icon}
                    alt={card0!.title}
                    width={32}
                    height={32}
                    className="w-[22px] h-[22px] xl:w-[40px] xl:h-[40px]"
                  />
                </div>
                <h3 className="card-title text-base font-semibold font-montserrat lg:text-[1.1rem] xl:text-[1.55rem]">
                  {card0!.title}
                </h3>
              </div>
              <div className="content pt-1 lg:pt-2 xl:pt-3">
                <p className="card-description text-gray text-xs leading-relaxed font-roboto lg:text-[0.85rem] xl:text-[1.1rem] xl:leading-normal">
                  {card0!.description}
                </p>
              </div>
              <div className="connection-line absolute top-15 lg:top-20 xl:top-16 -right-22 lg:-right-40 xl:-right-44.5 w-22 lg:w-40.5 xl:w-45 h-0.5 border-dashed border-t-2 xl:border-t-2.5 border-orange-500 transform -translate-y-1/5 rotate-[14.964deg] z-10" />
            </div>

            <div className="absolute top-77 xl:top-105 left-0 lg:-left-0 xl:-left-14 w-55 lg:w-62 xl:w-96 p-4 xl:p-6 border border-[#BBB] bg-white shadow-[4px_4px_12px_0_rgba(0,0,0,0.05)]">
              <div className="icon-container flex items-center gap-2 mb-1 xl:gap-4">
                <div className="w-[22px] h-[22px] xl:w-[40px] xl:h-[40px] rounded-full flex items-center justify-center">
                  <Image
                    src={card2!.icon}
                    alt={card2!.title}
                    width={32}
                    height={32}
                    className="w-[22px] h-[22px] xl:w-[40px] xl:h-[40px]"
                  />
                </div>
                <h3 className="card-title text-base font-semibold font-montserrat lg:text-[1.1rem] xl:text-[1.55rem]">
                  {card2!.title}
                </h3>
              </div>
              <div className="content pt-1 lg:pt-2 xl:pt-3">
                <p className="card-description text-gray text-xs leading-relaxed font-roboto lg:text-[0.85rem] xl:text-[1.1rem] xl:leading-normal">
                  {card2!.description}
                </p>
              </div>
              <div className="connection-line absolute -top-0 lg:top-8 -right-16.5 lg:-right-33 xl:-right-37 w-20 lg:w-38 xl:w-43 h-0.5 border-dashed border-t-2 xl:border-t-2.5 border-orange-500 transform -translate-y-1/2 -rotate-[45deg] xl:-rotate-[43.964deg] z-10" />
            </div>

            <div className="absolute top-52 xl:top-65 xl:-right-14 right-0 w-55 lg:w-62 xl:w-96 p-4 xl:p-6 border border-[#BBB] bg-white shadow-[4px_4px_12px_0_rgba(0,0,0,0.05)]">
              <div className="icon-container flex items-center gap-2 mb-1 xl:gap-4">
                <div className="w-[22px] h-[22px] xl:w-[40px] xl:h-[40px] rounded-full flex items-center justify-center">
                  <Image
                    src={card1!.icon}
                    alt={card1!.title}
                    width={32}
                    height={32}
                    className="w-[22px] h-[22px] xl:w-[40px] xl:h-[40px]"
                  />
                </div>
                <h3 className="card-title text-base font-semibold font-montserrat lg:text-[1.1rem] xl:text-[1.55rem]">
                  {card1!.title}
                </h3>
              </div>
              <div className="content pt-1 lg:pt-2 xl:pt-3">
                <p className="card-description text-gray text-xs leading-relaxed font-roboto lg:text-[0.85rem] xl:text-[1.1rem] xl:leading-normal">
                  {card1!.description}
                </p>
              </div>
              <div className="connection-line absolute top-12 lg:top-24 xl:top-19 right-53.5 lg:right-60 xl:right-94 w-20 lg:w-34 xl:w-38 h-0.5 border-dashed border-t-2 xl:border-t-2.5 border-orange-500 transform -translate-y-1/2 rotate-[150.964deg] xl:rotate-[157.964deg] z-10" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
