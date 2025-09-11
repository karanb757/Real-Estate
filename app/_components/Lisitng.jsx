import Link from "next/link";
import React, { useState } from 'react';
import Image from 'next/image';
import { Bath, MapPin, Ruler, BedDouble, Search } from 'lucide-react';
import GoogleAddressSearch from './GoogleAddressSearch';
import { Button } from '../../components/ui/button';
import FilterSection from './FilterSection';

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
      {/* Search Bar */}
      <div className='p-3 flex gap-6'>
        <GoogleAddressSearch
          selectedAddress={(v) => {
            searchedAddress(v);
            setAddress(v);
          }}
          setCoordinates={(v) => console.log(v)}
        />
        <Button className='flex gap-2 bg-[#7f57f1]' onClick={handleSearchClick}>
          <Search className='h-4 w-4' />
          Search
        </Button>
      </div>

      {/* Filters */}
      <FilterSection
        setBathCount={setBathCount}
        setBedCount={setBedCount}
        setParkCount={setParkCount}
        setHomeType={setHomeType}
      />

      {/* Result Header */}
      {address && (
        <div className='px-3'>
          <h2 className='text-lg'>
            Found{' '}
            <span className='font-bold'>{listing?.length || 0}</span> Result
            {listing?.length !== 1 ? 's' : ''} in{' '}
            <span className='text-[#7f57f1] font-bold'>{address?.label}</span>
          </h2>
        </div>
      )}

      {/* Listings */}
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {listing?.length > 0
          ? listing.map((item, index) => (
            <Link href={'/view-listing/'+item.id}>
              <div
                className='p-3 hover:border hover:border-[#7f57f1] cursor-pointer rounded-lg'
                key={index}
              >
                <Image
                  src={item.listingImages[0]?.url}
                  width={800}
                  height={150}
                  className='rounded-lg object-cover h-[170px]'
                  alt='listing image'
                />
                <div className='flex mt-2 flex-col gap-2'>
                  <h2 className='font-bold text-xl'>${item.price}</h2>
                  <h2 className='flex gap-2 text-sm items-center text-gray-400'>
                    <MapPin className='h-4 w-4' />
                    {item.address}
                  </h2>
                  <div className='flex gap-2 mt-2 justify-between'>
                    <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-400 justify-center'>
                      <BedDouble className='h-4 w-4' />
                      {item?.bedroom}
                    </h2>
                    <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-400 justify-center'>
                      <Bath className='h-4 w-4' />
                      {item?.bathroom}
                    </h2>
                    <h2 className='flex gap-2 text-sm bg-slate-200 rounded-md p-2 w-full text-gray-400 justify-center'>
                      <Ruler className='h-4 w-4' />
                      {item?.area}
                    </h2>
                  </div>
                </div>
              </div>
              </Link>
            ))
          : [1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => (
              <div key={index} className='h-[230px] w-full'>
                <div className='animate-pulse bg-slate-200 rounded-lg h-full'></div>
              </div>
            ))}
      </div>
    </div>
  );
}

export default Listing;
