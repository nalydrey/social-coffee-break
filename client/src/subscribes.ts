import { socket } from "./App"
import { addCreatedChat, decreaseCounter, deleteChat } from "./slices/chatSlice"
import { createMessage, deleteMessage, readMessage } from "./slices/messagesSlice"
import { connectUser, deleteFriendFromUsers, disconnectUser } from "./slices/usersSlice"
import type { AppDispatch } from "./store/store"
import type { Message } from "./models/MessageModel"
import type { UserModel } from "./models/UserModel"
import { addToInvitation, deleteFromInvitation } from "./slices/invitationSlice"
import { addFriendToCurrentUser, addInvitationToCurrentUser, deleteFriendFromCurrentUser, deleteInvitationFromCurrentUser, deleteSuggestationFromCurrentUser } from "./slices/currentUserSlice"
import { deleteMyRequest } from "./slices/suggestationSlice"
import { addUserToFriends, deleteFromFriends } from "./slices/friendSlice"
import { StateController, StateControllerReturn, useStateController } from "./hooks/useStateController"

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