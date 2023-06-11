import React, { useEffect, useState } from 'react'
import { Skeleton } from './Skeleton'


interface ImageWithPreloaderProps {
    className?: string
    src: string
    alt: string
}

export const ImageWithPreloader = ({
    className,
    src,
    alt
}:ImageWithPreloaderProps) => {

    const [isLoading, setIsLoading] = useState(true)

  return (
    <>
            <img 
                className={`${className} img animate-apearOpacity ${isLoading ? 'hidden':' '}`} 
                onLoad={() => setIsLoading(false)}
                src={src} 
                alt={alt} 
            />
            <Skeleton className={`w-full h-full rounded-t-lg ${isLoading ? '':' hidden'}`}/>
    </>
  )
}
