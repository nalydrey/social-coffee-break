import React, {useEffect} from 'react'
import { MappingBox } from '../UI/MappingBox'
import { ContentBox } from '../UI/ContentBox'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { Post } from '../outputs/Post'
import { PostModel } from '../../models/PostModel'
import { UserModel } from '../../models/UserModel'
import { deletePost, getPosts, setLike } from '../../slices/postSlice'

export const Posts = () => {

    const posts = useAppSelector<PostModel[]>(state => state.posts.container)
    const isLoadingPosts = useAppSelector<boolean>(state => state.posts.isLoading)
    const currentUser = useAppSelector<UserModel | null>(state => state.currentUser.user)
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(getPosts())
    },[])

    return (
    <ContentBox 
        title='All Posts'
        className='grow'
    >
        <MappingBox
            className='grow'
            isLoading = {isLoadingPosts}
            isAlternate = {false}
            loadingComponent = 'Loading...'
            alternateComponent = 'Пока нет постов'
        >
            <ul>
                { currentUser &&
                    posts.map(post => (
                        <Post 
                            key={post._id}
                            {...post}
                            currentUserId={currentUser._id}
                            onLikeDislike={(isLike)=>{console.log(isLike);
                             dispatch(setLike({userId: currentUser._id, postId: post._id, isLike}))}}
                            onDelete={(postId)=>{dispatch(deletePost({postId, userId: currentUser._id}))}}
                        />
                    ))
                }
            </ul>
        </MappingBox>
    </ContentBox>    
  )
}

