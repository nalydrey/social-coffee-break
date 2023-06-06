import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Slice } from "../models/Slice";
import { UserModel } from "../models/UserModel";
import axios from "axios";
import { USERSROUTE } from "../http";
import { addSuggestationToCurrentUser, deleteSuggestationFromCurrentUser } from "./currentUserSlice";
import { queryString } from "../customFunctions/queryString";


const initialState: Slice<UserModel> = {
    container: [],
    isLoading: false
}

export const getSuggestations = createAsyncThunk(
    'invitations/getSuggestations',
    async (suggestations: string[]) => {
        console.log('getInvitations');
        if(suggestations.length){
            const query = queryString({_id: suggestations})
            const {data} = await axios.get<{users: UserModel[]}>(`${USERSROUTE}?${query}`)
            console.log(data);
            return data
        }
        return {users: []}
    }
)

export const suggestToBeFriends = createAsyncThunk(
    'suggestations/suggestToBeFriends',
    async({friendId, currentUserId}:{friendId: string, currentUserId: string}, {dispatch}) => {
        console.log('friendId',friendId);
        console.log('currentUserId',currentUserId);
        const {data} = await axios.put<{user: UserModel}>(`${USERSROUTE}/friends/add/${friendId}/${currentUserId}`)
        console.log(data);
        dispatch(addSuggestationToCurrentUser({friendId}))
        return data
    }
)

export const cancelSuggestationToBeFriends = createAsyncThunk(
    "suggestations/cancelSuggestationToBeFriends",
    async({friendId, currentUserId}:{friendId: string, currentUserId: string}, {dispatch}) => {
        console.log('friendId',friendId);
        console.log('currentUserId',currentUserId);
        const {data} = await axios.put<{user: UserModel}>(`${USERSROUTE}/friends/cancel/${friendId}/${currentUserId}`)
        console.log(data);
        dispatch(deleteSuggestationFromCurrentUser({friendId}))
        return data
        }
  )



export const suggestationSlice = createSlice({
    name: 'suggestations',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(suggestToBeFriends.fulfilled, (state, action) => {
                state.container.push(action.payload.user)
            })
            .addCase(cancelSuggestationToBeFriends.fulfilled, (state, action) => {
                state.container = state.container.filter(user => user._id !== action.payload.user._id )
            })
            .addCase(getSuggestations.fulfilled, (state, action) => {
                state.container = action.payload.users
            })
    }
})

export default suggestationSlice.reducer

export const {} = suggestationSlice.actions