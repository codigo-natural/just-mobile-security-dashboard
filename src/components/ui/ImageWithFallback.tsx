'use client'
import { useState, useEffect } from 'react'
import Image, { ImageProps } from 'next/image'

interface ImageWithFallbackProps extends Omit<ImageProps, 'onError'> {
  fallbackSrc?: string
}

export const ImageWithFallback = ({
  fallbackSrc = '/placeholder-icon.png',
  alt,
  src,
  ...props
}: ImageWithFallbackProps) => {
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    setError(false)
  }, [src])

  return (
    <Image
      alt={alt}
      onError={() => setError(true)}
      src={error ? fallbackSrc : src}
      {...props}
    />
  )
}
