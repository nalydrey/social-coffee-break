import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Slice } from "../models/Slice";
import { PostModel } from "../models/PostModel";
import axios from "axios";
import { POSTSROUTE } from "../http";



const initialState: Slice<PostModel> = {
    container: [],
    isLoading: false,
}

export const createPost = createAsyncThunk(
    'posts/createPost',
    async (form: FormData) => {
        const {data} = await axios.post<{post:PostModel}>(POSTSROUTE, form)
        console.log(data);
        return data.post
    }
)

export const getPosts = createAsyncThunk(
    'posts/getPosts',
    async () => {
        console.log('getPosts');
        
        const {data} = await axios.get<{posts: PostModel[]}>(`${POSTSROUTE}`)
        console.log(data);
        return data.posts
    }
)

export const getMyPosts = createAsyncThunk(
    'posts/getMyPosts',
    async (userId: string) => {
        const {data} = await axios.get<{posts: PostModel[]}>(`${POSTSROUTE}/my/${userId}`)
        console.log(data);
        return data.posts
    }
)

export const setLike = createAsyncThunk(
    'posts/setLike',
    async (payload: {userId: string, postId: string, isLike: boolean}, {dispatch}) => {
    console.log('!!!');
    console.log('userId',payload.userId);
    console.log('postId',payload.postId);
    console.log('isLike',payload.isLike);
    
        const {userId, postId, isLike} = payload
        const {data} = await axios.put(`${POSTSROUTE}like/${postId}/${userId}`, {isLike})
        console.log(data);
        data.isChange &&
        isLike ? dispatch(toggleLike({userId, postId})) : dispatch(toggleDislike({userId, postId}))
        
    }
)

export const deletePost = createAsyncThunk(
    'posts/deletePost',
    async ({postId}:{postId: string}) => {
        console.log('delete post')
        const {data} = await axios.delete<{isDelete: boolean}>(`${POSTSROUTE}${postId}`)
        if(data.isDelete) return {postId}
    }
)



const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        toggleLike: (state, action: PayloadAction<{postId: string, userId: string}>) => {
            const {userId, postId} = action.payload
            const post = state.container.find(post => post._id === postId)
            if(post){
                post.dislikes = post.dislikes.filter(dislike => dislike !== userId)
                post.likes.includes(userId) 
                    ? 
                    post.likes = post.likes.filter(like => like !== userId)
                    :
                    post.likes.push(userId)
            }
        },
            
        toggleDislike: (state, action: PayloadAction<{postId: string, userId: string}>) => {
            const {userId, postId} = action.payload
            const post = state.container.find(post => post._id === postId)
            if(post){
                post.likes = post.likes.filter(like => like !== userId)
                post.dislikes.includes(userId) 
                    ? 
                    post.dislikes = post.dislikes.filter(dislike => dislike !== userId)
                    :
                    post.dislikes.push(userId)
            }
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(createPost.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(createPost.fulfilled, (state, action) => {
                state.container.unshift(action.payload) 
                state.isLoading = false
            })
            .addCase(getMyPosts.pending, (state, action) => {
                state.isLoading = true
            })
            .addCase(getMyPosts.fulfilled, (state, action) => {
                state.container = action.payload 
                state.isLoading = false
            })
            .addCase(getPosts.fulfilled, (state, action) => {
                state.container = action.payload 
                state.isLoading = false
            })
            .addCase(deletePost.fulfilled, (state, action) => {
                state.container = state.container.filter(post => post._id !== action.payload?.postId) 
            })
    },
   
})

export default postsSlice.reducer

export const {toggleLike, toggleDislike} = postsSlice.actions