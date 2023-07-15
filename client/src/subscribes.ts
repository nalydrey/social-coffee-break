import { socket } from "./App"
import { addCreatedChat, chatUserConnect, chatUserDisconnect, deleteChat } from "./slices/chatSlice"
import { createMessage, deleteMessage, readMessage } from "./slices/messagesSlice"
import { connectUser, disconnectUser } from "./slices/usersSlice"
import type { AppDispatch } from "./store/store"
import type { MessageModel } from "./models/MessageModel"
import type { UserModel } from "./models/UserModel"
import { StateControllerReturn } from "./hooks/useStateController"

type SubscribesFunc = (dispatch: AppDispatch, currentUser: UserModel, controller: StateControllerReturn ) => void 


export const subscribes: SubscribesFunc = (dispatch, currentUser, controller) => {

    const {
        moveToInvitation,
        removeFromInvitation,
        removeFromSuggestation,
        moveToFriend,
        removeFromFriend
        } = controller

    socket.emit('enterUser', {userId: currentUser._id})
    socket.emit('connectChats', {chats: currentUser.chats})

    socket.on('userConnected', (data) => {
        dispatch(connectUser({userId: data.user }))
        dispatch(chatUserConnect({user: data.user}))

    })
    socket.on('userDisconnected', (data) => {
        dispatch(disconnectUser({userId: data.user}))
        dispatch(chatUserDisconnect({user: data.user}))
    })
    socket.on('messageIsCreated', (data: MessageModel) => {
        dispatch(createMessage(data))
    })
    socket.on('chatIsCreated', (data) => {
        dispatch(addCreatedChat(data))
    })
    socket.on('messageIsRead', (data) => {
        dispatch(readMessage({messageId: data}))
    })
    socket.on('messageIsDeleted', (message: MessageModel)=>{
        dispatch(deleteMessage({message, currentUserId: currentUser._id}))
    })
    socket.on('chatIsDeleted', (chatId: string)=>{
        dispatch(deleteChat(chatId))
    })

    socket.on('userIsInvited', moveToInvitation)
    socket.on('suggestationIsCanceled', removeFromInvitation)
    socket.on('invitationIsRejected', removeFromSuggestation)
    socket.on('invitationIsAccepted', moveToFriend)
    socket.on('friendIsDeleted', removeFromFriend)


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