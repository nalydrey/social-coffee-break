import {useState} from 'react'
import { RoundButton } from '../UI/RoundButton'
import { BellIcon, PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { ChatItem } from './ChatItem'
import { useAppSelector } from '../../hooks/hooks'
import { ChatModel } from '../../models/ChatModel'
import { ContentBox } from '../UI/ContentBox'
import { Avatar } from '../UI/Avatar'
import { URL } from '../../http'
import moment from 'moment'
import { MessageModel} from '../../models/MessageModel'
import { Message } from './Message'
import { UserModel } from '../../models/UserModel'

interface ChatBarProps {
    messageCounter: number
    isOnline: boolean
    chatName: string
    src: string
}

export const ChatBar = ({
    messageCounter,
    isOnline,
    chatName,
    src
}: ChatBarProps) => {

    const chats = useAppSelector<ChatModel[]>(state => state.chats.container)
    const messages = useAppSelector<MessageModel[]>(state => state.messages.container)
    const currentUser = useAppSelector<UserModel>(state => state.currentUser.user)

    const [isOpen, setIsOpen] = useState<boolean>(true)
    const [isOpenChat, setIsOpenChat] = useState<boolean>(true)



    const handleOpenChat = () => {
        setIsOpenChat(!isOpenChat)
    }

    const handleOpen = () => {
        setIsOpen(!isOpen)
        if(!isOpenChat) setIsOpenChat(!isOpenChat)
    }

  return (
    <div className='absolute bottom-2 top-2 right-2  flex flex-col items-end gap-3 z-20'>
        <div className={`relative grow bg-red-300 w-0 `}>
            <div className={`absolute top-0 right-20  duration-300  ${isOpenChat ? 'scale-0': 'scale-1'}`}>
                <ContentBox 
                    title='Chat'
                    className='min-w-[400px]'
                >
                    <div className='flex py-1 px-5 items-center border-b-4 border-sky-800'>
                        <div className='relative mb-1'>
                            <Avatar 
                                src={src ? URL+src : ''}
                                className='shadow-light'
                            />
                            {
                                isOnline &&    
                                <div className='absolute bottom-0 left-0 -translate-x-1/4 translate-y-1/4 w-3 h-3 rounded-full bg-green-600'/>
                            }
                        </div>
                        <p className='grow text-center text-2xl font-bold text-sky-700'>
                            {chatName}
                        </p>
                    </div>
                    <ul className='py-2 px-3 flex flex-col gap-3 max-h-[500px] overflow-auto'>
                        {messages.map(message => {
                            const user = message.user as UserModel
                            const {text, isRead, createdAt} = message
                            return (
                                <Message
                                    src={user.private.avatar ? URL + user.private.avatar : ''}
                                    isMyMessage = {user._id === currentUser._id}
                                    isRead = {isRead}
                                    time = {moment(createdAt).format('D MMM HH:mm')}
                                    text = {text}
                                />
                            )
                        }
                        )}
                    </ul>
                    <div className='flex gap-2 p-2 border-t-4 border-sky-700' >
                        <textarea className=' w-full border-2 border-sky-500 p-3 rounded-lg focus:border-4 focus:outline-none' />
                        <RoundButton
                            title='Send'
                            d={10}
                            classWrap='self-end'
                            // disabled={!currentChat}
                            icon = {<PaperAirplaneIcon className='w-6 h-6 text-slate-300'/>}
                            type='submit' 
                        />
                    </div>
                </ContentBox>
            </div>
            <ul className={`flex flex-col gap-3 duration-300 absolute right-0 bg-orange-200 rounded-xl p-2 ${isOpen ? 'scale-0' : 'scale-1'}`}>
                {chats.map(chat => (
                    <ChatItem 
                        src={chat.users[0].private.avatar}
                        isOnline ={true}
                        counter={chat.unreadMessageCount}
                        onClick={handleOpenChat}
                    />
                ))}
            </ul>
        </div>
        <div className='flex justify-center items-center'>
            <div className="relative">
                <RoundButton
                    d = {14}
                    icon={<BellIcon className="w-10 h-10 text-gray-100"/>}
                    onClick={handleOpen}
                />
                {
                    !!messageCounter &&
                    <span className="px-2 shadow-light font-bold text-gray-700 absolute top-0 left-0 rounded-l-xl rounded-r-xl -translate-y-1/2 bg-orange-500">{messageCounter}</span>
                }
            </div>
        </div>
    </div>
  )
}
