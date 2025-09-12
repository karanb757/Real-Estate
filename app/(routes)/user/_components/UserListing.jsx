// import { Button } from '@/components/ui/button';
// import { supabase } from '@/Utils/supabase/client'
// import { useUser } from '@clerk/nextjs'
// import { Bath, BedDouble, MapPin, Ruler, Trash } from 'lucide-react';
// import Image from 'next/image';
// import Link from 'next/link';
// import React, { useEffect, useState } from 'react'

// const UserListing = () => {

//     const {user}=useUser();
//     const [listing,setListing]=useState()
//     useEffect(()=>{
//         user&&GetUserListing();
//     },[user])

//     const GetUserListing=async()=>{
//         const {data,error}=await supabase
//         .from('listing')
//         .select(`*,listingImages(url,listing_id)`)
//         .eq('createdBy',user?.primaryEmailAddress.emailAddress)
//         setListing(data);

//         console.log(data);
//     }

//   return (
//     <div>
//         <h2 className='font-bold text-2xl'>Manage Your listing</h2>
//         <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
//             {listing&&listing.map((item,index)=>(
//                 <div 
//                 className='p-3 hover:border hover:border-[#7f57f1] cursor-pointer rounded-lg'
//                 key={index}>
//                 <h2 className='bg-primary m-1 rounded-lg text-white absolute px-2 text-sm p-1 '>{item.active?'published':'Draft'}</h2>
//                 <Image
//                   src={item?.listingImages[0]?
//                   item?.listingImages[0]?.url
//                   :'/placeholder.jpg'
//                 }
//                   width={800}
//                   height={150}
//                   className='rounded-lg object-cover h-[170px]'
//                   alt='listing image'
//                 />
//                 <div className='flex mt-2 flex-col gap-2'>
//                   <h2 className='font-bold text-xl'>${item.price}</h2>
//                   <h2 className='flex gap-2 text-sm items-center text-gray-400'>
//                     <MapPin className='h-4 w-4' />
//                     {item.address}
//                   </h2>
//                   <div className='flex gap-2 mt-2 justify-between'>
//                     <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-400 justify-center'>
//                       <BedDouble className='h-4 w-4' />
//                       {item?.bedroom}
//                     </h2>
//                     <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-400 justify-center'>
//                       <Bath className='h-4 w-4' />
//                       {item?.bathroom}
//                     </h2>
//                     <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-400 justify-center'>
//                       <Ruler className='h-4 w-4' />
//                       {item?.area}
//                     </h2>
//                   </div>
//                   <div className='flex gap-2 justify-between'>
//                   <Link href={'/view-listing/'+item.id} className='w-full'>
//                   <Button size='sm' variant='outline' >View</Button>
//                   </Link>
//                   <Link href={'/edit-listing/'+item.id} className='w-full'> 
//                   <Button size='sm' className='w-full'>Edit</Button>m
//                   </Link>

//                   <Button size='sm' variant='destructive' className='w-full'>Delete</Button>
//                   <Trash/>
//                   </div>
//                 </div>
//               </div>
//             ))}
//         </div>
//     </div>
//   )
// }

// export default UserListing

import { Button } from '@/components/ui/button';
import { supabase } from '@/Utils/supabase/client'
import { useUser } from '@clerk/nextjs'
import { Bath, BedDouble, MapPin, Ruler, Trash } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

