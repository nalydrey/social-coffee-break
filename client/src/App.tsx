import { useEffect } from 'react'
import { Users } from "./components/pages/Users"
import { Chats } from "./components/pages/Chats"
import { Header } from "./components/Layout/header"
import { UserModel } from './models/UserModel'
import { changeMyAvatar, changeMyPicture, enter} from './slices/currentUserSlice'
import { Route, Routes, Link, useNavigate } from "react-router-dom"
import { RegisterForm } from "./components/UI/RegisterForm"
import { useAppDispatch, useAppSelector } from "./hooks/hooks"
import { controlMessageModal } from "./slices/auxiliarySlice"
import { Modal } from './components/UI/Modal'
import { getLastElement } from './customFunctions/getLastElement'
import { Profile } from './components/pages/Profile'
import { MyPosts } from './components/pages/MyPosts'
import { Posts } from './components/pages/Posts'
import { TopBox } from './components/Layout/TopBox'
import { FriendPreview } from './components/outputs/FriendPreview'
import { MappingBox } from './components/UI/MappingBox'
import { MenuItem } from './components/UI/MenuItem'
import { deleteUserFromFriends } from './slices/friendSlice'
import { acceptInvitation, rejectInvitation } from './slices/invitationSlice'
import { cancelSuggestationToBeFriends, } from './slices/suggestationSlice'
import { ContentBox } from './components/UI/ContentBox'
import { matchedValueInArr } from './customFunctions/isCoincidenceInArr'
import {io} from 'socket.io-client'
import { subscribes, unsubscribe } from './subscribes'
import { userLoads } from './userLoads'
import { getUsers } from './slices/usersSlice'



export const socket = io('http://localhost:3010')

function App() {
  const isRegisterActive: boolean = useAppSelector((state) => state.aux.messageModal.isActive)
  const currentUser = useAppSelector<UserModel | null>(state => state.currentUser.user)
  const currentUserLoadings = useAppSelector<
  {
    isLoadingAvatar: boolean
    isLoadingPicture: boolean
  }>(state => state.currentUser.loadings)
  const friends = useAppSelector<UserModel[]>(state => state.friends.container)
  const invitations = useAppSelector<UserModel[]>(state => state.invitations.container)
  const suggestations = useAppSelector<UserModel[]>(state => state.suggestations.container)
  const messageCounter = useAppSelector<number>(state => state.chats.messageCounter)
  const users = useAppSelector<UserModel[]>(state => state.users.container)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const currentUserId = currentUser?._id || null

  useEffect(()=>{
    const userId = localStorage.getItem('currentUser')
    userId && dispatch(enter(userId)) 
    dispatch(getUsers({})) 
  },[])
  
  useEffect(()=>{
    console.log('!!!!!!11111111111WAAAAAAa');
    
   if (currentUser){
      subscribes(dispatch, currentUser)
      userLoads(dispatch, currentUser)
    }
    return () => {unsubscribe()}
  },[currentUserId])


  const closeRegisterForm: ()=>void = () => {
    dispatch(controlMessageModal(false))
  }

  const changeAvatar = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    const avatar = new FormData()
    files && avatar.append('avatar', files[0])
    currentUser &&
    dispatch(changeMyAvatar({userId: currentUser._id, file: avatar}))
  }
  
  const changePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
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

