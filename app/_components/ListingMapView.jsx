// "use client"
// import React, { useEffect, useState } from 'react'
// import { supabase } from "../../Utils/supabase/client.js"
// import Listing from './Lisitng.jsx'
// import { toast } from 'sonner'
// import GoogleMapSection from './GoogleMapSection.jsx'

// function ListingMapView({type}) {

//     const [listing,setListing] = useState([])
//     const [searchedAddress,setSearchedAddress] = useState()
//     const [bedCount,setBedCount]= useState(0)
//     const [bathCount,setBathCount]= useState(0)
//     const [ParkCount,setParkCount]= useState(0)
//     const [homeType,setHomeType]= useState()
//     const [coordinates,setCoordinates]=useState()

//     useEffect(()=>{
//         getLatestListing()
//     },[])

//     const getLatestListing = async () => {
//       try {
//         let query = supabase
//           .from('listing')
//           .select(`
//             *,
//             listingImages (
//               url,
//               listing_id
//             )
//           `)
//           .eq('active', true)
//           .eq('type', type)
//           .gte('bedroom', bedCount) // ✅ Corrected typo
//           .gte('bathroom', bathCount)
//           .gte('parking', ParkCount)
//           .order('id', { ascending: false });
    
//         if (homeType) {
//           query = query.eq('propertyType', homeType);
//         }
    
//         const { data, error } = await query;
    
//         if (error) {
//           console.error('Supabase error:', error);
//           toast('Failed to fetch data from Supabase!');
//         } 
//         else {
//           console.log('Fetched data:', data); // ✅ Add this
//           setListing(data);
//         }
//       } 
      
//       catch (err) {
//         console.error('Unexpected error:', err);
//         toast('Something went wrong!');
//       }
//     };

//     const handleSearchClick=async()=>{
//             console.log('searchedAddress',searchedAddress);
//             const searchTerm=searchedAddress?.value?.structured_formatting?.main_text
           
//             const {data,error} = await supabase
//             .from('listing')
//             .select(`*,listingImages(
//                   url,
//                   listing_id
//             )`)
//             .eq('active',true)
//             .eq('type',type)
//             .like('address','%'+searchTerm+'%')
//             .order('id',{ascending:false})

//             if(data){
//                 setListing(data);
//             }
//     }
    
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//       <div>
//       <Listing
//         listing={listing}
//         handleSearchClick={handleSearchClick}
//         searchedAddress={(v) => setSearchedAddress(v)}
//         setBathCount={setBathCount}
//         setBedCount={setBedCount}
//         setParkCount={setParkCount}
//         setHomeType={setHomeType}
//       />
//       </div>

//       <div className='fixed right-10 h-full md:w-[350px] lg:w-[690px] xl-[650px]'>
//           <GoogleMapSection 
//           listing={listing}
//           coordinates={coordinates}
//           />
//       </div>
//     </div>
//   )
// }

// export default ListingMapView

"use client"
import React, { useEffect, useState } from 'react'
import { supabase } from "../../Utils/supabase/client.js"
import Listing from './Listing.jsx'
import { toast } from 'sonner'
import GoogleMapSection from './GoogleMapSection.jsx'

function ListingMapView({type}) {

    const [listing,setListing] = useState([])
    const [searchedAddress,setSearchedAddress] = useState()
    const [bedCount,setBedCount]= useState(0)
    const [bathCount,setBathCount]= useState(0)
    const [parkCount,setParkCount]= useState(0)
    const [homeType,setHomeType]= useState()
    const [coordinates,setCoordinates]=useState()

    useEffect(()=>{
        getLatestListing()
    },[bedCount, bathCount, parkCount, homeType])

    const getLatestListing = async () => {
      try {
        console.log('🟡 Fetching listings with filters:', { type, bedCount, bathCount, parkCount, homeType });
        
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
          .order('id', { ascending: false });

        if (bedCount > 0) {
          query = query.gte('bedroom', bedCount);
        }
        if (bathCount > 0) {
          query = query.gte('bathroom', bathCount);
        }
        if (parkCount > 0) {
          query = query.gte('parking', parkCount);
        }
        if (homeType) {
          query = query.eq('propertyType', homeType);
        }

        const { data, error } = await query;
    
        if (error) {
          console.error('❌ Supabase fetch error:', error);
          toast.error('Failed to fetch data from Supabase!');
        } 
        else {
          console.log('✅ Fetched listing data:', JSON.stringify(data, null, 2)); // 🔍 Deep inspection
          console.log('📦 Total listings fetched:', data?.length);
          if (data?.length > 0) {
            data.forEach((listingItem, index) => {
              console.log(`📸 Listing ${index + 1} image URL:`, listingItem?.listingImages?.[0]?.url);
            });
          }
          setListing(data || []);
        }
      } 
      catch (err) {
        console.error('❌ Unexpected fetch error:', err);
        toast.error('Something went wrong!');
      }
    };

    const handleSearchClick=async()=>{
      try {
        console.log('🔍 searchedAddress:', searchedAddress);
        const searchTerm = searchedAddress?.value?.structured_formatting?.main_text;

        if (!searchTerm) {
          toast.error('Please select an address to search');
          return;
        }

        const {data, error} = await supabase
        .from('listing')
        .select(`*,listingImages(
              url,
              listing_id
        )`)
        .eq('active',true)
        .eq('type',type)
        .like('address','%'+searchTerm+'%')
        .order('id',{ascending:false})

        if (error) {
          console.error('❌ Search error:', error);
          toast.error('Failed to search listings');
        } else {
          console.log('🔎 Search results:', JSON.stringify(data, null, 2));
          data?.forEach((result, i) => {
            console.log(`🔎 Result ${i + 1} image URL:`, result?.listingImages?.[0]?.url);
          });
          setListing(data || []);
        }
      } catch (err) {
        console.error('❌ Search unexpected error:', err);
        toast.error('Something went wrong during search');
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

      <div className='fixed right-10 h-full md:w-[350px] lg:w-[690px] xl:w-[650px]'>
          <GoogleMapSection 
            listing={listing}
            coordinates={coordinates}
          />
      </div>
    </div>
  )
}

export default ListingMapView
