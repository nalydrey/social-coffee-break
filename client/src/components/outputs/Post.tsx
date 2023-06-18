import React, {useState} from 'react'
import { URL } from '../../http'
import { EyeIcon, HandThumbUpIcon, HandThumbDownIcon, TrashIcon } from '@heroicons/react/24/solid'
import moment from 'moment'
import { SimpleSlider } from '../UI/SimpleSlider'
import defaultAvatar from '../../assets/defaultAva.png'
import { UserModel } from '../../models/UserModel'
import { useEffect } from 'react'
import { ImageWithPreloader } from '../UI/ImageWithPreloader'


interface PostProps {
    user: UserModel
    _id: string
    currentUserId: string
    images: string[]
    name: string
    discription: string
    likes: string[]
    dislikes: string[]
    views: number
    createdAt: Date
    onLikeDislike: (isLike: boolean)=>void
    onDelete: (id: string)=>void
}

export const Post = ({
    user,
    currentUserId,
    _id,
    images=[], 
    name, 
    discription, 
    likes, 
    dislikes,
    views,
    createdAt,
    onLikeDislike=()=>{},
    onDelete=() => {}
}:PostProps) => {

    

    


  return (
    <li className='relative'>
        <button className='absolute top-0 right-0 rounded-full bg-red-500 p-1 shadow-light'
                onClick={()=>{onDelete(_id)}}
        ><TrashIcon className='w-5 fill-none stroke-white stroke-2'/>
        </button>
        <h3 className='text-center text-3xl font-medium'>{name}</h3>
        {
            !!images.length &&
            <SimpleSlider dur={300}>
                {images.map( image => {
                return (
                        <ImageWithPreloader 
                            src={URL+image}
                            alt='Image'
                        />
                    )
                    })
                }
            </SimpleSlider>
        }
        <div className='flex gap-10 select-none'>
            <div className='flex gap-2 cursor-pointer'
                onClick={()=>(onLikeDislike(true))}
            >
                <span className='text-xl font-bold'>{likes.length}</span>
                <HandThumbUpIcon className={`w-5  stroke-black ${likes.includes(currentUserId)? 'fill-green-500': 'fill-none'}`}/>
            </div>
            <div className='flex gap-2 cursor-pointer'
                onClick={()=>(onLikeDislike(false))}
            >
                <span className='text-xl font-bold'>{dislikes.length}</span>
                <HandThumbDownIcon className={`w-5  stroke-black ${dislikes.includes(currentUserId) ? 'fill-red-500': 'fill-none'}`}/>
            </div>
        </div>
        <p className='text-xl font-medium'>{discription}</p>
        <div className='flex items-center gap-3 justify-end'>
            <div className='w-10 h-10 rounded-full overflow-hidden shadow-light border border-gray-300'>
                {/* <img className='img' src={user.private.avatar ? URL+user.private.avatar : defaultAvatar} alt="Avatar" /> */}
                <ImageWithPreloader className='img' src={(user && user.private.avatar) ? URL+user.private.avatar : defaultAvatar} alt="Avatar" />
            </div>
            <div className='flex flex-col'>
                {
                    user ?
                    <p className='border-b-2 border-b-gray-500'>{user.private.firstName} {user.private.lastName}</p>
                    :
                    <p className='border-b-2 border-b-gray-500'>user is deleted</p>
                }
                <p className=''>{moment(createdAt).format('D MMM HH:mm')}</p>
            </div>
        </div>
    </li>
  )
}
