import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { useAppSelector } from '../../hooks/hooks'
import { Chat } from '../../slices/chatSlice'
import { ChatBar } from '../outputs/ChatBar'

export const Layout = () => {

  const {messageCounter} = useAppSelector<Chat>(state => state.chats)

  return (
    <div className='flex flex-col min-h-screen '>
        <Header 
        />
        <div className='relative bg-orange-100 grow '>
          <Outlet/>
          <ChatBar
            src=''
            isOnline={true}
            chatName='Nikolayenko Oleksiy'
            messageCounter={messageCounter}
          />
        </div>
    </div>
  )
}
