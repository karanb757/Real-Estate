"use client"
import React, { useEffect, use, useState } from 'react'
import { Label } from "../../../../@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "../../../../@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../../@/components/ui/select'
import { Input } from "../../../../@/components/ui/input"
import { Textarea } from "../../../../@/components/ui/textarea"
import { Button } from '../../../../components/ui/button'
import { Formik } from 'formik'
import { supabase } from '../../../../Utils/supabase/client'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import FileUpload from '../_components/FileUpload.jsx'

const EditListing = ({ params }) => {
  const { id } = use(params)
  const { user } = useUser()
  const router = useRouter()
  const [listing,setListing]=useState([]);
  const [images,setImages]=useState([])

  useEffect(() => {
    if (user) verifyUserRecord()
  }, [user])

  const verifyUserRecord = async () => {
    if (!user) return

    const userEmail = user?.primaryEmailAddress?.emailAddress

    const { data, error } = await supabase
      .from("listing")
      .select("*")
      .eq("createdBy", userEmail)
      .eq("id", id)

    if(data){
        setListing(data[0])
    }

    if (error) {
      console.error("Supabase error:", error)
      return
    }

    if (!data || data.length === 0) {
      router.replace("/")
    }
  }

  const onSubmitAndPublishHandler = async (formValue) => {
    try {
      // Step 1: Clean and prepare form values
      const cleanedValues = Object.fromEntries(
        Object.entries(formValue).map(([key, val]) => {
          if (val === "") return [key, null];
          if (!isNaN(val) && val !== null) return [key, Number(val)];
          return [key, val];
        })
      );

      // Step 2: Update listing with form data and set active to true
      const { data, error } = await supabase
        .from("listing")
        .update({
          ...cleanedValues,
          active: true // Publish immediately
        })
        .eq("id", id)
        .select();

      if (error) {
        console.error("Update error:", error);
        toast.error("Something went wrong!");
        return;
      }

      // Step 3: Upload images if any
      const userEmail = user?.primaryEmailAddress?.emailAddress;
      
      if (images.length > 0) {
        for (const file of images) {
          const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          const fileExt = file.name.split(".").pop();
          const fullFileName = `${fileName}.${fileExt}`;
          
          // Upload to storage
          const { data: uploadData, error: uploadErr } = await supabase.storage
            .from("listingImages")
            .upload(fullFileName, file, {
              contentType: `image/${fileExt}`,
              upsert: false,
            });

          if (uploadErr) {
            console.error("Upload error:", uploadErr);
            toast.error("Error while uploading images");
            continue;
          }

          // Get public URL
          const { data: { publicUrl } } = supabase
            .storage
            .from("listingImages")
            .getPublicUrl(fullFileName);

          // Insert into listingImages table
          const { error: insertErr } = await supabase
            .from("listingImages")
            .insert([
              { 
                url: publicUrl, 
                listing_id: parseInt(id),
                created_by: userEmail,
                created_at: new Date().toISOString()
              }
            ]);

          if (insertErr) {
            console.error("Image DB insert error:", insertErr);
            toast.error("Error while saving image info in DB");
          }
        }
      }

      // Step 4: Show success message and redirect immediately
      if (data && data.length > 0) {
        toast.success("Listing Published Successfully!");
        
        const type = data[0]?.type;
        
        // Redirect immediately based on type
        if (type === "Rent") {
          router.push("/rent");
        } else if (type === "Sell") {
          router.push("/for-sell");
        } else {
          router.push("/");
        }
      }

    } catch (error) {
      console.error("Unexpected error:", error);
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="px-10 md:px-36 pt-26">
      <div className='flex justify-center pb-10'>
      <h2 className="font-medium text-2xl">
        Enter some more details about your listing
      </h2>
      </div>

      <Formik
        initialValues={{
          type: listing?.type || "",
          propertyType: listing?.propertyType || "",
          bedroom: listing?.bedroom || "",
          bathroom: listing?.bathroom || "",
          builtIn: listing?.builtIn || "",
          parking: listing?.parking || "",
          lotSize: listing?.lotSize || "",
          area: listing?.area || "",
          sellingPrice: listing?.sellingPrice || "",
          hoa: listing?.hoa || "",
          description: listing?.description || "",
          profileImage: user?.imageUrl,
          fullName: user?.fullName,
        }}
        enableReinitialize={true}
        onSubmit={(values) => {
          onSubmitAndPublishHandler(values)
        }}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <div className="p-8 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Rent or Sell ?</h2>
                  <RadioGroup
                    value={values.type}
                    onValueChange={(v) => setFieldValue('type', v)}
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Rent" id="Rent" />
                      <Label htmlFor="Rent">Rent</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Sell" id="Sell" />
                      <Label htmlFor="Sell">Sell</Label>
                    </div>
                  </RadioGroup>
                </div>

                <div className="flex flex-col gap-2">
                  <h2 className="text-md text-slate-500">Property Type</h2>
                  <Select
                    value={values.propertyType}
                    onValueChange={(value) => setFieldValue('propertyType', value)}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select Property Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Single Family House">Single Family House</SelectItem>
                      <SelectItem value="Town House">Town House</SelectItem>
                      <SelectItem value="Condo">Condo</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Inputs Grid 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Bedroom</h2>
                  <Input
                    type="number"
                    placeholder="Ex: 2"
                    name="bedroom"
                    value={values.bedroom}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2>Bathroom</h2>
                  <Input
                    type="number"
                    placeholder="Ex: 2"
                    name="bathroom"
                    value={values.bathroom}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2>Built In</h2>
                  <Input
                    type="number"
                    placeholder="Ex: Yr-2021"
                    name="builtIn"
                    value={values.builtIn}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Inputs Grid 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Parking</h2>
                  <Input
                    type="number"
                    placeholder="Ex: 2"
                    name="parking"
                    value={values.parking}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2>Lot Size (Sq.ft)</h2>
                  <Input
                    type="number"
                    placeholder="Ex: 1200 sq.ft"
                    name="lotSize"
                    value={values.lotSize}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2>Area (Sq.ft)</h2>
                  <Input
                    type="number"
                    placeholder="EX: 1800 sq.ft"
                    name="area"
                    value={values.area}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Inputs Grid 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mt-6">
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">Selling Price (Rs)</h2>
                  <Input
                    type="number"
                    placeholder="Ex: 3000000"
                    name="sellingPrice"
                    value={values.sellingPrice}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2 className="text-gray-500">HOA (Per Month)</h2>
                  <Input
                    type="number"
                    placeholder="Ex: 5000"
                    name="hoa"
                    value={values.hoa}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-2 mt-6">
                <h2 className="text-gray-500">Description</h2>
                <Textarea
                  placeholder="Enter description..."
                  name="description"
                  value={values.description}
                  onChange={handleChange}
                />
              </div>

              <div>
                <h2 className='text-lg text-gray-500 my-2'>Upload Property Images</h2>
                <FileUpload setImages={(value)=>setImages(value)}/>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 mt-6 justify-end">
                <Button type="submit" className="flex gap-2 bg-[#7f57f1]">
                  Save & Publish
                </Button>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default EditListing


