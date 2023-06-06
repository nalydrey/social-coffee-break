import React, {useState, ReactNode, MouseEvent} from 'react'
import { Info } from './Info'

interface RoundButton {
    d?: number
    type ?: 'button' | 'submit' | 'reset'
    icon: ReactNode
    disabled?: boolean
    className?: string
    title: string
    onClick?: (e:MouseEvent)=>void
}

export const RoundButton = ({
    d = 8,
    icon,
    disabled = false,
    type,
    title,
    className='bg-blue-400',
    onClick = () =>{}
}:RoundButton) => {

    const [isOpen, setOpen] = useState(false)

  return (
    <div className='relative group'>
        <button className={`${className}  rounded-full w-${d} h-${d} flex justify-center items-center shadow-light duration-200 active:scale-90`}
            type = {type}
            disabled = {disabled}
            onClick={(e)=>{onClick(e)}}   
        >   
            {icon}
        </button>
        {
            title &&
            <Info className='top-[110%] left-1/2 -translate-x-1/2'
                text={title}
            />            
        }
    </div>
  )
}
