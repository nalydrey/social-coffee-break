import React, { MouseEvent } from 'react'

interface ButtonUnderlineProps {
    isActive: boolean
    title: string
    label?: number
    onClick: (e: MouseEvent )=>void
}

export const ButtonUnderline = ({
    isActive,
    label,
    title,
    onClick = () => {}

}: ButtonUnderlineProps) => {
  return (
    <button className='relative texp-xl font-medium text-slate-600'
        onClick={(e)=>{onClick(e)}}
    >
        <span>{title}</span>   
        <span className={`h-1 bg-slate-600 block rounded-lg duration-300 ${isActive ? 'opacity-1' : 'opacity-0' } `}></span>
        {
          !!label &&
        <div className='absolute right-0 top-0 px-2 py-1 min-w-5 h-5 rounded-full translate-x-full -translate-y-1/4 bg-green-500 flex justify-center items-center'>
          {label}
        </div>
        }
    </button>
  )
}
