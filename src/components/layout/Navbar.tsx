'use client'

import { Home, ListChecks, LogOut, ShieldCheck, Menu, X } from 'lucide-react'
import Link from 'next/link'
import { Button } from '../custom/Button'
import { ThemeToggle } from './ThemeToogle'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'
import { useState } from 'react'

export const Navbar = () => {
  const router = useRouter()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedInJMS')
    }
    toast.info('Logged Out', {
      description: 'You have been succesfully logged out.',
    })
    router.push('/login')
    setIsMobileMenuOpen(false)
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

  return (
    <header className='sticky top-4 z-50'>
      <div className='container mx-auto px-6'>
        <div className='flex h-16 items-center justify-between px-4 md:p-8 bg-background border backdrop-blur supports-[backdrop-filter]:bg-background/95 rounded-full'>
          <Link
            href='/'
            className='flex items-center space-x-2'
            onClick={closeMobileMenu}
          >
            <ShieldCheck className='h-6 w-6 text-primary' />
            <span className='font-bold text-sm sm:text-base'>
              JMS Dashboard
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className='hidden md:flex items-center space-x-4'>
            <Button variant='ghost'>
              <Link href='/' className='flex items-center'>
                <Home className='mr-2 h-4 w-4' />
                Dashboard
              </Link>
            </Button>
            <Button variant='ghost'>
              <Link href='/services' className='flex items-center'>
                <ListChecks className='mr-2 h-4 w-4' />
                Services
              </Link>
            </Button>
          </nav>

          {/* Desktop Actions */}
          <div className='hidden md:flex items-center space-x-2'>
            <Button variant='outline' size='sm' onClick={handleLogout}>
              <LogOut className='mr-2 h-4 w-4' />
              <span className='hidden sm:inline'>Logout</span>
            </Button>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden flex items-center space-x-2'>
            <ThemeToggle />
            <Button
              variant='ghost'
              size='sm'
              onClick={toggleMobileMenu}
              className='p-2'
            >
              {isMobileMenuOpen ? (
                <X className='h-5 w-5' />
              ) : (
                <Menu className='h-5 w-5' />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className='container mx-auto'>
          <div className='md:hidden mt-2 bg-background border rounded-lg shadow-lg backdrop-blur supports-[backdrop-filter]:bg-background/95'>
            <nav className='flex flex-col p-4 space-y-2'>
              <Button variant='ghost' className='justify-start'>
                <Link
                  href='/'
                  className='flex items-center'
                  onClick={closeMobileMenu}
                >
                  <Home className='mr-3 h-4 w-4' />
                  Dashboard
                </Link>
              </Button>
              <Button variant='ghost' className='justify-start'>
                <Link
                  href='/services'
                  className='flex items-center'
                  onClick={closeMobileMenu}
                >
                  <ListChecks className='mr-3 h-4 w-4' />
                  Services
                </Link>
              </Button>
              <div className='pt-2 border-t'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={handleLogout}
                  className='w-full justify-start cursor-pointer'
                >
                  <LogOut className='mr-3 h-4 w-4' />
                  Logout
                </Button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}
