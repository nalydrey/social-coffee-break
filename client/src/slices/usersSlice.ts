import {
  createAsyncThunk,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit"
import { UserModel } from "../models/UserModel"
import { useHttp } from "../hooks/useHttp"
import { USERSROUTE } from "../http"
import { RegisterFormNames } from "../components/UI/RegisterForm"
import axios from 'axios'
import { Slice } from "../models/Slice"
import { isPayload, QueryPayload, queryString } from "../customFunctions/queryString"




    const initialState: Slice<UserModel> = {
        container: [],
        isLoading: false,
    }

    export const getUsers = createAsyncThunk(
      "users/getUsers",
      async (payload: QueryPayload = {}) => {
        console.log('get users');
        console.log(payload);
        if(isPayload(payload)){
          const query = queryString(payload)
          const {data} = await axios.get(`${USERSROUTE}?${query}`)
          return {users: data.users}
        }
          return {users: []}
        } 
    )

    export const deleteUser = createAsyncThunk(
        "users/deleteUser",
        async (userId: string) => {
            console.log(userId);
            await axios.delete(`${USERSROUTE}/${userId}`)
            return userId
        },
    )

    


const users = createSlice({
  name: "users",
  initialState,
  reducers: {
    addFriendToUsers: (state, action: PayloadAction<{friendId: string, userId: string}>) => {
      state.container.forEach(user => {
        if(user._id === action.payload.userId) user.friends.push(action.payload.friendId) 
      })
    },
    deleteFriendFromUsers: (state, action: PayloadAction<{friendId: string, userId: string}>) => {
      state.container.forEach(user => {
        if(user._id === action.payload.userId) 
        user.friends = user.friends.filter(friendId => friendId !== action.payload.friendId)
      })
    },
    addChat: (
      state,
      action: PayloadAction<{ usersIds: string[]; chatId: string }>,
    ) => {
      action.payload.usersIds.forEach((userId) => {
        state.container.find((user) => user._id === userId)
          ?.chats.push(action.payload.chatId)
      })
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.container = action.payload.users
        state.isLoading = false
      })

      .addCase(deleteUser.fulfilled, (state, action) => {
          state.container = state.container.filter((user) => user._id !== action.payload)
      })
    
  },
})

export default users.reducer

export const { addChat, deleteFriendFromUsers, addFriendToUsers } = users.actions
