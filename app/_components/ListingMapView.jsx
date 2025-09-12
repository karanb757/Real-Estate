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
       
        getLatestListing();
      }, []); // Empty dependency array to run once
      
      // Or alternatively, add a manual refresh button temporarily:
      const forceRefresh = () => {
       
        getLatestListing();
      };

    const fetchImagesForListings = async (listingIds) => {
        // Convert to both strings and numbers to handle any type mismatch
        const stringIds = listingIds.map(id => String(id));
        const numberIds = listingIds.map(id => parseInt(id)).filter(id => !isNaN(id));

        // Try the original query first
        let { data: imagesData, error: imagesError } = await supabase
            .from('listingImages')
            .select('*')
            .in('listing_id', listingIds);

        // If no results and we have different type arrays, try with numbers
        if ((!imagesData || imagesData.length === 0) && numberIds.length > 0) {
            const { data: numberImagesData, error: numberImagesError } = await supabase
                .from('listingImages')
                .select('*')
                .in('listing_id', numberIds);
            
            if (numberImagesData && numberImagesData.length > 0) {
                imagesData = numberImagesData;
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
            }
        }

        // If still no results, let's check what's actually in the database
        if (!imagesData || imagesData.length === 0) {
            
            const { data: allImages } = await supabase
                .from('listingImages')
                .select('*')
                .limit(10);
            
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
                setListing([]);
                return;
            }
            // Step 2: Fetch images using robust method
            const listingIds = listingsData.map(item => item.id);
            const imagesData = await fetchImagesForListings(listingIds);

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

            // Step 4: Combine listings with their images
            const listingsWithImages = listingsData.map(listing => ({
                ...listing,
                listingImages: imagesByListingId[listing.id] || []
            }));

            // Log each listing's images for debugging
            // listingsWithImages.forEach((item, index) => {
            //     console.log(`📋 Listing ${index + 1} (ID: ${item.id}) has ${item.listingImages.length} images:`, 
            //         item.listingImages.map(img => img.url));
            // });

            setListing(listingsWithImages);

        } catch (err) {
            // console.error('❌ Unexpected error:', err);
            toast.error('Something went wrong!');
        }
    };

    const handleSearchClick = async() => {
        try {
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

            <div className="fixed right-2 h-full w-full sm:w-2/3 md:w-1/2 lg:w-[600px] xl:w-[660px] pr-4">
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