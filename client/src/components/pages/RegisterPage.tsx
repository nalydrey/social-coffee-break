import React from 'react'
import { Center } from '../UI/Center'
import { ContentBox } from '../UI/ContentBox'
import { Register } from '../Forms/Register'
import { Link } from 'react-router-dom'

export const RegisterPage = () => {
  return (
    <Center
      className='bg-orange-100 flex-col gap-5'
    >
        <Register/>
        <Link to='/login' className='hover:text-sky-500 underline font-medium'>I have an account</Link>
        <Link to='/user' className='hover:text-sky-500 underline font-medium'>Demo</Link>
    </Center>
  )
}
