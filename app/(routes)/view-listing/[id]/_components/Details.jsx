import React from 'react'
import { Bath,BedDouble,CircleParking,Drill,LandPlot,MapPin,Share } from 'lucide-react'
import { Button } from '../../../../../@/components/ui/button'
import GoogleMapSection from '../../../../../app/_components/GoogleMapSection'
import AgentDetail from './AgentDetail'
import { toast } from 'sonner'

const Details = ({ listingDetail }) => {

  const handleShare = () => {
    if (typeof window !== "undefined") {
      const url = window.location.href; // current page URL
      navigator.clipboard.writeText(url)
        .then(() => {
          toast.success("Listing URL copied! Share it anywhere."); // optional
        })
        .catch(() => {
          toast.error("Failed to copy URL");
        });
    }
  }

  return listingDetail && (
    <div className='my-6 flex gap-2 flex-col'>
      <div className='flex justify-between items-center'>
        <div>
          <h2 className="font-bold text-3xl pb-4">
            ₹ {listingDetail?.sellingPrice ?? "N/A"} 
          </h2>
          <h2 className='text-gray-500 text-lg flex gap-2'>
            <MapPin/>
            {listingDetail?.address}
          </h2>
        </div>

        {/* Share Button */}
        <Button className='flex gap-2' onClick={handleShare}>
          <Share/> Share 
        </Button>
      </div>

      <hr/>

      <div className='mt-4 flex flex-col gap-3'>
        <h2 className='font-bold text-2xl pb-1'>Key Features</h2>
        <div className='grid grid-cols-2 md:grid-cols-3 gap-4'>
          <h2 className='flex gap-2 items-center bg-purple-100 dark:text-black rounded-lg p-3 text-primary justify-center'>
            <Drill/>
            {listingDetail?.builtIn}
          </h2>
          <h2 className='flex gap-2 items-center bg-purple-100 dark:text-black rounded-lg p-3 text-primary justify-center'>
            <LandPlot/>
            {listingDetail?.area}
          </h2>
          <h2 className='flex gap-2 items-center bg-purple-100 dark:text-black rounded-lg p-3 text-primary justify-center'>
            <BedDouble/>
            {listingDetail?.bedroom} Bed
          </h2>
          <h2 className='flex gap-2 items-center bg-purple-100 dark:text-black rounded-lg p-3 text-primary justify-center'>
            <Bath/>
            {listingDetail?.bathroom} Bath
          </h2>
          <h2 className='flex gap-2 items-center bg-purple-100 dark:text-black rounded-lg p-3 text-primary justify-center'>
            <CircleParking/>
            {listingDetail?.parking} Parking
          </h2>
        </div>
      </div>

      <div className='mt-4 pb-4'>
        <h2 className='font-bold text-2xl pb-4'>What's Special</h2>
        <p className='text-gray-600'>{listingDetail?.description}</p>
      </div>

      <div>
        <h2 className="font-bold text-2xl mb-2 pb-4">Find On Map</h2>
        <div className="w-full h-72 md:h-96 rounded-lg overflow-hidden">
          <GoogleMapSection 
            coordinates={listingDetail.coordinates}
            listing={[listingDetail]}
          />
        </div>
      </div>

      <div>
        <h2 className='font-bold text-2xl pt-4 dark:text-white'>Contact Agent</h2>
        <AgentDetail listingDetail={listingDetail}/>
      </div>
    </div>
  )
}

export default Details
