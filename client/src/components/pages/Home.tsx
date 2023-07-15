import React from 'react'
import { useAppSelector } from '../../hooks/hooks'
import { Register } from '../Forms/Register'

export const Home = () => {

    const currentUser = useAppSelector(state => state.currentUser.user)


  return (
    <div className='bg-orange-100 grow flex justify-center items-center'>
        <div className=''>
            <h1 className='font-bold text-5xl'>What are you going to do?</h1>
            {
                <>
                    <Register/>
                    <div className=''>Login</div>
                </>
            }
        </div>
    </div>
  )
}
