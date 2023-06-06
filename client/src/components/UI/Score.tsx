import React, {ReactNode} from 'react'

interface ScoreProps {
    title: string
    icon: ReactNode
    counter: string | number
}

export const Score = ({
    title,
    icon,
    counter
}: ScoreProps) => {
  return (
    <div className='flex flex-col items-center'>
        <h4 className='text-lg font-medium'>{title}</h4>
        {icon}
        <span className='font-bold'>{counter}</span>
    </div>
  )
}
