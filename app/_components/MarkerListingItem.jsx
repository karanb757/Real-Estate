import React from "react";
import Image from 'next/image';
import { Bath, MapPin, Ruler, BedDouble, Search, X, Link } from 'lucide-react';
import GoogleAddressSearch from './GoogleAddressSearch';
import { Button } from '../../components/ui/button';
import FilterSection from './FilterSection';

function MarkerListingItem({ item,closeHandler }) {
  return (
    <div className=' cursor-pointer rounded-lg w-[180px]'>
        <X onClick={()=>closeHandler()}/>
        <Image
          src={item.listingImages[0]?.url || "/placeholder.jpg"}
          width={800}
          height={150}
          className="rounded-lg object-cover h-[120px] w-[180px]"
          alt="listing image"
        />
        <div className="flex mt-2 flex-col gap-2 p-2 bg-white">
          <h2 className="font-bold text-xl pl-1">${item.price}</h2>
          <h2 className="flex gap-2 text-sm items-center text-gray-400">
            <MapPin className="h-4 w-4" />
            {item.address}
          </h2>
          <div className="flex gap-2 mt-2 justify-between">
            <h2 className="flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-400 justify-center">
              <BedDouble className="h-4 w-4" />
              {item?.bedroom}
            </h2>
            <h2 className="flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-400 justify-center">
              <Bath className="h-4 w-4" />
              {item?.bathroom}
            </h2>
            
          </div>

          <div >
          <a href={'/view-listing/' + item.id}>
            <Button className="flex gap-2 bg-[#7f57f1] w-full" style={{ color: 'white' }}>
              View Details
            </Button>
          </a>
        </div>

        </div>
      </div>
  );
}

export default MarkerListingItem;
