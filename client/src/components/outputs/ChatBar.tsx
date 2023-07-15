import {useState, useEffect} from 'react'
import { RoundButton } from '../UI/RoundButton'
import { BellIcon} from '@heroicons/react/24/solid'
import { ChatItem } from './ChatItem'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { ChatModel } from '../../models/ChatModel'
import { ContentBox } from '../UI/ContentBox'
import { URL } from '../../http'
import { MessageModel} from '../../models/MessageModel'
import { UserModel } from '../../models/UserModel'
import { socket } from '../../App'
import { Chat, decreaseCounter, activateChat } from '../../slices/chatSlice'
import { createTempMessage, getMessages } from '../../slices/messagesSlice'
import { ChatHeader } from '../Layout/chat/ChatHeader'
import { nanoid } from '@reduxjs/toolkit'
import { ChatForm } from '../Layout/chat/ChatForm'
import { ChatContent } from '../Layout/chat/ChatContent'




export const ChatBar = () => {

    const dispatch = useAppDispatch()

    const {messageCounter} = useAppSelector<Chat>(state => state.chats)
    const chats = useAppSelector<ChatModel[]>(state => state.chats.container)
    const activeChat = chats.find(chat => chat.isActive)
    const messages = useAppSelector<MessageModel[]>(state => state.messages.container)
    const messagesLoading = useAppSelector<boolean>(state => state.messages.isLoading)
    const currentUser = useAppSelector<UserModel>(state => state.currentUser.user)

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isOpenChat, setIsOpenChat] = useState<boolean>(true)

    useEffect (()=>{
        if(activeChat){
            setIsOpen(true)
        }
    },[activeChat])
  
    useEffect (()=>{
        if(activeChat){
            dispatch(getMessages({chat: activeChat._id}))
        }
    },[activeChat?._id])



    const handlerOnVisible = (messageId: string, messageUser: string, isRead: boolean, chatId: string) => {
        if(currentUser && currentUser._id !== messageUser && !isRead){
            socket.emit('readMessage', {messageId, chatId})
            dispatch(decreaseCounter({chatId}))
        }
    }

    const handlerDeleteMessage = (messageId: string, chatId: string) => {
        socket.emit('deleteMessage', {messageId, chatId})
     }

    const handlerOnDeleteChat = (chatId: string) => {
        socket.emit('deleteChat', {chatId})
    }

    const handleOpenChat = (chatId: string) => {
        dispatch(activateChat(chatId))
        dispatch(getMessages({chat: chatId}))
    }

    const handleOpen = () => {
        setIsOpen(!isOpen)
        if(!isOpenChat) setIsOpenChat(!isOpenChat)
    }

    const handleSubmit = (text: string) => {
        if(currentUser && activeChat){
            const createdId = nanoid()
            const date = new Date().toISOString()
            
            dispatch(createTempMessage({
                _id: 'temp', 
                createdId,
                user: currentUser,
                chat: activeChat._id,
                isRead: false,
                text,
                createdAt: date,
                updatedAt: date,
            }))

            socket.emit('sendMessage', {
                createdId,
                user: currentUser._id, 
                chat: activeChat._id, 
                text
            })
            
        }
    }

    const activeChatUser = activeChat && activeChat.users[0]
    // console.log('isOpen', isOpen);
    // console.log('activeChat', activeChat);
    
    // console.log(isOpen || !!activeChat);
    

  return (
    <div className='absolute bottom-2 top-2 right-2  flex flex-col items-end gap-3 z-20'>
        <div className={`relative grow bg-red-300 w-0 `}>
            {
                activeChatUser && 
                <div className={`absolute top-0 right-20  duration-300  ${isOpen ? 'scale-1': 'scale-0'}`}>
                    <ContentBox 
                        title='Chat'
                        className='min-w-[400px]'
                    >
                       <ChatHeader
                            chatName={activeChatUser.private.firstName + ' ' + activeChatUser.private.lastName}
                            isOnline = {activeChatUser.isOnline}
                            avatar = {activeChatUser.private.avatar ? URL + activeChatUser.private.avatar : ''}
                       />
                       
                       <ChatContent
                            isLoading = {messagesLoading}
                            currentUserId={currentUser._id}
                            content={messages}
                            onVisible={handlerOnVisible}
                            onDelete={handlerDeleteMessage}
                            onEdit={()=>{}}
                       />
                        
                        <ChatForm
                            onSubmit = {handleSubmit}
                        />
                    </ContentBox>
                </div>
            }
            <ul className={`flex flex-col gap-3 duration-300 absolute right-0 bg-orange-200 rounded-xl p-2 ${isOpen? 'scale-1' : 'scale-0'}`}>
                {chats.map(chat => (
                    <ChatItem 
                        key ={chat._id}
                        chatId={chat._id}
                        src={chat.users[0].private.avatar}
                        isOnline ={chat.users[0].isOnline}
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
