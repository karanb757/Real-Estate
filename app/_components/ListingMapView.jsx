"use client"
import React, { useEffect, useState } from 'react'
import { supabase } from "../../Utils/supabase/client.js"
import Listing from './Lisitng.jsx'
import { toast } from 'sonner'
import GoogleMapSection from './GoogleMapSection.jsx'

function ListingMapView({type}) {

    const [listing,setListing] = useState([])
    const [searchedAddress,setSearchedAddress] = useState()
    const [bedCount,setBedCount]= useState(0)
    const [bathCount,setBathCount]= useState(0)
    const [ParkCount,setParkCount]= useState(0)
    const [homeType,setHomeType]= useState()
    const [coordinates,setCoordinates]=useState()

    useEffect(()=>{
        getLatestListing()
    },[])

    const getLatestListing = async () => {
      try {
        let query = supabase
          .from('listing')
          .select(`
            *,
            listingImages (
              url,
              listing_id
            )
          `)
          .eq('active', true)
          .eq('type', type)
          .gte('bedroom', bedCount) // ✅ Corrected typo
          .gte('bathroom', bathCount)
          .gte('parking', ParkCount)
          .order('id', { ascending: false });
    
        if (homeType) {
          query = query.eq('propertyType', homeType);
        }
    
        const { data, error } = await query;
    
        if (error) {
          console.error('Supabase error:', error);
          toast('Failed to fetch data from Supabase!');
        } 
        else {
          console.log('Fetched data:', data); // ✅ Add this
          setListing(data);
        }
      } 
      
      catch (err) {
        console.error('Unexpected error:', err);
        toast('Something went wrong!');
      }
    };

    const handleSearchClick=async()=>{
            console.log('searchedAddress',searchedAddress);
            const searchTerm=searchedAddress?.value?.structured_formatting?.main_text
           
            const {data,error} = await supabase
            .from('listing')
            .select(`*,listingImages(
                  url,
                  listing_id
            )`)
            .eq('active',true)
            .eq('type',type)
            .like('address','%'+searchTerm+'%')
            .order('id',{ascending:false})

            if(data){
                setListing(data);
            }
    }
    
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
      <Listing
        listing={listing}
        handleSearchClick={handleSearchClick}
        searchedAddress={(v) => setSearchedAddress(v)}
        setBathCount={setBathCount}
        setBedCount={setBedCount}
        setParkCount={setParkCount}
        setHomeType={setHomeType}
      />
      </div>

      <div className='fixed right-10 h-full md:w-[350px] lg:w-[690px] xl-[650px]'>
          <GoogleMapSection 
          listing={listing}
          coordinates={coordinates}
          />
      </div>
    </div>
  )
}

export default ListingMapView
