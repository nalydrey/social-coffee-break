import React from 'react'

interface ButtonProps {
    title: string | number
    onClick: () => void
    className?: string
}

export const Button = ({
    title,
    onClick,
    className
}: ButtonProps) => {
  return (
    <button 
        className={`${className} temp px-4 rounded-md border-sky-500 text-sky-500 min-w-[100px] hover:bg-sky-100 duration-200 active:bg-sky-200`}
        onClick={onClick}
    >
        {title}
    </button>
  )
}
