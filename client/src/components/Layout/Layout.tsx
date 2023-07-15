import React from 'react'
import { Outlet } from 'react-router-dom'
import { Header } from './Header'
import { ChatBar } from '../outputs/ChatBar'

export const Layout = () => {

  

  return (
    <div className='flex flex-col min-h-screen '>
        <Header 
        />
        <div className='relative bg-orange-100 grow '>
          <Outlet/>
          <ChatBar/>
        </div>
    </div>
  )
}
