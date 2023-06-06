import React from 'react'
import { URL } from '../../http'
import defaultFoto from '../../assets/defaultAva.png'
import { DeleteButton } from '../UI/DeleteButton'

interface MessageCardProps {
  isMyMessage: boolean
  messageId: string, 
    avatar: string, 
    text: string, 
    time: string, 
    onDelete?: (id: string)=>void
}

export const MessageCard = ({messageId, isMyMessage, avatar, text, time, onDelete=()=>{} }: MessageCardProps) => {
  return (
    <li className='flex gap-2 relative mr-2 mt-2'>
        <div className='w-10 h-10 border border-sky-700 rounded-full overflow-hidden'>
            <img className=' object-cover h-full' src={`${avatar ? URL+avatar : defaultFoto}`} alt="" />
        </div>
        <div className='text-sky-900 grow '>
            <p className={`border-2 border-sky-700 p-1 px-3 rounded-md    text-lg ${isMyMessage ? 'bg-gray-200/90': 'bg-gray-400/90'}`}>
            {text}
            </p>
            <div className='text-sm text-end mt-1'>
            <p>{time}</p>
            </div>
        </div>
        <DeleteButton className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/3'
                      onClick={()=>{onDelete(messageId)}}
        />
    </li>
  )
}
