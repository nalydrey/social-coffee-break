import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import type { Message } from "../models/MessageModel"
import type { Slice } from "../models/Slice"
import type { UserModel } from "../models/UserModel"
import axios from "axios"
import { MESSAGEROUTE } from "../http"
import { ChatModel } from "../models/ChatModel"
import {  decreaseCounter, increaseCounter } from "./chatSlice"



interface MessageSliceModel extends Slice<Message> {
  isSending: boolean
}

const initialState: MessageSliceModel = {
  container: [],
  isLoading: false,
  isSending: false
}


export const getMessages = createAsyncThunk(
  "messages/getMessages",
  async ({chat}: { chat: string }, { dispatch }) => {
    const {data} =await axios.get(`${MESSAGEROUTE}/chat/${chat}`)
    return data.messages
  },
)

export const createMessage = createAsyncThunk(
  'messages/createMessage',
  (message: Message, {getState, dispatch}) => {
    const state: any = getState()
    const chats: ChatModel[] = state.chats.container 
    const currentUser: UserModel = state.currentUser.user
    const chat = chats.find(chat => chat._id === message.chat)
    if(chat && typeof message.user === 'object'){
      if (currentUser._id !== message.user._id) dispatch(increaseCounter({chatId: message.chat}))
      if(chat.isActive) return {message}
    }
    return {message: null}
  }
)

export const deleteMessage = createAsyncThunk(
  "messages/deleteMessage",
  async ({message, currentUserId}: {message: Message, currentUserId: string}, { dispatch, getState }) => {
    if(typeof message.user === 'string' )
    message.user !== currentUserId && !message.isRead && dispatch(decreaseCounter({chatId: message.chat}))
    return {messageId: message._id}
  },
)

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    createTempMessage: (state, action: PayloadAction<Message>) => {
      state.container.push(action.payload)
    },

    readMessage: (state, action: PayloadAction<{messageId: string}>) => {
      const sms = state.container.find(message => message._id === action.payload.messageId )
      if(sms) sms.isRead = true
    },

    resetMessages: (state) => {
      state.container = []
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(createMessage.pending, (state, action)=>{
        state.isSending = true
      })
      .addCase(createMessage.fulfilled, (state, action) => {
        const {message} = action.payload
        console.log(message);
          if(message){
            if(state.container.some(sms => sms.createdId === message.createdId)){
              state.container = state.container.map( sms => {
                return sms.createdId === message.createdId ? message : sms
              } )
            } 
            else{
              state.container.push(message)
            }
          }
          state.isSending = false
      })

      .addCase(getMessages.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.container = action.payload
        state.isLoading = false
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.container = state.container.filter(message => message._id !== action.payload.messageId)
      })
      
  },
})

export default messagesSlice.reducer

export const {
  resetMessages,
  createTempMessage,
  readMessage
} = messagesSlice.actions
