import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../../../../@/components/ui/carousel"
import Image from 'next/image'

const Slider = ({ imageList }) => {
  console.log(imageList)

  return (
    <div className="mt-20">
      {imageList && imageList.length > 0 ? (
        <Carousel>
          <CarouselContent>
            {imageList.map((item, index) => (
              <CarouselItem key={index}>
                <Image
                  src={item.url}
                  height={300}
                  width={800}
                  alt={`image-${index}`}
                  className="rounded-xl object-cover h-[500px] w-full"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <div className="w-full h-[200px] bg-slate-200 animate-pulse rounded-2xl"></div>
      )}
    </div>
  )
}

export default Slider
