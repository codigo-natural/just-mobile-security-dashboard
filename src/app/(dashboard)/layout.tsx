'use client'

import { useEffect, useState } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { Navbar } from '@/components/layout/Navbar'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthCheckComplete, setIsAuthCheckComplete] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const isLoggedIn = localStorage.getItem('isLoggedInJMS') === 'true'
      if (!isLoggedIn && pathname !== '/login') {
        router.replace('/login')
      } else {
        setIsAuthCheckComplete(true)
      }
    } else {
      setIsAuthCheckComplete(true)
    }
  }, [router, pathname])

  if (!isAuthCheckComplete) {
    return (
      <div className='flex items-center justify-center min-h-screen'>
        <div className='animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary'></div>
      </div>
    )
  }

  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar />
      <main className='flex-grow container mx-auto p-4 md:p-8'>{children}</main>
      <footer className='text-center p-4 border-t'>
        Ivan Camilo {new Date().getFullYear()} Just Movile Security
      </footer>
    </div>
  )
}
