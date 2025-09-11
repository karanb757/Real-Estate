import { Button } from '../../../../../@/components/ui/button'
import Image from 'next/image'
import React from 'react'

const AgentDetail = ({listingDetail}) => {
  return (
    <div className='flex gap-5 items-center justify-between p-5 rounded-lg shadow-md border my-6'>
        <div className='flex items-center gap-6'>
        <Image src={listingDetail?.profileImage}
        alt='profileImage'
        width={60}
        height={60}
        className='rounded-full'
        />
        </div>
        <div>
            <h2>{listingDetail?.fullName}</h2>
            <h2>{listingDetail?.createdBy}</h2>
        </div>
        <Button>Send Message</Button>
    </div>
  )
}

export default AgentDetail