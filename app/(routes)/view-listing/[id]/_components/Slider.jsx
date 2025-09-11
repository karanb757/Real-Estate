import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"

const Slider = ({imageList}) => {

    console.log(imageList)

  return (
    <div className='mt-5'>
    {imageList?    
    <Carousel>
  <CarouselContent>
    {imageList.map((item,index)=>{
        <CarouselItem>
            <Img 
            src={item.url}
            height={300}
            width={800}
            alt='image'
            className='rounded-xl object-cover h-[300px] w-full '
            />
        </CarouselItem>
    })}
  </CarouselContent>
  <CarouselPrevious />
  <CarouselNext />
</Carousel>
:<div className='w-full h-[200px] bg-slate-200 animate-pulse rounded-2xl'>

</div>}
    </div>
  )
}

export default Slider