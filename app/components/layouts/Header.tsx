'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { cn } from '@/lib/utils'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/">
          <Image src="/header.png" alt="Logo" width={150} height={50} />
        </Link>
        <nav className="hidden md:flex space-x-8 items-center">
          <Link
            href="/guide"
            className="text-gray-600 hover:text-orange-500 transition duration-200"
          >
            使い方ガイド
          </Link>
          <Link
            href="/login"
            className="text-gray-600 hover:text-orange-500 transition duration-200"
          >
            ログイン
          </Link>
          <Link
            href="/about"
            className="text-gray-600 hover:text-orange-500 transition duration-200"
          >
            会員登録
          </Link>

          <Link href="/about">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </Link>
        </nav>
        <button
          className="md:hidden text-gray-600 hover:text-orange-500 focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? (
            <CloseIcon className="h-6 w-6" />
          ) : (
            <MenuIcon className="h-6 w-6" />
          )}
        </button>
      </div>
      <div
        className={cn(
          'md:hidden absolute top-full left-0 right-0 bg-white shadow-md transition-all duration-300',
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        )}
      >
        <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <Link
            href="/guide"
            className="text-gray-600 hover:text-orange-500 transition duration-200"
          >
            使い方ガイド
          </Link>
          <Link
            href="/login"
            className="text-gray-600 hover:text-orange-500 transition duration-200"
          >
            ログイン
          </Link>

          <Link
            href="/about"
            className="text-gray-600 hover:text-orange-500 transition duration-200"
          >
            会員登録
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
