import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ChatModel } from "../models/ChatModel"
import { CHATSROUTE, USERSROUTE } from "../http"
import { UserModel } from "../models/UserModel"
import axios from "axios"
import { addMyChat } from "./currentUserSlice"
import { addChat } from "./usersSlice"
import { Message } from "../models/MessageModel"
import { deleteAllSms, resetMessages } from "./messagesSlice"

    export interface Chat {
        container: ChatModel[],
        isActive: boolean,
        isLoading: boolean,
        error: string
    }

    const initialState: Chat = {
        container: [],
        isLoading: false,
        isActive: false,
        error: ''
    }


    export interface GetData {
        isCreateNewChat: boolean,
        activeChat: ChatModel['_id'],
        users: UserModel['_id'][]
    }

    export const getMyChats = createAsyncThunk(
        "chats/getMyChats",
        async ({isCreateNewChat, activeChat, users}: GetData, {dispatch}) => {

            console.log('isCreateNewChat', isCreateNewChat,);
            console.log('activeChat', activeChat );
            console.log('users', users);

            let chats: ChatModel[] = []
            //Если нужно создать новый чат
            if(isCreateNewChat){
                const {data} = await axios.post(CHATSROUTE, {users}) 
                activeChat = data.chat._id
                
            //Добавить новый чат его участникам и текущему пользователю
                dispatch(addMyChat(activeChat))
                dispatch(addChat({usersIds: users, chatId: activeChat}))
            }
            //Получаем свои чаты
            const {data} = await axios.get(`${CHATSROUTE}/my/${users[0]}`) 
            chats  = data.chats
            // console.log(chats);
            
            //удалить текущего потьзователя из чата
            chats.forEach(chat => {
              console.log(activeChat, chat._id);
                chat.users = chat.users.filter(user => user._id !==users[0]);
                chat.isActive = activeChat === chat._id ? true : false
            })
            
            return chats
        },
    )

  export const deleteChat = createAsyncThunk(
    'chats/deleteChat',
    async (action: string, {dispatch}) => {
      const {data } = await axios.delete(`${CHATSROUTE}${action}`)
      console.log(data);
        dispatch(deleteAllSms())
        return {id: action, isDelete: data.isDelete}
    }
  )




export const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
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
        state.container = action.payload
      })
      .addCase(deleteChat.pending, (state, action) => {
          state.isLoading = true
      })
      .addCase(deleteChat.fulfilled, (state, action) => {
        if(action.payload.isDelete){
          state.container = state.container.filter(chat => chat._id !== action.payload.id)
          state.isLoading = false
        }
      })
  },
})

export default chatSlice.reducer

export const { activateChat, addMessageToChat, disactivateChat } = chatSlice.actions
