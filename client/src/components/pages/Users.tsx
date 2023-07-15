import { useEffect } from "react"
import { useAppSelector, useAppDispatch } from "../../hooks/hooks"
import type { UserModel } from "../../models/UserModel"
import { UserCard } from "../outputs/UserCard"
import { deleteUser } from "../../slices/usersSlice"
import { enter } from "../../slices/currentUserSlice"
import { getUsers } from "../../slices/usersSlice"
import { matchedValueInArr } from "../../customFunctions/isCoincidenceInArr"
import { useNavigate } from "react-router-dom"
import { MappingBox } from "../UI/MappingBox"
import { RoundButton } from "../UI/RoundButton"
import { ArrowDownTrayIcon, ChatBubbleLeftRightIcon, UserMinusIcon, UserPlusIcon, XCircleIcon } from "@heroicons/react/24/solid"
import { ContentBox } from "../UI/ContentBox"
import { UserCardSkeleton } from "../Preloaders/UserCardSkeleton"
import { socket } from "../../App"
import { useStateController } from "../../hooks/useStateController"



export const Users = () => {

    const {
        moveToSuggestation,
        moveToFriend,
        removeFromFriend,
        removeFromSuggestation,
        removeFromInvitation,
    } = useStateController()

    const dispatch = useAppDispatch()
    const users = useAppSelector<UserModel[]>((state) => state.users.container)
    const isLoadingUsers = useAppSelector<boolean>((state) => state.users.isLoading)
    const isLoadingFriends = useAppSelector<boolean>((state) => state.friends.isLoading)
    const currentUser = useAppSelector<UserModel | null>((state) => state.currentUser.user)
    const isLoadingSuggest = useAppSelector<boolean>((state) => state.suggestations.isLoading)
    const isLoadingInvitations = useAppSelector<boolean>((state) => state.invitations.isLoading)

    const navigate = useNavigate()      

    useEffect(() => {
      dispatch(getUsers({}))
    }, [])

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
                    socket.emit('createNewChat', {userReceiver: userId})
                }
                navigate("/chats", {state})
            }
        }
    }

    const handlerEnter = (id:string) => {
        currentUser && socket.emit('quitUser')
        dispatch(enter(id)); 
        localStorage.setItem("currentUser", id)
    }
  
    const handlerDelete = (id:string) => {
        dispatch(deleteUser(id))
    }
    
    const handlerAddToFriends = (user: UserModel) => {
        if(currentUser && !currentUser.myRequests.includes(user._id)) {
            moveToSuggestation({user})
            socket.emit('newInvitation', {friendId: user._id})
        }
    }

    const handlerCancelSuggestation = (userId:string) => {
        if (currentUser && currentUser.myRequests.includes(userId)) {
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
  
    const handlerDeleteFromFriends = (userId:string) => {
        removeFromFriend({userId})
        socket.emit('deleteFriend', {friendId: userId})
    }


  return (
    <ContentBox 
        title='People'
        className="grow"
    >
        <MappingBox 
            isLoading = {isLoadingUsers}
            isAlternate = {!users.length}
            loadingComponent = {<UserCardSkeleton/>}
            alternateComponent = 'Пока нет пользователей'
        >
            <ul className='grid justify-center justify-items-center sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-5 '>
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
                                isOnline={user.isOnline}
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
                                            isLoading = {isLoadingSuggest}
                                            icon = {<UserPlusIcon className={`${iconSizeClass} text-white`}/>}
                                            onClick={() => handlerAddToFriends(user)}  
                                        />
                                    }
                                    {
                                        !isI && isMyRequest &&
                                        <RoundButton 
                                            title='Отозвать приглашение'  
                                            isLoading = {isLoadingSuggest}
                                            icon = {<UserMinusIcon className={`${iconSizeClass} text-white`}/>}
                                            onClick={() => handlerCancelSuggestation(user._id)}  
                                        />
                                    }
                                    {
                                        isMyInvitation &&
                                        <>  
                                            <RoundButton 
                                                title='Принять приглашение'
                                                isLoading={isLoadingInvitations}
                                                icon = {<UserPlusIcon className={`${iconSizeClass} text-white`}/>}
                                                onClick={()=>handlerAccept(user)}   
                                            />
                                            <RoundButton 
                                                title='Отклонить приглашение' 
                                                isLoading={isLoadingInvitations}
                                                icon = {<UserMinusIcon className={`${iconSizeClass} text-white`}/>}
                                                onClick={() => handlerReject(user._id)}     
                                            />
                                        </>
                                    }
                                    {
                                        isMyFriend &&
                                        <RoundButton 
                                            title='Удалить из друзей'  
                                            isLoading = {isLoadingFriends}
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
