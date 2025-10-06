"use client"
import React, { useEffect, useState } from 'react'
import { supabase } from '../../../../Utils/supabase/client'
import { toast } from 'sonner'
import Slider from './_components/Slider'
import Details from './_components/Details'

const ViewListing = ({params}) => {
    const [listingDetail, setListingDetail] = useState()

    useEffect(() => {
        GetListingDetail();
    }, [])

    const GetListingDetail = async() => {
        try {
            console.log('🔍 Fetching listing detail for ID:', params.id);
            
            // Step 1: Fetch the listing
            const { data: listingData, error: listingError } = await supabase
                .from('listing')
                .select('*')
                .eq('id', params.id)
                .eq('active', true);

            if (listingError) {
                console.error('❌ Listing fetch error:', listingError);
                toast.error('Failed to fetch listing details');
                return;
            }

            if (!listingData || listingData.length === 0) {
                console.log('📭 No listing found');
                toast.error('Listing not found');
                return;
            }

            const listing = listingData[0];
            console.log('✅ Fetched listing:', listing);

            // Step 2: Fetch images for this listing
            const { data: imagesData, error: imagesError } = await supabase
                .from('listingImages')
                .select('*')
                .eq('listing_id', params.id);

            if (imagesError) {
                console.error('❌ Images fetch error:', imagesError);
            }

            console.log('📸 Fetched images for listing:', imagesData);

            // Step 3: Combine listing with images
            const listingWithImages = {
                ...listing,
                listingImages: imagesData || []
            };

            console.log('🎯 Final listing with images:', listingWithImages);
            console.log('📷 Number of images:', listingWithImages.listingImages.length);
            
            if (listingWithImages.listingImages.length > 0) {
                listingWithImages.listingImages.forEach((img, index) => {
                    console.log(`🖼️ Image ${index + 1}:`, img.url);
                });
            }

            setListingDetail(listingWithImages);

        } catch (err) {
            console.error('❌ Unexpected error:', err);
            toast.error('Something went wrong');
        }
    }

    return (
        <div className='px-4 md:px-32 lg:px-56 my-3 py-5'>
            <Slider imageList={listingDetail?.listingImages}/>
            <Details listingDetail={listingDetail}/>
        </div>
    )
}

export default ViewListing