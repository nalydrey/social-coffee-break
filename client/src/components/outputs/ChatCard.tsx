import React from 'react'
import defaultFoto from '../../assets/defaultAva.png'
import { URL } from '../../http'
import { DeleteButton } from '../UI/DeleteButton'

interface ChatCardProps {
    chatId: string,
    avatar: string, 
    isActive: boolean, 
    unreadMessage: number,
    firstName: string,
    onClick?: (id: string)=>void
    onDelete?: (id: string)=>void
}




export const ChatCard = ({
    chatId, 
    avatar,
    unreadMessage, 
    isActive, 
    firstName, 
    onClick=()=>{},
    onDelete=()=>{}
}: ChatCardProps) => {


    return (
        <div 
            className='flex gap-2 cursor-pointer select-none mt-1 mr-1 '
            onClick={()=>{onClick(chatId)}}
        >
            <div className=' overflow-hidden border border-sky-400 rounded-full w-[50px] h-[50px]'>
                <img className='h-full object-cover' src={`${avatar ? URL+'/'+avatar  : defaultFoto}`} alt="foto"/>
            </div> 
            <div className={` ${isActive ? 'bg-sky-200/70': ''} relative frame border-2 duration-300  grow text-blue-400 text-xl text-center font-bold`}> 
                <p>{firstName}</p>
                <DeleteButton className='absolute right-0 top-0 -translate-y-1/3 translate-x-1/3' onClick={()=>onDelete(chatId)}/>
                <div className={`px-2 min-w-7 h-7 rounded-full flex justify-center items-center bg-green-700 z-10 top-0 left-0 -translate-x-1/2 -translate-y-1/2 text-white temp absolute duration-300 scale-0 ${unreadMessage ? 'duration-700 scale-100': ''}`}>{unreadMessage}</div>
            </div>

        </div>
    )
}
