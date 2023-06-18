import {useEffect, useRef, useState, } from 'react'
import { URL } from '../../http'
import defaultFoto from '../../assets/defaultAva.png'
import { DeleteButton } from '../UI/DeleteButton'
import { useOnScreen } from '../../hooks/useOnScreen'

interface MessageCardProps {
  isMyMessage: boolean
  messageId: string, 
    avatar: string, 
    text: string, 
    time: string, 
    isSending: boolean,
    isRead: boolean,
    isDeleteButton: boolean
    onVisible?: (id: string) => void
    onDelete?: (id: string)=>void
}

export const MessageCard = ({messageId, 
  isMyMessage, 
  avatar, 
  text, 
  time, 
  isSending,
  isRead,
  isDeleteButton = false, 
  onDelete=()=>{}, 
  onVisible = () => {}
}: MessageCardProps) => {

  const messageRef = useRef<HTMLLIElement | null>(null)
  const [refresh, setRefresh] = useState(false)
  const isVisible = useOnScreen(messageRef.current, messageRef.current?.parentElement || null, 0)

  console.log(text, isVisible);

  useEffect(()=>{
    if(messageRef.current){
      setRefresh(!refresh)
    }
  },[])

  useEffect(()=>{
    if(isVisible){
      onVisible(messageId)
    }
  },[isVisible])

  


  
  return (
    <li 
      className={`flex gap-2 relative mr-3 mt-2 rounded-lg duration-300 `}
      ref = {messageRef}
    >
        <div className='w-10 h-10 border border-sky-700 rounded-full overflow-hidden'>
            <img className=' object-cover h-full' src={`${avatar ? URL+avatar : defaultFoto}`} alt="" />
        </div>
        <div className='text-sky-900 grow '>
            <p className={`border-2 border-sky-700 p-1 px-3 rounded-md    text-lg ${isMyMessage ? 'bg-gray-200/90': 'bg-gray-400/90'}`}>
            {text}
            </p>
           
            <div className='text-sm text-end mt-1 flex justify-between'>

            { isMyMessage ?
              (isRead && isMyMessage ?
              <p>Прочитано</p>
              :
              isSending ?
              <p>отправление...</p>
              :
              <p>доставлено</p>)
              :
              <p></p>
            }
              <p>{time}</p>
            </div>
        </div>
        {isDeleteButton && 
          <DeleteButton className='absolute top-0 right-0 translate-x-1/2 -translate-y-1/3'
                      onClick={()=>{onDelete(messageId)}}
        />}
    </li>
  )
}
