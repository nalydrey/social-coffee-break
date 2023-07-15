import React from 'react'

interface TooltipProps {
    children: React.ReactNode
    isOpen: boolean
    className?: string
}

export const Tooltip = ({
    children,
    isOpen,
    className
}: TooltipProps) => {
  return (
    <div className={`${className} z-10 absolute transition-all min-w-[170px] shadow-light bg-white duration-500 rounded-lg
                     ${ isOpen ?  'opacity-100 visible' : 'opacity-0 invisible'}`}
    >
        {children}
    </div>
  )
}
