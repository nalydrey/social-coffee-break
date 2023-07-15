import { useEffect, useState } from 'react'
import defaultFoto from '../../assets/defaultAva.png'
import { Skeleton } from './Skeleton'
import { URL } from '../../http'

interface AvatarProps {
    className?: string
    classSize?: string
    src: string
    isProgress?: boolean
}

export const Avatar = ({
    className,
    classSize = 'w-10 h-10',
    src,
    isProgress
}: AvatarProps) => {

    const [isLoading, setIsLoading] = useState(true)

    useEffect(()=>{setIsLoading(true)},[src])

  return (
    <div className={`${className} rounded-full`}>
        <div className={`overflow-hidden rounded-full ${classSize}`}>
            <Skeleton className={`${classSize} ${isLoading || isProgress ? '':'hidden'}`}/>
            <img 
                src={src || defaultFoto} 
                alt="avatar" 
                className={` img animate-apearOpacity ${isLoading || isProgress ? 'hidden':''}`}
                onLoad={()=>setIsLoading(false)}
            />
        </div>
    </div>
  )
}
