import React from 'react'
import { ContentBox } from '../UI/ContentBox'
import { Center } from '../UI/Center'

export const Login = () => {
  return (
    <Center 
      className='bg-orange-100'
    >
        <ContentBox
            title='Login'
            className='w-96'
        >
            login
        </ContentBox>
    </Center>
  )
}
