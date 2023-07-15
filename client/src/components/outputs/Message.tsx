import {useState, useRef, useEffect, MouseEvent} from 'react'
import { CheckIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/solid"
import { Avatar } from "../UI/Avatar"
import { Tooltip } from "../UI/Tooltip"
import { MenuItem } from "../UI/MenuItem"
import { useOnScreen } from '../../hooks/useOnScreen'

interface MessageProps {
    messageId: string
    isMyMessage: boolean
    isRead: boolean
    time: string
    text: string
    src: string
    onDelete?: (id: string)=>void
    onVisible?: (id: string) => void
}

export const Message = ({
    messageId,
    isMyMessage,
    isRead,
    time,
    text,
    src,
    onDelete = () => {},
    onVisible = () => {}
} : MessageProps) => {

    const messageRef = useRef<HTMLLIElement | null>(null)

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [refresh, setRefresh] = useState(false)

    const isVisible = useOnScreen(messageRef.current, messageRef.current?.parentElement || null, 0)
  
    useEffect(()=>{
      if(messageRef.current){
        setRefresh(!refresh)
      }

      const timer = setTimeout(()=>{
        document.addEventListener('click', closeTooltip)
        return () => {
            clearTimeout(timer)
            document.removeEventListener('click', closeTooltip)
        }
      }, 1000)
      
    },[])

  

    const closeTooltip = () => {
        setIsOpen(false)
    }


    useEffect(()=>{
      if(isVisible){
        onVisible(messageId)
      }
    },[isVisible])

    const handleOpen = (e: MouseEvent) => {
        e.stopPropagation()
        setIsOpen(!isOpen)
    }

    const handeDelete = () => {
        onDelete(messageId)
    }

    console.log(src);
    

  return (
    <li 
        className="flex gap-1"
        ref = {messageRef}
    >
        <Avatar
            src={src}
            className={`${isMyMessage ? '': 'order-1'} self-end shadow-light`}
        />
        <div className="w-[90%] relative ">
            <div className={`flex flex-col px-3 py-1 rounded-3xl shadow-light  ${isMyMessage ? 'rounded-bl-sm bg-blue-200' : 'rounded-br-sm bg-green-200'}`}>   
                {   
                    isMyMessage &&
                    <div className="relative self-end">
                        <button className=""
                            onClick={handleOpen}
                        >
                            <EllipsisHorizontalIcon className="h-5"/>
                        </button>
                        <Tooltip 
                            className='right-0 top-[110%]'
                            isOpen={isOpen}  
                    >
                            <MenuItem
                                itemName="edit"
                                itemText={'Edit'}
                                onChange={()=>{}}
                            />              
                            <MenuItem
                                itemName="delete"
                                itemText={'Delete'}
                                onChange={handeDelete}
                            />              
                        </Tooltip>
                    </div>
                }
                <p className="text-lg font-medium leading-5">{text}</p>
                <div className="flex justify-between">
                    <div className="font-medium text-sky-900">
                        {time}
                    </div>
                    {
                        isMyMessage &&
                        <div className="relative">
                            <CheckIcon className=" absolute duration-300 top-0 right-0 w-5 h-5 stroke-2 stroke-sky-700"/>
                            <CheckIcon className={` absolute duration-300 top-0 ${isRead ? 'right-[6px]': 'right-[0px]'}  w-5 h-5 stroke-2 stroke-sky-700`}/>
                        </div>
                    }
                </div>
            </div>
        </div>
    </li>
  )
}
