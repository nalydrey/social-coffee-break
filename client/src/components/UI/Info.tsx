import React, {ReactNode}from 'react'

interface InfoProps {
    className?: string
    text: string | number
}

export const Info = ({
    className,
    text

}:InfoProps) => {
  return (
    <div className={`${className} z-10 absolute transition-all min-w-[100px] shadow-light bg-white/70 duration-300 rounded-lg px-5 py-1
                    opacity-0 invisible group-hover:opacity-100 group-hover:visible whitespace-nowrap`}
    >
        <p className='text-center text-lg font-medium'>{text}</p>
    </div>
  )
}
