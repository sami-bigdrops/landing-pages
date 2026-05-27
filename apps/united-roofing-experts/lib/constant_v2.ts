export const HERO_CONTENT = {
    headline: "Affordable Metal Roofs Built for Long-Term Protection",
    description: "Licensed, insured and straightforward. Book a free roof inspection and find out if your home is ready for a stronger roofing system.",
    image: {
      src: "/V2/hero-bg.webp",
      alt: "Roof",
    },
    
   
  } as const

  export const Features_CONTENT = {
    header: "Signs Your Roof May Need Attention",
    description: "Small roofing issues can become expensive problems when left unchecked.",
  
    featuresSteps: [
      {
        number: 1,
        title: "Curled / Missing Shingles",
        description: "Curled, lifted or missing shingles may be a sign of ageing, storm damage or weakened roof.",
        image: {
          src: "/V2/feature-1.webp",
          alt: "Start with your ZIP Code",
        },
      },
      {
        number: 2,
        title: "Moss growth",
        description: "Moss build-up can trap moisture and slowly weaken roofing materials over time.",
        image: {
          src: "/V2/feature-2.webp",
          alt: "Moss growth",
        },
      },
      {
        number: 3,
        title: "Granules in the Gutters",
        description: "Excess granules in your gutters may mean shingles are wearing down and losing protection.",
        image: {
          src: "/V2/feature-3.webp",
          alt: "Granules in the Gutters",
        },
      },

      {
        number: 4,
        title: "Insects in the attic",
        description: "Pests entering through the attic may point to gaps, damaged roof sections or ventilation issues.",
        image: {
          src: "/V2/feature-4.webp",
          alt: "Insects in attic",
        },
      },
    ]
  } as const


  export const ROOF_CONTENT = {
    headline: "Ready for Your Free Roof Inspection?",

    image: {
      src: "V2/roof-bg.webp",
      alt: "Roof",
    },
     
    providers: [
      {
        
        logo: {
          src: "V2/partner-1.svg",
          alt: "ADT logo",
        },
        width: 140,
        height: 56,
        imageClassName:
          "h-11 w-auto max-w-[9rem] object-contain md:h-12 md:max-w-[10rem] lg:h-13 lg:max-w-[11rem] xl:h-15 xl:max-w-[13rem]",
      },
      {
        logo: {
          src: "V2/partner-2.svg",
          alt: "Vivint logo",
        },
        width: 120,
        height: 40,
        imageClassName:
          "h-6 w-auto max-w-[7rem] object-contain md:h-8 md:max-w-[8rem] lg:h-9 lg:max-w-[9rem] xl:h-10 xl:max-w-[10rem]",
      },
      {
        logo: {
          src: "V2/partner-3.svg",
          alt: "Brinks Home logo",
        },
        width: 200,
        height: 56,
        imageClassName:
          "h-9 w-auto max-w-[11rem] object-contain md:h-10 md:max-w-[12rem] lg:h-11 lg:max-w-[13rem] xl:h-12 xl:max-w-[16rem]",
      },
    ],
    
  } as const
  