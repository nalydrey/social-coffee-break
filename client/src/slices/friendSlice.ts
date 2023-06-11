import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { Slice } from '../models/Slice'
import { UserModel } from "../models/UserModel"
import axios from 'axios'
import { USERSROUTE } from '../http'
import { queryString } from '../customFunctions/queryString'
import { deleteFriendFromCurrentUser } from './currentUserSlice'
import { deleteFriendFromUsers } from './usersSlice'


const initialState: Slice<UserModel> = {
    container: [],
    isLoading: false
}


export const getFriends = createAsyncThunk(
    'friends/getFriends',
    async (friends: string[]) => {
        // console.log('getFriends');
        if(friends.length){
            const query = queryString({_id: friends})
            const {data} = await axios.get<{users: UserModel[]}>(`${USERSROUTE}?${query}`) 
            return {friends: data.users}
        }
        return {friends: []}
    }
) 

export const deleteUserFromFriends = createAsyncThunk(
    'friends/deleteUserFromFriends',
    async ({friendId, currentUserId}: {friendId: string, currentUserId: string}, {dispatch}) => {
        console.log(friendId, currentUserId);
        
        const {data} = await axios.put<{user: UserModel}>(`${USERSROUTE}friends/delete/${friendId}/${currentUserId}`)
        dispatch(deleteFriendFromCurrentUser({friendId: data.user._id}))
        dispatch(deleteFriendFromUsers({friendId, userId: currentUserId}))
        dispatch(deleteFriendFromUsers({friendId: currentUserId, userId: friendId}))
        return data
    }
)



export const friendSlice = createSlice({
    name: 'friends',
    initialState,
    reducers: {
        addUserToFriends: (state, action: PayloadAction<{user: UserModel}>) => {
            state.container.push(action.payload.user)
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getFriends.fulfilled, (state, action) => {
                state.container = action.payload.friends
            })
            .addCase(deleteUserFromFriends.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(deleteUserFromFriends.fulfilled, (state, action) => {
                state.container = state.container.filter(user => user._id !== action.payload.user._id) 
                state.isLoading = false
            })
    }
}) 

export default friendSlice.reducer

export const {addUserToFriends} = friendSlice.actions