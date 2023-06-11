import React, { useState, useEffect } from 'react'
import { CameraIcon } from '@heroicons/react/24/solid'
import { DeleteButton } from '../UI/DeleteButton'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { createPost, deletePost, getMyPosts, setLike } from '../../slices/postSlice'
import { Post } from '../outputs/Post'
import { PostModel } from '../../models/PostModel'
import { UserModel } from '../../models/UserModel'
import { SimpleSlider } from '../UI/SimpleSlider'
import { MappingBox } from '../UI/MappingBox'
import { NewPostForm } from '../UI/NewPostForm'
import { ContentBox } from '../UI/ContentBox'


export const MyPosts = () => {

    const [isView, setView] = useState(false)
    const [images, setImg] = useState<FileList | null>(null)
    const dispatch = useAppDispatch()
    const posts = useAppSelector<PostModel[]>(state => state.posts.container)
    const isLoadingPosts = useAppSelector<PostModel[]>(state => state.posts.isLoading)
    const currentUser = useAppSelector<UserModel>(state => state.currentUser.user)


    const formik = useFormik({
        initialValues: {
            name: '',
            discription: ''
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Required'),
            discription: Yup.string().required('Required')
        }),
        onSubmit: (values) => { 
            const form = new FormData()
            if(images){
                Array.from(images).forEach((img, i)=> form.append(`image${i}`, img))
                // form.append('images', images[0])
            }
            form.append('name', values.name)
            form.append('discription', values.discription)
            form.append('user', currentUser._id)
            dispatch(createPost(form))
        }
    })

    useEffect(() => {
      dispatch(getMyPosts(currentUser._id))
    }, [])
    



  return (
    <ContentBox 
        title='My Posts'
        className='grow'
    >
        <div className='p-3'>
            <button className={`btn-1 font-bold ${isView ? 'hidden' : ''}`}
                    onClick={()=>{setView(true)}}
            >
                Create post
            </button>
            <NewPostForm
                userId={currentUser._id}
                isView = {isView}
                onClose={()=>setView(false)}
                onSubmit={(form)=>dispatch(createPost(form))}
            />
        </div>

        <MappingBox
            isLoading = {isLoadingPosts}
            isAlternate = {!posts.length}
            loadingComponent = 'Loading...'
            alternateComponent = 'Пока нет постов'
        >
            <ul>
                {
                    posts.map(post => (
                        <Post 
                            key={post._id}
                            {...post}
                            currentUserId={currentUser._id}
                            onLikeDislike={(isLike)=>dispatch(setLike({userId: currentUser._id, postId: post._id, isLike}))}
                            onDelete={(postId)=>{dispatch(deletePost({postId, userId: currentUser._id}))}}
                        />
                    ))
                }
            </ul>
        </MappingBox>
    </ContentBox>
        

        


  )
}
