import React from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "../../@/components/ui/select"
import { Bath, BedDouble, CarFront } from 'lucide-react'
  

function FilterSection({setBedCount,setBathCount,setParkCount,setHomeType}) {
  return (
    <div className='px-3 py-2 grid grid-cols-2 md:flex gap-2'>
        <Select onValueChange={setBedCount}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Beds" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="1">
                <h2 className='flex gap-2'>
                    <BedDouble className='h-5 w-5 text-[#7f57f1]'/> 2+
                </h2>
            </SelectItem>
            <SelectItem value="2">
                <h2 className='flex gap-2'>
                    <BedDouble className='h-5 w-5 text-[#7f57f1]'/> 3+
                </h2>
            </SelectItem>
            <SelectItem value="3">
                <h2 className='flex gap-2'>
                    <BedDouble className='h-5 w-5 text-[#7f57f1]'/> 4+
                </h2>
            </SelectItem>
        </SelectContent>
        </Select>

        <Select onValueChange={setBathCount}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Bath" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="1">
                <h2 className='flex gap-2'>
                    <Bath className='h-5 w-5 text-[#7f57f1]'/> 2+
                </h2>
            </SelectItem>
            <SelectItem value="2">
                <h2 className='flex gap-2'>
                    <Bath className='h-5 w-5 text-[#7f57f1]'/> 3+
                </h2>
            </SelectItem>
            <SelectItem value="3">
                <h2 className='flex gap-2'>
                    <Bath className='h-5 w-5 text-[#7f57f1]'/> 4+
                </h2>
            </SelectItem>
        </SelectContent>
        </Select>

        <Select onValueChange={setParkCount}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Parking" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="1">
                <h2 className='flex gap-2'>
                    <CarFront className='h-5 w-5 text-[#7f57f1]'/> 2+
                </h2>
            </SelectItem>
            <SelectItem value="2">
                <h2 className='flex gap-2'>
                    <CarFront className='h-5 w-5 text-[#7f57f1]'/> 3+
                </h2>
            </SelectItem>


        
        </SelectContent>
        </Select>

        <Select onValueChange={setHomeType}>
        <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Home Type" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="Single Family Home">
                Single Family Home
            </SelectItem>
            <SelectItem value="Town House">
                Town House
            </SelectItem>
            <SelectItem value="Condo">
                Condo
            </SelectItem>
        </SelectContent>
        </Select>

    </div>
  )
}

export default FilterSection
