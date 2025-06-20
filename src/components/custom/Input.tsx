import * as React from 'react'
import { cn } from '@/lib/utils'

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-9 w-full min-w-0 rounded-md border border-gray-300 bg-white px-3 py-1 text-sm shadow-sm transition-colors',
        'placeholder:text-gray-500',
        'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:placeholder:text-gray-400',
        'dark:focus:ring-blue-400 dark:focus:border-blue-400',
        className
      )}
      ref={ref}
      {...props}
    />
  )
})

Input.displayName = 'Input'

export { Input }
