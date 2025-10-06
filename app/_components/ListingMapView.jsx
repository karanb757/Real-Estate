"use client";
import React, { useEffect, useState } from "react";
import { supabase } from "../../Utils/supabase/client.js";
import Listing from "./Listing.jsx";
import { toast } from "sonner";
import GoogleMapSection from "./GoogleMapSection.jsx";
import { Search } from "lucide-react";

function ListingMapView({ type }) {
  const [listing, setListing] = useState([]);
  const [searchText, setSearchText] = useState(""); 
  const [bedCount, setBedCount] = useState(0);
  const [bathCount, setBathCount] = useState(0);
  const [ParkCount, setParkCount] = useState(0);
  const [homeType, setHomeType] = useState();
  const [coordinates, setCoordinates] = useState();
  const [isSearchActive, setIsSearchActive] = useState(false);

  useEffect(() => {
    if (!isSearchActive) {
      getLatestListing();
    }
  }, [bedCount, bathCount, ParkCount, homeType]);

  useEffect(() => {
    getLatestListing();
  }, []);

  // ✅ Fetch images robustly
  const fetchImagesForListings = async (listingIds) => {
    const { data: imagesData, error } = await supabase
      .from("listingImages")
      .select("*")
      .in("listing_id", listingIds);

    if (error) {
      console.error("❌ Image fetch error:", error);
      return [];
    }

    return imagesData || [];
  };

  // ✅ Common function to fetch listings + images
  const fetchListingsWithImages = async (queryBuilder) => {
    const { data: listingsData, error: listingsError } = await queryBuilder;
    if (listingsError) {
      console.error("❌ Listings fetch error:", listingsError);
      toast.error("Failed to fetch listings!");
      return [];
    }

    if (!listingsData || listingsData.length === 0) return [];

    const listingIds = listingsData.map((item) => item.id);
    const imagesData = await fetchImagesForListings(listingIds);

    // group images by listing_id
    const imagesByListingId = {};
    imagesData.forEach((image) => {
      if (!imagesByListingId[image.listing_id]) {
        imagesByListingId[image.listing_id] = [];
      }
      imagesByListingId[image.listing_id].push(image);
    });

    return listingsData.map((listing) => ({
      ...listing,
      listingImages: imagesByListingId[listing.id] || [],
    }));
  };

  const getLatestListing = async () => {
    try {
      let query = supabase
        .from("listing")
        .select("*")
        .eq("active", true)
        .eq("type", type)
        .order("id", { ascending: false });

      if (bedCount > 0) query = query.gte("bedroom", parseInt(bedCount) + 1);
      if (bathCount > 0) query = query.gte("bathroom", parseInt(bathCount) + 1);
      if (ParkCount > 0) query = query.gte("parking", parseInt(ParkCount) + 1);
      if (homeType) query = query.eq("propertyType", homeType);

      const listingsWithImages = await fetchListingsWithImages(query);
      setListing(listingsWithImages);
    } catch (err) {
      console.error("❌ Unexpected error:", err);
      toast.error("Something went wrong!");
    }
  };

  const handleSearchClick = async () => {
    try {
      if (!searchText.trim()) {
        toast.error("Please enter a search term");
        return;
      }

      setIsSearchActive(true);

      let query = supabase
        .from("listing")
        .select("*")
        .eq("active", true)
        .eq("type", type)
        .ilike("address", `%${searchText}%`) // ✅ case-insensitive
        .order("id", { ascending: false });

      if (bedCount > 0) query = query.gte("bedroom", parseInt(bedCount) + 1);
      if (bathCount > 0) query = query.gte("bathroom", parseInt(bathCount) + 1);
      if (ParkCount > 0) query = query.gte("parking", parseInt(ParkCount) + 1);
      if (homeType) query = query.eq("propertyType", homeType);

      const listingsWithImages = await fetchListingsWithImages(query);
      setListing(listingsWithImages);
    } catch (err) {
      console.error("❌ Search error:", err);
      toast.error("Search failed!");
    }
  };

  const handleClearSearch = () => {
    setIsSearchActive(false);
    setSearchText("");
    getLatestListing();
  };

  return (
    <div>
      {/* Desktop: Side by side layout */}
      <div className="hidden md:grid md:grid-cols-2 md:gap-8">
        {/* Listings Column */}
        <div>
          <div className="flex items-center gap-2 mb-4 ml-2">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search by address..."
              className="border rounded-lg px-3 py-2 w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
            <button
              onClick={handleSearchClick}
              className="flex items-center gap-2 px-4 py-2 bg-[#7f57f1] text-white rounded-lg hover:bg-[#6a45d8] transition"
            >
              <Search className="h-4 w-4" />
              Search
            </button>

            {isSearchActive && (
              <button
                onClick={handleClearSearch}
                className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition"
              >
                Clear
              </button>
            )}
          </div>

          {listing.length > 0 ? (
            <Listing
              listing={listing}
              setBathCount={setBathCount}
              setBedCount={setBedCount}
              setParkCount={setParkCount}
              setHomeType={setHomeType}
            />
          ) : (
            <div className="text-center text-gray-500 mt-10">
              Sorry! No such listing found
            </div>
          )}
        </div>

        {/* Map Column - Fixed on Desktop */}
        <div className="fixed right-2 h-5/6 w-1/2 lg:w-[600px] xl:w-[660px] pr-4 pt-3">
          <GoogleMapSection listing={listing} coordinates={coordinates} />
        </div>
      </div>

      {/* Mobile: Listings first, then map below */}
      <div className="md:hidden">
        {/* Search Bar */}
        <div className="flex items-center gap-2 mb-4 px-2">
          <input
            type="text"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search by address..."
            className="border rounded-lg px-3 py-2 w-full dark:bg-gray-800 dark:border-gray-600 dark:text-white text-sm"
          />
          <button
            onClick={handleSearchClick}
            className="flex items-center gap-1 px-3 py-2 bg-[#7f57f1] text-white rounded-lg hover:bg-[#6a45d8] transition"
          >
            <Search className="h-4 w-4" />
          </button>

          {isSearchActive && (
            <button
              onClick={handleClearSearch}
              className="px-3 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition text-sm"
            >
              Clear
            </button>
          )}
        </div>

        {/* Listings Section */}
        {listing.length > 0 ? (
          <Listing
            listing={listing}
            setBathCount={setBathCount}
            setBedCount={setBedCount}
            setParkCount={setParkCount}
            setHomeType={setHomeType}
          />
        ) : (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-10 px-4">
            Sorry! No such listing found
          </div>
        )}

        {/* Map Section - Below listings on mobile */}
        <div className="mt-8 px-2 pb-6">
          <div className="h-[620px] rounded-lg overflow-hidden shadow-lg p-2">
            <GoogleMapSection listing={listing} coordinates={coordinates} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingMapView;