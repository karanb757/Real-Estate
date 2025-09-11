import { Button } from '@/components/ui/button';
import { supabase } from '@/Utils/supabase/client'
import { useUser } from '@clerk/nextjs'
import { Bath, BedDouble, MapPin, Ruler, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const UserListing = () => {

    const {user}=useUser();
    const [listing,setListing]=useState()
    useEffect(()=>{
        user&&GetUserListing();
    },[user])

    const GetUserListing=async()=>{
        const {data,error}=await supabase
        .from('listing')
        .select(`*,listingImages(url,listing_id)`)
        .eq('createdBy',user?.primaryEmailAddress.emailAddress)
        setListing(data);

        console.log(data);
    }

  return (
    <div>
        <h2 className='font-bold text-2xl'>Manage Your listing</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
            {listing&&listing.map((item,index)=>(
                <div 
                className='p-3 hover:border hover:border-[#7f57f1] cursor-pointer rounded-lg'
                key={index}>
                <h2 className='bg-primary m-1 rounded-lg text-white absolute px-2 text-sm p-1 '>{item.active?'published':'Draft'}</h2>
                <Image
                  src={item?.listingImages[0]?
                  item?.listingImages[0]?.url
                  :'/placeholder.jpg'
                }
                  width={800}
                  height={150}
                  className='rounded-lg object-cover h-[170px]'
                  alt='listing image'
                />
                <div className='flex mt-2 flex-col gap-2'>
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
                    <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-400 justify-center'>
                      <Ruler className='h-4 w-4' />
                      {item?.area}
                    </h2>
                  </div>
                  <div className='flex gap-2 justify-between'>
                  <Link href={'/view-listing/'+item.id} className='w-full'>
                  <Button size='sm' variant='outline' >View</Button>
                  </Link>
                  <Link href={'/edit-listing/'+item.id} className='w-full'> 
                  <Button size='sm' className='w-full'>Edit</Button>m
                  </Link>

                  <Button size='sm' variant='destructive' className='w-full'>Delete</Button>
                  <Trash/>
                  </div>
                </div>
              </div>
            ))}
        </div>
    </div>
  )
}

export default UserListing