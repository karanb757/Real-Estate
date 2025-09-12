// "use client"
// import React, { useEffect, useState } from 'react'
// import { supabase } from "../../Utils/supabase/client.js"
// import Listing from './Listing.jsx'
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

// "use client"
// import React, { useEffect, useState } from 'react'
// import { supabase } from "../../Utils/supabase/client.js"
// import Listing from './Listing.jsx'
// import { toast } from 'sonner'
// import GoogleMapSection from './GoogleMapSection.jsx'

// function ListingMapView({type}) {

//     const [listing,setListing] = useState([])
//     const [searchedAddress,setSearchedAddress] = useState()
//     const [bedCount,setBedCount]= useState(0)
//     const [bathCount,setBathCount]= useState(0)
//     const [parkCount,setParkCount]= useState(0)
//     const [homeType,setHomeType]= useState()
//     const [coordinates,setCoordinates]=useState()

//     useEffect(()=>{
//         getLatestListing()
//     },[bedCount, bathCount, parkCount, homeType])

//     const getLatestListing = async () => {
//       try {
//         console.log('🟡 Fetching listings with filters:', { type, bedCount, bathCount, parkCount, homeType });
        
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
//           .order('id', { ascending: false });

//         if (bedCount > 0) {
//           query = query.gte('bedroom', bedCount);
//         }
//         if (bathCount > 0) {
//           query = query.gte('bathroom', bathCount);
//         }
//         if (parkCount > 0) {
//           query = query.gte('parking', parkCount);
//         }
//         if (homeType) {
//           query = query.eq('propertyType', homeType);
//         }

//         const { data, error } = await query;
    
//         if (error) {
//           console.error('❌ Supabase fetch error:', error);
//           toast.error('Failed to fetch data from Supabase!');
//         } 
//         else {
//           console.log('✅ Fetched listing data:', JSON.stringify(data, null, 2)); // 🔍 Deep inspection
//           console.log('📦 Total listings fetched:', data?.length);
//           if (data?.length > 0) {
//             data.forEach((listingItem, index) => {
//               console.log(`📸 Listing ${index + 1} image URL:`, listingItem?.listingImages?.[0]?.url);
//             });
//           }
//           setListing(data || []);
//         }
//       } 
//       catch (err) {
//         console.error('❌ Unexpected fetch error:', err);
//         toast.error('Something went wrong!');
//       }
//     };

//     const handleSearchClick=async()=>{
//       try {
//         console.log('🔍 searchedAddress:', searchedAddress);
//         const searchTerm = searchedAddress?.value?.structured_formatting?.main_text;

//         if (!searchTerm) {
//           toast.error('Please select an address to search');
//           return;
//         }

//         const {data, error} = await supabase
//         .from('listing')
//         .select(`*,listingImages(
//               url,
//               listing_id
//         )`)
//         .eq('active',true)
//         .eq('type',type)
//         .like('address','%'+searchTerm+'%')
//         .order('id',{ascending:false})

//         if (error) {
//           console.error('❌ Search error:', error);
//           toast.error('Failed to search listings');
//         } else {
//           console.log('🔎 Search results:', JSON.stringify(data, null, 2));
//           data?.forEach((result, i) => {
//             console.log(`🔎 Result ${i + 1} image URL:`, result?.listingImages?.[0]?.url);
//           });
//           setListing(data || []);
//         }
//       } catch (err) {
//         console.error('❌ Search unexpected error:', err);
//         toast.error('Something went wrong during search');
//       }
//     }
    
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//       <div>
//         <Listing
//           listing={listing}
//           handleSearchClick={handleSearchClick}
//           searchedAddress={(v) => setSearchedAddress(v)}
//           setBathCount={setBathCount}
//           setBedCount={setBedCount}
//           setParkCount={setParkCount}
//           setHomeType={setHomeType}
//         />
//       </div>

//       <div className='fixed right-10 h-full md:w-[350px] lg:w-[690px] xl:w-[650px]'>
//           <GoogleMapSection 
//             listing={listing}
//             coordinates={coordinates}
//           />
//       </div>
//     </div>
//   )
// }

// export default ListingMapView
// // Fixed ListingMapView component with proper case handling

