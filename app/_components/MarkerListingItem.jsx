import { Button } from '../../@/components/ui/button'
import { Bath, BedDouble, MapPin, X } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { useRouter } from 'next/navigation' // 👈 Next.js App Router

const MarkerListingItem = ({ item, closeHandler }) => {
  const router = useRouter();

  const handleViewDetails = () => {
    if (item?.id) {
      router.push(`/view-listing/${item.id}`);
    }
  };

  return (
    <div className="bg-white dark:bg-black rounded-lg shadow-md w-[160px] md:w-[180px]">
      <div className="relative rounded-lg overflow-hidden">
        <X
          className="absolute top-1 right-1 cursor-pointer bg-white dark:bg-black text-black dark:text-white rounded-full p-1 z-10"
          onClick={() => closeHandler()}
        />

        <Image
          src={
            item?.listingImages &&
            item.listingImages[0] &&
            item.listingImages[0].url &&
            item.listingImages[0].url.trim() !== ""
              ? item.listingImages[0].url
              : "/placeholder.jpg"
          }
          width={180}
          height={100}
          className="w-full h-24 md:h-28 object-cover"
          alt="listing image"
        />

        <div className="flex flex-col gap-1 p-2">
          <h2 className="font-bold text-sm md:text-base text-black dark:text-white">
            ₹ {item?.sellingPrice || item?.price || "N/A"}
          </h2>

          <h2 className="flex gap-1 text-xs md:text-sm items-center text-gray-600 dark:text-gray-300">
            <MapPin className="h-3 w-3" />
            {item?.address}
          </h2>

          <div className="flex gap-1 mt-1 justify-between">
            <h2 className="flex gap-1 text-xs md:text-sm bg-slate-200 dark:bg-gray-800 rounded-md p-1 flex-1 text-gray-600 dark:text-gray-300 justify-center">
              <BedDouble className="h-3 w-3" />
              {item?.bedroom || 0}
            </h2>

            <h2 className="flex gap-1 text-xs md:text-sm bg-slate-200 dark:bg-gray-800 rounded-md p-1 flex-1 text-gray-600 dark:text-gray-300 justify-center">
              <Bath className="h-3 w-3" />
              {item?.bathroom || 0}
            </h2>
          </div>

          <Button
            size="sm"
            className="bg-black text-white dark:bg-white dark:text-black mt-1"
            onClick={handleViewDetails} // 👈 navigation
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  )
}

export default MarkerListingItem

