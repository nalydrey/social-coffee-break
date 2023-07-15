import {useRef, useEffect} from 'react'
import { Message } from '../../outputs/Message'
import { UserModel } from '../../../models/UserModel'
import moment from 'moment'
import { MessageModel } from '../../../models/MessageModel'
import { MappingBox } from '../../UI/MappingBox'
import { URL } from '../../../http'

interface ChatContentProps {
    isLoading: boolean
    currentUserId: string
    content: MessageModel[]
    onDelete: (messageId: string, chatId: string) => void
    onEdit: () => void
    onVisible: (messageId: string, userId: string, isRead: boolean, chatId: string) => void
}

export const ChatContent = ({
    isLoading,
    content,
    currentUserId,
    onDelete,
    onVisible
}:ChatContentProps) => {

    const liRef = useRef<HTMLLIElement>(null)
    const messageContainer = useRef<HTMLUListElement>(null)

    useEffect(()=>{
        if(!isLoading){
            liRef.current?.scrollIntoView({behavior: 'instant'})
        }
    }, [isLoading])

    useEffect(()=>{
        if(messageContainer.current &&  messageContainer.current.scrollHeight - messageContainer.current.scrollTop <=591){
            liRef.current?.scrollIntoView({behavior: 'smooth'})
        }
    }, [content])

  return (
    <MappingBox
        isAlternate = {!content.length}
        alternateComponent = {'No Messages'}
    >
        <ul ref={messageContainer} className='py-2 px-3 flex flex-col gap-3 max-h-[500px] overflow-auto'>
            {content.map(message => {
                const user = message.user as UserModel
                const {text, isRead, createdAt, _id} = message
                return (
                    <Message
                        key={_id}
                        messageId={_id}
                        src={user.private.avatar ? URL + user.private.avatar : ''}
                        isMyMessage = {user._id === currentUserId}
                        isRead = {isRead}
                        time = {moment(createdAt).format('D MMM HH:mm')}
                        text = {text}
                        onVisible={()=> (typeof message.user === 'object') && onVisible(message._id, message.user._id, message.isRead, message.chat )}
                        onDelete={() => onDelete(message._id, message.chat)}
                    />
                )
            }
            )}
            <li ref={liRef} className='h-4'></li>
        </ul>
    </MappingBox>
  )
}