const UserListing = () => {
    const {user} = useUser();
    const [listing, setListing] = useState([])

    useEffect(() => {
        user && GetUserListing();
    }, [user])

    const GetUserListing = async() => {
        try {
            if (!user?.primaryEmailAddress?.emailAddress) {
                console.log('❌ No user email found');
                return;
            }

            const userEmail = user.primaryEmailAddress.emailAddress;
            console.log('🔍 Fetching listings for user:', userEmail);

            // Step 1: Fetch user's listings
            const { data: userListingsData, error: listingsError } = await supabase
                .from('listing')
                .select('*')
                .eq('createdBy', userEmail);

            if (listingsError) {
                console.error('❌ User listings fetch error:', listingsError);
                return;
            }

            if (!userListingsData || userListingsData.length === 0) {
                console.log('📭 No listings found for user');
                setListing([]);
                return;
            }

            console.log('✅ Fetched user listings:', userListingsData.length);

            // Step 2: Fetch images for all user listings
            const listingIds = userListingsData.map(item => item.id);
            console.log('🔍 Fetching images for listing IDs:', listingIds);

            const { data: imagesData, error: imagesError } = await supabase
                .from('listingImages')
                .select('*')
                .in('listing_id', listingIds);

            if (imagesError) {
                console.error('❌ Images fetch error:', imagesError);
            }

            console.log('📸 Fetched images:', imagesData);

            // Step 3: Group images by listing_id
            const imagesByListingId = {};
            if (imagesData) {
                imagesData.forEach(image => {
                    if (!imagesByListingId[image.listing_id]) {
                        imagesByListingId[image.listing_id] = [];
                    }
                    imagesByListingId[image.listing_id].push(image);
                });
            }

            // Step 4: Combine listings with images
            const userListingsWithImages = userListingsData.map(listing => ({
                ...listing,
                listingImages: imagesByListingId[listing.id] || []
            }));

            console.log('🎯 User listings with images:', userListingsWithImages);

            // Log each listing's images for debugging
            userListingsWithImages.forEach((item, index) => {
                console.log(`📋 User listing ${index + 1} (ID: ${item.id}) has ${item.listingImages.length} images:`, 
                    item.listingImages.map(img => img.url));
            });

            setListing(userListingsWithImages);

        } catch (err) {
            console.error('❌ Unexpected error in GetUserListing:', err);
        }
    }

    return (
        <div>
            <h2 className='font-bold text-2xl'>Manage Your listing</h2>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-3'>
                {listing && listing.map((item, index) => (
                    <div 
                        className='p-3 hover:border hover:border-[#7f57f1] cursor-pointer rounded-lg'
                        key={index}>
                        <h2 className='bg-primary m-1 rounded-lg text-white absolute px-2 text-sm p-1 '>
                            {item.active ? 'published' : 'Draft'}
                        </h2>
                        <Image
                            src={
                                item?.listingImages && 
                                item.listingImages[0] && 
                                item.listingImages[0].url &&
                                item.listingImages[0].url.trim() !== ""
                                    ? item.listingImages[0].url 
                                    : '/placeholder.jpg'
                            }
                            width={800}
                            height={150}
                            className='rounded-lg object-cover h-[170px]'
                            alt='listing image'
                        />
                        <div className='flex mt-2 flex-col gap-2'>
                            <h2 className='font-bold text-xl'>
                                ${item?.sellingPrice || item?.price || 'N/A'}
                            </h2>
                            <h2 className='flex gap-2 text-sm items-center text-gray-400'>
                                <MapPin className='h-4 w-4' />
                                {item.address}
                            </h2>
                            <div className='flex gap-2 mt-2 justify-between'>
                                <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-400 justify-center'>
                                    <BedDouble className='h-4 w-4' />
                                    {item?.bedroom || 0}
                                </h2>
                                <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-400 justify-center'>
                                    <Bath className='h-4 w-4' />
                                    {item?.bathroom || 0}
                                </h2>
                                <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-400 justify-center'>
                                    <Ruler className='h-4 w-4' />
                                    {item?.area || 0}
                                </h2>
                            </div>
                            <div className='flex gap-2 justify-between'>
                                <Link href={'/view-listing/' + item.id} className='w-full'>
                                    <Button size='sm' variant='outline' className='w-full'>View</Button>
                                </Link>
                                <Link href={'/edit-listing/' + item.id} className='w-full'> 
                                    <Button size='sm' className='w-full'>Edit</Button>
                                </Link>
                                <Button size='sm' variant='destructive' className='w-full flex gap-1'>
                                    <Trash className='h-4 w-4'/>
                                    Delete
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default UserListing