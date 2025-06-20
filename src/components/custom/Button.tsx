import * as React from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | 'default'
    | 'destructive'
    | 'outline'
    | 'secondary'
    | 'ghost'
    | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = 'default', size = 'default', children, ...props },
    ref
  ) => {
    const baseClasses =
      'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 outline-none focus-visible:ring-2 focus-visible:ring-offset-2'

    const variantClasses = {
      default:
        'bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus-visible:ring-blue-500',
      destructive:
        'bg-red-600 text-white shadow-sm hover:bg-red-700 focus-visible:ring-red-500',
      outline:
        'border border-gray-300 bg-white text-gray-700 shadow-sm hover:bg-gray-50 focus-visible:ring-blue-500 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700',
      secondary:
        'bg-gray-100 text-gray-900 shadow-sm hover:bg-gray-200 focus-visible:ring-gray-500 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600',
      ghost:
        'text-gray-700 hover:bg-gray-100 focus-visible:ring-gray-500 dark:text-gray-200 dark:hover:bg-gray-800',
      link: 'text-blue-600 underline-offset-4 hover:underline focus-visible:ring-blue-500',
    }

    const sizeClasses = {
      default: 'h-9 px-4 py-2',
      sm: 'h-8 px-3 py-1.5 text-xs',
      lg: 'h-10 px-6 py-2.5 text-base',
      icon: 'h-9 w-9 p-0',
    }

    const classes = cn(
      baseClasses,
      variantClasses[variant],
      sizeClasses[size],
      className
    )

    return (
      <button ref={ref} className={classes} {...props}>
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
