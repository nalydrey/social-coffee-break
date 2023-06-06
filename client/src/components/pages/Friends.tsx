import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { UserModel } from '../../models/UserModel'
import { getUsers } from '../../slices/usersSlice'
import { matchedValueInArr } from '../../customFunctions/isCoincidenceInArr'
import { useNavigate } from 'react-router-dom'
import { Nav } from './Users'

export const Friends = () => {

  const dispatch = useAppDispatch()
  const currentUser = useAppSelector<UserModel>(state => state.currentUser.user)
  const users = useAppSelector<UserModel[]>(state => state.users.container)

  const navigate = useNavigate()      



  useEffect(()=>{
    currentUser &&
    dispatch(getUsers({_id: currentUser.friends}))
  }, [])


  const goToChat: (userId: string) => void = (userId) => {
    const state: Nav = {
        isCreateNewChat: false,
        activeChat: '',
        userId
    }

    const userChats = users.find((user) => user._id === userId)?.chats

    if (userChats) {
        const matchedChat = matchedValueInArr(currentUser.chats, userChats)
        if (matchedChat) {
        //переходим в чат
        state.isCreateNewChat = false
        state.activeChat = matchedChat
        } 
        else {
        //Создаем новый чат
        state.isCreateNewChat = true
        }
        navigate("/chats", {state})
    }
}

  return (
    <>
    {
        users.length ? 
            <ul className="border gap-5 flex ">
               
            </ul>
        : 
        <p className='text-xl flex justify-center items-center h-full'>Пока нет друзей</p>
    }
</>
  )
}