// "use client"
// import React, { useEffect, useState } from 'react'
// import { supabase } from "../../Utils/supabase/client.js"
// import Listing from './Listing.jsx'
// import { toast } from 'sonner'
// import GoogleMapSection from './GoogleMapSection.jsx'

// function ListingMapView({ type }) {
//   const [listing, setListing] = useState([])
//   const [searchedAddress, setSearchedAddress] = useState()
//   const [bedCount, setBedCount] = useState(0)
//   const [bathCount, setBathCount] = useState(0)
//   const [parkCount, setParkCount] = useState(0)
//   const [homeType, setHomeType] = useState()
//   const [coordinates, setCoordinates] = useState()

//   // Fetch listings and attach images
//   const getListings = async () => {
//     try {
//       const properType = type?.charAt(0).toUpperCase() + type?.slice(1).toLowerCase()

//       // Step 1: Fetch listings with filters
//       let listingQuery = supabase
//         .from('listing')
//         .select('*')
//         .eq('active', true)
//         .eq('type', properType)
//         .order('id', { ascending: false })

//       if (bedCount > 0) listingQuery = listingQuery.gte('bedroom', bedCount)
//       if (bathCount > 0) listingQuery = listingQuery.gte('bathroom', bathCount)
//       if (parkCount > 0) listingQuery = listingQuery.gte('parking', parkCount)
//       if (homeType && homeType !== '') listingQuery = listingQuery.eq('propertyType', homeType)

//       const { data: listingsData, error: listingsError } = await listingQuery
//       if (listingsError) throw listingsError
//       if (!listingsData || listingsData.length === 0) {
//         setListing([])
//         return
//       }

//       // Step 2: Fetch images for all listings
//       const listingIds = listingsData.map(l => Number(l.id)) // ensure numeric
//       const { data: imagesData, error: imagesError } = await supabase
//         .from('listingImages')
//         .select('*')
//         .in('listing_id', listingIds)
//         .order('created_at', { ascending: true })

//       if (imagesError) console.error('Images fetch error:', imagesError)

//       // Step 3: Map images to listings
//       const imagesByListing = {}
//       imagesData?.forEach(img => {
//         if (!imagesByListing[img.listing_id]) imagesByListing[img.listing_id] = []
//         imagesByListing[img.listing_id].push(img)
//       })

//       const listingsWithImages = listingsData.map(l => ({
//         ...l,
//         listingImages: imagesByListing[l.id] || []
//       }))

//       setListing(listingsWithImages)

//     } catch (err) {
//       console.error('❌ Listings fetch error:', err)
//       toast.error('Failed to fetch listings')
//       setListing([])
//     }
//   }

//   useEffect(() => {
//     getListings()
//   }, [bedCount, bathCount, parkCount, homeType, type])

//   // Handle search click
//   const handleSearchClick = async () => {
//     if (!searchedAddress?.value?.structured_formatting?.main_text) {
//       toast.error('Please select an address')
//       return
//     }
//     await getListings()
//   }

//   const handleResetSearch = () => {
//     setSearchedAddress(null)
//     getListings()
//     toast.success('Search cleared')
//   }

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//       <div>
//         <Listing
//           listing={listing}
//           handleSearchClick={handleSearchClick}
//           handleResetSearch={handleResetSearch}
//           searchedAddress={(v) => setSearchedAddress(v)}
//           setBathCount={setBathCount}
//           setBedCount={setBedCount}
//           setParkCount={setParkCount}
//           setHomeType={setHomeType}
//           bedCount={bedCount}
//           bathCount={bathCount}
//           parkCount={parkCount}
//           homeType={homeType}
//         />
//       </div>

