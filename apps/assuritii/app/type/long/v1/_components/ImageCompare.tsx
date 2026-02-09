import { ReactCompareSlider, ReactCompareSliderImage } from 'react-compare-slider'
import { IMAGE_COMPARE_CONTENT } from '@/lib/constant'

export default function ImageCompare() {
    return (
        <div className="image-compare bg-white w-full h-full p-4 md:p-6 lg:px-14 lg:py-10 xl:px-20 xl:py-16">
          <div className="container mx-auto">
            <div className="image-compare-content w-full flex flex-col items-center justify-center gap-3 md:gap-6 lg:gap-10 xl:gap-14">
              <h2 className="text-2xl lg:text-3xl xl:text-4xl font-bold text-[#111827] text-center  font-['Inter']">
                {IMAGE_COMPARE_CONTENT.header}
              </h2>
              <div>
                <ReactCompareSlider
                  itemOne={<ReactCompareSliderImage src={IMAGE_COMPARE_CONTENT.imageOne.src} alt={IMAGE_COMPARE_CONTENT.imageOne.alt} />}
                  itemTwo={<ReactCompareSliderImage src={IMAGE_COMPARE_CONTENT.imageTwo.src} alt={IMAGE_COMPARE_CONTENT.imageTwo.alt} />}
                />
              </div>
            </div>
            
          </div>
         
        </div>
      )
}