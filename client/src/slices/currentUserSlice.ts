import axios from "axios"
import { USERSROUTE } from "../http"
import { UserModel } from "../models/UserModel"
import { EditUserForm } from "../components/pages/Profile"
import { RegisterFormNames } from "../components/UI/RegisterForm"
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { boolean } from "yup"

import { socket } from "../App"

export type CurrentUserState = {
  user: UserModel | null,
  loadings: {[key: string]: boolean},
}

const initialState: CurrentUserState = {
  user: null,
  loadings: {
    isLoadingAvatar: false,
    isLoadingPicture: false
  },
  
} 

export const enter = createAsyncThunk("currentUser/enter", async (userId: string) => {
    const {data} = await axios<{user: UserModel}>(`${USERSROUTE}/${userId}`)
    return data.user
})

 export const createUser = createAsyncThunk(
  "currentUser/createUser",
  async (newUser: RegisterFormNames) => {
      const {data} = await axios.post(USERSROUTE, newUser)
      console.log(data);
      return {user: data.user}
  },
  )

  export const editUser = createAsyncThunk(
  "currentUser/editUser",
  async (editForm:EditUserForm) => {
    console.log(editForm);
      const {data} = await axios.put(`${USERSROUTE}${editForm.userId}`, editForm)
      console.log(data);
      return {user: data.user}
  },
  )

export const changeMyAvatar = createAsyncThunk(
  "currentUser/changeMyAvatar",
  async({userId, file}: {userId: UserModel['_id'], file: FormData}) => {
    const {data}: {data: {avatar: string}} = await axios.put(`${USERSROUTE}/img/${userId}`, file)
    console.log(data);
    return data.avatar
  }
)

export const changeMyPicture = createAsyncThunk(
  "currentUser/changeMyPicture",
  async({userId, file}: {userId: UserModel['_id'], file: FormData}) => {
    const {data}: {data: {picture: string}} = await axios.put(`${USERSROUTE}/picture/${userId}`, file)
    console.log(data);
    return data.picture
  }
)


export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    addMyChat: (state, action: PayloadAction<string>) => {
      if(state.user) 
      state.user.chats.push(action.payload)
    },
    addSuggestationToCurrentUser: (state, action: PayloadAction<{friendId: string}>) => {
      if(state.user)
      state.user.myRequests.push(action.payload.friendId)
    },
    deleteSuggestationFromCurrentUser: (state, action: PayloadAction<{friendId: string}>) => {
      if(state.user)
      state.user.myRequests = state.user.myRequests.filter(userId => userId !== action.payload.friendId)
    },
    deleteInvitationFromCurrentUser: (state, action: PayloadAction<{friendId: string}>) => {
      if(state.user)
      state.user.invitations = state.user.invitations.filter(userId => userId !== action.payload.friendId)
    },
    addFriendToCurrentUser: (state, action: PayloadAction<{friendId: string}>) => {
      if(state.user)
      state.user.friends.push(action.payload.friendId)
    },
    deleteFriendFromCurrentUser: (state, action: PayloadAction<{friendId: string}>) => {
      if(state.user)
      state.user.friends = state.user.friends.filter(userId => userId !== action.payload.friendId)
    },
    deleteChatFromCurrentUser: (state, action: PayloadAction<{chatId: string}>) => {
      if(state.user)
      state.user.chats = state.user.chats.filter(chatId => chatId !== action.payload.chatId)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(enter.fulfilled, (state, action) =>{
        state.user = action.payload
        state.loadings.isLoadingAvatar = false
      })
      .addCase(changeMyAvatar.pending, (state, action) =>{
        state.loadings.isLoadingAvatar = true
      })
      .addCase(changeMyAvatar.fulfilled, (state, action) =>{
        if(state.user)
          state.user.private.avatar = action.payload
          state.loadings.isLoadingAvatar = false

      })
      .addCase(changeMyPicture.pending, (state, action) =>{
        state.loadings.isLoadingPicture = true
      })
      .addCase(changeMyPicture.fulfilled, (state, action) =>{
        if(state.user)
          state.user.picture = action.payload
          state.loadings.isLoadingPicture = false
      })
      .addCase(createUser.fulfilled, (state, action) =>{
        state.user = action.payload.user
      })
      .addCase(editUser.fulfilled, (state, action) =>{
        state.user = action.payload.user
      })
  },
})

export const { 
  addMyChat, 
  addFriendToCurrentUser, 
  addSuggestationToCurrentUser, 
  deleteFriendFromCurrentUser,
  deleteInvitationFromCurrentUser,
  deleteSuggestationFromCurrentUser,
  deleteChatFromCurrentUser
 } = currentUserSlice.actions

export default currentUserSlice.reducer
