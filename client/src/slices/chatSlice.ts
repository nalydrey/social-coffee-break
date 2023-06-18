import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import type { ChatModel } from "../models/ChatModel"
import type { Message } from "../models/MessageModel"
import type { Slice } from "../models/Slice"
import { CHATSROUTE } from "../http"
import axios from "axios"
import { addMyChat, deleteChatFromCurrentUser } from "./currentUserSlice"
import { addChat } from "./usersSlice"
import { socket } from "../App"


    export interface Chat extends Slice<ChatModel> {
        isActive: boolean
        error: string
        messageCounter: number
    }

    const initialState: Chat = {
        container: [],
        messageCounter: 0,
        isLoading: false,
        isActive: false,
        error: ''
    }


  export const getMyChats = createAsyncThunk(
      "chats/getMyChats",
      async (currentUserId: string ) => {
          //Получаем свои чаты
          const {data} = await axios.get<{chats: ChatModel[]}>(`${CHATSROUTE}/my/${currentUserId}`) 
          console.log(data);
          //удалить текущего потьзователя из чата
          let counter = 0
          data.chats.forEach(chat => {
              chat.users = chat.users.filter(user => user._id !==currentUserId);
              chat.isActive = false
              counter = counter + chat.unreadMessageCount
          })
          return {chats: data.chats, counter}
      },
  )

  export const deleteChat = createAsyncThunk(
    'chats/deleteChat',
    (chatId: string, {dispatch}) => {
        dispatch(deleteChatFromCurrentUser({chatId}))
        return {chatId}
    }
  )

  export const addCreatedChat = createAsyncThunk(
    'chats/addCreatedChat',
    ({chat}: {chat: ChatModel}, {dispatch} ) => {
      console.log('payload ');
      //Присоединить пользователя к чату
      socket.emit('joinToChat',{chatId: chat._id})
      //Добавить пользователям
      dispatch(addMyChat(chat._id))
      dispatch(addChat({usersIds: chat.users.map(user => user._id), chatId: chat._id}))
      chat.isActive = true
      return {chat}
    }
  )

export const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    decreaseCounter: (state, action: PayloadAction<{chatId: string}>) => {
      const chat = state.container.find(chat => chat._id === action.payload.chatId)
      if (chat){
        chat.unreadMessageCount--
        state.messageCounter--
      } 
    },
    increaseCounter: (state, action: PayloadAction<{chatId: string}>) => {
      const chat = state.container.find(chat => chat._id === action.payload.chatId)
      if (chat){
        chat.unreadMessageCount++
        state.messageCounter++
      } 
    },

    activateChat: (state, action: PayloadAction<ChatModel['_id']>) => {
      state.container.forEach((chat) => {
        chat._id === action.payload
          ? (chat.isActive = true)
          : (chat.isActive = false)
      })
    },
    disactivateChat: (state) => {
      state.container.forEach(chat => chat.isActive = false)
    },
    addMessageToChat: (state, action: PayloadAction<{chat: ChatModel['_id'], message: Message['_id']}>) => {
      state.container.forEach(chat => {
        chat._id === action.payload.chat && chat.messages.push(action.payload.message)
      })
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getMyChats.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getMyChats.fulfilled, (state, action) => {
        state.isLoading = false
        state.container = action.payload.chats
        state.messageCounter = action.payload.counter
      })
      .addCase(deleteChat.pending, (state, action) => {
          state.isLoading = true
      })
      .addCase(deleteChat.fulfilled, (state, action) => {
          const count = state.container.find(chat => chat._id === action.payload.chatId)?.unreadMessageCount || 0
          state.messageCounter = state.messageCounter - count
          state.container = state.container.filter(chat => chat._id !== action.payload.chatId)
          state.isLoading = false
      })
      .addCase(addCreatedChat.fulfilled, (state, action) => {
        
        state.container.push(action.payload.chat)
      })

  },
})

export default chatSlice.reducer

export const { activateChat, addMessageToChat, disactivateChat, decreaseCounter, increaseCounter } = chatSlice.actions
