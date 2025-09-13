"use client"
import GoogleAddressSearch from '../../_components/GoogleAddressSearch'
import React, { useState } from 'react'
import { supabase } from '../../../Utils/supabase/client.js'
import { Button } from '../../../components/ui/button' 
import { useUser } from '@clerk/nextjs'
import { toast } from 'sonner'
import { Loader, MapPin, Home, ArrowRight } from 'lucide-react'
import { useRouter } from "next/navigation"

function AddNewListing () {
  const [selectedAddress, setSelectedAddress] = useState()
  const [Coordinates, setCoordinates] = useState()
  const { user } = useUser()
  const [loader, setLoader] = useState(false)
  const router = useRouter()

  const nextHandler = async () => {
    setLoader(true)
    const userEmail = user?.primaryEmailAddress?.emailAddress || "anonymous@guest.com"
   
    const { data, error } = await supabase
      .from('listing')
      .insert([
        {
          address: selectedAddress.label,
          coordinates: Coordinates,
          createdBy: userEmail,
        },
      ])
      .select()

    if (data) {
      setLoader(false)
      console.log("New Data added", data)
      toast.success("New Address added for listing")
      router.replace('/edit-listing/'+data[0].id)
    }
    if (error) {
      setLoader(false)
      console.log("Error", error)
      toast.error("Server side error!")
    }
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black pt-28 transition-colors duration-300">
      <div className="max-w-2xl mx-auto px-4">
        
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            List Your Property
          </h1>
          <p className="text-md text-gray-600 dark:text-gray-400 max-w-md mx-auto">
            Start by entering the address of your property. We'll help you create an amazing listing.
          </p>
        </div>

        {/* Main Form Card */}
        <div className="bg-white dark:bg-black rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700 overflow-hidden transition-colors duration-300">
          <div className="p-8 md:p-10">
            
            {/* Progress Indicator */}
            <div className="flex items-center mb-8">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-[#7f57f1] text-white rounded-full flex items-center justify-center text-sm font-semibold">
                  1
                </div>
                <span className="ml-3 text-sm font-medium text-purple-600">Property Address</span>
              </div>
              <div className="flex-1 mx-4 h-0.5 bg-gray-200 dark:bg-gray-700"></div>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500 rounded-full flex items-center justify-center text-sm font-semibold">
                  2
                </div>
                <span className="ml-3 text-sm text-gray-400 dark:text-gray-500">Property Details</span>
              </div>
            </div>

            {/* Form Content */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  <MapPin className="inline w-4 h-4 mr-2 text-[#7f57f1] dark:text-purple-300" />
                  Property Address
                </label>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Enter the complete address where your property is located
                </p>
                
                <div className="relative">
                  <GoogleAddressSearch
                    selectedAddress={(value) => setSelectedAddress(value)}
                    setCoordinates={(value) => setCoordinates(value)}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-6">
                <Button
                  variant="outline"
                  className="flex-1 h-12 dark:border-gray-600 dark:text-white"
                  onClick={() => router.back()}
                  disabled={loader}
                >
                  Cancel
                </Button>
                <Button
                  disabled={!selectedAddress || !Coordinates || loader}
                  className="flex-1 h-12 bg-[#7f57f1] text-white font-semibold hover:bg-[#7f57f1]"
                  onClick={nextHandler}
                >
                  {loader ? (
                    <div className="flex items-center">
                      <Loader className="animate-spin w-4 h-4 mr-2" />
                      Creating Listing...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      Continue to Details
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 dark:bg-gray-800 px-8 md:px-10 py-6 border-t border-gray-100 dark:border-gray-700 transition-colors duration-300">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-gray-500 dark:text-gray-400">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Your data is secure and encrypted
              </div>
              <div className="text-gray-400 dark:text-gray-500">
                Step 1 of 2
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddNewListing
