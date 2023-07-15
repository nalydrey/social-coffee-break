import { useEffect} from 'react'
import { Users } from "./components/pages/Users"
import { UserModel } from './models/UserModel'
import { enter} from './slices/currentUserSlice'
import { Route, Routes, useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "./hooks/hooks"
import { Profile } from './components/pages/Profile'
import { MyPosts } from './components/pages/MyPosts'
import { Posts } from './components/pages/Posts'
import { subscribes, unsubscribe } from './subscribes'
import { userLoads } from './userLoads'
import { getUsers } from './slices/usersSlice'
import { URL } from './http'
import { useStateController } from './hooks/useStateController'
import {io} from 'socket.io-client'
import { Layout } from './components/Layout/Layout'
import { MainUser } from './components/pages/MainUser'
import { Home } from './components/pages/Home'
import { Login } from './components/Forms/Login'
import { RegisterPage } from './components/pages/RegisterPage'


export const socket = io(URL, {auth:{
  user: localStorage.getItem('currentUser')
}})

function App() {

  const navigate = useNavigate()


  const controller = useStateController()
  const {
    removeFromSuggestation,
    removeFromInvitation,
    moveToFriend,
    removeFromFriend
  } = controller

  const isRegisterActive: boolean = useAppSelector((state) => state.aux.messageModal.isActive)
  const currentUser = useAppSelector<UserModel | null>(state => state.currentUser.user)
  
  const dispatch = useAppDispatch()

  const currentUserId = currentUser?._id || null


  useEffect(()=>{
    const userId = localStorage.getItem('currentUser')
    if(userId){
      dispatch(enter(userId)) 
      navigate('user')
    } 
    dispatch(getUsers({})) 
  },[])

  
  useEffect(()=>{
   if (currentUser){
      subscribes(dispatch, currentUser, controller)
      userLoads(dispatch, currentUser)
    }
    return () => {unsubscribe()}
  },[currentUserId])


  return (
    <>
      <Routes>
        <Route path='/' element={<Layout/>}>
          <Route index element = {<Home/>}/>
          <Route path='user' element = {<MainUser/>}>
            <Route index element={<Users/>}/>
            <Route path='profile' element={<Profile />}/>
            <Route path="myposts" element={<MyPosts />} />
            <Route path="posts" element={<Posts />} />
          </Route>
          <Route path='register' element={<RegisterPage/>}/>
          <Route path='login' element={<Login/>}/>
        </Route>
      </Routes>

    {/* <Modal isActive = {isRegisterActive}>
      <RegisterForm onCancel={closeRegisterForm}/>
    </Modal> */}

                    <Routes>
                        
                        {/* <Route path='users' element={<Users />}/> */}
                       
                    </Routes> 



     
    </>
  )
}

export default App
