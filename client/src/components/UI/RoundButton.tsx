import React, {useState, ReactNode, MouseEvent} from 'react'
import { Info } from './Info'
import { ArrowPathIcon } from '@heroicons/react/24/solid'

interface RoundButton {
    d?: number
    type ?: 'button' | 'submit' | 'reset'
    icon: ReactNode
    disabled?: boolean
    className?: string
    classWrap?: string
    isLoading?: boolean
    title?: string
    onClick?: (e:MouseEvent)=>void
}

export const RoundButton = ({
    d = 8,
    icon,
    disabled = false,
    isLoading = false,
    type,
    title,
    className='bg-blue-400',
    classWrap,
    onClick = () =>{}
}:RoundButton) => {


    const [isActive, setActive] = useState(false)

  return (
    <div className={`relative group ${classWrap}`}>
        <button className={`${className}  rounded-full w-${d} h-${d} flex justify-center items-center shadow-light duration-200 active:scale-90`}
            type = {type}
            disabled = {disabled}
            onClick={(e)=>{setActive(true); onClick(e)}}   
        >   
        {
            isLoading&&isActive ? 
            <ArrowPathIcon className=' animate-spin w-6 h-6 text-white'/>
            :
            <>{icon}</>
        }

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
