import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Slice } from "../models/Slice";
import { UserModel } from "../models/UserModel";
import axios from "axios";
import { USERSROUTE } from "../http";
import { queryString } from "../customFunctions/queryString";
import { addFriendToCurrentUser, deleteInvitationFromCurrentUser } from "./currentUserSlice";
import { addUserToFriends } from "./friendSlice";
import { addFriendToUsers } from "./usersSlice";


const initialState: Slice<UserModel>= {
    container: [],
    isLoading: false 
}

export const getInvitations = createAsyncThunk(
    'invitations/getInvitations',
    async (invitations: string[]) => {
        console.log('getInvitations');
        if(invitations.length){
            const query = queryString({_id: invitations})
            const {data} = await axios.get<{users: UserModel[]}>(`${USERSROUTE}?${query}`)
            console.log(data);
            return data
        }
        return {users: []}
    }
)

export const acceptInvitation = createAsyncThunk(
    "invitations/acceptInvitation",
    async(
      {friendId, currentUserId}:{friendId: string, currentUserId: string},
      {dispatch}
      ) => {
        console.log('friendId',friendId);
        console.log('currentUserId',currentUserId);
        const {data} = await axios.put<{user: UserModel}>(`${USERSROUTE}/friends/accept/${friendId}/${currentUserId}`)
        console.log(data)
        dispatch(addUserToFriends(data))
        dispatch(deleteInvitationFromCurrentUser({friendId: data.user._id}))
        dispatch(addFriendToCurrentUser({friendId}))
        dispatch(addFriendToUsers({friendId, userId: currentUserId}))
        dispatch(addFriendToUsers({friendId: currentUserId, userId: friendId}))
        return data
    }
)

export const rejectInvitation = createAsyncThunk(
    "invitations/rejectInvitation",
    async(
        {friendId, currentUserId}:{friendId: string, currentUserId: string},
        {dispatch}
        ) => {
        console.log('friendId',friendId)
        console.log('currentUserId',currentUserId)
        const {data} = await axios.put<{user: UserModel}>(`${USERSROUTE}/friends/reject/${friendId}/${currentUserId}`)
        dispatch(deleteInvitationFromCurrentUser({friendId}))
        return data
    }
)

export const invitationSlice = createSlice({
    name: 'invitations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getInvitations.fulfilled, (state, action) => {
                state.container = action.payload.users
            })
            .addCase(acceptInvitation.fulfilled, (state, action) => {
                state.container = state.container.filter(user => user._id !== action.payload.user._id)
            })
            .addCase(rejectInvitation.fulfilled, (state, action) => {
                state.container = state.container.filter(user => user._id !== action.payload.user._id)
            })
    }
})

export default invitationSlice.reducer