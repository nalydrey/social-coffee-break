import React, {useState, useEffect, MouseEvent, ReactNode} from 'react'
import defaultAva from '../../assets/defaultAva.png'
import { EllipsisHorizontalCircleIcon, EllipsisHorizontalIcon, EllipsisVerticalIcon } from '@heroicons/react/24/solid'
import { MenuItem } from '../UI/MenuItem'
import { Tooltip } from '../UI/Tooltip'
import { URL } from '../../http'
import { ImageWithPreloader } from '../UI/ImageWithPreloader'
import { Avatar } from '../UI/Avatar'

interface FriendPeviewProps {
    title: string,
    avatar: string,
    picture: string,
    children?: ReactNode
}

export const FriendPreview = ({
    avatar,
    picture,
    title,
    children,
}: FriendPeviewProps) => {

    const host = URL+'/'

    const [isOpen, setOpen] = useState(false)

    useEffect(()=>{
        document.addEventListener('click', closeMenu)
        return () => {
            document.removeEventListener('click', closeMenu)
        }
    },[])

    const closeMenu = () => {
        setOpen(false)
    }

    const toggleMenu = (e: MouseEvent) => {
        e.stopPropagation()
        setOpen(!isOpen)
    }


  return (
    <li className='rounded-lg shadow-light w-full max-w-[270px] grow'>
        <div className='relative justify-end flex gap-2 items-center rounded-t-lg p-2 bg-cover bg-center bg-indigo-500  ' 
        // style={{backgroundImage: `url(${picture && host+picture})`}}
        >
            <ImageWithPreloader className='img absolute left-0 top-0 rounded-t-lg' src={picture ? host+picture : defaultAva} alt="" />   
            <Avatar 
                className = 'absolute bottom-0 left-3 translate-y-1/3 outline-4 outline-gray-300 outline'
                classSize='w-14 h-14'
                src={avatar ? host+avatar : ''}
            />
            <div className='relative'>
                <button className=' border rounded-full bg-slate-500 hover:rotate-180 duration-300'
                        onClick={toggleMenu}
                >
                    <EllipsisHorizontalIcon className='w-8 h-8 text-slate-300'/>
                </button>

                <Tooltip className='right-0 top-[110%]'
                         isOpen={isOpen}  
                >
                    {children}                  
                </Tooltip>
            </div>
        </div>
        <h4 className=' pl-20 bg-slate-300 rounded-b-lg text-lg text-sky-700 font-medium min-h-[30px]'>{title}</h4>
    </li>
  )
}
