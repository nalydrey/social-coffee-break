import { CameraIcon, PhotoIcon } from '@heroicons/react/24/solid'
import React, {ChangeEvent} from 'react'
import defaultFoto from '../../assets/defaultAva.png'
import { URL } from '../../http'
import { RoundButton } from '../UI/RoundButton'
import { ButtonUnderline } from '../UI/ButtonUnderline'
import { useLocation, useNavigate } from 'react-router-dom'

interface TopBoxProps {
    onChangeAvatar: (e: ChangeEvent<HTMLInputElement>)=>void
    onChangePicture: (e: ChangeEvent<HTMLInputElement>)=>void
    avatar: string
    picture: string
    firstName: string
    lastName: string
}


export const TopBox = ({
    onChangeAvatar=()=>{},
    onChangePicture=()=>{},
    picture,
    avatar,
    firstName,
    lastName
}:TopBoxProps) => {

    const navigate = useNavigate()
    const location = useLocation()
    const style = {
        backgroundImage: `url(${picture ? URL+'/'+picture : ''})`,
    }
    
    const isActive = true

    console.log(location);
    

  return (
    <div className='box my-10 overflow-hidden'>

        <div className='relative pt-[20%] bg-indigo-400 w-full bg-cover bg-center bg-no-repeat'
             style={style}   
        >
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
                <div className='flex gap-5 items-center text-white'>
                    <div className="relative border-8 border-slate-300 overflow-hidden w-[170px] h-[170px] rounded-[50%] shadow-light">
                        <img 
                            className=' object-cover w-full h-full' 
                            src={avatar ? URL + '/' + avatar : defaultFoto} 
                            alt="avatar" 
                        />
                    </div>
                    <div className='flex flex-col text-3xl font-bold bg-black/30 py-1 px-5 rounded-l-md rounded-r-[50px]'>
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
                    onClick={()=>{navigate('profile')}}
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
                    isActive={location.pathname === '/chats'}
                    onClick={()=>{navigate('chats')}}
                />
            </div>    
        </div>
    </div>
  )
}
