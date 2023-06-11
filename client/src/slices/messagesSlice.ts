import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { Message } from "../models/MessageModel"
import axios from "axios"
import { useHttp } from "../hooks/useHttp"
import { CHATSROUTE, MESSAGEROUTE } from "../http"
import { ChatModel } from "../models/ChatModel"
import { addMessageToChat, decreaseCounter } from "./chatSlice"
import { Slice } from "../models/Slice"
import { UserModel } from "../models/UserModel"
import { nanoid } from "@reduxjs/toolkit"

interface CreateMessagePayload {
  createdId: string
  user: UserModel['_id']
  chat: ChatModel['_id']
  text: string
}

interface MessageSliceModel extends Slice<Message> {
  isSending: boolean
}

const initialState: MessageSliceModel = {
  container: [],
  isLoading: false,
  isSending: false
}

export const loadAllSms = createAsyncThunk("messages/loadAllSms", async () => {
  const data: Message[] = await useHttp(MESSAGEROUTE, "GET")
  return data
})

export const loadChatSms = createAsyncThunk(
  "messages/loadChatSms",
  async (chatId: string) => {
    console.log(chatId)
    
    const sms: Message[] = await useHttp(
      `${MESSAGEROUTE}?chat=${chatId}`,
      "GET",
    )
    return sms
  },
)

export const createMessage= createAsyncThunk(
  "messages/createMessage",
  async (payload: CreateMessagePayload, { dispatch }) => {
    console.log('createMessage');
    
    // console.log('userId', payload.user);
    // console.log('chatId', payload.chat);
    // console.log('text', payload.text);
    
    const {data} = await axios.post<{message: Message}>(MESSAGEROUTE, payload)
    console.log(data.message);
    return data.message
  },
)

export const getMessages = createAsyncThunk(
  "messages/getMessages",
  async (payload: { chat: ChatModel['_id'] }, { dispatch }) => {
    console.log('getMessage');
    console.log(payload.chat);
    
    const {data} =await axios.get(`${MESSAGEROUTE}/chat/${payload.chat}`)
    console.log(data);
    
    return data.messages
  },
)

export const deleteMessage = createAsyncThunk(
  "messages/deleteMessage",
  async (messageId: string, { dispatch }) => {
    const { data } = await axios.delete(`${MESSAGEROUTE}${messageId}`)
    data.isDelete && dispatch(deleteSms(messageId))
  },
)

export const readMessage = createAsyncThunk(
  'messages/readMessage',
  async (messageId: string, {dispatch}) => {
    const {data} = await axios.put<{message: Message}>(`${MESSAGEROUTE}read/${messageId}`)
    dispatch(decreaseCounter({chatId: data.message.chat}))
    return {messageId}
  }
) 

export const messagesSlice = createSlice({
  name: "messages",
  initialState,
  reducers: {
    createTempMessage: (state, action: PayloadAction<Message>) => {
      state.container.push(action.payload)
    },
    deleteSms: (state, action: PayloadAction<string>) => {
      state.container = state.container.filter(message => message._id !== action.payload )
    },
    resetMessages: (state) => {
      state.container = []
    },
    deleteAllSms:(state) => {
      state.container = []
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMessage.pending, (state, action)=>{
        state.isSending = true
      })
      .addCase(createMessage.fulfilled, (state, action) => {

        state.container = state.container.map(message => {
          
          if(message.createdId === action.payload.createdId) {
            return action.payload
          }
          return message
        })
        state.isSending = false
      })
      .addCase(getMessages.pending, (state, action) => {
        state.isLoading = true
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.container = action.payload
        state.isLoading = false
      })
      .addCase(readMessage.fulfilled, (state, action) => {
        state.container.forEach(message => {
          if(message._id === action.payload.messageId){
            message.isRead = true
          }
        })
      })
  },
})

export default messagesSlice.reducer

export const {deleteSms, deleteAllSms, resetMessages, createTempMessage} = messagesSlice.actions
