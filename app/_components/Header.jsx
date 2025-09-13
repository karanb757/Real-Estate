"use client"
import { Button } from '../../components/ui/button'
import { Plus, Moon, Sun } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { SignOutButton, UserButton, useUser } from '@clerk/nextjs'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../../@/components/ui/dropdown-menu'

const Header = () => {
  const path = usePathname();
  const {user, isSignedIn} = useUser();
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check if dark mode was previously set
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <div className="p-6 px-10 flex justify-between shadow-sm fixed top-0 w-full z-10 bg-white dark:bg-black transition-colors duration-300">
      <div className='flex gap-10'>
      <ul className='hidden md:flex gap-10 items-center'>
        <Link href={'/'}>
          <li className={`hover:text-[#7f57f1] font-medium text-sm cursor-pointer ${
            path=='/' 
              ? 'text-[#7f57f1]' 
              : 'text-gray-900 dark:text-white'
          }`}>
            Home
          </li>
        </Link>
        <Link href={'/for-sell'}>
          <li className={`hover:text-[#7f57f1] font-medium text-sm cursor-pointer ${
            path=='/for-sell' 
              ? 'text-[#7f57f1]' 
              : 'text-gray-900 dark:text-white'
          }`}>
            For Sell
          </li>
        </Link>
        <Link href={'/rent'}>
          <li className={`hover:text-[#7f57f1] font-medium text-sm cursor-pointer ${
            path=='/rent' 
              ? 'text-[#7f57f1]' 
              : 'text-gray-900 dark:text-white'
          }`}>
            For Rent
          </li>
        </Link>
      </ul>
      </div>

      <div className='flex gap-2 items-center'>
        {/* Theme Toggle Button */}
        <Button
          onClick={toggleTheme}
          variant="outline"
          size="icon"
          className="mr-2 dark:border-gray-600 dark:hover:bg-gray-800 cursor-pointer"
        >
          {isDark ? (
            <Sun className="h-5 w-5 text-yellow-500" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
        </Button>

        <Link href={'/add-new-listing'}>
          <Button className='flex gap-2 bg-[#7f57f1] hover:bg-[#6d48d4] cursor-pointer'>
            <Plus className='h-5 w-5'/>Post Your Ad
          </Button>
        </Link>

        {isSignedIn ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Image src={user?.imageUrl} width={35} height={35} alt='user profile'
              className='rounded-full'/>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="dark:bg-gray-800 dark:border-gray-700">
              <DropdownMenuLabel className="dark:text-white">My Account</DropdownMenuLabel>
              <DropdownMenuSeparator className="dark:border-gray-700" />
              <DropdownMenuItem className="dark:text-white dark:hover:bg-gray-700">
                <Link href={'/user'}>
                Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="dark:text-white dark:hover:bg-gray-700">
                My Listing
              </DropdownMenuItem>
              <DropdownMenuItem className="dark:text-white dark:hover:bg-gray-700">
                <SignOutButton>Logout</SignOutButton>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href={'/sign-in'}>
            <Button variant='outline' className="dark:border-gray-600 dark:text-white dark:hover:bg-gray-800 cursor-pointer">
              Login
            </Button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default Header