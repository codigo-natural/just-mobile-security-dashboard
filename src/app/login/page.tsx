'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/custom/Button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/custom/Input'
import { Label } from '@/components/ui/label'
import { ShieldCheck, Eye, EyeOff } from 'lucide-react'
import { ThemeToggle } from '@/components/layout/ThemeToogle'
import { toast } from 'sonner'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      localStorage.getItem('isLoggedInJMS') === 'true'
    ) {
      router.replace('/')
    }
  }, [router])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // simulacion de login
    await new Promise((resolve) => setTimeout(resolve, 700)) // simular delay

    if (
      email.toLowerCase() === 'pentester@jms.com' &&
      password === 'password'
    ) {
      if (typeof window !== 'undefined') {
        localStorage.setItem('isLoggedInJMS', 'true')
      }
      toast.success('Login Successfull', {
        description: 'Redirecting to dashboard...',
      })
      router.push('/')
    } else {
      setError('Invalid credentials. (Hint: pentester@jms.com / password)')
      toast.error('Login Failed', { description: 'Invalid email or password.' })
      setIsLoading(false)
    }
  }

  return (
    <div className='flex items-center justify-center min-h-screen bg-background p-4 relative'>
      <div className='absolute top-4 right-4 z-10'>
        <ThemeToggle />
      </div>
      <Card className='w-full max-w-sm shadow-xl'>
        <CardHeader className='space-y-1 text-center'>
          <div className='flex justify-center mb-4'>
            <ShieldCheck className='h-16 w-16 text-primary animate-pulse' />
          </div>
          <CardTitle className='text-2xl font-bold'>
            Just Mobile Security
          </CardTitle>
          <CardDescription>Pentester Admin Panel</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className='space-y-4'>
            <div className='space-y-2'>
              <Label htmlFor='email'>Email</Label>
              <Input
                id='email'
                type='email'
                placeholder='pentester@jms.com'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                autoComplete='username'
              />
            </div>
            <div className='space-y-2'>
              <Label htmlFor='password'>Password</Label>
              <div className='relative'>
                <Input
                  id='password'
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  placeholder='••••••••'
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                  autoComplete='current-password'
                />
                <Button
                  type='button'
                  variant='ghost'
                  size='sm'
                  className='absolute right-1 top-1/2 -translate-y-1/2 h-7'
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className='h-4 w-4' />
                  ) : (
                    <Eye className='h-4 w-4' />
                  )}
                </Button>
              </div>
            </div>
            {error && (
              <p className='text-sm text-red-600 dark:text-red-400'>{error}</p>
            )}
            <Button type='submit' className='w-full' disabled={isLoading}>
              {isLoading ? 'Signing In...' : 'Sign In'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className='text-center text-xs text-muted-foreground'>
          <p>This is a simulated login for demonstration purposes.</p>
        </CardFooter>
      </Card>
    </div>
  )
}
