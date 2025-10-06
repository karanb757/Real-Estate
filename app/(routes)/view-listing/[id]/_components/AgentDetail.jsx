import { Button } from '../../../../../@/components/ui/button'
import { Input } from '../../../../../@/components/ui/input'
import { Textarea } from '../../../../../@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../../../../../@/components/ui/dialog'
import { Label } from '../../../../../@/components/ui/label'
import Image from 'next/image'
import React, { useState } from 'react'
import { Mail } from 'lucide-react'
import { toast } from 'sonner'
import { useUser } from '@clerk/nextjs'

const AgentDetail = ({ listingDetail }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const { user } = useUser()
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: `Hi, I am interested in your property listed at ${listingDetail?.address}. Could you please provide more details?`
  })

  // Pre-fill form with user data if available
  React.useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        name: user.fullName || '',
        email: user.primaryEmailAddress?.emailAddress || ''
      }))
    }
  }, [user])

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSendEmail = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const subject = encodeURIComponent(`Property Enquiry: ${listingDetail?.address}`)
      const body = encodeURIComponent(`
Dear ${listingDetail?.fullName || 'Property Owner'},

I am interested in your property listed at: ${listingDetail?.address}

My Details:
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}

Message:
${formData.message}

Best regards,
${formData.name}
      `)

      const mailtoLink = `mailto:${listingDetail?.createdBy}?subject=${subject}&body=${body}`
      window.location.href = mailtoLink

      toast.success('Email client opened! Please send the email from your email application.')
      setIsOpen(false)

    } catch (error) {
      console.error('Error sending email:', error)
      toast.error('Failed to open email client. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className='flex gap-5 items-center justify-between p-2 xl:p-4 lg:p-4 rounded-lg shadow-md border my-6'>
      <div className='flex items-center gap-2 xl:gap-6 lg:gap-6'>
      <Image 
      src={listingDetail?.profileImage || '/user.png'}
      alt="Profile"
      width={30}
      height={30}
      className="rounded-full object-cover"
    />
        <div>
          <h2 className='font-semibold text-lg '>{listingDetail?.fullName}</h2>
          <div className='flex items-center gap-2 text-gray-600'>
            <Mail className='h-4 w-4 dark:text-white' />
            <span className='text-sm dark:text-white'>{listingDetail?.createdBy}</span>
          </div>
        </div>
      </div>
      
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button className='flex gap-2 dark:bg-white'>
            <Mail className='h-4 w-4 ' />
            <h2 className='dark:text-black text-xs'>
            Contact
            </h2>
          </Button>
        </DialogTrigger>
        
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Contact Owner</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSendEmail} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Your Name *</Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  placeholder="Enter your full name"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Your Email *</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your.email@example.com"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="phone">Your Phone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="+1 (555) 123-4567"
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={4}
              />
            </div>
            
            <div className="flex gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? 'Sending...' : 'Send Email'}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AgentDetail
