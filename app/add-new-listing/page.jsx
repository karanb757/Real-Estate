"use client"
import GoogleAddressSearch from '../_components/GoogleAddressSearch.jsx'
import React, { useState } from 'react'
import {supabase} from '../../Utils/supabase/client.js'
import { Button } from '../../components/ui/button.jsx'
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import { Loader } from 'lucide-react'

function AddNewListing () {

  const [selectedAddress, setSelectedAddress] = useState()
  const [Coordinates,setCoordinates]= useState()
  const {user} = useUser()
  const [loader,setLoader] = useState(false)

  const nextHandler = async () => {
    setLoader(true)
    const userEmail = user?.primaryEmailAddress?.emailAddress || "anonymous@guest.com";
  
    const { data, error } = await supabase
      .from('listing')
      .insert([
        {
          address: selectedAddress.label,
          coordinates: Coordinates,
          createdBy: userEmail,
        },
      ])
      .select();
  
    if (data) {
      setLoader(false)
      console.log("New Data added", data);
      toast("New Address added for listing")
    }
    if (error) {
      setLoader(false)
      console.log("Error", error);
      toast("server side error!")
    }
  };
  

  return (
    <div className='mt-10 md:mx-56 lg:mx-80'>
      <div className='p-10 flex-col gap-5 items-center justify-center'>
        <h2 className='font-bold text-2xl flex justify-center '>Add New Listing</h2>
        <div className='p-10 px-28 w-full rounded-lg border shadow-md flex flex-col gap-5'>
            <h2 className='text-gray-500'>Enter Address which you want to list </h2>
            <GoogleAddressSearch
              selectedAddress={(value)=> setSelectedAddress(value)}
              setCoordinates={(value)=>setCoordinates(value)}
            />
            <Button
            disabled={!selectedAddress || !Coordinates || loader} 
            className='w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded'
            onClick={nextHandler}>
              {loader?<Loader className='animate-spin'/>:'Next'}
            </Button>
        </div>
      </div>
    </div>
  )
}

export default AddNewListing 