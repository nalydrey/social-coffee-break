import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import users from "../slices/usersSlice"
import currentUser from "../slices/currentUserSlice"
import aux from "../slices/auxiliarySlice"
import messages from "../slices/messagesSlice"
import chats from "../slices/chatSlice"
import posts from '../slices/postSlice'
import friends from '../slices/friendSlice'
import invitations from '../slices/invitationSlice'
import suggestations from '../slices/suggestationSlice'

export const store = configureStore({
  reducer: {
    users,
    currentUser,
    aux,
    messages,
    chats,
    posts,
    friends,
    invitations,
    suggestations
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
