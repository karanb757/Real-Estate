import { Button } from '../../@/components/ui/button'
import { Bath, BedDouble, MapPin, Ruler, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const MarkerListingItem = ({item,closeHandler}) => {
  return (
    <div>
        <div
                className=' rounded-lg w-[180px]'
                key={index}
              >
                <X onClick={()=>closeHandler()}/>
                <Image
                  src={item.listingImages[0]?.url}
                  width={800}
                  height={150}
                  className='rounded-lg object-cover h-[120px] w-[180px]'
                  alt='listing image'
                />
                <div className='flex mt-2 flex-col gap-2 p-2'>
                  <h2 className='font-bold text-xl'>${item.price}</h2>
                  <h2 className='flex gap-2 text-sm items-center text-gray-400'>
                    <MapPin className='h-4 w-4' />
                    {item.address}
                  </h2>
                  <div className='flex gap-2 mt-2 justify-between'>
                    <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-400 justify-center'>
                      <BedDouble className='h-4 w-4' />
                      {item?.bedroom}
                    </h2>
                    <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-400 justify-center'>
                      <Bath className='h-4 w-4' />
                      {item?.bathroom}
                    </h2>
                  </div>
                  <Button size='sm'>View Details</Button>
                </div>
              </div>
    </div>
  )
}

export default MarkerListingItem