const handlerDeleteFromFriends = (id:string) => {
  if(currentUser)
  dispatch(deleteUserFromFriends({friendId: id, currentUserId: currentUser._id}))
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

const handlerAccept = (id:string) => {
  if(currentUser)
  dispatch(acceptInvitation({friendId: id, currentUserId: currentUser._id}))
}

  const inviteQty = currentUser?.invitations.length
  const lastElement = currentUser && getLastElement(currentUser.invitations)

  
  


  return (
    <>
      <div className='bg-orange-100 min-h-screen pb-5'>
        <Header />
        <div className=' container mx-auto'>
            <TopBox 
                    picture={currentUser?.picture || ''}
                    avatar={currentUser?.private.avatar || ''}
                    firstName={currentUser?.private.firstName || ''}
                    lastName={currentUser?.private.lastName || ''}
                    isLoadingAvatar={currentUserLoadings.isLoadingAvatar}
                    isLoadingPicture={currentUserLoadings.isLoadingPicture}
                    messageCounter={messageCounter}
                    onChangePicture={changePicture}
                    onChangeAvatar={changeAvatar}
            />

            <div className='flex gap-5'>
              <div className='flex flex-col gap-5'>
                <ContentBox title='Friends'>
                  <MappingBox 
                      className='w-[280px]'
                      isLoading = {false}
                      isAlternate = {!friends.length}
                      loadingComponent = 'Loading...'
                      alternateComponent = 'Пока нет друзей'
                  >
                    <ul className='flex flex-col gap-3 '>
                      {
                        friends.map(user => (
                          <FriendPreview
                            key={user._id}
                            avatar={user.private.avatar}
                            picture={user.picture}
                            title={`${user.private.firstName} ${user.private.lastName}`}
                          >
                            <MenuItem
                                itemName='message'
                                itemText='Написать сообщение'
                                onChange={()=>{goToChat(user._id)}}
                            />
                            <MenuItem
                                itemName='delete'
                                itemText='Удалить из друзей'
                                onChange={()=>{handlerDeleteFromFriends(user._id)}}
                            />
                          </FriendPreview>
                        ))
                      }
                    </ul>
                  </MappingBox>
                </ContentBox>
                
                <ContentBox title='Invitation'>
                  <MappingBox 
                      className='w-[280px]'
                      isLoading = {false}
                      isAlternate = {!invitations.length}
                      loadingComponent = 'Loading...'
                      alternateComponent = 'Пока нет приглашений'
                  >
                      <ul>
                        {invitations.map(user => (
                          <FriendPreview
                              key={user._id}
                              avatar={user.private.avatar}
                              picture={user.picture}
                              title={`${user.private.firstName} ${user.private.lastName}`}
                          >
                            <MenuItem
                                itemName='message'
                                itemText='Написать сообщение'
                                onChange={()=>{goToChat(user._id)}}
                            />
                            <MenuItem
                              itemName='add'
                              itemText='Принять приглашение'
                              onChange={()=>{handlerAccept(user._id)}}
                            />
                            <MenuItem
                                itemName='reject'
                                itemText='Отклонить приглашение'
                                onChange={()=>{handlerReject(user._id)}}
                            />
                          </FriendPreview>
                        ))}
                      </ul>
                  </MappingBox>
                </ContentBox>
                
                <ContentBox title='Suggestation'>
                  <MappingBox 
                      className='w-[280px]'
                      isLoading = {false}
                      isAlternate = {!suggestations.length}
                      loadingComponent = 'Loading...'
                      alternateComponent = 'Пока нет предложений'
                  >
                      <ul>
                        {suggestations.map(user => (
                          <FriendPreview
                              key={user._id}
                              avatar={user.private.avatar}
                              picture={user.picture}
                              title={`${user.private.firstName} ${user.private.lastName}`}
                          >
                            <MenuItem
                                itemName='message'
                                itemText='Написать сообщение'
                                onChange={()=>{goToChat(user._id)}}
                            />
                            <MenuItem
                                itemName='reject'
                                itemText='Отозвать приглашение'
                                onChange={()=>{handlerCancelSuggestation(user._id)}}
                            />
                          </FriendPreview>
                        ))}
                      </ul>
                  </MappingBox>
                </ContentBox>
              </div>
              <Routes>
                <Route path='/' element={<Profile />}/>
                <Route path='users' element={<Users />}/>
                <Route path="chats" element={<Chats />} />
                <Route path="myposts" element={<MyPosts />} />
                <Route path="posts" element={<Posts />} />
              </Routes>          
              

            </div>
        </div>
      </div>
      
      <Modal isActive = {isRegisterActive}>
        <RegisterForm onCancel={closeRegisterForm}/>
      </Modal>
     
    </>
  )
}

export default App
