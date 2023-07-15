import { CameraIcon, PhotoIcon } from '@heroicons/react/24/solid'
import React, {ChangeEvent} from 'react'
import defaultFoto from '../../assets/defaultAva.png'
import { URL } from '../../http'
import { RoundButton } from '../UI/RoundButton'
import { ButtonUnderline } from '../UI/ButtonUnderline'
import { useLocation, useNavigate } from 'react-router-dom'
import { ImageWithPreloader } from '../UI/ImageWithPreloader'
import { DotsPreloader } from '../Preloaders/DotsPreloader'
import { Avatar } from '../UI/Avatar'
import { useAppSelector } from '../../hooks/hooks'
import { UserModel } from '../../models/UserModel'

interface TopBoxProps {
    onChangeAvatar: (e: ChangeEvent<HTMLInputElement>)=>void
    onChangePicture: (e: ChangeEvent<HTMLInputElement>)=>void
    messageCounter: number
}


export const TopBox = ({
    onChangeAvatar=()=>{},
    onChangePicture=()=>{},
    messageCounter,
}:TopBoxProps) => {

    const host = URL + '/'

    const currentUser = useAppSelector<UserModel | null>(state => state.currentUser.user)

    const {isLoadingAvatar, isLoadingPicture} = useAppSelector<
  {
    isLoadingAvatar: boolean
    isLoadingPicture: boolean
  }>(state => state.currentUser.loadings)

    const avatar = currentUser && currentUser.private.avatar ? host + currentUser.private.avatar : ''
    const picture = currentUser && currentUser.picture ? host + currentUser.picture : ''
    const firstName = currentUser ? currentUser.private.firstName : ''
    const lastName = currentUser ? currentUser.private.lastName : ''

    const navigate = useNavigate()
    const location = useLocation()
 
    

  return (
    <div className='box mb-4 mx-1 overflow-hidden'>

        <div className='relative pt-[30%] sm:pt-[20%] bg-indigo-400 w-full bg-cover bg-center bg-no-repeat'
            //  style={style}   
        >
            <ImageWithPreloader 
                className=' absolute top-0' 
                src={picture} 
                alt='picture'
            />
            
            {   isLoadingPicture &&
                    <DotsPreloader className='absolute top-0'/>
            }
            <div className='absolute bottom-0 right-0 px-5 translate-y-0 sm:translate-y-1/2 z-10 flex gap-3'>
                <label htmlFor="avatar" className=' bg-orange-500 flex p-1 w-8 h-8 sm:w-10 sm:h-10 items-center justify-center rounded-full cursor-pointer duration-300 hover:scale-125'>
                    <CameraIcon className="h-7 w-7 text-blue-800 cursor-pointer" />
                    <input  className='hidden' 
                            type='file' 
                            id='avatar'
                            accept='.jpg, .png' 
                            onChange={onChangeAvatar}
                    />
                </label>
                <label htmlFor="picture" className=' bg-green-500 p-1 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full cursor-pointer duration-300 hover:scale-125'>
                    <PhotoIcon className="h-7 w-7 text-orange-800 cursor-pointer" />
                    <input  className='hidden' 
                            type='file' 
                            id='picture'
                            accept='.jpg, .png' 
                            onChange={onChangePicture}
                    />
                </label>
            </div>
        </div>

        <div className='min-h-[50px] relative bg-slate-300 flex flex-col justify-end'>
            <div className='absolute -translate-y-3/4 top-0 left-2 sm:left-5'>
                <div className='flex flex-col sm:flex-row items-start sm:items-end text-white'>
                    <Avatar
                        className="relative border-4 lg:border-8 border-slate-300 shadow-light"
                        classSize="w-20 h-20 us:w-28 us:h-28 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40"
                        isProgress = {isLoadingAvatar}
                        src={avatar}
                    />
                    <div className='flex text-xl sm:text-2xl md:text-3xl font-bold text-sky-700 gap-2'>
                        <span>{firstName} {lastName}</span>
                    </div>
                </div>
            </div>
            <div className=' grow h-12'></div>    
            <div className=' flex justify-center gap-5'>
                <ButtonUnderline
                    title='People'
                    isActive={location.pathname === '/user'}
                    onClick={()=>{navigate('/user')}}
                />
                <ButtonUnderline
                    title='My Posts'
                    isActive={location.pathname === '/myposts'}
                    onClick={()=>{navigate('myposts')}}
                />
                <ButtonUnderline
                    title='All Posts'
                    isActive={location.pathname === '/posts'}
                    onClick={()=>{navigate('posts')}}
                />
            </div>    
        </div>
    </div>
  )
}
