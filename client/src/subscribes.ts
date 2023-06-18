import { socket } from "./App"
import { addCreatedChat, decreaseCounter, deleteChat } from "./slices/chatSlice"
import { createMessage, deleteMessage, readMessage } from "./slices/messagesSlice"
import { connectUser, disconnectUser } from "./slices/usersSlice"
import type { AppDispatch } from "./store/store"
import type { Message } from "./models/MessageModel"
import type { UserModel } from "./models/UserModel"

type SubscribesFunc = (dispatch: AppDispatch, currentUser: UserModel) => void 


export const subscribes: SubscribesFunc = (dispatch, currentUser) => {

    socket.emit('enterUser', {userId: currentUser._id})
    socket.emit('connectChats', {chats: currentUser.chats})

    socket.on('userConnected', (data) => {
        dispatch(connectUser({userId: data.user }))
    })
    socket.on('userDisconnected', (data) => {
        dispatch(disconnectUser({userId: data.user}))
    })
    socket.on('messageIsCreated', (data: Message) => {
        dispatch(createMessage(data))
    })
    socket.on('chatIsCreated', (data) => {
        dispatch(addCreatedChat(data))
    })
    socket.on('messageIsRead', (data) => {
        dispatch(readMessage({messageId: data}))
    })
    socket.on('messageIsDeleted', (message: Message)=>{
        dispatch(deleteMessage({message, currentUserId: currentUser._id}))
    })
    socket.on('chatIsDeleted', (chatId: string)=>{
        dispatch(deleteChat(chatId))
    })
}

export const unsubscribe = () => {

    socket.off('userConnected')
    socket.off('userDisconnected')
    socket.off('messageIsCreated')
    socket.off('chatIsCreated')
    socket.off('messageIsRead')
    socket.off('messageIsDeleted')
    socket.off('chatIsDeleted')
}