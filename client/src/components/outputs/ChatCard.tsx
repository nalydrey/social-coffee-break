import React from 'react'
import defaultFoto from '../../assets/defaultAva.png'
import { URL } from '../../http'
import { DeleteButton } from '../UI/DeleteButton'

interface ChatCardProps {
    chatId: string,
    avatar: string, 
    isActive: boolean, 
    firstName: string,
    onClick?: (id: string)=>void
    onDelete?: (id: string)=>void
}




export const ChatCard = ({
    chatId, 
    avatar, 
    isActive, 
    firstName, 
    onClick=()=>{},
    onDelete=()=>{}
}: ChatCardProps) => {


    return (
        <div className='flex gap-2 cursor-pointer select-none mt-1 mr-1 '
        onClick={()=>{onClick(chatId)}}
        >
            <div className=' overflow-hidden border border-sky-400 rounded-full w-[50px] h-[50px]'>
                <img className='h-full object-cover' src={`${avatar ? URL+'/'+avatar  : defaultFoto}`} alt="foto"/>
            </div> 
            <div className={` ${isActive ? 'bg-sky-200/70': ''} relative frame border-2 duration-300  grow text-blue-400 text-xl text-center font-bold`}> 
                <p>{firstName}</p>
                <DeleteButton className='absolute right-0 top-0 -translate-y-1/3 translate-x-1/3' onClick={()=>onDelete(chatId)}/>
            </div>
        </div>
    )
}
