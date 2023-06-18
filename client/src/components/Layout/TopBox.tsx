import { CameraIcon, PhotoIcon } from '@heroicons/react/24/solid'
import React, {ChangeEvent} from 'react'
import defaultFoto from '../../assets/defaultAva.png'
import { URL } from '../../http'
import { RoundButton } from '../UI/RoundButton'
import { ButtonUnderline } from '../UI/ButtonUnderline'
import { useLocation, useNavigate } from 'react-router-dom'
import { ImageWithPreloader } from '../UI/ImageWithPreloader'
import { DotsPreloader } from '../Preloaders/DotsPreloader'

interface TopBoxProps {
    onChangeAvatar: (e: ChangeEvent<HTMLInputElement>)=>void
    onChangePicture: (e: ChangeEvent<HTMLInputElement>)=>void
    avatar: string
    picture: string
    firstName: string
    lastName: string
    messageCounter: number
    isLoadingAvatar?: boolean
    isLoadingPicture?: boolean
}


export const TopBox = ({
    onChangeAvatar=()=>{},
    onChangePicture=()=>{},
    isLoadingAvatar,
    isLoadingPicture,
    picture,
    avatar,
    firstName,
    lastName,
    messageCounter,
}:TopBoxProps) => {

    const navigate = useNavigate()
    const location = useLocation()
    // const style = {
    //     backgroundImage: `url(${picture ? URL+'/'+picture : ''})`,
    // }
    
    // const isActive = true

    // console.log(location);
    

  return (
    <div className='box my-10 overflow-hidden'>

        <div className='relative pt-[20%] bg-indigo-400 w-full bg-cover bg-center bg-no-repeat'
            //  style={style}   
        >
            <ImageWithPreloader 
                className=' absolute top-0' 
                src={`${picture ? URL+'/'+picture : ''}`} 
                alt='picture'
            />
            {   isLoadingPicture &&
                    <DotsPreloader className='absolute top-0'/>
            }
            <div className='absolute bottom-0 right-0 px-5 translate-y-1/2 z-10 flex gap-3'>
                <label htmlFor="avatar" className=' bg-orange-500 block p-2 rounded-full cursor-pointer duration-300 hover:scale-125'>
                    <CameraIcon className="h-7 w-7 text-blue-800 cursor-pointer" />
                    <input  className='hidden' 
                            type='file' 
                            id='avatar'
                            accept='.jpg, .png' 
                            onChange={onChangeAvatar}
                    />
                </label>
                <label htmlFor="picture" className=' bg-green-500 block p-2 rounded-full cursor-pointer duration-300 hover:scale-125'>
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
            <div className='absolute -translate-y-3/4 top-0 left-10'>
                <div className='flex items-end text-white'>
                    <div className="relative border-8 border-slate-300 overflow-hidden w-[170px] h-[170px] rounded-[50%] shadow-light">
                        <ImageWithPreloader
                             className=' object-cover w-full h-full' 
                             src={avatar ? URL + '/' + avatar : defaultFoto} 
                             alt="avatar" 
                        />
                        {   isLoadingAvatar &&
                            <DotsPreloader className='absolute top-0'/>
                        }
                    </div>
                    <div className='flex text-3xl font-bold text-sky-700 gap-2'>
                        <span>{firstName}</span>
                        <span>{lastName}</span>
                    </div>
                </div>
            </div>
            <div className=' grow h-12'></div>    
            <div className=' flex justify-center gap-5'>
                <ButtonUnderline
                    title='Profile data'
                    isActive={location.pathname === '/profile'}
                    onClick={()=>{navigate('/')}}
                />
                <ButtonUnderline
                    title='People'
                    isActive={location.pathname === '/users'}
                    onClick={()=>{navigate('users')}}
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
                <ButtonUnderline
                    title='Chats'
                    label={messageCounter}
                    isActive={location.pathname === '/chats'}
                    onClick={()=>{navigate('chats')}}
                />
            </div>    
        </div>
    </div>
  )
}
