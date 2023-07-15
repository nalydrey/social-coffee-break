import React, { ChangeEvent } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { TopBox } from '../Layout/TopBox'
import { FriendBox } from '../Boxes/FriendBox'
import { InvitationBox } from '../Boxes/InvitationBox'
import { SuggestationBox } from '../Boxes/SuggestationBox'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { UserModel } from '../../models/UserModel'
import { controlMessageModal } from '../../slices/auxiliarySlice'
import { changeMyAvatar, changeMyPicture } from '../../slices/currentUserSlice'
import { matchedValueInArr } from '../../customFunctions/isCoincidenceInArr'
import { socket } from '../../App'
import { useStateController } from '../../hooks/useStateController'

export const MainUser = () => {

    const navigate = useNavigate()

    const controller = useStateController()
  const {
    removeFromSuggestation,
    removeFromInvitation,
    moveToFriend,
    removeFromFriend
  } = controller


    const dispatch = useAppDispatch()

    const currentUser = useAppSelector<UserModel | null>(state => state.currentUser.user)
    const users = useAppSelector<UserModel[]>(state => state.users.container)
    const messageCounter = useAppSelector<number>(state => state.chats.messageCounter)




    const closeRegisterForm: ()=>void = () => {
        dispatch(controlMessageModal(false))
      }
    
      const changeAvatar = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        const avatar = new FormData()
        files && avatar.append('avatar', files[0])
        currentUser &&
        dispatch(changeMyAvatar({userId: currentUser._id, file: avatar}))
      }
      
      const changePicture = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files
        const avatar = new FormData()
        files && avatar.append('picture', files[0])
        currentUser &&
        dispatch(changeMyPicture({userId: currentUser._id, file: avatar}))
      }
    
      const goToChat: (userId: string) => void = (userId) => {
        if(currentUser){
            const state = {
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
    }
    
    const handlerDeleteFromFriends = (userId:string) => {
      removeFromFriend({userId})
      socket.emit('deleteFriend', {friendId: userId})
    }
    
    const handlerCancelSuggestation = (userId:string) => {
      if( currentUser && currentUser.myRequests.includes(userId) ) {
        removeFromSuggestation({userId})
        socket.emit('cancelSuggestation', {friendId: userId})
      }
    }
    
    const handlerReject = (userId:string) => {
      removeFromInvitation({userId})
      socket.emit('rejectInvitation', {friendId:userId})
    }
    
    const handlerAccept = (user:UserModel) => {
      moveToFriend({user})
      socket.emit('acceptInvitation', {friendId: user._id})
    }
    

  return (
    <div className='my-5'>
        <div className=' container mx-auto'>
            <TopBox 
                messageCounter={messageCounter}
                onChangePicture={changePicture}
                onChangeAvatar={changeAvatar}
            />
            <div className='flex flex-col gap-5 relative  mx-1 md:flex-row'>
                <div className='flex flex-col gap-5 w-full md:max-w-[270px]'>

                    <FriendBox
                        isShow = {false}
                        onWriteMessage={goToChat}
                        onDeleteFromFriends={handlerDeleteFromFriends}
                    />

                    <InvitationBox
                        isShow = {false}
                        onWriteMessage={goToChat}
                        onAccept={handlerAccept}
                        onReject={handlerReject}
                    />
                    
                    <SuggestationBox
                        isShow = {false}
                        onWriteMessage={goToChat}
                        onCancel = {handlerCancelSuggestation}
                    />
                
                </div>
                <div className={`absolute md:static md:-translate-y-0 w-full ${ true  ? 'top-[0px]': '-top-[400px] -translate-y-full'}  duration-1000 `}>
                   <Outlet/>
                </div>
            </div>
        </div>
    </div>
  )
}
