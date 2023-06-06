import React from 'react'

interface DeleteButtonProps {className?: string, onClick: ()=>void}

export const DeleteButton = ({className, onClick=()=>{}}: DeleteButtonProps) => {
  return (
    <div className={`${className} border-2 border-red-500 w-6 h-6 rounded-full bg-gray-800 duration-300  hover:rotate-90 `}
         onClick={(e)=>{e.stopPropagation(); onClick()}}
    >
        <div className='h-[3px] w-4 bg-red-500 rounded-md rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'></div>
        <div className='h-[3px] w-4 bg-red-500 rounded-md -rotate-45 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'></div>
    </div>
  )
}
