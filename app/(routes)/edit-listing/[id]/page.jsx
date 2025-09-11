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
import { Loader } from 'lucide-react'

const EditListing = ({ params }) => {
  // ✅ unwrap params (Next.js App Router provides params as a promise)
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
      .eq("id", id) // ✅ use unwrapped id

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

  const publishBtnHandler=async()=>{
    const {data,error}=await supabase
    .from('listing')
    .update({active:true})
    .eq('id',params?.id)
    .select()

    if(data){
      toast('listing Published Successfully !')
    }
  }

//   const onSubmitHandler = async (formValue) => {
//   // 🔹 Clean values: convert "" → null, numeric strings → numbers
//   const cleanedValues = Object.fromEntries(
//     Object.entries(formValue).map(([key, val]) => {
//       if (val === "") return [key, null];              // empty string → null
//       if (!isNaN(val) && val !== null) return [key, Number(val)]; // numeric string → number
//       return [key, val];
//     })
//   );

//   const { data, error } = await supabase
//     .from("listing")
//     .update(cleanedValues) // ✅ use cleaned values
//     .eq("id", id)
//     .select();

//   if (error) {
//     console.error("Update error:", error);
//     toast.error("Something went wrong!");
//     return;
//   }

//   if (data) {
//     console.log("Updated data:", data);
//     toast.success("Listing updated and Published");
//   }

//   // 🔹 Upload images after updating listing
//   for (const file of images) {
//     const fileName = Date.now().toString();
//     const fileExt = file.name.split(".").pop();
//     const { data: uploadData, error: uploadErr } = await supabase.storage
//       .from("listingImages")
//       .upload(`${fileName}.${fileExt}`, file, {
//         contentType: file.type,
//         upsert: false,
//       });

//     if (uploadErr) {
//       toast.error("Error while uploading images");
//     } else {
//       console.log("Image uploaded:", uploadData);
//     }
//   }
// };

    
  const onSubmitHandler = async (formValue) => {
      const cleanedValues = Object.fromEntries(
          Object.entries(formValue).map(([key, val]) => {
            if (val === "") return [key, null];
            if (!isNaN(val) && val !== null) return [key, Number(val)];
            return [key, val];
          })
        );
      
        // First update other fields
        const { data, error } = await supabase
          .from("listing")
          .update(cleanedValues)
          .eq("id", id)
          .select();
      
        if (error) {
          console.error("Update error:", error);
          toast.error("Something went wrong!");
          return;
        }
      
        // Upload images with user context
        const userEmail = user?.primaryEmailAddress?.emailAddress;
        
        for (const file of images) {
          const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          const fileExt = file.name.split(".").pop();
          
          // Upload to storage
          const { data: uploadData, error: uploadErr } = await supabase.storage
            .from("listingImages")
            .upload(`${fileName}`,file, {
              contentType: `image/${fileExt}`,
              upsert: false,
            });
      
          if (uploadErr) {
            console.error("Upload error:", uploadErr);
            toast.error("Error while uploading images");
            continue; // Skip this image and continue with others
          }
      
          // Get public URL
          const { data: { publicUrl } } = supabase
            .storage
            .from("listingImages")
            .getPublicUrl(`${fileName}.${fileExt}`);
      
          // Insert into listingImages table with user context
          const { error: insertErr } = await supabase
            .from("listingImages")
            .insert([
              { 
                url: publicUrl, 
                listing_id: id,
                created_by: userEmail, // Add user context
                created_at: new Date().toISOString()
              }
            ]);
      
          if (insertErr) {
            console.error("Image DB insert error:", insertErr);
            toast.error("Error while saving image info in DB");
          } 
          
          else {
            console.log("Image inserted into DB:", publicUrl);
          }
        }
      
        if (data) {
          console.log("Updated data:", data);
          toast.success("Listing updated and Published");
        }
  };
  
      
  return (
    <div className="px-10 md:px-36">
      <h2 className="font-bold text-2xl">
        Enter some more details about your listing
      </h2>

      <Formik
        initialValues={{
          type: "",
          propertyType: "",
          bedroom: "",
          bathroom: "",
          builtIn: "",
          parking: "",
          lotSize: "",
          area: "",
          sellingPrice: "", // ✅ consistent lowercase with form
          hoa: "",
          description: "",
          profileImage:user?.imageUrl,
          fullName:user?.fullName,
        }}
        onSubmit={(values) => {
          console.log("Form submit:", values) // ✅ cleaner log
          onSubmitHandler(values)
        }}
      >
        {({ values, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <div className="p-8 rounded-lg shadow-md">
              <div className="grid grid-cols-1 md:grid-cols-3">
                <div className="flex flex-col gap-2">
                  <h2 className="text-lg text-slate-500">Rent or Sell ?</h2>
                  <RadioGroup
                    defaultValue={listing?.type}
                    onValueChange={(v) => values.type=v}
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
                    onValueChange={(e) => values.propertyType=e}
                    name='propertyType'
                    defaultValue={listing?.propertyType}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder={listing?.propertyType?listing?.propertyType:"Select Property Type"} />
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
                    defaultValue={listing?.bedroom}
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
                    defaultValue={listing?.bathroom}
                    name="bathroom"
                    value={values.bathroom}
                    onChange={handleChange}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <h2>Built In</h2>
                  <Input
                    type="number"
                    placeholder="Ex: 1800 sq.ft"
                    defaultValue={listing?.builtIn}
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
                    defaultValue={listing?.parking}
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
                    defaultValue={listing?.lotSize}
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
                    defaultValue={listing?.area}
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
                    defaultValue={listing?.sellingPrice}
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
                    defaultValue={listing?.hoa}
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
                  defaultValue={listing?.description}
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
                <Button type="submit" className="flex gap-2 text-[#7f57f1] bg-white border border-[#7f57f1]">
                  Save
                </Button>
                <Button 
                type="submit" className="flex gap-2 bg-[#7f57f1]"
                onClick={()=>publishBtnHandler()}>
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