//       <div className='fixed right-10 h-full md:w-[350px] lg:w-[690px] xl:w-[650px]'>
//         <GoogleMapSection
//           listing={listing}
//           coordinates={coordinates}
//         />
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
    const [listing, setListing] = useState([])
    const [searchedAddress, setSearchedAddress] = useState()
    const [bedCount, setBedCount] = useState(0)
    const [bathCount, setBathCount] = useState(0)
    const [ParkCount, setParkCount] = useState(0)
    const [homeType, setHomeType] = useState()
    const [coordinates, setCoordinates] = useState()

    useEffect(() => {
        getLatestListing()
    }, [bedCount, bathCount, ParkCount, homeType])

    useEffect(() => {
        // Force a fresh fetch after RLS policy change
        console.log('🔄 Force refreshing after RLS fix...');
        getLatestListing();
      }, []); // Empty dependency array to run once
      
      // Or alternatively, add a manual refresh button temporarily:
      const forceRefresh = () => {
        console.log('🔄 Manual refresh triggered');
        getLatestListing();
      };

    const fetchImagesForListings = async (listingIds) => {
        console.log('🔍 Original listing IDs:', listingIds);
        console.log('🔍 ID types:', listingIds.map(id => ({ id, type: typeof id })));

        // Convert to both strings and numbers to handle any type mismatch
        const stringIds = listingIds.map(id => String(id));
        const numberIds = listingIds.map(id => parseInt(id)).filter(id => !isNaN(id));

        console.log('🔄 String IDs:', stringIds);
        console.log('🔄 Number IDs:', numberIds);

        // Try the original query first
        let { data: imagesData, error: imagesError } = await supabase
            .from('listingImages')
            .select('*')
            .in('listing_id', listingIds);

        console.log('📸 First attempt - images found:', imagesData?.length || 0);

        // If no results and we have different type arrays, try with numbers
        if ((!imagesData || imagesData.length === 0) && numberIds.length > 0) {
            console.log('🔄 Trying with number IDs...');
            const { data: numberImagesData, error: numberImagesError } = await supabase
                .from('listingImages')
                .select('*')
                .in('listing_id', numberIds);
            
            if (numberImagesData && numberImagesData.length > 0) {
                imagesData = numberImagesData;
                console.log('✅ Found images with number IDs:', imagesData.length);
            }
        }

        // If still no results, try with strings
        if ((!imagesData || imagesData.length === 0) && stringIds.length > 0) {
            console.log('🔄 Trying with string IDs...');
            const { data: stringImagesData, error: stringImagesError } = await supabase
                .from('listingImages')
                .select('*')
                .in('listing_id', stringIds);
            
            if (stringImagesData && stringImagesData.length > 0) {
                imagesData = stringImagesData;
                console.log('✅ Found images with string IDs:', imagesData.length);
            }
        }

        // If still no results, let's check what's actually in the database
        if (!imagesData || imagesData.length === 0) {
            console.log('🔍 Still no images found, checking database...');
            
            const { data: allImages } = await supabase
                .from('listingImages')
                .select('*')
                .limit(10);
            
            console.log('📊 Sample images in database:', allImages);
            
            if (allImages && allImages.length > 0) {
                console.log('🔍 Database listing_id types:', allImages.map(img => ({ 
                    listing_id: img.listing_id, 
                    type: typeof img.listing_id 
                })));
                
                // Try one more time with manual matching
                const manualMatch = allImages.filter(img => 
                    listingIds.includes(img.listing_id) || 
                    listingIds.includes(String(img.listing_id)) ||
                    listingIds.includes(parseInt(img.listing_id))
                );
                
                if (manualMatch.length > 0) {
                    console.log('✅ Found images with manual matching:', manualMatch.length);
                    imagesData = manualMatch;
                }
            }
        }

        if (imagesError) {
            console.error('❌ Images fetch error:', imagesError);
        }

        return imagesData || [];
    };

    const getLatestListing = async () => {
        try {
            console.log('🟡 Fetching listings with filters:', { type, bedCount, bathCount, ParkCount, homeType });
            
            // Step 1: Fetch listings based on filters
            let listingQuery = supabase
                .from('listing')
                .select('*')
                .eq('active', true)
                .eq('type', type)
                .order('id', { ascending: false });

            // Apply filters
            if (bedCount > 0) {
                listingQuery = listingQuery.gte('bedroom', bedCount);
            }
            if (bathCount > 0) {
                listingQuery = listingQuery.gte('bathroom', bathCount);
            }
            if (ParkCount > 0) {
                listingQuery = listingQuery.gte('parking', ParkCount);
            }
            if (homeType) {
                listingQuery = listingQuery.eq('propertyType', homeType);
            }

            const { data: listingsData, error: listingsError } = await listingQuery;

            if (listingsError) {
                console.error('❌ Listings fetch error:', listingsError);
                toast.error('Failed to fetch listings!');
                return;
            }

            if (!listingsData || listingsData.length === 0) {
                console.log('📭 No listings found');
                setListing([]);
                return;
            }

            console.log('✅ Fetched listings:', listingsData.length);

            // Step 2: Fetch images using robust method
            const listingIds = listingsData.map(item => item.id);
            const imagesData = await fetchImagesForListings(listingIds);

            console.log('📸 Final images data:', imagesData);

            // Step 3: Group images by listing_id (handle both string and number comparisons)
            const imagesByListingId = {};
            if (imagesData && imagesData.length > 0) {
                imagesData.forEach(image => {
                    const imageListingId = image.listing_id;
                    
                    // Find matching listing ID (could be string vs number mismatch)
                    const matchingListingId = listingIds.find(listingId => 
                        listingId == imageListingId || 
                        String(listingId) === String(imageListingId) ||
                        parseInt(listingId) === parseInt(imageListingId)
                    );
                    
                    if (matchingListingId) {
                        if (!imagesByListingId[matchingListingId]) {
                            imagesByListingId[matchingListingId] = [];
                        }
                        imagesByListingId[matchingListingId].push(image);
                    }
                });
            }

            console.log('🗂️ Images grouped by listing ID:', imagesByListingId);

            // Step 4: Combine listings with their images
            const listingsWithImages = listingsData.map(listing => ({
                ...listing,
                listingImages: imagesByListingId[listing.id] || []
            }));

            console.log('🎯 Final listings with images:', listingsWithImages);

            // Log each listing's images for debugging
            listingsWithImages.forEach((item, index) => {
                console.log(`📋 Listing ${index + 1} (ID: ${item.id}) has ${item.listingImages.length} images:`, 
                    item.listingImages.map(img => img.url));
            });

            setListing(listingsWithImages);

        } catch (err) {
            console.error('❌ Unexpected error:', err);
            toast.error('Something went wrong!');
        }
    };

    const handleSearchClick = async() => {
        try {
            console.log('🔍 searchedAddress:', searchedAddress);
            const searchTerm = searchedAddress?.value?.structured_formatting?.main_text;
            
            if (!searchTerm) {
                toast.error('Please enter a search address');
                return;
            }

            // Step 1: Search listings
            const { data: searchListingsData, error: searchError } = await supabase
                .from('listing')
                .select('*')
                .eq('active', true)
                .eq('type', type)
                .like('address', '%' + searchTerm + '%')
                .order('id', { ascending: false });

            if (searchError) {
                console.error('❌ Search error:', searchError);
                toast.error('Search failed!');
                return;
            }

            if (!searchListingsData || searchListingsData.length === 0) {
                console.log('📭 No search results found');
                setListing([]);
                return;
            }

            // Step 2: Fetch images for search results using robust method
            const searchListingIds = searchListingsData.map(item => item.id);
            const searchImagesData = await fetchImagesForListings(searchListingIds);

            // Step 3: Group images by listing_id
            const searchImagesByListingId = {};
            if (searchImagesData && searchImagesData.length > 0) {
                searchImagesData.forEach(image => {
                    const imageListingId = image.listing_id;
                    
                    const matchingListingId = searchListingIds.find(listingId => 
                        listingId == imageListingId || 
                        String(listingId) === String(imageListingId) ||
                        parseInt(listingId) === parseInt(imageListingId)
                    );
                    
                    if (matchingListingId) {
                        if (!searchImagesByListingId[matchingListingId]) {
                            searchImagesByListingId[matchingListingId] = [];
                        }
                        searchImagesByListingId[matchingListingId].push(image);
                    }
                });
            }

            // Step 4: Combine search listings with images
            const searchListingsWithImages = searchListingsData.map(listing => ({
                ...listing,
                listingImages: searchImagesByListingId[listing.id] || []
            }));

            console.log('🔎 Search results with images:', searchListingsWithImages);
            setListing(searchListingsWithImages);

        } catch (err) {
            console.error('❌ Search unexpected error:', err);
            toast.error('Search failed!');
        }
    }
    
    return (
        <>
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
        </>
    )
}

export default ListingMapView