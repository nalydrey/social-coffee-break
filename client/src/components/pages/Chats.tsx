import React, {useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import {  Chat, activateChat, deleteChat, disactivateChat, getMyChats } from '../../slices/chatSlice';
import { ChatModel } from '../../models/ChatModel';
import { URL } from '../../http';
import defaultFoto from '../assets/defaultAva.png'
import { useFormik } from 'formik';
import * as Yup from 'yup'
import { createMessage, createTempMessage, deleteMessage, getMessages, readMessage, resetMessages } from '../../slices/messagesSlice';
import { Message } from '../../models/MessageModel';
import { Slice } from '../../models/Slice';
import moment from 'moment'
import { MessageCard } from '../outputs/MessageCard';
import { ChatCard } from '../outputs/ChatCard';
import { UserModel } from '../../models/UserModel';
import { ContentBox } from '../UI/ContentBox';
import { MappingBox } from '../UI/MappingBox';
import { RoundButton } from '../UI/RoundButton';
import { PaperAirplaneIcon } from '@heroicons/react/24/solid';
import { useOnScreen } from '../../hooks/useOnScreen';
import { nanoid } from '@reduxjs/toolkit';




export const Chats = () => {

    const currentUser = useAppSelector<UserModel | null>(state => state.currentUser.user)

    const formik = useFormik({
        initialValues:{
            message:''
        },
        validationSchema: Yup.object({
            message: Yup.string().required('Required')
            }),
        onSubmit: (value, helpers) => {
            if(currentUser){
                const createdId = nanoid()
                // console.log(new Date());
                
                dispatch(createTempMessage({
                    _id: 'temp', 
                    createdId,
                    user: currentUser,
                    chat: currentChat,
                    isRead: false,
                    text: formik.values.message,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }))

                dispatch(createMessage({
                    createdId,
                    user: currentUser._id, 
                    chat: currentChat, 
                    text: formik.values.message}))

                helpers.resetForm()
            }
        }
    })
    const {state} = useLocation()
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const messages = useAppSelector<Message[]>(state => state.messages.container)
    const isSending = useAppSelector<boolean>(state => state.messages.isSending)
    const currentChat = useAppSelector((state:{chats: Chat}) => {
        const currentChat = state.chats.container.find(chat => chat.isActive)
        return currentChat?._id || ''
    })
    const chats: ChatModel[] = useAppSelector(state => state.chats.container)

    

    useEffect(()=>{
        if(currentUser){
            dispatch(getMyChats({
                isCreateNewChat: state?.isCreateNewChat || false,
                activeChat: state?.activeChat || null,
                users: [currentUser._id, state?.userId || null]
            }))
        } else{
            navigate('/users')
        }
        return () => {
            dispatch(disactivateChat())
        }
    },[])

    useEffect(()=>{
        if(currentChat){
            dispatch(getMessages({chat: currentChat}))
        }
        return () => {
            dispatch(resetMessages())
        }
    },[currentChat])

    const handlerOnVisible = (messageId: string, messageUser: string, isRead: boolean) => {
        console.log(currentUser?._id !== messageUser);
        
        if(currentUser?._id !== messageUser && !isRead){
            dispatch(readMessage(messageId))

        }
        
    }
    

  return (
    <ContentBox 
        className='grow'
        title='Chats'
    >
        <div className='flex h-full gap-1 p-3'>
            <MappingBox 
                className=' bg-gray-200 shadow-light min-w-[270px]'
                isAlternate = {false}
                isLoading = {false}
                alternateComponent = 'Нет чатов'
                loadingComponent = 'Loading...'
            >
                { chats.map((chat) => {
                    const {avatar, firstName} = chat.users[0].private
                    return (
                        <ChatCard
                            key={chat._id}
                            chatId={chat._id}
                            avatar={avatar}
                            unreadMessage = {chat.unreadMessageCount}
                            firstName={firstName}
                            isActive={chat.isActive}
                            onClick={(chatId)=>{dispatch(activateChat(chatId))}}
                            onDelete={(chatId)=>{dispatch(deleteChat(chatId))}}
                        />
                    )
                })}

            </MappingBox>
            <div className='relative grow flex flex-col shadow-light rounded-lg bg-sky-200 overflow-hidden'>
                <MappingBox 
                    className='bg-sky-200 grow overflow-hidden min-h-[500px] rounded-b-none'
                    isAlternate = {!messages.length}
                    isLoading = {false}
                    alternateComponent = {currentChat ? 'В этом чате пока нет сообщений' : 'Выберете чат'}
                    loadingComponent = 'Loading...'
                >
                    <ul className={`max-h-[500px] flex flex-col gap-3 h-[100%] overflow-y-auto pr-2 ${currentChat ? 'pb-14':''}`}>
                        { currentUser &&
                            messages.map(message => {
                                
                                return(
                                    <MessageCard 
                                        isMyMessage={currentUser._id === message.user._id}
                                        key={message.createdId}
                                        messageId={message._id}
                                        text={message.text}
                                        isSending = {isSending && message._id === 'temp'}
                                        isRead = {message.isRead}
                                        isDeleteButton = {currentUser._id === message.user._id}
                                        avatar={message.user.private.avatar}
                                        time={moment(message.createdAt).format('D MMM HH:mm')}
                                        onDelete={(messageId)=>{dispatch(deleteMessage(messageId))}}
                                        onVisible={()=> handlerOnVisible(message._id, message.user._id, message.isRead )}
                                    />
                                )
                            }
                            )
                        }
                    </ul>
                </MappingBox>
                <form   className={`flex gap-2 px-3 py-1 bg-sky-200 rounded-b-lg duration-500 ${!currentChat ? 'translate-y-full' : 'translate-y-0'} `}
                        onSubmit={formik.handleSubmit}
                >
                    <input  className={` border-2 border-sky-700 text-xl rounded-md grow p-1`} 
                            type="text" 
                            name='message'
                            id='message'
                            placeholder='Напишите сообщение'
                            value={formik.values.message}
                            onChange={formik.handleChange}
                    />
                    <RoundButton
                            title='Send'
                            disabled={!currentChat}
                            icon = {<PaperAirplaneIcon className='w-5 h-5 text-slate-300'/>}
                            type='submit' 
                    />
                </form>

            </div>
        </div>
    </ContentBox>
  )
}
