import Link from "next/link";
import React, { useState } from "react";
import Image from "next/image";
import { Bath, MapPin, Ruler, BedDouble, Search } from "lucide-react";
import GoogleAddressSearch from "./GoogleAddressSearch";
import { Button } from "../../components/ui/button";
import FilterSection from "./FilterSection";

function Listing({
  listing,
  handleSearchClick,
  searchedAddress,
  setBathCount,
  setBedCount,
  setParkCount,
  setHomeType,
}) {
  const [address, setAddress] = useState(null);

  return (
    <div>
      {/* Filters */}
      <FilterSection
        setBathCount={setBathCount}
        setBedCount={setBedCount}
        setParkCount={setParkCount}
        setHomeType={setHomeType}
      />

      {/* Result Header */}
      {address && (
        <div className="px-3">
          <h2 className="text-lg">
            Found <span className="font-bold">{listing?.length || 0}</span>{" "}
            Result
            {listing?.length !== 1 ? "s" : ""} in{" "}
            <span className="text-[#7f57f1] font-bold">{address?.label}</span>
          </h2>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {listing?.length > 0
          ? listing.map((item, index) => (
              <Link href={"/view-listing/" + item.id} key={index}>
                <div className="p-3 border border-transparent hover:border-2 hover:border-[#7f57f1] transition-all duration-300 cursor-pointer rounded-lg h-[350px] flex flex-col">
                  <Image
                    src={item.listingImages?.[0]?.url || "/placeholder.jpg"}
                    width={800}
                    height={150}
                    className="rounded-lg object-cover h-[170px]"
                    alt="listing image"
                  />

                  {/* Content container */}
                  <div className="flex flex-col justify-between flex-1 mt-2 mb-2">
                    {/* Top section (Price + Address) */}
                    <div>
                      <h2 className="font-bold text-xl pt-2">
                        ₹ {item.sellingPrice || item.price || "N/A"}
                      </h2>
                      <h2 className="flex gap-2 text-sm items-center text-gray-400 pt-2">
                        <MapPin className="h-4 w-4" />
                        {item.address}
                      </h2>
                    </div>

                    {/* Bottom section (features) */}
                    <div className="flex gap-2 mt-2 justify-between">
                    <h2 className="flex gap-2 text-sm bg-white border-1 border-gray-400 text-black dark:bg-black dark:border-white dark:text-white rounded-md p-2 w-full justify-center">
                      <BedDouble className="h-4 w-4" /> {item?.bedroom || 0}
                    </h2>
                    <h2 className="flex gap-2 text-sm bg-white border-1 border-gray-400 text-black dark:bg-black dark:border-white dark:text-white rounded-md p-2 w-full justify-center">
                      <Bath className="h-4 w-4" /> {item?.bathroom || 0}
                    </h2>
                    <h2 className="flex gap-2 text-sm bg-white border-1 border-gray-400 text-black dark:bg-black dark:border-white dark:text-white rounded-md p-2 w-full justify-center">
                      <Ruler className="h-4 w-4" /> {item?.area || 0}
                    </h2>
                  </div>
                  </div>
                </div>
              </Link>
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
              <div key={index} className="h-[230px] w-full">
                <div className="animate-pulse bg-slate-200 rounded-lg h-full"></div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Listing;
