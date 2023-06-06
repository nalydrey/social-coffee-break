import React, { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../hooks/hooks"
import type { UserModel } from "../../models/UserModel"
import { UserCard } from "../outputs/UserCard"
import { deleteUser } from "../../slices/usersSlice"
import { enter } from "../../slices/currentUserSlice"
import { acceptInvitation, rejectInvitation } from "../../slices/invitationSlice"
import { getUsers } from "../../slices/usersSlice"
import { matchedValueInArr } from "../../customFunctions/isCoincidenceInArr"
import { GetData, activateChat } from "../../slices/chatSlice"
import { useNavigate } from "react-router-dom"
import { MappingBox } from "../UI/MappingBox"
import { RoundButton } from "../UI/RoundButton"
import { ArrowDownTrayIcon, ChatBubbleLeftRightIcon, UserMinusIcon, UserPlusIcon, XCircleIcon } from "@heroicons/react/24/solid"
import { cancelSuggestationToBeFriends, suggestToBeFriends } from "../../slices/suggestationSlice"
import { deleteUserFromFriends } from "../../slices/friendSlice"
import { ContentBox } from "../UI/ContentBox"

export interface Nav extends Pick<GetData, 'activeChat'|'isCreateNewChat'> {userId: UserModel['_id']}

export const Users = () => {
    const users = useAppSelector<UserModel[]>((state) => state.users.container)
    const currentUser = useAppSelector<UserModel | null>((state) => state.currentUser.user)
    const dispatch = useAppDispatch()

    const navigate = useNavigate()      

    useEffect(() => {
      dispatch(getUsers())
    }, [])

    const goToChat: (userId: string) => void = (userId) => {
        if(currentUser){
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
    }

    const handlerAddToFriends = (id:string) => {
        if(currentUser && !currentUser.myRequests.includes(id)){
            dispatch(suggestToBeFriends({friendId: id, currentUserId: currentUser._id}))
        }
    }

    const handlerCancelSuggestation = (id:string) => {
        if(currentUser && currentUser.myRequests.includes(id)){
        dispatch(cancelSuggestationToBeFriends({friendId: id, currentUserId: currentUser._id}))
        }
    }
  
    const handlerReject = (id:string) => {
        if(currentUser){
        dispatch(rejectInvitation({currentUserId:currentUser._id , friendId:id }))
        }
    }
    
    const handlerEnter = (id:string) => {
        dispatch(enter(id)); 
        localStorage.setItem("currentUser", id)
    }
  
    const handlerDelete = (id:string) => {
        dispatch(deleteUser(id))
    }
    
    const handlerAccept = (id:string) => {
        if(currentUser)
        dispatch(acceptInvitation({friendId: id, currentUserId: currentUser._id}))
    }
  
    const handlerDeleteFromFriends = (id:string) => {
        if(currentUser)
        dispatch(deleteUserFromFriends({friendId: id, currentUserId: currentUser._id}))
    }

  return (
    <ContentBox 
        title='People'
        className="grow"
    >
        <MappingBox 
            isLoading = {false}
            isAlternate = {false}
            loadingComponent = 'Loading...'
            alternateComponent = 'Пока нет пользователей'
        >
            <ul className='flex  gap-5'>
                {
                    users.map(user => {

                        const isI = currentUser?._id === user._id 
                        const isMyRequest = (currentUser?.myRequests.includes(user._id))
                        const isMyFriend = currentUser?.friends.includes(user._id)
                        const isMyInvitation = currentUser?.invitations.includes(user._id )

                        const iconSizeClass = 'w-6 h-6'

                        return (
                            <UserCard 
                                key={user._id}
                                id={user._id}
                                avatar={user.private.avatar}
                                picture={user.picture}
                                friendCounter={user.friends.length}
                                postCounter={user.posts.length}
                                firstName={user.private.firstName}
                                lastName={user.private.lastName}
                            >
                                {
                                    !isI &&
                                    <RoundButton 
                                        title='Войти'  
                                        icon = {<ArrowDownTrayIcon className={`${iconSizeClass} text-white`}/>}   
                                        onClick={()=>handlerEnter(user._id)}   
                                    />
                                }

                                { 
                                currentUser &&
                                <>
                                    {
                                        !isI && !(isMyFriend || isMyInvitation || isMyRequest) &&
                                        <RoundButton 
                                            title='Пригласить в друзья' 
                                            icon = {<UserPlusIcon className={`${iconSizeClass} text-white`}/>}
                                            onClick={() => handlerAddToFriends(user._id)}  
                                        />
                                    }
                                    {
                                        !isI && isMyRequest &&
                                        <RoundButton 
                                            title='Отозвать приглашение'  
                                            icon = {<UserMinusIcon className={`${iconSizeClass} text-white`}/>}
                                            onClick={() => handlerCancelSuggestation(user._id)}  
                                        />
                                    }
                                    {
                                        isMyInvitation &&
                                        <>  
                                            <RoundButton 
                                                title='Принять приглашение'
                                                icon = {<UserPlusIcon className={`${iconSizeClass} text-white`}/>}
                                                onClick={()=>handlerAccept(user._id)}   
                                            />
                                            <RoundButton 
                                                title='Отклонить приглашение' 
                                                icon = {<UserMinusIcon className={`${iconSizeClass} text-white`}/>}
                                                onClick={() => handlerReject(user._id)}     
                                            />
                                        </>
                                    }
                                    {
                                        isMyFriend &&
                                        <RoundButton 
                                            title='Удалить из друзей'  
                                            icon = {<UserMinusIcon className={`${iconSizeClass} text-white`}/>}
                                            onClick={() =>  handlerDeleteFromFriends(user._id)}       
                                        />
                                    }

                                    {
                                        !isI &&
                                        <RoundButton 
                                            title='Написать сообщение' 
                                            icon = {<ChatBubbleLeftRightIcon className={`${iconSizeClass} text-white`}/>} 
                                            onClick={()=>goToChat(user._id)}
                                        />
                                    }
                                </>
                                }
                                <RoundButton 
                                    title='Удалить пользователя'  
                                    icon = {<XCircleIcon className={`${iconSizeClass} text-white`}/>}
                                    onClick={()=>handlerDelete(user._id)}      
                                />
                            </UserCard>
                        )
                    })
                }
            </ul>
        </MappingBox>
    </ContentBox>
)
}
