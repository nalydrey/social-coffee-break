import React from 'react'
import { Skeleton } from '../UI/Skeleton'


export const UserCardSkeleton = () => {
  return (
    <div className='max-w-[250px] grow bg-slate-200 rounded-md overflow-hidden shadow-light flex flex-col gap-5 pb-5'>
        <div className='relative'> 
            <Skeleton className='h-28'/>
            <Skeleton className='w-32 h-32 rounded-full border-4 border-slate-200 absolute bottom-0 translate-y-1/2 -translate-x-1/2 left-1/2 shadow-light'/>
        </div>
        <div className='pt-14 flex gap-5 justify-center'>
            <Skeleton className='h-5 w-[40%] rounded'/>
            <Skeleton className='h-5 w-[40%] rounded'/>
        </div>
        <div className='flex justify-evenly'>
            <div className='flex flex-col gap-2 items-center'>
                <Skeleton className='h-3 w-20 rounded'/>
                <Skeleton className='h-10 w-10 rounded'/>
                <Skeleton className='h-3 w-7 rounded'/>
            </div>
            <div className='flex flex-col gap-2 items-center'>
                <Skeleton className='h-3 w-20 rounded'/>
                <Skeleton className='h-10 w-10 rounded'/>
                <Skeleton className='h-3 w-7 rounded'/>
            </div>
        </div>
        <div className='flex justify-center gap-2'>
            <Skeleton className='h-9 w-9 rounded-full shadow-light'/>
            <Skeleton className='h-9 w-9 rounded-full shadow-light'/>
            <Skeleton className='h-9 w-9 rounded-full shadow-light'/>
            <Skeleton className='h-9 w-9 rounded-full shadow-light'/>
        </div>

    </div>
  )
}
