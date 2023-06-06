import React, { MouseEvent } from 'react'

interface ButtonUnderlineProps {
    isActive: boolean
    title: string
    onClick: (e: MouseEvent )=>void
}

export const ButtonUnderline = ({
    isActive,
    title,
    onClick = () => {}

}: ButtonUnderlineProps) => {
  return (
    <button className='texp-xl font-medium text-slate-600'
        onClick={(e)=>{onClick(e)}}
    >
        <span>{title}</span>   
        <span className={`h-1 bg-slate-600 block rounded-lg duration-300 ${isActive ? 'opacity-1' : 'opacity-0' } `}></span>
    </button>
  )
}
